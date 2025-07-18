/**
 * Simplified UI for ActionsCounter
 * Focuses on core project management with security via repository secrets
 */

import {
	ActionsCounter,
	type Project,
	type WebhookInfo,
} from "./counter-api.js";

export class UI {
	private api: ActionsCounter;
	private currentGitHubToken: string = "";
	private currentPassword: string = "";
	private storageMode: string = "unknown";
	private analyticsData: any = null;

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
	 * Utility function to create DOM elements with optional class and text content
	 */
	private createElement(
		tag: string,
		className?: string,
		textContent?: string
	): HTMLElement {
		const element = document.createElement(tag);
		if (className) element.className = className;
		if (textContent) element.textContent = textContent;
		return element;
	}

	/**
	 * Utility function to create and append child elements
	 */
	private createAndAppend(
		parent: HTMLElement,
		tag: string,
		className?: string,
		textContent?: string
	): HTMLElement {
		const element = this.createElement(tag, className, textContent);
		parent.appendChild(element);
		return element;
	}

	private async init(): Promise<void> {
		this.setupEventListeners();
		await this.loadProjects();
		this.setupTokenModal();
		this.displayStorageMode();
	}

	private displayStorageMode(): void {
		// Add storage mode indicator to the header
		const header = document.querySelector(
			"header .container"
		) as HTMLElement;
		if (header && !document.getElementById("storage-mode-indicator")) {
			const indicator = this.createElement("div");
			indicator.id = "storage-mode-indicator";
			indicator.style.cssText = `
				position: absolute;
				top: 10px;
				right: 10px;
				padding: 5px 10px;
				border-radius: 15px;
				font-size: 12px;
				font-weight: bold;
				color: white;
				z-index: 1000;
			`;

			// Set mode-specific styling and text
			switch (this.storageMode) {
				case "github_variables":
					indicator.style.backgroundColor = "#0066cc";
					indicator.innerHTML = "🔗 GitHub Variables Mode";
					break;
				case "database":
					indicator.style.backgroundColor = "#28a745";
					indicator.innerHTML = "🗄️ Database Mode";
					break;
				case "repository_commits":
					indicator.style.backgroundColor = "#fd7e14";
					indicator.innerHTML = "📁 Repository Commits Mode";
					break;
				default:
					indicator.style.backgroundColor = "#6c757d";
					indicator.innerHTML = "❓ Unknown Mode";
			}

			header.appendChild(indicator);
		}

		// Add analytics display if available
		if (
			this.analyticsData &&
			!document.getElementById("analytics-display")
		) {
			this.displayAnalytics();
		}
	}

	private displayAnalytics(): void {
		if (!this.analyticsData) return;

		// Update stats section if it exists
		const statsSection = document.querySelector(".analytics-section");
		if (statsSection) {
			// Clear existing content
			statsSection.innerHTML = "";

			// Create title
			const title = document.createElement("h3");
			title.textContent = `📊 Analytics (${this.storageMode.toUpperCase()} Mode)`;
			statsSection.appendChild(title);

			// Create stats grid
			const statsGrid = document.createElement("div");
			statsGrid.className = "stats-grid";

			const analyticsStats = [
				{
					title: "Total Projects",
					value: this.analyticsData.total_projects || 0,
				},
				{
					title: "Total Count",
					value: this.analyticsData.total_count || 0,
				},
				{
					title: "Average Count",
					value: this.analyticsData.average_count || 0,
				},
				{
					title: "Max Count",
					value: this.analyticsData.max_count || 0,
				},
			];

			analyticsStats.forEach((stat) => {
				const statCard = document.createElement("div");
				statCard.className = "stat-card";

				const statTitle = document.createElement("h4");
				statTitle.textContent = stat.title;

				const statValue = document.createElement("span");
				statValue.className = "stat-value";
				statValue.textContent = String(stat.value);

				statCard.appendChild(statTitle);
				statCard.appendChild(statValue);
				statsGrid.appendChild(statCard);
			});

			statsSection.appendChild(statsGrid);

			// Add last updated
			const lastUpdated = document.createElement("p");
			lastUpdated.className = "last-updated";
			lastUpdated.textContent = `Last Updated: ${new Date(
				this.analyticsData.last_updated
			).toLocaleString()}`;
			statsSection.appendChild(lastUpdated);
		}
	}

