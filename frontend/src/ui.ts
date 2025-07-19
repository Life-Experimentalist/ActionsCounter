/**
 * Modern UI for ActionsCounter Dashboard
 * Beautiful, responsive interface with enhanced user experience
 */

import { ActionsCounter, type Project } from "./counter-api.js";

export class UI {
	private api: ActionsCounter;
	private storageMode: string = "unknown";
	private analyticsData: any = null;
	public projectsData: Project[] = [];

	constructor(
		repoOwner: string,
		repoName: string,
		storageMode: string = "repository",
		analyticsData: any = null
	) {
		this.api = new ActionsCounter(repoOwner, repoName);
		this.storageMode = storageMode;
		this.analyticsData = analyticsData;
		this.init();
	}

	/**
	 * Initialize the modern UI
	 */
	private async init(): Promise<void> {
		this.setupStorageIndicator();
		this.setupEventListeners();
		await this.refreshData();
	}

	/**
	 * Setup storage mode indicator
	 */
	private setupStorageIndicator(): void {
		const indicator = document.getElementById("storage-indicator");
		const modeText = document.getElementById("storage-mode-text");

		if (indicator && modeText) {
			let modeLabel =
				this.storageMode.charAt(0).toUpperCase() +
				this.storageMode.slice(1) +
				" Storage";
			let modeDesc = "";
			switch (this.storageMode) {
				case "github_variables":
					modeDesc =
						"(Fast, free, no DB required. Data stored in GitHub repo variables.)";
					break;
				case "database":
					modeDesc =
						"(External DB, scalable, requires DB connection.)";
					break;
				case "repository_commits":
					modeDesc =
						"(Data stored in repo commits/files. Good for audit/history.)";
					break;
				default:
					modeDesc = "(Unknown or not configured)";
			}
			modeText.textContent = `${modeLabel} ${modeDesc}`;
			indicator.classList.remove("hidden");
		}
	}

