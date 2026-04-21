import '@sb/sb-ui-seguros-bolivar-light.min.css';
import '@sb/sb-ui-components.min.js';
import '../css/admin.css';

import { isAuthenticated, login, logout, getUser } from './auth.js';
import { versionStore } from './version-store.js';
import { processMessage } from './chat-engine.js';

let selectMode = false;
let activePanel = 'chat';

function init() {
  const app = document.getElementById('admin-app');
  if (!isAuthenticated()) {
    renderLogin(app);
  } else {
    renderDashboard(app);
  }
}

function renderLogin(app) {
  app.innerHTML = `
    <div class="login-page">
      <div class="login-card sb-ui-card">
        <div class="sb-ui-card__body">
          <div class="login-header">
            <span class="login-logo">🛡️</span>
            <h1 class="login-title">Admin Simulador</h1>
            <p class="login-subtitle">Seguros Bolívar - Panel de administración</p>
          </div>
          <form id="login-form" novalidate>
            <div class="form-group">
              <label class="form-label" for="login-email">Correo electrónico</label>
              <input type="email" id="login-email" class="sb-ui-input" placeholder="correo@segurosbolivar.com" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="login-password">Contraseña</label>
              <input type="password" id="login-password" class="sb-ui-input" placeholder="••••••••" required>
            </div>
            <div id="login-error" class="login-error" style="display:none"></div>
            <button type="submit" class="sb-ui-button sb-ui-button--primary sb-ui-button--fill login-btn">
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  `;

  document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const result = login(email, password);
    if (result.success) {
      init();
    } else {
      const errEl = document.getElementById('login-error');
      errEl.textContent = result.error;
      errEl.style.display = 'block';
    }
  });
}

function renderDashboard(app) {
  const user = getUser();
  app.innerHTML = `
    <div class="admin-layout">
      <header class="admin-header">
        <div class="admin-header-left">
          <span class="admin-logo">🛡️</span>
          <span class="admin-title">Simulador de Diseño</span>
        </div>
        <div class="admin-header-center">
          <button class="tab-btn active" data-panel="chat">💬 Chat</button>
          <button class="tab-btn" data-panel="versions">📦 Versiones</button>
          <button class="tab-btn" data-panel="logs">📋 Logs</button>
        </div>
        <div class="admin-header-right">
          <span class="admin-user">👤 ${user.name}</span>
          <button class="sb-ui-button sb-ui-button--secondary sb-ui-button--small" id="btn-logout">Salir</button>
        </div>
      </header>

      <div class="admin-body">
        <div class="admin-sidebar" id="admin-sidebar">
          <!-- Chat Panel -->
          <div class="panel-content active" id="panel-chat">
            <div class="chat-messages" id="chat-messages">
              <div class="chat-msg bot">
                <div class="chat-bubble">
                  👋 ¡Hola ${user.name}! Soy tu asistente de diseño. Puedo ayudarte a modificar la vista del front en tiempo real.<br><br>
                  Escribe <strong>ayuda</strong> para ver los comandos disponibles, o haz clic en <strong>"Seleccionar elemento"</strong> para editar visualmente.
                </div>
              </div>
            </div>
            <div class="chat-input-area">
              <div class="chat-actions-bar">
                <button class="chat-action-btn" id="btn-select-mode" title="Seleccionar elemento">🎯 Seleccionar</button>
                <button class="chat-action-btn" id="btn-apply" title="Aplicar cambios pendientes">✅ Aplicar cambios</button>
                <span class="pending-count" id="pending-count"></span>
              </div>
              <form id="chat-form" class="chat-form">
                <input type="text" id="chat-input" class="sb-ui-input chat-input" placeholder="Escribe un comando o pregunta..." autocomplete="off">
                <button type="submit" class="sb-ui-button sb-ui-button--primary sb-ui-button--fill chat-send">Enviar</button>
              </form>
            </div>
          </div>

          <!-- Versions Panel -->
          <div class="panel-content" id="panel-versions">
            <h3 class="panel-title">📦 Historial de versiones</h3>
            <div id="versions-list" class="versions-list"></div>
          </div>

          <!-- Logs Panel -->
          <div class="panel-content" id="panel-logs">
            <h3 class="panel-title">📋 Control de cambios</h3>
            <div id="logs-list" class="logs-list"></div>
          </div>
        </div>

        <div class="admin-preview">
          <div class="preview-toolbar">
            <span class="preview-label">Vista previa del Front Live</span>
            <button class="sb-ui-button sb-ui-button--secondary sb-ui-button--small" id="btn-refresh">🔄 Recargar</button>
          </div>
          <iframe id="live-iframe" src="http://localhost:3000" class="live-iframe" title="Vista previa del front"></iframe>
        </div>
      </div>
    </div>

    <!-- Element Editor Modal -->
    <div class="editor-modal" id="editor-modal" style="display:none">
      <div class="editor-modal-content sb-ui-card">
        <div class="editor-modal-header">
          <h3>Editar elemento</h3>
          <button class="editor-close" id="editor-close">&times;</button>
        </div>
        <div class="sb-ui-card__body" id="editor-body"></div>
      </div>
    </div>
  `;

  // Event listeners
  document.getElementById('btn-logout').addEventListener('click', () => { logout(); init(); });
  document.getElementById('btn-refresh').addEventListener('click', () => {
    document.getElementById('live-iframe').src = 'http://localhost:3000';
  });

  // Tab switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.panel-content').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      activePanel = btn.dataset.panel;
      document.getElementById(`panel-${activePanel}`).classList.add('active');
      if (activePanel === 'versions') renderVersions();
      if (activePanel === 'logs') renderLogs();
    });
  });

  // Chat form
  document.getElementById('chat-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('chat-input');
    const msg = input.value.trim();
    if (!msg) return;
    input.value = '';
    handleChatMessage(msg);
  });

  // Select mode
  document.getElementById('btn-select-mode').addEventListener('click', toggleSelectMode);

  // Apply changes
  document.getElementById('btn-apply').addEventListener('click', applyChanges);

  // Editor modal close
  document.getElementById('editor-close').addEventListener('click', () => {
    document.getElementById('editor-modal').style.display = 'none';
  });

  // Listen for messages from iframe (element selection)
  window.addEventListener('message', handleIframeMessage);

  updatePendingCount();
}

