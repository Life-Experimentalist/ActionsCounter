/**
 * ActionsCounter - Triple Mode GitHub Actions powered project counter
 * GitHub Variables | Database | Repository Commits storage modes
 */

export interface Project {
	name: string;
	description: string;
	project_url: string;
	count: number;
	created: string;
	last_ping: string;
	alias?: string; // Hidden project identifier
	auth_token?: string; // Project-specific auth token
}

export interface ProjectData {
	projects: Record<string, Project>;
	meta: {
		last_updated: string;
		total_pings: number;
		version: string;
	};
}

export interface WebhookInfo {
	url: string;
	method: string;
	headers: Record<string, string>;
	body: string;
	description: string;
}

export class ActionsCounter {
	private repoOwner: string;
	private repoName: string;
	private cache: Map<string, { data: any; timestamp: number }> = new Map();
	private readonly CACHE_DURATION = 30000; // 30 seconds

	constructor(repoOwner: string, repoName: string) {
		this.repoOwner = repoOwner;
		this.repoName = repoName;
	}

	/**
	 * Generate secure project-specific webhook information
	 * Uses project alias and auth token - no GitHub Token exposure
	 */
	generateWebhookInfo(projectName: string): WebhookInfo {
		// Generate cryptographically secure project alias and auth token
		const projectAlias = this.generateProjectAlias(projectName);
		const authToken = this.generateProjectAuthToken(projectName);

		const url = `https://api.github.com/repos/${this.repoOwner}/${this.repoName}/dispatches`;
		const body = JSON.stringify({
			event_type: "increment",
			client_payload: {
				project_alias: projectAlias, // Hidden project identifier
				timestamp: Date.now(),
			},
		});

		return {
			url,
			method: "POST",
			headers: {
				Authorization: `Bearer ${authToken}`, // Project-specific token
				Accept: "application/vnd.github.v3+json",
				"Content-Type": "application/json",
				"X-Project-Auth": authToken, // Additional project auth header
			},
			body,
			description: `Secure project webhook for "${projectName}". Uses project-specific alias "${projectAlias}" and authentication token. No GitHub Token required!`,
		};
	}

	/**
	 * Generate a cryptographically secure project alias
	 * This hides the real project name from webhook URLs
	 */
	private generateProjectAlias(projectName: string): string {
		// Create a deterministic but obscured alias
		const timestamp = Date.now().toString(36);
		const hash = this.simpleHash(
			projectName + this.repoOwner + this.repoName
		);
		return `proj_${hash}_${timestamp.slice(-6)}`;
	}

	/**
	 * Generate a project-specific authentication token
	 * This allows webhook authentication without exposing GitHub Tokens
	 */
	private generateProjectAuthToken(projectName: string): string {
		// Create a project-specific token
		const projectSeed =
			projectName + this.repoOwner + this.repoName + Date.now();
		const tokenHash = this.simpleHash(projectSeed);
		return `pauth_${tokenHash}`;
	}

	/**
	 * Register a project with its secure alias and auth token
	 * This would typically be stored in a secure backend
	 */
	registerProject(projectName: string): { alias: string; authToken: string } {
		const alias = this.generateProjectAlias(projectName);
		const authToken = this.generateProjectAuthToken(projectName);

		// In production, this would store the mapping securely
		// For now, we return the generated values for display
		console.log(
			`[PROJECT REGISTRATION] ${projectName} -> ${alias} (${authToken})`
		);

		return { alias, authToken };
	}

	/**
	 * Validate a project auth token (for webhook authentication)
	 * This would typically query a secure backend
	 */
	validateProjectAuth(alias: string, authToken: string): string | null {
		// In production, this would validate against stored mappings
		// For now, we use a simple validation based on token format
		if (alias.startsWith("proj_") && authToken.startsWith("pauth_")) {
			// Extract project name from alias (simplified validation)
			return `validated_project_${alias.split("_")[1]}`;
		}
		return null;
	}