	/**
	 * Setup event listeners
	 */
	private setupEventListeners(): void {
		// Search functionality
		const searchInput = document.getElementById(
			"search-input"
		) as HTMLInputElement;
		if (searchInput) {
			searchInput.addEventListener("input", () => this.searchProjects());
			searchInput.addEventListener("keypress", (e) => {
				if (e.key === "Enter") {
					this.searchProjects();
				}
			});
		}

		// ESC key to close modals
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") {
				this.closeModal();
			}
		});
	}

	/**
	 * Refresh data and update UI
	 */
	public async refreshData(): Promise<void> {
		try {
			this.showMessage("Refreshing data...", "info");

			const projectsData = await this.api.loadProjects(true);
			this.projectsData = Object.values(projectsData.projects);

			this.renderProjects(this.projectsData);
			this.updateStats(this.projectsData);

			this.showMessage("Data refreshed successfully!", "success");
		} catch (error) {
			console.error("Error refreshing data:", error);
			this.showMessage(`Error refreshing data: ${error}`, "error");
		}
	}

	/**
	 * Update dashboard statistics
	 */
	private updateStats(projects: Project[]): void {
		const totalProjects = projects.length;
		const totalCount = projects.reduce((sum, p) => sum + p.count, 0);
		const averageCount =
			totalProjects > 0 ? Math.round(totalCount / totalProjects) : 0;
		const mostActive =
			projects.length > 0
				? projects.reduce(
						(max, p) => (p.count > max.count ? p : max),
						projects[0]
				  )
				: null;

		// Update stat cards
		this.updateElement("total-projects", totalProjects.toString());
		this.updateElement("total-count", totalCount.toLocaleString());
		this.updateElement("average-count", averageCount.toString());
		this.updateElement("most-active", mostActive ? mostActive.name : "—");
	}

	/**
	 * Update element text content
	 */
	private updateElement(id: string, content: string): void {
		const element = document.getElementById(id);
		if (element) {
			element.textContent = content;
		}
	}

	/**
	 * Show message to user
	 */
	public showMessage(
		message: string,
		type: "success" | "error" | "info"
	): void {
		const container = document.getElementById("message-container");
		if (!container) return;

		// Clear existing messages
		container.innerHTML = "";

		// Create message element
		const messageEl = document.createElement("div");
		messageEl.className = `message ${type}`;
		messageEl.innerHTML = `
			<i class="fas ${
				type === "success"
					? "fa-check-circle"
					: type === "error"
					? "fa-exclamation-circle"
					: "fa-info-circle"
			}"></i>
			${message}
		`;

		container.appendChild(messageEl);
		container.classList.remove("hidden");

		// Auto hide after 5 seconds
		setTimeout(() => {
			container.classList.add("hidden");
		}, 5000);
	}

	/**
	 * Render projects in the grid
	 */
	public renderProjects(projects: Project[]): void {
		const container = document.getElementById("projects-container");
		const emptyState = document.getElementById("empty-state");

		if (!container || !emptyState) return;

		if (projects.length === 0) {
			container.innerHTML = "";
			emptyState.classList.remove("hidden");
			return;
		}

		emptyState.classList.add("hidden");

		container.innerHTML = projects
			.map(
				(project: Project) => `
			<div class="project-card fade-in-up" onclick="ui.showProjectDetails('${this.escapeHtml(
				project.name
			)}')">
				<div class="project-header">
					<div>
						<h3 class="project-name">${this.escapeHtml(project.name)}</h3>
					</div>
					<div class="project-count">${project.count.toLocaleString()}</div>
				</div>

				<div class="project-description">
					${
						project.description
							? this.escapeHtml(project.description)
							: "No description available"
					}
				</div>

				<div class="project-meta">
					<span><i class="fas fa-calendar"></i> Created: ${
						project.created
							? new Date(project.created).toLocaleDateString()
							: "Unknown"
					}</span>
					<span><i class="fas fa-clock"></i> Updated: ${
						project.last_ping
							? new Date(project.last_ping).toLocaleDateString()
							: "Unknown"
					}</span>
				</div>

				<div class="project-actions">
					<button class="btn btn-secondary btn-sm" onclick="ui.pingProject('${this.escapeHtml(
						project.name
					)}')">
						<i class="fas fa-mouse-pointer"></i> Ping
					</button>
					<button class="btn btn-outline btn-sm" onclick="ui.showUpdateProjectModal('${this.escapeHtml(
						project.name
					)}')">
						<i class="fas fa-edit"></i> Edit
					</button>
					<button class="btn btn-outline btn-sm" onclick="ui.showWebhookModal('${this.escapeHtml(
						project.name
					)}')">
						<i class="fas fa-link"></i> Webhook
					</button>
					<button class="btn btn-outline btn-sm" onclick="ui.showDeleteConfirmation('${this.escapeHtml(
						project.name
					)}')">
						<i class="fas fa-trash"></i> Delete
					</button>
				</div>
			</div>
		`
			)
			.join("");
	}

	/**
	 * Escape HTML to prevent XSS
	 */
	private escapeHtml(text: string): string {
		const div = document.createElement("div");
		div.textContent = text;
		return div.innerHTML;
	}

	/**
	 * Search and filter projects
	 */
	public searchProjects(): void {
		const searchInput = document.getElementById(
			"search-input"
		) as HTMLInputElement;
		if (!searchInput) return;

		const query = searchInput.value.toLowerCase().trim();

		if (!query) {
			this.renderProjects(this.projectsData);
			return;
		}

		const filteredProjects = this.projectsData.filter(
			(project) =>
				project.name.toLowerCase().includes(query) ||
				(project.description &&
					project.description.toLowerCase().includes(query))
		);

		this.renderProjects(filteredProjects);
	}

	/**
	 * Show add project modal
	 */
	public showAddProjectModal(): void {
		const modal = this.createModal(
			"Add New Project",
			`
			<form id="add-project-form">
				<div class="form-group">
					<label for="project-name">Project Name *</label>
					<input type="text" id="project-name" name="name" required placeholder="Enter project name" />
				</div>
				<div class="form-group">
					<label for="project-description">Description</label>
					<textarea id="project-description" name="description" rows="3" placeholder="Optional project description"></textarea>
				</div>
				<div class="form-group">
					<label for="initial-count">Initial Count</label>
					<input type="number" id="initial-count" name="count" value="0" min="0" />
				</div>
				<div class="form-group">
					<label for="admin-password">Admin Password *</label>
					<input type="password" id="admin-password" name="password" required placeholder="Enter admin password" />
				</div>
			</form>
		`,
			[
				{
					text: "Cancel",
					class: "btn btn-outline",
					action: () => this.closeModal(),
				},
				{
					text: "Add Project",
					class: "btn btn-primary",
					action: () => this.handleAddProject(),
				},
			]
		);

		this.showModal(modal);
	}

	// --- Analytics and Project Existence Checks Moved to Frontend ---

	// Utility: Check if project name is valid and not empty
	private isValidProjectName(name: string): boolean {
		return typeof name === "string" && name.trim().length > 0;
	}

	// Utility: Check if project exists in the current list
	private projectExists(name: string): boolean {
		return this.projectsData.some((p) => p.name === name);
	}

	/**
	 * Handle add project form submission
	 */
	private async handleAddProject(): Promise<void> {
		const form = document.getElementById(
			"add-project-form"
		) as HTMLFormElement;
		if (!form) return;

		const formData = new FormData(form);
		const name = formData.get("name") as string;
		const description = formData.get("description") as string;
		const password = formData.get("password") as string;

		if (!this.isValidProjectName(name) || !password.trim()) {
			this.showMessage("Please fill in all required fields", "error");
			return;
		}
		if (this.projectExists(name)) {
			this.showMessage(`Project '${name}' already exists!`, "error");
			return;
		}

		try {
			this.closeModal();
			this.showMessage("Adding project...", "info");

			// Call backend and expect alias/auth token in response (simulate for now)
			await this.api.addProject(name, description, "", password);
			// Simulate: show alias/auth token (in real use, backend should return these)
			const { alias, authToken } = this.api.registerProject(name);
			this.showMessage(
				`Project "${name}" added!<br>🔑 Alias: <b>${alias}</b><br>🔐 Auth Token: <b>${authToken}</b><br><span style='color:var(--error);font-weight:600;'>Save this token now. It will not be shown again!</span>`,
				"success"
			);
			await this.refreshData();
		} catch (error) {
			console.error("Error adding project:", error);
			this.showMessage(`Error adding project: ${error}`, "error");
		}
	}

	/**
	 * Show ping project modal
	 */
	public showPingModal(): void {
		const modal = this.createModal(
			"Ping Project",
			`
			<form id="ping-project-form">
				<div class="form-group">
					<label for="ping-project-name">Project Name *</label>
					<input type="text" id="ping-project-name" name="project-name" required placeholder="Enter project name to ping" />
				</div>
			</form>
		`,
			[
				{
					text: "Cancel",
					class: "btn btn-outline",
					action: () => this.closeModal(),
				},
				{
					text: "Ping Project",
					class: "btn btn-secondary",
					action: () => this.handlePingProject(),
				},
			]
		);

		this.showModal(modal);
	}

	/**
	 * Handle ping project form submission
	 */
	private async handlePingProject(): Promise<void> {
		const form = document.getElementById(
			"ping-project-form"
		) as HTMLFormElement;
		if (!form) return;

		const formData = new FormData(form);
		const projectName = formData.get("project-name") as string;

		if (!projectName.trim()) {
			this.showMessage("Please enter a project name", "error");
			return;
		}

		try {
			this.closeModal();
			this.showMessage("Pinging project...", "info");

			await this.api.pingProject(projectName);
			this.showMessage(
				`Project "${projectName}" pinged successfully!`,
				"success"
			);
			await this.refreshData();
		} catch (error) {
			console.error("Error pinging project:", error);
			this.showMessage(`Error pinging project: ${error}`, "error");
		}
	}

	/**
	 * Ping project directly (called from project card)
	 */
	public async pingProject(projectName: string): Promise<void> {
		if (!this.isValidProjectName(projectName)) {
			this.showMessage(
				"Project name is required for ping action",
				"error"
			);
			return;
		}
		if (!this.projectExists(projectName)) {
			this.showMessage(`Project '${projectName}' not found!`, "error");
			return;
		}
		try {
			this.showMessage("Pinging project...", "info");
			await this.api.pingProject(projectName);
			this.showMessage(
				`Project "${projectName}" pinged successfully!`,
				"success"
			);
			await this.refreshData();
		} catch (error) {
			console.error("Error pinging project:", error);
			this.showMessage(`Error pinging project: ${error}`, "error");
		}
	}

	/**
	 * Show update project modal
	 */
	public showUpdateProjectModal(projectName: string): void {
		const project = this.projectsData.find((p) => p.name === projectName);
		if (!project) {
			this.showMessage("Project not found", "error");
			return;
		}

		const modal = this.createModal(
			"Update Project",
			`
			<form id="update-project-form">
				<div class="form-group">
					<label for="update-project-name">Project Name</label>
					<input type="text" id="update-project-name" name="name" value="${this.escapeHtml(
						project.name
					)}" readonly />
				</div>
				<div class="form-group">
					<label for="update-project-description">Description</label>
					<textarea id="update-project-description" name="description" rows="3">${
						project.description || ""
					}</textarea>
				</div>
				<div class="form-group">
					<label for="update-project-count">Count</label>
					<input type="number" id="update-project-count" name="count" value="${
						project.count
					}" min="0" />
				</div>
				<div class="form-group">
					<label for="update-admin-password">Admin Password *</label>
					<input type="password" id="update-admin-password" name="password" required placeholder="Enter admin password" />
				</div>
			</form>
		`,
			[
				{
					text: "Cancel",
					class: "btn btn-outline",
					action: () => this.closeModal(),
				},
				{
					text: "Update Project",
					class: "btn btn-primary",
					action: () => this.handleUpdateProject(),
				},
			]
		);

		this.showModal(modal);
	}

	/**
	 * Handle update project form submission
	 */
	private async handleUpdateProject(): Promise<void> {
		const form = document.getElementById(
			"update-project-form"
		) as HTMLFormElement;
		if (!form) return;

		const formData = new FormData(form);
		const name = formData.get("name") as string;
		const description = formData.get("description") as string;
		const password = formData.get("password") as string;

		if (!this.isValidProjectName(name) || !password.trim()) {
			this.showMessage("Please fill in all required fields", "error");
			return;
		}
		if (!this.projectExists(name)) {
			this.showMessage(`Project '${name}' not found!`, "error");
			return;
		}

		try {
			this.closeModal();
			this.showMessage("Updating project...", "info");

			await this.api.updateProject(name, description, "", password);
			this.showMessage(
				`Project "${name}" updated successfully!`,
				"success"
			);
			await this.refreshData();
		} catch (error) {
			console.error("Error updating project:", error);
			this.showMessage(`Error updating project: ${error}`, "error");
		}
	}

	/**
	 * Show delete confirmation modal
	 */
	public showDeleteConfirmation(projectName: string): void {
		const modal = this.createModal(
			"Delete Project",
			`
			<div style="text-align: center; padding: 1rem;">
				<i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: var(--error); margin-bottom: 1rem;"></i>
				<h3>Are you sure?</h3>
				<p>This will permanently delete the project <strong>"${this.escapeHtml(
					projectName
				)}"</strong> and all its data.</p>
				<p style="color: var(--error); font-weight: 600;">This action cannot be undone!</p>
			</div>
			<form id="delete-project-form" style="margin-top: 1rem;">
				<div class="form-group">
					<label for="delete-admin-password">Admin Password *</label>
					<input type="password" id="delete-admin-password" name="password" required placeholder="Enter admin password to confirm" />
				</div>
			</form>
		`,
			[
				{
					text: "Cancel",
					class: "btn btn-outline",
					action: () => this.closeModal(),
				},
				{
					text: "Delete Project",
					class: "btn btn-danger",
					action: () => this.handleDeleteProject(projectName),
				},
			]
		);

		this.showModal(modal);
	}

	/**
	 * Handle delete project
	 */
	private async handleDeleteProject(projectName: string): Promise<void> {
		const form = document.getElementById(
			"delete-project-form"
		) as HTMLFormElement;
		if (!form) return;

		const formData = new FormData(form);
		const password = formData.get("password") as string;

		if (!password.trim()) {
			this.showMessage("Please enter the admin password", "error");
			return;
		}

		try {
			this.closeModal();
			this.showMessage("Deleting project...", "info");

			await this.api.deleteProject(projectName, password);
			this.showMessage(
				`Project "${projectName}" deleted successfully!`,
				"success"
			);
			await this.refreshData();
		} catch (error) {
			console.error("Error deleting project:", error);
			this.showMessage(`Error deleting project: ${error}`, "error");
		}
	}

	/**
	 * Show webhook modal with alias and auth token
	 */
	public showWebhookModal(projectName: string): void {
		const project = this.projectsData.find((p) => p.name === projectName);
		if (!project) {
			this.showMessage("Project not found", "error");
			return;
		}

		const alias = project.alias || "(not available)";
		const webhookUrl = `https://api.github.com/repos/${this.api.getRepoOwner()}/${this.api.getRepoName()}/dispatches`;
		const samplePayload = JSON.stringify(
			{
				event_type: "increment",
				client_payload: {
					project_alias: alias,
				},
			},
			null,
			2
		);

		const modal = this.createModal(
			`Webhook Information - ${projectName}`,
			`
			<div class="webhook-info">
				<div class="form-group">
					<label>Project Alias</label>
					<input type="text" readonly value="${alias}" style="font-family: monospace; font-size: 0.875rem;" />
				</div>
				<div class="form-group">
					<label>Webhook URL</label>
					<input type="text" readonly value="${webhookUrl}" style="font-family: monospace; font-size: 0.875rem;" />
				</div>
				<div class="form-group">
					<label>Sample Payload</label>
					<textarea readonly rows="5" style="font-family: monospace; font-size: 0.75rem;">${samplePayload}</textarea>
				</div>
				<div class="form-group">
					<label>Instructions</label>
					<p>Use the alias and your project-specific auth token in the webhook request. <b>Never share your admin password or GitHub token.</b></p>
				</div>
			</div>
		`,
			[
				{
					text: "Close",
					class: "btn btn-primary",
					action: () => this.closeModal(),
				},
			]
		);

		this.showModal(modal);
	}

	/**
	 * Test webhook
	 */
	public async testWebhook(projectName: string): Promise<void> {
		try {
			this.showMessage("Testing webhook...", "info");

			await this.api.pingProject(projectName);
			this.showMessage(`Webhook test successful!`, "success");
			await this.refreshData();
		} catch (error) {
			console.error("Error testing webhook:", error);
			this.showMessage(`Webhook test failed: ${error}`, "error");
		}
	}

	/**
	 * Show statistics modal
	 */
	public showStatsModal(): void {
		const projects = this.projectsData;
		const totalProjects = projects.length;
		const totalCount = projects.reduce((sum, p) => sum + p.count, 0);
		const averageCount =
			totalProjects > 0 ? (totalCount / totalProjects).toFixed(2) : "0";

		// Sort projects by count for top performers
		const topProjects = [...projects]
			.sort((a, b) => b.count - a.count)
			.slice(0, 5);

		const modal = this.createModal(
			"Project Statistics",
			`
			<div class="stats-overview" style="margin-bottom: 2rem;">
				<div class="stats-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
					<div style="text-align: center; padding: 1rem; background: var(--gray-50); border-radius: var(--border-radius);">
						<div style="font-size: 2rem; font-weight: 700; color: var(--primary);">${totalProjects}</div>
						<div style="font-size: 0.875rem; color: var(--gray-600);">Total Projects</div>
					</div>
					<div style="text-align: center; padding: 1rem; background: var(--gray-50); border-radius: var(--border-radius);">
						<div style="font-size: 2rem; font-weight: 700; color: var(--secondary);">${totalCount.toLocaleString()}</div>
						<div style="font-size: 0.875rem; color: var(--gray-600);">Total Clicks</div>
					</div>
					<div style="text-align: center; padding: 1rem; background: var(--gray-50); border-radius: var(--border-radius);">
						<div style="font-size: 2rem; font-weight: 700; color: var(--accent);">${averageCount}</div>
						<div style="font-size: 0.875rem; color: var(--gray-600);">Average per Project</div>
					</div>
				</div>

				<h4 style="margin-bottom: 1rem; color: var(--gray-900);">Top Performers</h4>
				<div style="space-y: 0.5rem;">
					${topProjects
						.map(
							(project, index) => `
						<div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: var(--gray-50); border-radius: var(--border-radius); margin-bottom: 0.5rem;">
							<div style="display: flex; align-items: center; gap: 0.75rem;">
								<span style="width: 1.5rem; height: 1.5rem; background: var(--primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 600;">${
									index + 1
								}</span>
								<span style="font-weight: 500;">${this.escapeHtml(project.name)}</span>
							</div>
							<span style="font-weight: 600; color: var(--primary);">${project.count.toLocaleString()}</span>
						</div>
					`
						)
						.join("")}
				</div>
			</div>
		`,
			[
				{
					text: "Export Data",
					class: "btn btn-outline",
					action: () => this.exportData(),
				},
				{
					text: "Close",
					class: "btn btn-primary",
					action: () => this.closeModal(),
				},
			]
		);

		this.showModal(modal);
	}

	/**
	 * Export data as JSON
	 */
	public exportData(): void {
		const data = {
			exported_at: new Date().toISOString(),
			storage_mode: this.storageMode,
			projects: this.projectsData,
			analytics: this.analyticsData,
		};

		const blob = new Blob([JSON.stringify(data, null, 2)], {
			type: "application/json",
		});
		const url = URL.createObjectURL(blob);

		const a = document.createElement("a");
		a.href = url;
		a.download = `actionscounter-export-${
			new Date().toISOString().split("T")[0]
		}.json`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);

		this.showMessage("Data exported successfully!", "success");
	}

	/**
	 * Create modal element
	 */
	private createModal(
		title: string,
		content: string,
		actions: Array<{ text: string; class: string; action: () => void }>
	): HTMLElement {
		const overlay = document.createElement("div");
		overlay.className = "modal-overlay";
		overlay.innerHTML = `
			<div class="modal">
				<div class="modal-header">
					<h3>${title}</h3>
					<button type="button" class="close-btn" onclick="ui.closeModal()">
						<i class="fas fa-times"></i>
					</button>
				</div>
				<div class="modal-body">
					${content}
					<div style="display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--gray-200);">
						${actions
							.map(
								(action, index) => `
							<button type="button" class="${action.class}" data-action="${index}">
								${action.text}
							</button>
						`
							)
							.join("")}
					</div>
				</div>
			</div>
		`;

		// Add action event listeners
		actions.forEach((action, index) => {
			const button = overlay.querySelector(
				`[data-action="${index}"]`
			) as HTMLButtonElement;
			if (button) {
				button.addEventListener("click", action.action);
			}
		});

		// Close on overlay click
		overlay.addEventListener("click", (e) => {
			if (e.target === overlay) {
				this.closeModal();
			}
		});

		return overlay;
	}

	/**
	 * Show modal
	 */
	private showModal(modal: HTMLElement): void {
		document.body.appendChild(modal);
		// Force reflow before adding show class for animation
		modal.offsetHeight;
		modal.classList.add("show");
	}

	/**
	 * Close modal
	 */
	public closeModal(): void {
		const modals = document.querySelectorAll(".modal-overlay");
		modals.forEach((modal) => {
			modal.classList.remove("show");
			setTimeout(() => {
				if (modal.parentNode) {
					modal.parentNode.removeChild(modal);
				}
			}, 300);
		});
	}

	/**
	 * Show project details
	 */
	public showProjectDetails(projectName: string): void {
		const project = this.projectsData.find(
			(p: Project) => p.name === projectName
		);
		if (!project) {
			this.showMessage("Project not found", "error");
			return;
		}
		const detailsModal = document.getElementById("project-details-modal");
		if (!detailsModal) return;
		const nameEl = detailsModal.querySelector(
			".project-name"
		) as HTMLElement | null;
		if (nameEl) nameEl.textContent = project.name;
		const aliasEl = detailsModal.querySelector(
			".project-alias"
		) as HTMLElement | null;
		if (aliasEl) aliasEl.textContent = project.alias || "-";
		const urlEl = detailsModal.querySelector(
			".project-url"
		) as HTMLElement | null;
		if (urlEl) urlEl.textContent = (project as any).url || "-";
		const countEl = detailsModal.querySelector(
			".project-count"
		) as HTMLElement | null;
		if (countEl) countEl.textContent = String(project.count);
		const webhookSection = detailsModal.querySelector(
			".webhook-info"
		) as HTMLElement | null;
		if (project.alias && webhookSection) {
			webhookSection.classList.remove("hidden");
			const webhookUrlEl = webhookSection.querySelector(
				".webhook-url"
			) as HTMLElement | null;
			if (webhookUrlEl)
				webhookUrlEl.textContent = this.generateWebhookUrl(
					project.alias
				);
			const webhookModeEl = webhookSection.querySelector(
				".webhook-mode"
			) as HTMLElement | null;
			if (webhookModeEl) webhookModeEl.textContent = this.storageMode;
		} else if (webhookSection) {
			webhookSection.classList.add("hidden");
		}
		const storageModeEl = detailsModal.querySelector(
			".storage-mode"
		) as HTMLElement | null;
		if (storageModeEl) storageModeEl.textContent = this.storageMode;
		detailsModal.classList.add("open");
	}

	/**
	 * Generate webhook URL
	 */
	private generateWebhookUrl(alias: string): string {
		// Example webhook URL (customize as needed)
		return `https://api.github.com/repos/${this.api["repoOwner"]}/${this.api["repoName"]}/dispatches?alias=${alias}`;
	}
}

// Global UI instance for easy access
export let ui: UI;
