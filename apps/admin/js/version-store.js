const VERSIONS_KEY = 'sb_admin_versions';
const LOGS_KEY = 'sb_admin_logs';

class VersionStore {
  constructor() {
    this.versions = this._loadVersions();
    this.logs = this._loadLogs();
    this.pendingChanges = [];
  }

  _loadVersions() {
    try {
      return JSON.parse(localStorage.getItem(VERSIONS_KEY)) || [];
    } catch {
      return [];
    }
  }

  _loadLogs() {
    try {
      return JSON.parse(localStorage.getItem(LOGS_KEY)) || [];
    } catch {
      return [];
    }
  }

  _saveVersions() {
    localStorage.setItem(VERSIONS_KEY, JSON.stringify(this.versions));
  }

  _saveLogs() {
    localStorage.setItem(LOGS_KEY, JSON.stringify(this.logs));
  }

  addPendingChange(change) {
    this.pendingChanges.push({
      ...change,
      timestamp: new Date().toISOString(),
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).substr(2)
    });
  }

  getPendingChanges() {
    return [...this.pendingChanges];
  }

  clearPending() {
    this.pendingChanges = [];
  }

  applyChanges(user) {
    if (this.pendingChanges.length === 0) return null;

    const version = {
      id: `v${this.versions.length + 1}`,
      number: this.versions.length + 1,
      timestamp: new Date().toISOString(),
      user: user.email,
      userName: user.name,
      changes: [...this.pendingChanges],
      changeCount: this.pendingChanges.length
    };

    this.versions.unshift(version);
    this._saveVersions();

    // Log each change
    this.pendingChanges.forEach(change => {
      this.logs.unshift({
        id: change.id,
        versionId: version.id,
        timestamp: change.timestamp,
        user: user.email,
        userName: user.name,
        action: change.action || 'modify',
        selector: change.selector,
        property: change.property,
        oldValue: change.oldValue || '',
        newValue: change.newValue || change.value,
        description: change.description || `Modificó ${change.property} en ${change.selector}`
      });
    });
    this._saveLogs();

    this.pendingChanges = [];
    return version;
  }

  getVersions() {
    return [...this.versions];
  }

  getLogs() {
    return [...this.logs];
  }

  getVersion(id) {
    return this.versions.find(v => v.id === id);
  }

  revertToVersion(versionId) {
    const idx = this.versions.findIndex(v => v.id === versionId);
    if (idx >= 0) {
      this.versions = this.versions.slice(idx);
      this._saveVersions();
      return true;
    }
    return false;
  }
}

export const versionStore = new VersionStore();