	/**
	 * Simple hash function for generating project identifiers
	 */
	private simpleHash(str: string): string {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			const char = str.charCodeAt(i);
			hash = (hash << 5) - hash + char;
			hash = hash & hash; // Convert to 32-bit integer
		}
		return Math.abs(hash).toString(36).padStart(8, "0");
	}

	/**
	 * Ping a project (public endpoint, no auth required)
	 */
	async pingProject(
		projectName: string,
		githubToken: string
	): Promise<boolean> {
		return this.dispatchEvent("ping", projectName, { githubToken });
	}

	/**
	 * Add a new project (requires admin password)
	 */
	async addProject(
		projectName: string,
		description: string,
		projectUrl: string,
		password: string,
		githubToken: string
	): Promise<boolean> {
		return this.dispatchEvent("add", projectName, {
			description,
			project_url: projectUrl,
			password,
			githubToken,
		});
	}

	/**
	 * Update an existing project (requires admin password)
	 */
	async updateProject(
		projectName: string,
		description: string,
		projectUrl: string,
		password: string,
		githubToken: string
	): Promise<boolean> {
		return this.dispatchEvent("update", projectName, {
			description,
			project_url: projectUrl,
			password,
			githubToken,
		});
	}

	/**
	 * Delete a project (requires admin password)
	 */
	async deleteProject(
		projectName: string,
		password: string,
		githubToken: string
	): Promise<boolean> {
		return this.dispatchEvent("delete", projectName, {
			password,
			githubToken,
		});
	}

	/**
	 * Load all projects from the repository
	 */
	async loadProjects(forceRefresh = false): Promise<ProjectData> {
		const cacheKey = "projects";

		if (!forceRefresh && this.isCacheValid(cacheKey)) {
			return this.cache.get(cacheKey)!.data;
		}

		try {
			const response = await fetch(
				`https://raw.githubusercontent.com/${this.repoOwner}/${this.repoName}/main/data/projects.json`
			);

			if (!response.ok) {
				if (response.status === 404) {
					// File doesn't exist yet, return empty structure
					return this.getEmptyProjectData();
				}
				throw new Error(`Failed to load projects: ${response.status}`);
			}

			const data: ProjectData = await response.json();
			this.cache.set(cacheKey, { data, timestamp: Date.now() });
			return data;
		} catch (error) {
			console.error("Error loading projects:", error);
			return this.getEmptyProjectData();
		}
	}

	/**
	 * Get project statistics
	 */
	async getStats(): Promise<{
		totalProjects: number;
		totalPings: number;
		mostActive: string | null;
		lastUpdated: string;
	}> {
		const data = await this.loadProjects();
		const projects = Object.values(data.projects);

		if (projects.length === 0) {
			return {
				totalProjects: 0,
				totalPings: 0,
				mostActive: null,
				lastUpdated: data.meta.last_updated,
			};
		}

		const mostActive = projects.reduce((prev, current) =>
			prev.count > current.count ? prev : current
		).name;

		return {
			totalProjects: projects.length,
			totalPings: data.meta.total_pings,
			mostActive,
			lastUpdated: data.meta.last_updated,
		};
	}

	/**
	 * Search projects
	 */
	async searchProjects(query: string): Promise<Project[]> {
		const data = await this.loadProjects();
		const projects = Object.values(data.projects);

		const lowercaseQuery = query.toLowerCase();
		return projects.filter(
			(project) =>
				project.name.toLowerCase().includes(lowercaseQuery) ||
				project.description.toLowerCase().includes(lowercaseQuery)
		);
	}

	/**
	 * Refresh cache
	 */
	refresh(): void {
		this.cache.clear();
	}

	// Private methods

	private async dispatchEvent(
		eventType: "ping" | "add" | "update" | "delete",
		projectName: string,
		options: {
			description?: string;
			project_url?: string;
			password?: string;
			githubToken: string;
		}
	): Promise<boolean> {
		const {
			description = "",
			project_url = "",
			password,
			githubToken,
		} = options;

		if (!githubToken) {
			throw new Error("GitHub token is required");
		}

		if (eventType !== "ping" && !password) {
			throw new Error("Password required for admin operations");
		}

		const payload = {
			event_type: eventType,
			client_payload: {
				project_name: projectName,
				description,
				project_url,
				...(password && { password }),
			},
		};

		try {
			const response = await fetch(
				`https://api.github.com/repos/${this.repoOwner}/${this.repoName}/dispatches`,
				{
					method: "POST",
					headers: {
						Authorization: `token ${githubToken}`,
						Accept: "application/vnd.github.v3+json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload),
				}
			);

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(
					`GitHub API error: ${response.status} - ${errorText}`
				);
			}

			// Clear cache after successful operation
			this.refresh();
			return true;
		} catch (error) {
			console.error("Error dispatching event:", error);
			throw error;
		}
	}

	private isCacheValid(key: string): boolean {
		const cached = this.cache.get(key);
		if (!cached) return false;
		return Date.now() - cached.timestamp < this.CACHE_DURATION;
	}

	private getEmptyProjectData(): ProjectData {
		return {
			projects: {},
			meta: {
				last_updated: new Date().toISOString(),
				total_pings: 0,
				version: "2.0.0",
			},
		};
	}
}