	private setupEventListeners(): void {
		// Navigation
		document.querySelectorAll(".nav-btn").forEach((btn) => {
			btn.addEventListener("click", (e) => {
				const target = (e.target as HTMLElement).dataset.target;
				if (target) this.showSection(target);
			});
		});

		// Project management forms
		const addForm = document.getElementById(
			"add-project-form"
		) as HTMLFormElement;
		if (addForm) {
			addForm.addEventListener("submit", (e) => this.handleAddProject(e));
		}

		const pingForm = document.getElementById(
			"ping-project-form"
		) as HTMLFormElement;
		if (pingForm) {
			pingForm.addEventListener("submit", (e) =>
				this.handlePingProject(e)
			);
		}

		// Refresh button
		const refreshBtn = document.getElementById("refresh-btn");
		if (refreshBtn) {
			refreshBtn.addEventListener("click", () => this.refreshData());
		}

		// Token configuration
		const tokenBtn = document.getElementById("config-token-btn");
		if (tokenBtn) {
			tokenBtn.addEventListener("click", () => this.showTokenModal());
		}
	}

	private showSection(sectionId: string): void {
		// Hide all sections
		document.querySelectorAll(".section").forEach((section) => {
			section.classList.add("hidden");
		});

		// Show target section
		const targetSection = document.getElementById(sectionId);
		if (targetSection) {
			targetSection.classList.remove("hidden");
		}

		// Update navigation
		document.querySelectorAll(".nav-btn").forEach((btn) => {
			btn.classList.remove("active");
		});
		document
			.querySelector(`[data-target="${sectionId}"]`)
			?.classList.add("active");
	}

	private async loadProjects(): Promise<void> {
		try {
			this.showMessage("Loading projects...", "info");
			const data = await this.api.loadProjects(true);
			this.displayProjects(Object.values(data.projects));
			this.displayStats(await this.api.getStats());
			this.hideMessage();
		} catch (error) {
			this.showMessage(`Error loading projects: ${error}`, "error");
		}
	}

	private displayProjects(projects: Project[]): void {
		const container = document.getElementById("projects-list");
		if (!container) return;

		if (projects.length === 0) {
			container.innerHTML =
				'<p class="no-projects">No projects found. Add your first project!</p>';
			return;
		}

		// Clear container safely
		container.innerHTML = "";

		// Create projects using utility methods
		projects.forEach((project) => {
			const projectCard = this.createElement("div", "project-card");

			const projectHeader = this.createAndAppend(
				projectCard,
				"div",
				"project-header"
			);
			this.createAndAppend(projectHeader, "h3", undefined, project.name);
			this.createAndAppend(
				projectHeader,
				"span",
				"ping-count",
				`${project.count} pings`
			);

			this.createAndAppend(
				projectCard,
				"p",
				"project-description",
				project.description || ""
			);

			const projectMeta = this.createAndAppend(
				projectCard,
				"div",
				"project-meta"
			);
			this.createAndAppend(
				projectMeta,
				"span",
				undefined,
				`Created: ${this.formatDate(project.created)}`
			);
			this.createAndAppend(
				projectMeta,
				"span",
				undefined,
				`Last ping: ${this.formatDate(project.last_ping)}`
			);

			const projectActions = this.createAndAppend(
				projectCard,
				"div",
				"project-actions"
			);

			// Create action buttons
			const webhookBtn = this.createElement(
				"button",
				"btn-secondary",
				"Get Webhook"
			) as HTMLButtonElement;
			webhookBtn.onclick = () => this.generateWebhook(project.name);

			const editBtn = this.createElement(
				"button",
				"btn-secondary",
				"Edit"
			) as HTMLButtonElement;
			editBtn.onclick = () => this.showUpdateForm(project.name);

			const deleteBtn = this.createElement(
				"button",
				"btn-danger",
				"Delete"
			) as HTMLButtonElement;
			deleteBtn.onclick = () => this.deleteProject(project.name);

			projectActions.appendChild(webhookBtn);
			projectActions.appendChild(editBtn);
			projectActions.appendChild(deleteBtn);

			// Add project URL link if available
			if (project.project_url) {
				const projectLink = this.createElement(
					"a",
					"project-url",
					"View Project"
				) as HTMLAnchorElement;
				projectLink.href = project.project_url;
				projectLink.target = "_blank";
				projectCard.appendChild(projectLink);
			}

			container.appendChild(projectCard);
		});
	}

