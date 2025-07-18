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
	 * Enhanced utility function to create DOM elements with optional class and text content
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
	 * Enhanced utility function to create and append child elements
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

	/**
	 * Enhanced modal creation with animations and improved styling
	 */
	private createModal(
		title: string,
		width: string = "600px"
	): {
		modal: HTMLElement;
		header: HTMLElement;
		body: HTMLElement;
		close: () => void;
	} {
		const modal = this.createElement("div", "modal-overlay");
		const modalContent = this.createAndAppend(modal, "div", "modal");
		modalContent.style.maxWidth = width;

		// Create header
		const header = this.createAndAppend(
			modalContent,
			"div",
			"modal-header"
		);
		this.createAndAppend(header, "h3", undefined, title);

		const closeBtn = this.createElement(
			"button",
			"close-btn",
			"×"
		) as HTMLButtonElement;
		header.appendChild(closeBtn);

		// Create body
		const body = this.createAndAppend(modalContent, "div", "modal-body");

		// Enhanced close functionality with animations
		const close = () => {
			modal.classList.remove("show");
			setTimeout(() => {
				if (modal.parentNode) {
					modal.parentNode.removeChild(modal);
				}
			}, 300); // Match CSS transition duration
		};

		// Event handlers
		closeBtn.onclick = close;
		modal.addEventListener("click", (e) => {
			if (e.target === modal) {
				close();
			}
		});

		// ESC key support
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				close();
				document.removeEventListener("keydown", handleKeyDown);
			}
		};
		document.addEventListener("keydown", handleKeyDown);

		// Show modal with animation
		document.body.appendChild(modal);
		requestAnimationFrame(() => {
			modal.classList.add("show");
		});

		return { modal, header, body, close };
	}

	private async init(): Promise<void> {
		this.setupEventListeners();
		await this.loadProjects();
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

	/**
	 * Redirect user to GitHub Actions for manual CRUD operations
	 */
	private redirectToGitHubActions(
		action: string,
		projectName?: string
	): void {
		const actionsUrl = `https://github.com/${this.api.getRepoOwner()}/${this.api.getRepoName()}/actions/workflows/handle-projects-dual.yml`;

		// Store operation details in localStorage for user reference
		const operationDetails = {
			action,
			projectName: projectName || "",
			timestamp: new Date().toISOString(),
		};
		localStorage.setItem(
			"pendingOperation",
			JSON.stringify(operationDetails)
		);

		// Show instructions modal
		this.showActionInstructions(action, projectName, actionsUrl);
	}

	/**
	 * Enhanced show instructions for GitHub Actions operations with better styling
	 */
	private showActionInstructions(
		action: string,
		projectName: string | undefined,
		actionsUrl: string
	): void {
		const { body, close } = this.createModal(
			`${action} Project - GitHub Actions`,
			"600px"
		);

		const instructions = this.createAndAppend(body, "div", "");
		instructions.innerHTML = `
			<p><strong>To ${action.toLowerCase()} ${
			projectName ? `"${projectName}"` : "a project"
		}, follow these steps:</strong></p>
			<ol style="text-align: left; margin: 15px 0; padding-left: 20px;">
				<li style="margin-bottom: 8px;">Click "Go to GitHub Actions" below</li>
				<li style="margin-bottom: 8px;">Click the "Run workflow" button</li>
				<li style="margin-bottom: 8px;">Select action: "<strong>${action}</strong>"</li>
				${
					projectName
						? `<li style="margin-bottom: 8px;">Enter project name: "<strong>${projectName}</strong>"</li>`
						: '<li style="margin-bottom: 8px;">Enter the project name</li>'
				}
				<li style="margin-bottom: 8px;">Enter your admin password (from repository secrets)</li>
				<li style="margin-bottom: 8px;">Click "Run workflow"</li>
			</ol>
			<div style="background: #e0f2fe; border: 1px solid #0288d1; border-radius: 8px; padding: 12px; margin: 15px 0;">
				<p style="margin: 0; color: #01579b; font-size: 14px;"><strong>🔐 Security:</strong> The operation will be performed securely using your repository secrets.</p>
			</div>
		`;

		const buttonContainer = this.createAndAppend(
			body,
			"div",
			"modal-actions"
		);

		const cancelBtn = this.createAndAppend(
			buttonContainer,
			"button",
			"btn btn-secondary",
			"Cancel"
		) as HTMLButtonElement;
		const actionBtn = this.createAndAppend(
			buttonContainer,
			"button",
			"btn btn-primary",
			"Go to GitHub Actions"
		) as HTMLButtonElement;

		// Event handlers
		cancelBtn.addEventListener("click", close);

		actionBtn.addEventListener("click", () => {
			window.open(actionsUrl, "_blank");
			close();
		});
	}

	private async handleAddProject(e: Event): Promise<void> {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);

		const name = formData.get("name") as string;

		if (!name.trim()) {
			this.showMessage("Project name is required.", "error");
			return;
		}

		// Redirect to GitHub Actions for secure operation
		this.redirectToGitHubActions("add", name);
		form.reset();
	}

	private async handlePingProject(e: Event): Promise<void> {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);

		const name = formData.get("project-name") as string;

		if (!name.trim()) {
			this.showMessage("Project name is required.", "error");
			return;
		}

		// Redirect to GitHub Actions for secure operation
		this.redirectToGitHubActions("ping", name);
		form.reset();
	}

	public async deleteProject(projectName: string): Promise<void> {
		if (!confirm(`Are you sure you want to delete "${projectName}"?`)) {
			return;
		}

		// Redirect to GitHub Actions for secure operation
		this.redirectToGitHubActions("remove", projectName);
	}

	public generateWebhook(projectName: string): void {
		const webhookInfo = this.api.generateWebhookInfo(projectName);
		this.showWebhookModal(webhookInfo);
	}

	private showWebhookModal(webhookInfo: WebhookInfo): void {
		const { body, close } = this.createModal(
			"🔗 Webhook Information",
			"700px"
		);

		// Description
		const description = this.createAndAppend(
			body,
			"p",
			undefined,
			webhookInfo.description
		);
		description.style.marginBottom = "24px";
		description.style.padding = "16px";
		description.style.backgroundColor = "#f0f9ff";
		description.style.border = "1px solid #0ea5e9";
		description.style.borderRadius = "8px";
		description.style.color = "#0c4a6e";

		// Create webhook fields safely using utility function
		const createField = (
			label: string,
			value: string,
			showCopy = false
		) => {
			const field = this.createElement("div", "webhook-field");
			field.style.marginBottom = "20px";

			const labelElement = this.createAndAppend(
				field,
				"label",
				undefined,
				label + ":"
			);
			labelElement.style.fontWeight = "600";
			labelElement.style.marginBottom = "8px";
			labelElement.style.display = "block";
			labelElement.style.color = "var(--primary-color)";

			const inputContainer = this.createElement("div");
			inputContainer.style.display = "flex";
			inputContainer.style.alignItems = "stretch";
			inputContainer.style.gap = "8px";

			const input = document.createElement(
				label === "Headers" || label === "Body" ? "textarea" : "input"
			);
			input.setAttribute("readonly", "true");
			input.style.fontFamily =
				"'Monaco', 'Menlo', 'Ubuntu Mono', monospace";
			input.style.fontSize = "13px";
			input.style.flex = "1";
			input.style.border = "2px solid var(--border-color)";
			input.style.borderRadius = "6px";
			input.style.padding = "12px";
			input.style.backgroundColor = "#f8fafc";

			if (input instanceof HTMLInputElement) {
				input.value = value;
			} else {
				input.textContent = value;
				(input as HTMLTextAreaElement).rows = 4;
			}
			inputContainer.appendChild(input);

			if (showCopy) {
				const copyBtn = this.createElement(
					"button",
					"btn btn-primary",
					"📋 Copy"
				) as HTMLButtonElement;
				copyBtn.style.minWidth = "80px";
				copyBtn.onclick = () => {
					navigator.clipboard.writeText(value).then(() => {
						const originalText = copyBtn.textContent;
						copyBtn.textContent = "✅ Copied!";
						copyBtn.style.backgroundColor = "var(--success-color)";
						setTimeout(() => {
							copyBtn.textContent = originalText;
							copyBtn.style.backgroundColor = "";
						}, 2000);
					});
				};
				inputContainer.appendChild(copyBtn);
			}

			field.appendChild(inputContainer);
			return field;
		};

		// Create fields
		body.appendChild(createField("URL", webhookInfo.url, true));
		body.appendChild(createField("Method", webhookInfo.method));
		body.appendChild(
			createField(
				"Headers",
				JSON.stringify(webhookInfo.headers, null, 2),
				true
			)
		);
		body.appendChild(createField("Body", webhookInfo.body, true));

		// Action buttons
		const actions = this.createAndAppend(body, "div", "modal-actions");
		const closeBtn = this.createAndAppend(
			actions,
			"button",
			"btn btn-secondary",
			"Close"
		) as HTMLButtonElement;
		const testBtn = this.createAndAppend(
			actions,
			"button",
			"btn btn-primary",
			"🧪 Test Webhook"
		) as HTMLButtonElement;

		closeBtn.onclick = close;
		testBtn.onclick = () => {
			this.testWebhook(webhookInfo);
		};
	}

	private testWebhook(webhookInfo: WebhookInfo): void {
		const { body, close } = this.createModal("🧪 Testing Webhook", "500px");

		const status = this.createAndAppend(
			body,
			"div",
			undefined,
			"🔄 Sending test request..."
		);
		status.style.padding = "16px";
		status.style.textAlign = "center";
		status.style.marginBottom = "20px";

		// Send test request
		fetch(webhookInfo.url, {
			method: webhookInfo.method,
			headers: webhookInfo.headers,
			body: webhookInfo.body,
		})
			.then((response) => {
				if (response.ok) {
					status.innerHTML = `
					<div style="color: var(--success-color); font-weight: 600;">
						✅ Webhook test successful!
					</div>
					<div style="font-size: 14px; margin-top: 8px; color: #6b7280;">
						Response: ${response.status} ${response.statusText}
					</div>
				`;
				} else {
					status.innerHTML = `
					<div style="color: var(--error-color); font-weight: 600;">
						❌ Webhook test failed
					</div>
					<div style="font-size: 14px; margin-top: 8px; color: #6b7280;">
						Response: ${response.status} ${response.statusText}
					</div>
				`;
				}
			})
			.catch((error) => {
				status.innerHTML = `
				<div style="color: var(--error-color); font-weight: 600;">
					❌ Network error
				</div>
				<div style="font-size: 14px; margin-top: 8px; color: #6b7280;">
					${error.message}
				</div>
			`;
			});

		const actions = this.createAndAppend(body, "div", "modal-actions");
		const closeBtn = this.createAndAppend(
			actions,
			"button",
			"btn btn-primary",
			"Close"
		) as HTMLButtonElement;
		closeBtn.onclick = close;
	}

	public showUpdateForm(projectName: string): void {
		// Redirect to GitHub Actions for secure operation
		this.redirectToGitHubActions("update", projectName);
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
