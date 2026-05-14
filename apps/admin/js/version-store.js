const API = 'http://localhost:4001/api';

class VersionStore {
  constructor() {
    // Restore from localStorage on init
    this.projectId = localStorage.getItem('sb_project_id') || null;
    this.template = localStorage.getItem('sb_project_template') || null;
    this.pendingChanges = [];
    if (this.projectId) {
      const saved = localStorage.getItem(`sb_pending_${this.projectId}`);
      if (saved) { try { this.pendingChanges = JSON.parse(saved); } catch { this.pendingChanges = []; } }
    }
  }

  setProject(id, template) {
    this.projectId = id;
    this.pendingChanges = [];
    if (id) {
      localStorage.setItem('sb_project_id', id);
    } else {
      localStorage.removeItem('sb_project_id');
    }
    if (template) {
      this.template = template;
      localStorage.setItem('sb_project_template', template);
    } else if (id) {
      this.template = localStorage.getItem('sb_project_template') || 'salud';
    } else {
      this.template = null;
      localStorage.removeItem('sb_project_template');
    }
    // Load pending changes from localStorage
    if (id) {
      const saved = localStorage.getItem(`sb_pending_${id}`);
      if (saved) { try { this.pendingChanges = JSON.parse(saved); } catch { this.pendingChanges = []; } }
    }
  }

  _savePendingLocal() {
    if (this.projectId) {
      localStorage.setItem(`sb_pending_${this.projectId}`, JSON.stringify(this.pendingChanges));
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
      localStorage.removeItem(`sb_pending_${id}`);
    } catch (e) { console.error('Delete failed:', e); }
  }

  // ===== PENDING =====
  addPendingChange(change) {
    const item = { ...change, timestamp: new Date().toISOString(), id: Date.now().toString(36) + Math.random().toString(36).substr(2, 4) };
    this.pendingChanges.push(item);
    this._savePendingLocal();
    if (this.projectId) {
      fetch(`${this.base}/pending`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(item) }).catch(() => {});
    }
  }

  getPendingChanges() { return [...this.pendingChanges]; }

  // ===== VERSIONS =====
  async applyChanges(user) {
    if (this.pendingChanges.length === 0 || !this.projectId) return null;
    const changesToSave = [...this.pendingChanges];
    try {
      const r = await fetch(`${this.base}/versions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: user.email, userName: user.name, changes: changesToSave })
      });
      const version = await r.json();
      // Save to local versions backup
      this._addLocalVersion({ ...version, changes: changesToSave });
      this.pendingChanges = [];
      this._savePendingLocal();
      return version;
    } catch (e) {
      // API failed — save locally anyway
      const v = { id: `v-local-${Date.now()}`, changeCount: changesToSave.length, timestamp: new Date().toISOString(), changes: changesToSave, userName: user.name };
      this._addLocalVersion(v);
      this.pendingChanges = [];
      this._savePendingLocal();
      return v;
    }
  }

  _addLocalVersion(version) {
    const key = `sb_versions_${this.projectId}`;
    let versions = [];
    try { versions = JSON.parse(localStorage.getItem(key) || '[]'); } catch {}
    versions.unshift(version);
    localStorage.setItem(key, JSON.stringify(versions));
  }

  async getVersions() {
    if (!this.projectId) return [];
    try {
      const r = await fetch(`${this.base}/versions`);
      const apiVersions = await r.json();
      if (apiVersions.length > 0) return apiVersions;
    } catch {}
    // Fallback to local versions
    try { return JSON.parse(localStorage.getItem(`sb_versions_${this.projectId}`) || '[]'); } catch { return []; }
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
