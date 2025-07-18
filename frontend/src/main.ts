/**
 * ActionsCounter - Triple Mode Main Entry Point
 * Secure project tracking using GitHub Actions with multiple storage options
 */

import { UI } from "./ui.js";

// Configuration - Injected during build or auto-detected at runtime
let REPO_OWNER = "__REPO_OWNER_PLACEHOLDER__"; // Will be replaced during GitHub Actions build
let REPO_NAME = "__REPO_NAME_PLACEHOLDER__"; // Will be replaced during GitHub Actions build

// Dynamic repository detection (fallback if placeholders weren't replaced)
function detectRepositoryInfo() {
	// Check if build-time injection worked
	if (REPO_OWNER.startsWith("__") || REPO_NAME.startsWith("__")) {
		console.log("🔄 Build-time injection not detected, using runtime detection...");

		// Method 1: Extract from GitHub Pages URL (username.github.io/repo-name)
		if (window.location.hostname.endsWith('.github.io')) {
			const hostParts = window.location.hostname.split('.');
			if (hostParts.length >= 3 && hostParts[hostParts.length - 2] === 'github') {
				REPO_OWNER = hostParts[0];
				// Extract repo name from pathname
				const pathParts = window.location.pathname.split('/').filter(p => p);
				if (pathParts.length > 0) {
					REPO_NAME = pathParts[0];
				}
				console.log(`📍 Detected from GitHub Pages: ${REPO_OWNER}/${REPO_NAME}`);
				return;
			}
		}

		// Method 2: Extract from custom domain or localhost with meta tags
		const repoMeta = document.querySelector('meta[name="repository"]');
		if (repoMeta) {
			const content = repoMeta.getAttribute('content');
			if (content && content.includes('/')) {
				[REPO_OWNER, REPO_NAME] = content.split('/');
				console.log(`📍 Detected from meta tag: ${REPO_OWNER}/${REPO_NAME}`);
				return;
			}
		}

		// Method 3: Fallback to default values
		REPO_OWNER = "Life-Experimentalist";
		REPO_NAME = "ActionsCounter";
		console.log(`📍 Using fallback values: ${REPO_OWNER}/${REPO_NAME}`);
	} else {
		console.log(`🏗️ Using build-time injected values: ${REPO_OWNER}/${REPO_NAME}`);
	}
}

// Storage mode detection
let storageMode = "unknown";
let analyticsData: any = null;

// Initialize the application
document.addEventListener("DOMContentLoaded", async () => {
	console.log("🚀 ActionsCounter (Triple Mode) starting...");

	// Detect repository information dynamically
	detectRepositoryInfo();

	// Detect storage mode from analytics
	await detectStorageMode();

	// Create global UI instance
	(window as any).ui = new UI(
		REPO_OWNER,
		REPO_NAME,
		storageMode,
		analyticsData
	);

	console.log(
		`✅ ActionsCounter initialized in ${storageMode.toUpperCase()} mode`
	);

	// Show configuration notice if this is the first run
	showConfigurationNotice();
});

async function detectStorageMode() {
	try {
		// Try to fetch analytics from GitHub Variables
		const response = await fetch(
			`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/actions/variables/ANALYTICS_DATA`,
			{
				headers: {
					Accept: "application/vnd.github+json",
					"X-GitHub-Api-Version": "2022-11-28",
				},
			}
		);

		if (response.ok) {
			const variable = await response.json();
			analyticsData = JSON.parse(variable.value);
			storageMode = analyticsData.storage_mode || "unknown";
			console.log(`📊 Storage mode detected: ${storageMode}`);
		} else {
			console.log(
				"⚠️ No analytics data found, defaulting to database mode"
			);
			storageMode = "database";
		}
	} catch (error) {
		console.log(
			"⚠️ Failed to detect storage mode, defaulting to database mode"
		);
		storageMode = "database";
	}
}

function showConfigurationNotice() {
	const hasSeenNotice = localStorage.getItem("hasSeenTripleModeConfigNotice");

	if (!hasSeenNotice) {
		setTimeout(() => {
			const modeDescriptions: { [key: string]: string } = {
				github_variables:
					"🔗 GITHUB VARIABLES - Fast, 48KB limit, perfect for small-medium projects",
				database:
					"🗄️ DATABASE - Unlimited scale, external PostgreSQL, best for large projects",
				repository_commits:
					"📁 REPOSITORY COMMITS - Git-based, creates commits, good for demos",
			};

			const currentModeDesc =
				modeDescriptions[storageMode] || "❓ UNKNOWN MODE";

			alert(`🔧 ActionsCounter Triple Mode Configuration

This system supports three storage modes:

� GITHUB VARIABLES MODE (STORAGE_MODE=1)
- Stores data in GitHub Repository Variables
- Fast access, 48KB limit per variable
- Perfect for small to medium projects
- No commits, no external dependencies

🗄️ DATABASE MODE (STORAGE_MODE=2)
- External PostgreSQL database storage
- Unlimited scale and performance
- Best for large, active projects
- Requires database setup

📁 REPOSITORY COMMITS MODE (STORAGE_MODE=3)
- GitHub repository JSON files with commits
- Simple setup, full Git history
- Good for demos and small projects
- Creates commits for each change

Current Mode: ${currentModeDesc}

To configure your ActionsCounter:
1. Set repository secrets (ADMIN_PASSWORD, PAT_TOKEN)
2. Set STORAGE_MODE repository variable: 1, 2, or 3
3. Enable GitHub Pages in repository settings

Repository auto-detected as: ${REPO_OWNER}/${REPO_NAME}

Click "Configure Tokens" to get started!`);

			localStorage.setItem("hasSeenTripleModeConfigNotice", "true");
		}, 1000);
	}
}
