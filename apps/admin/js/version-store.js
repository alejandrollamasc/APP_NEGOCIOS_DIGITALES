const API = 'http://localhost:4001/api';

class VersionStore {
  constructor() {
    this.projectId = null;
    this.pendingChanges = [];
    this.template = null;
  }

  setProject(id, template) {
    this.projectId = id;
    this.pendingChanges = [];
    if (template) {
      this.template = template;
      localStorage.setItem('sb_project_template', template);
    } else if (id) {
      this.template = localStorage.getItem('sb_project_template') || 'salud';
    } else {
      this.template = null;
      localStorage.removeItem('sb_project_template');
    }
  }

  get base() { return `${API}/projects/${this.projectId}`; }

  getLiveUrl() {
    const port = this.template === 'hogar' ? 3002 : 3000;
    return `http://localhost:${port}?project=${this.projectId}`;
  }

  // ===== PROJECTS =====
  async listProjects() {
    try { const r = await fetch(`${API}/projects`); return await r.json(); } catch { return []; }
  }

  async createProject(name, description, user, userName) {
    const r = await fetch(`${API}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, user, userName })
    });
    return await r.json();
  }

  async deleteProject(id) {
    try {
      await fetch(`${API}/projects/${id}`, { method: 'DELETE' });
    } catch (e) { console.error('Delete failed:', e); }
  }

  // ===== PENDING =====
  addPendingChange(change) {
    const item = { ...change, timestamp: new Date().toISOString(), id: Date.now().toString(36) + Math.random().toString(36).substr(2, 4) };
    this.pendingChanges.push(item);
    if (this.projectId) {
      fetch(`${this.base}/pending`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(item) }).catch(() => {});
    }
  }

  getPendingChanges() { return [...this.pendingChanges]; }

  // ===== VERSIONS =====
  async applyChanges(user) {
    if (this.pendingChanges.length === 0 || !this.projectId) return null;
    try {
      const r = await fetch(`${this.base}/versions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: user.email, userName: user.name, changes: [...this.pendingChanges] })
      });
      const version = await r.json();
      this.pendingChanges = [];
      return version;
    } catch (e) {
      const v = { id: `v-local-${Date.now()}`, changeCount: this.pendingChanges.length, timestamp: new Date().toISOString() };
      this.pendingChanges = [];
      return v;
    }
  }

  async getVersions() {
    if (!this.projectId) return [];
    try { const r = await fetch(`${this.base}/versions`); return await r.json(); } catch { return []; }
  }

  async getLogs() {
    if (!this.projectId) return [];
    try { const r = await fetch(`${this.base}/logs`); return await r.json(); } catch { return []; }
  }

  async storeImage(name, data) {
    if (!this.projectId) return;
    try {
      await fetch(`${this.base}/images`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, data }) });
    } catch (e) { console.error('Image store failed:', e); }
  }

  async getProjectMeta() {
    if (!this.projectId) return null;
    try { const r = await fetch(`${this.base}`); return await r.json(); } catch { return null; }
  }
}

export const versionStore = new VersionStore();