function handleChatMessage(msg) {
  addChatMessage(msg, 'user');
  const result = processMessage(msg);

  if (result.type === 'command') {
    sendToIframe(result.command);
    versionStore.addPendingChange(result.command);
    updatePendingCount();
  } else if (result.type === 'select-mode') {
    toggleSelectMode();
  }

  setTimeout(() => addChatMessage(result.response, 'bot'), 300);
}

function addChatMessage(text, sender) {
  const container = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = `chat-msg ${sender}`;
  div.innerHTML = `<div class="chat-bubble">${formatMarkdown(text)}</div>`;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function formatMarkdown(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/##\s(.+)/g, '<h4>$1</h4>')
    .replace(/\n- /g, '<br>• ')
    .replace(/\n/g, '<br>');
}

function sendToIframe(command) {
  const iframe = document.getElementById('live-iframe');
  iframe.contentWindow.postMessage({
    type: 'ADMIN_OVERRIDE',
    selector: command.selector,
    property: command.property,
    value: command.value
  }, '*');
}

function toggleSelectMode() {
  selectMode = !selectMode;
  const btn = document.getElementById('btn-select-mode');
  btn.classList.toggle('active', selectMode);

  const iframe = document.getElementById('live-iframe');
  iframe.contentWindow.postMessage({
    type: selectMode ? 'ENABLE_SELECT_MODE' : 'DISABLE_SELECT_MODE'
  }, '*');

  if (selectMode) {
    addChatMessage('🎯 **Modo selección activado.** Haz clic en un elemento de la vista previa para editarlo.', 'bot');
  }
}

function handleIframeMessage(event) {
  if (event.data && event.data.type === 'ELEMENT_SELECTED') {
    selectMode = false;
    document.getElementById('btn-select-mode').classList.remove('active');
    showElementEditor(event.data);
  }
}

function showElementEditor(data) {
  const modal = document.getElementById('editor-modal');
  const body = document.getElementById('editor-body');

  body.innerHTML = `
    <div class="editor-info">
      <p><strong>Elemento:</strong> <code>${data.tagName}</code></p>
      <p><strong>Selector:</strong> <code>${data.selector}</code></p>
      <p><strong>Texto actual:</strong> ${data.textContent ? data.textContent.substring(0, 100) : '(vacío)'}</p>
    </div>
    <div class="editor-fields">
      <div class="form-group">
        <label class="form-label">Nuevo texto</label>
        <input type="text" class="sb-ui-input" id="edit-text" value="${(data.textContent || '').substring(0, 200)}">
      </div>
      <div class="form-group">
        <label class="form-label">Color de texto</label>
        <input type="color" id="edit-color" value="#333333" class="color-input">
      </div>
      <div class="form-group">
        <label class="form-label">Color de fondo</label>
        <input type="color" id="edit-bg" value="#ffffff" class="color-input">
      </div>
      <div class="form-group">
        <label class="form-label">Tamaño de fuente</label>
        <input type="text" class="sb-ui-input" id="edit-fontsize" placeholder="16px">
      </div>
      <div class="form-group">
        <label class="form-label">Visibilidad</label>
        <select class="sb-ui-input" id="edit-display">
          <option value="">Sin cambio</option>
          <option value="none">Ocultar</option>
          <option value="block">Mostrar (block)</option>
          <option value="flex">Mostrar (flex)</option>
        </select>
      </div>
    </div>
    <div class="editor-actions">
      <button class="sb-ui-button sb-ui-button--primary sb-ui-button--fill" id="btn-apply-edit">Aplicar al preview</button>
    </div>
  `;

  modal.style.display = 'flex';

  document.getElementById('btn-apply-edit').addEventListener('click', () => {
    const changes = [];
    const text = document.getElementById('edit-text').value;
    const color = document.getElementById('edit-color').value;
    const bg = document.getElementById('edit-bg').value;
    const fontSize = document.getElementById('edit-fontsize').value;
    const display = document.getElementById('edit-display').value;

    if (text !== (data.textContent || '').substring(0, 200)) {
      const cmd = { action: 'changeText', selector: data.selector, property: 'textContent', value: text, description: `Cambiar texto de ${data.tagName}` };
      sendToIframe(cmd);
      changes.push(cmd);
    }
    if (color !== '#333333') {
      const cmd = { action: 'changeStyle', selector: data.selector, property: 'color', value: color, description: `Cambiar color de ${data.tagName}` };
      sendToIframe(cmd);
      changes.push(cmd);
    }
    if (bg !== '#ffffff') {
      const cmd = { action: 'changeStyle', selector: data.selector, property: 'backgroundColor', value: bg, description: `Cambiar fondo de ${data.tagName}` };
      sendToIframe(cmd);
      changes.push(cmd);
    }
    if (fontSize) {
      const cmd = { action: 'changeStyle', selector: data.selector, property: 'fontSize', value: fontSize, description: `Cambiar tamaño de ${data.tagName}` };
      sendToIframe(cmd);
      changes.push(cmd);
    }
    if (display) {
      const cmd = { action: 'changeStyle', selector: data.selector, property: 'display', value: display, description: `Cambiar visibilidad de ${data.tagName}` };
      sendToIframe(cmd);
      changes.push(cmd);
    }

    changes.forEach(c => versionStore.addPendingChange(c));
    updatePendingCount();
    modal.style.display = 'none';

    if (changes.length > 0) {
      addChatMessage(`✅ Se aplicaron ${changes.length} cambio(s) al preview. Presiona "Aplicar cambios" para guardarlos.`, 'bot');
    }
  });
}

function applyChanges() {
  const pending = versionStore.getPendingChanges();
  if (pending.length === 0) {
    addChatMessage('ℹ️ No hay cambios pendientes para aplicar.', 'bot');
    return;
  }

  const user = getUser();
  const version = versionStore.applyChanges(user);
  updatePendingCount();
  addChatMessage(`📦 **Versión ${version.id} guardada** con ${version.changeCount} cambio(s).\nUsuario: ${user.name}\nFecha: ${new Date(version.timestamp).toLocaleString('es-CO')}`, 'bot');
}

function updatePendingCount() {
  const el = document.getElementById('pending-count');
  if (!el) return;
  const count = versionStore.getPendingChanges().length;
  el.textContent = count > 0 ? `${count} pendiente(s)` : '';
  el.style.display = count > 0 ? 'inline' : 'none';
}

function renderVersions() {
  const list = document.getElementById('versions-list');
  const versions = versionStore.getVersions();

  if (versions.length === 0) {
    list.innerHTML = '<p class="empty-state">No hay versiones guardadas aún.</p>';
    return;
  }

  list.innerHTML = versions.map(v => `
    <div class="version-item sb-ui-card">
      <div class="version-header">
        <span class="version-id">${v.id}</span>
        <span class="version-date">${new Date(v.timestamp).toLocaleString('es-CO')}</span>
      </div>
      <div class="version-meta">
        <span>👤 ${v.userName}</span>
        <span>📝 ${v.changeCount} cambio(s)</span>
      </div>
      <div class="version-changes">
        ${v.changes.map(c => `<div class="version-change">• ${c.description}</div>`).join('')}
      </div>
    </div>
  `).join('');
}

function renderLogs() {
  const list = document.getElementById('logs-list');
  const logs = versionStore.getLogs();

  if (logs.length === 0) {
    list.innerHTML = '<p class="empty-state">No hay registros de cambios aún.</p>';
    return;
  }

  list.innerHTML = `
    <table class="logs-table">
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Usuario</th>
          <th>Acción</th>
          <th>Descripción</th>
          <th>Versión</th>
        </tr>
      </thead>
      <tbody>
        ${logs.map(l => `
          <tr>
            <td>${new Date(l.timestamp).toLocaleString('es-CO')}</td>
            <td>${l.userName}</td>
            <td><span class="sb-ui-badge sb-ui-badge--info">${l.action}</span></td>
            <td>${l.description}</td>
            <td>${l.versionId}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

document.addEventListener('DOMContentLoaded', init);
