/**
 * ActionsCounter Dashboard UI
 * Modern, clean, and robust. Connects to GitHub Actions via repository_dispatch events.
 */

const defaultConfig = {
  repo: "Life-Experimentalist/ActionsCounter",
  pat: "", // User must provide
  password: "", // User must provide
};

let config = { ...defaultConfig };

function setConfig(newConfig: Partial<typeof defaultConfig>) {
  config = { ...config, ...newConfig };
  localStorage.setItem("actionsCounterConfig", JSON.stringify(config));
}

function getConfig() {
  return config;
}

function loadConfig() {
  const saved = localStorage.getItem("actionsCounterConfig");
  if (saved) {
    setConfig(JSON.parse(saved));
  }
}

// --- UI Elements ---
const root = document.getElementById("app") || document.body;

function renderConfigForm() {
  return `
    <section class="config-section">
      <h2>GitHub Actions Connection</h2>
      <label>Repository (owner/repo): <input id="repo-input" value="${config.repo}" /></label><br/>
      <label>PAT Token: <input id="pat-input" type="password" value="${config.pat}" /></label><br/>
      <label>Admin Password: <input id="password-input" type="password" value="${config.password}" /></label><br/>
      <button id="save-config">Save Config</button>
    </section>
  `;
}

function getWebhookUrl(projectName: string, password: string) {
  // Example webhook URL (customize as needed)
  const { repo } = getConfig();
  return `https://api.github.com/repos/${repo}/dispatches?project_name=${encodeURIComponent(
    projectName
  )}&password=${encodeURIComponent(password)}`;
}

let storageMode: number = 1;

async function fetchStorageMode() {
  const { repo, pat } = getConfig();
  if (!repo || !pat) return 1;
  const [owner, repoName] = repo.split("/");
  const url = `https://api.github.com/repos/${owner}/${repoName}/actions/variables/STORAGE_MODE`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${pat}`,
      Accept: "application/vnd.github+json",
    },
  });
  if (!res.ok) return 1;
  const data = await res.json();
  const mode = parseInt(data.value || "1", 10);
  storageMode = isNaN(mode) ? 1 : mode;
  return storageMode;
}

function renderDashboard() {
  return `
    <section class="dashboard-section">
      <h2>ActionsCounter Dashboard</h2>
      <div>Storage Mode: <b id="storage-mode-label">Loading...</b></div>
      <button id="refresh-projects">Refresh Projects</button>
      <div id="projects-list"></div>
      <h3>Add Project</h3>
      <form id="add-project-form">
        <input name="project_name" placeholder="Project Name" required />
        <input name="description" placeholder="Description" />
        <input name="url" placeholder="URL" />
        <button type="submit">Add</button>
      </form>
    </section>
  `;
}

async function fetchProjects() {
  await fetchStorageMode();
  if (storageMode === 1) {
    // GitHub Variables
    const { repo, pat } = getConfig();
    if (!repo || !pat) return [];
    const [owner, repoName] = repo.split("/");
    const url = `https://api.github.com/repos/${owner}/${repoName}/actions/variables/PROJECTS_DATA`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${pat}`,
        Accept: "application/vnd.github+json",
      },
    });
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.value) return [];
    try {
      const decoded = atob(data.value);
      const json = JSON.parse(decoded);
      return Object.entries(json.projects || {});
    } catch {
      return [];
    }
  } else if (storageMode === 2) {
    // Database mode (placeholder)
    showMessage("Database mode: UI integration not implemented.", "error");
    return [];
  } else if (storageMode === 3) {
    showMessage(
      "Repository Commits mode is not supported in the UI yet.",
      "error"
    );
    return [];
  }
  return [];
}

async function updateStorageModeLabel() {
  const label = document.getElementById("storage-mode-label");
  await fetchStorageMode();
  if (label) {
    let modeText = "Unknown";
    if (storageMode === 1) modeText = "GitHub Variables";
    else if (storageMode === 2) modeText = "Database";
    else if (storageMode === 3) modeText = "Repository Commits";
    label.textContent = modeText;
  }
}

function showMessage(msg: string, type: "info" | "success" | "error" = "info") {
  const el = document.getElementById("messages");
  if (el) {
    el.innerHTML = `<div class="msg ${type}">${msg}</div>`;
    setTimeout(() => {
      el.innerHTML = "";
    }, 5000);
  }
}

function promptPassword(): Promise<string | null> {
  return new Promise((resolve) => {
    const pw = prompt("Enter admin password for this action:");
    resolve(pw);
  });
}

function sanitize(str: string): string {
  return str.replace(
    /[&<>'"`]/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
        "`": "&#96;",
      }[c] || c)
  );
}

function render() {
  const root = document.getElementById("app") || document.body;
  root.innerHTML = `
    <div class="actions-counter-ui">
      ${renderConfigForm()}
      ${renderDashboard()}
      <div id="messages"></div>
    </div>
  `;
}