	private displayStats(stats: any): void {
		const statsContainer = document.getElementById("stats-container");
		if (!statsContainer) return;

		// Clear container safely
		statsContainer.innerHTML = "";

		// Create stats cards using safe DOM methods
		const statsData = [
			{
				title: "Total Projects",
				value: String(stats.totalProjects || 0),
			},
			{ title: "Total Pings", value: String(stats.totalPings || 0) },
			{ title: "Most Active", value: String(stats.mostActive || "None") },
			{
				title: "Last Updated",
				value: this.formatDate(stats.lastUpdated),
			},
		];

		statsData.forEach((statItem) => {
			const statCard = document.createElement("div");
			statCard.className = "stat-card";

			const title = document.createElement("h3");
			title.textContent = statItem.title;

			const value = document.createElement("div");
			value.className = "stat-value";
			value.textContent = statItem.value;

			statCard.appendChild(title);
			statCard.appendChild(value);
			statsContainer.appendChild(statCard);
		});
	}

	private async handleAddProject(e: Event): Promise<void> {
		e.preventDefault();

		if (!this.currentGitHubToken || !this.currentPassword) {
			this.showMessage(
				"Please configure your GitHub token and admin password first.",
				"error"
			);
			return;
		}

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);

		const name = formData.get("name") as string;
		const description = formData.get("description") as string;
		const url = formData.get("url") as string;

		if (!name.trim()) {
			this.showMessage("Project name is required.", "error");
			return;
		}

		try {
			this.showMessage("Adding project...", "info");
			await this.api.addProject(
				name,
				description,
				url,
				this.currentPassword,
				this.currentGitHubToken
			);
			this.showMessage("Project added successfully!", "success");
			form.reset();
			await this.loadProjects();
		} catch (error) {
			this.showMessage(`Error adding project: ${error}`, "error");
		}
	}

	private async handlePingProject(e: Event): Promise<void> {
		e.preventDefault();

		if (!this.currentGitHubToken) {
			this.showMessage(
				"Please configure your GitHub token first.",
				"error"
			);
			return;
		}

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);

		const name = formData.get("project-name") as string;

		if (!name.trim()) {
			this.showMessage("Project name is required.", "error");
			return;
		}

		try {
			this.showMessage("Pinging project...", "info");
			await this.api.pingProject(name, this.currentGitHubToken);
			this.showMessage("Project pinged successfully!", "success");
			form.reset();
			setTimeout(() => this.loadProjects(), 2000); // Wait for GitHub Actions to process
		} catch (error) {
			this.showMessage(`Error pinging project: ${error}`, "error");
		}
	}

	public async deleteProject(projectName: string): Promise<void> {
		if (!confirm(`Are you sure you want to delete "${projectName}"?`)) {
			return;
		}

		if (!this.currentGitHubToken || !this.currentPassword) {
			this.showMessage(
				"Please configure your GitHub token and admin password first.",
				"error"
			);
			return;
		}

		try {
			this.showMessage("Deleting project...", "info");
			await this.api.deleteProject(
				projectName,
				this.currentPassword,
				this.currentGitHubToken
			);
			this.showMessage("Project deleted successfully!", "success");
			await this.loadProjects();
		} catch (error) {
			this.showMessage(`Error deleting project: ${error}`, "error");
		}
	}

	public generateWebhook(projectName: string): void {
		const webhookInfo = this.api.generateWebhookInfo(projectName);
		this.showWebhookModal(webhookInfo);
	}

	private showWebhookModal(webhookInfo: WebhookInfo): void {
		const modal = this.createElement("div", "modal-overlay");
		const modalContent = this.createAndAppend(modal, "div", "modal");

		// Create header
		const header = this.createAndAppend(
			modalContent,
			"div",
			"modal-header"
		);
		this.createAndAppend(header, "h3", undefined, "Webhook Information");

		const closeBtn = this.createElement(
			"button",
			"close-btn",
			"×"
		) as HTMLButtonElement;
		closeBtn.onclick = () => modal.remove();
		header.appendChild(closeBtn);

		// Create body
		const body = this.createAndAppend(modalContent, "div", "modal-body");
		this.createAndAppend(body, "p", undefined, webhookInfo.description);

		// Create webhook fields safely using utility function
		const createField = (
			label: string,
			value: string,
			showCopy = false
		) => {
			const field = this.createElement("div", "webhook-field");
			this.createAndAppend(field, "label", undefined, label + ":");

			const input = document.createElement(
				label === "Headers" || label === "Body" ? "textarea" : "input"
			);
			input.setAttribute("readonly", "true");
			if (input instanceof HTMLInputElement) {
				input.value = value;
			} else {
				input.textContent = value;
			}
			field.appendChild(input);

			if (showCopy) {
				const copyBtn = this.createElement(
					"button",
					"copy-btn",
					"Copy"
				) as HTMLButtonElement;
				copyBtn.onclick = () => navigator.clipboard.writeText(value);
				field.appendChild(copyBtn);
			}

			return field;
		};

		body.appendChild(createField("URL", webhookInfo.url, true));
		body.appendChild(createField("Method", webhookInfo.method));
		body.appendChild(
			createField("Headers", JSON.stringify(webhookInfo.headers, null, 2))
		);
		body.appendChild(createField("Body", webhookInfo.body, true));

		document.body.appendChild(modal);
	}

	private setupTokenModal(): void {
		const modal = document.getElementById("token-modal");
		const form = document.getElementById("token-form") as HTMLFormElement;

		if (form) {
			form.addEventListener("submit", (e) => {
				e.preventDefault();
				const formData = new FormData(form);
				this.currentGitHubToken = formData.get(
					"github-token"
				) as string;
				this.currentPassword = formData.get("admin-password") as string;

				if (this.currentGitHubToken && this.currentPassword) {
					this.showMessage(
						"Configuration saved successfully!",
						"success"
					);
					modal?.classList.add("hidden");
				} else {
					this.showMessage("Please fill in both fields.", "error");
				}
			});
		}
	}

	private showTokenModal(): void {
		const modal = document.getElementById("token-modal");
		if (modal) {
			modal.classList.remove("hidden");
		}
	}

	public showUpdateForm(projectName: string): void {
		// Implementation for update form - would need additional modal
		this.showMessage(
			`Update functionality for "${projectName}" coming soon!`,
			"info"
		);
	}

	private async refreshData(): Promise<void> {
		this.api.refresh();
		await this.loadProjects();
	}

	private showMessage(
		message: string,
		type: "success" | "error" | "info"
	): void {
		const container = document.getElementById("message-container");
		if (!container) return;

		container.innerHTML = `<div class="message ${type}">${message}</div>`;
		container.classList.remove("hidden");
	}

	private hideMessage(): void {
		const container = document.getElementById("message-container");
		if (container) {
			container.classList.add("hidden");
		}
	}

	private formatDate(dateString: string): string {
		return new Date(dateString).toLocaleString();
	}
}

// Global instance for onclick handlers