// --- Event Handlers ---
function setupHandlers() {
  document.getElementById("save-config")?.addEventListener("click", () => {
    setConfig({
      repo: (document.getElementById("repo-input") as HTMLInputElement).value,
      pat: (document.getElementById("pat-input") as HTMLInputElement).value,
      password: (document.getElementById("password-input") as HTMLInputElement)
        .value,
    });
    showMessage("Config saved!", "success");
    render();
    setupHandlers();
    updateStorageModeLabel();
    updateProjectsList();
  });

  document
    .getElementById("refresh-projects")
    ?.addEventListener("click", async () => {
      await updateProjectsList();
    });

  document
    .getElementById("add-project-form")
    ?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const project_name = formData.get("project_name") as string;
      const description = formData.get("description") as string;
      const url = formData.get("url") as string;
      await triggerAction("add", { project_name, description, url });
      await updateProjectsList();
      form.reset();
    });
}

async function updateProjectsList() {
  const list = document.getElementById("projects-list");
  if (!list) return;
  list.innerHTML = "Loading...";
  const projects = await fetchProjects();
  if (!projects.length) {
    list.innerHTML = "<em>No projects found.</em>";
    return;
  }
  list.innerHTML =
    "<ul>" +
    projects
      .map(
        ([name, data]: [string, any]) =>
          `<li><b>${sanitize(name)}</b> (count: ${sanitize(
            String((data as any).count)
          )})<br/>${sanitize((data as any).description || "")}<br/>${sanitize(
            (data as any).url || ""
          )}<br/>
      <button class="copy-webhook" data-project="${sanitize(
        name
      )}">Copy Webhook</button>
      <button class="increment-project" data-project="${sanitize(
        name
      )}">+</button>
      <button class="decrement-project" data-project="${sanitize(
        name
      )}">-</button>
      <button class="remove-project" data-project="${sanitize(
        name
      )}">Remove</button>
    </li>`
      )
      .join("") +
    "</ul>";

  // Attach event handlers for project actions
  document.querySelectorAll(".copy-webhook").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const project = (e.target as HTMLElement).getAttribute("data-project")!;
      const pw = await promptPassword();
      if (!pw) return showMessage("Password required.", "error");
      const { password } = getConfig();
      if (pw !== password) return showMessage("Incorrect password.", "error");
      const url = getWebhookUrl(project, pw);
      navigator.clipboard.writeText(url);
      showMessage("Webhook URL copied!", "success");
    });
  });
  document.querySelectorAll(".increment-project").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const project = (e.target as HTMLElement).getAttribute("data-project")!;
      const pw = await promptPassword();
      if (!pw) return showMessage("Password required.", "error");
      await triggerAction("increment", { project_name: project, password: pw });
      await updateProjectsList();
    });
  });
  document.querySelectorAll(".decrement-project").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const project = (e.target as HTMLElement).getAttribute("data-project")!;
      const pw = await promptPassword();
      if (!pw) return showMessage("Password required.", "error");
      await triggerAction("decrement", { project_name: project, password: pw });
      await updateProjectsList();
    });
  });
  document.querySelectorAll(".remove-project").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const project = (e.target as HTMLElement).getAttribute("data-project")!;
      const pw = await promptPassword();
      if (!pw) return showMessage("Password required.", "error");
      if (!confirm(`Are you sure you want to remove project '${project}'?`))
        return;
      await triggerAction("remove", { project_name: project, password: pw });
      await updateProjectsList();
    });
  });
}

// --- Init ---
document.addEventListener("DOMContentLoaded", async () => {
  loadConfig();
  render();
  setupHandlers();
  await updateStorageModeLabel();
  updateProjectsList();
});

async function triggerAction(action: string, params: any) {
  await fetchStorageMode();
  if (storageMode !== 1) {
    showMessage(
      "Only GitHub Variables mode is supported for actions in the UI.",
      "error"
    );
    return;
  }
  const { repo, pat, password } = getConfig();
  if (!repo || !pat) {
    showMessage("Repository and PAT must be set in config.", "error");
    return;
  }
  const [owner, repoName] = repo.split("/");
  let event_type = action;
  let client_payload: any = { ...params };
  if (!client_payload.password) client_payload.password = password;
  // Map UI actions to event types if needed
  if (action === "add") event_type = "add";
  if (action === "increment") event_type = "increment";
  if (action === "decrement") event_type = "decrement";
  if (action === "remove") event_type = "remove";
  try {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repoName}/dispatches`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${pat}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ event_type, client_payload }),
      }
    );
    if (!res.ok) {
      const err = await res.text();
      showMessage(`GitHub API error: ${res.status} - ${err}`, "error");
      return;
    }
    showMessage(`Action '${action}' triggered successfully!`, "success");
  } catch (e: any) {
    showMessage(`Error: ${e.message || e}`, "error");
  }
}
