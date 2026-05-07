import '@sb/sb-ui-seguros-bolivar-light.min.css';
import '@sb/sb-ui-components.min.js';
import '../css/admin.css';

import { isAuthenticated, login, logout, getUser } from './auth.js';
import { versionStore } from './version-store.js';
import { processMessage } from './chat-engine.js';

let selectMode = false;
let chatOpen = true;
let activeTab = 'chat';
let currentPage = 'home';

const PAGES = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'plans', label: 'Elija un plan', path: '/#step2' },
  { id: 'holder', label: 'Datos titular', path: '/#step3' },
  { id: 'complementary', label: 'Datos complementarios', path: '/#step4' },
  { id: 'confirm', label: 'Confirmar', path: '/#step5' },
  { id: 'payment', label: 'Pagar', path: '/#step6' }
];

function init() {
  const app = document.getElementById('admin-app');
  if (!isAuthenticated()) {
    renderLogin(app);
  } else if (!versionStore.projectId) {
    renderProjectSelector(app);
  } else {
    renderDashboard(app);
  }
}

// ===== PROJECT SELECTOR =====
async function renderProjectSelector(app) {
  const user = getUser();
  const TEMPLATES = [
    { id: 'salud', name: 'Seguro Salud', description: 'Experiencia de compra de seguro de salud complementaria', icon: '🏥' },
    { id: 'hogar', name: 'Seguro Hogar', description: 'Experiencia de compra de seguro de hogar 100% en línea', icon: '🏠' }
  ];

  app.innerHTML = `
    <div class="projects-page">
      <div class="projects-container">
        <div class="projects-header">
          <img src="/images/logo-seguros-bolivar.png" alt="Logo" class="projects-logo">
          <div>
            <h1 class="projects-title">Mis Proyectos</h1>
            <p class="projects-subtitle">👤 ${user.name}</p>
          </div>
          <button class="projects-logout" id="btn-proj-logout">Cerrar sesión</button>
        </div>
        <div class="projects-toolbar">
          <button class="btn-new-project" id="btn-new-project">+ Nuevo proyecto</button>
          <div class="projects-sort">
            <label class="sort-label">Ordenar por:</label>
            <select class="sb-input sb-input--sm" id="sort-projects">
              <option value="updated">Última modificación</option>
              <option value="created">Fecha de creación</option>
              <option value="name">Nombre</option>
            </select>
          </div>
        </div>
        <div class="projects-grid" id="projects-grid">
          <p class="empty-msg">Cargando proyectos...</p>
        </div>
      </div>
    </div>

    <!-- New project modal (Step 1: Name) -->
    <div class="new-project-modal" id="new-project-modal" style="display:none">
      <div class="new-project-card">
        <div id="create-step-1">
          <h2 class="new-project-title">Crear nuevo proyecto</h2>
          <p class="new-project-subtitle">Paso 1 de 2 — Información básica</p>
          <form id="new-project-form-step1">
            <div class="form-group">
              <label class="form-label">Nombre del proyecto</label>
              <input type="text" class="sb-input" id="proj-name" placeholder="Ej: Seguro Hogar v1" required>
            </div>
            <div class="form-group">
              <label class="form-label">Descripción (opcional)</label>
              <input type="text" class="sb-input" id="proj-desc" placeholder="Breve descripción del proyecto">
            </div>
            <div class="new-project-actions">
              <button type="button" class="btn-cancel" id="btn-cancel-project">Cancelar</button>
              <button type="submit" class="btn-create">Siguiente →</button>
            </div>
          </form>
        </div>
        <div id="create-step-2" style="display:none">
          <h2 class="new-project-title">Seleccionar plantilla</h2>
          <p class="new-project-subtitle">Paso 2 de 2 — Elige la experiencia base</p>
          <div class="templates-grid" id="templates-grid">
            ${TEMPLATES.map(t => `
              <div class="template-card ${t.id === 'salud' ? 'selected' : ''}" data-template="${t.id}">
                <span class="template-icon">${t.icon}</span>
                <h3 class="template-name">${t.name}</h3>
                <p class="template-desc">${t.description}</p>
              </div>
            `).join('')}
            <div class="template-card template-card--soon">
              <span class="template-icon">🚗</span>
              <h3 class="template-name">Seguro Autos</h3>
              <p class="template-desc">Próximamente</p>
            </div>
          </div>
          <div class="new-project-actions">
            <button type="button" class="btn-cancel" id="btn-back-step1">← Atrás</button>
            <a href="#" target="_blank" class="btn-preview-template" id="btn-preview-template">👁 Previsualizar</a>
            <button type="button" class="btn-create" id="btn-create-final">Crear proyecto</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete confirmation modal -->
    <div class="delete-modal" id="delete-modal" style="display:none">
      <div class="delete-modal-card">
        <div class="delete-modal-icon">⚠️</div>
        <h2 class="delete-modal-title">¿Eliminar este proyecto?</h2>
        <p class="delete-modal-text">Esta acción no se puede deshacer. Se eliminarán todas las versiones, cambios e imágenes del proyecto.</p>
        <div class="delete-modal-actions">
          <button class="btn-cancel" id="btn-cancel-delete">Cancelar</button>
          <button class="btn-delete-confirm" id="btn-confirm-delete">Sí, eliminar</button>
        </div>
      </div>
    </div>
  `;

  let selectedTemplate = 'salud';
  let deleteTargetId = null;

  // Logout
  document.getElementById('btn-proj-logout').addEventListener('click', () => { logout(); init(); });

  // New project flow
  document.getElementById('btn-new-project').addEventListener('click', () => {
    document.getElementById('new-project-modal').style.display = 'flex';
    document.getElementById('create-step-1').style.display = 'block';
    document.getElementById('create-step-2').style.display = 'none';
  });
  document.getElementById('btn-cancel-project').addEventListener('click', () => {
    document.getElementById('new-project-modal').style.display = 'none';
  });

  // Step 1 → Step 2
  document.getElementById('new-project-form-step1').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!document.getElementById('proj-name').value.trim()) return;
    document.getElementById('create-step-1').style.display = 'none';
    document.getElementById('create-step-2').style.display = 'block';
  });

  // Step 2 → Back to Step 1
  document.getElementById('btn-back-step1').addEventListener('click', () => {
    document.getElementById('create-step-2').style.display = 'none';
    document.getElementById('create-step-1').style.display = 'block';
  });

  // Template selection
  document.querySelectorAll('.template-card:not(.template-card--soon)').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.template-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedTemplate = card.dataset.template;
      // Update preview link based on template
      const previewBtn = document.getElementById('btn-preview-template');
      const port = selectedTemplate === 'hogar' ? 3002 : 3000;
      previewBtn.href = `http://localhost:${port}`;
    });
  });

  // Create final
  document.getElementById('btn-create-final').addEventListener('click', async () => {
    const name = document.getElementById('proj-name').value.trim();
    const desc = document.getElementById('proj-desc').value.trim();
    if (!name) return;
    const btn = document.getElementById('btn-create-final');
    btn.disabled = true;
    btn.textContent = 'Creando...';
    const project = await versionStore.createProject(name, desc + ` [plantilla: ${selectedTemplate}]`, user.email, user.name);
    versionStore.setProject(project.id, selectedTemplate);
    init();
  });

  // Sort
  document.getElementById('sort-projects').addEventListener('change', () => renderProjects());

  // Delete modal
  document.getElementById('btn-cancel-delete').addEventListener('click', () => {
    document.getElementById('delete-modal').style.display = 'none';
    deleteTargetId = null;
  });
  document.getElementById('btn-confirm-delete').addEventListener('click', async () => {
    if (!deleteTargetId) return;
    await versionStore.deleteProject(deleteTargetId);
    document.getElementById('delete-modal').style.display = 'none';
    deleteTargetId = null;
    renderProjects();
  });

  // Load and render projects
  async function renderProjects() {
    const projects = await versionStore.listProjects();
    const grid = document.getElementById('projects-grid');
    const sortBy = document.getElementById('sort-projects').value;

    const sorted = [...projects].sort((a, b) => {
      if (sortBy === 'updated') return new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0);
      if (sortBy === 'created') return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      return (a.name || '').localeCompare(b.name || '');
    });

    if (sorted.length === 0) {
      grid.innerHTML = '<p class="empty-msg">No hay proyectos aún. Crea uno nuevo para empezar.</p>';
      return;
    }

    grid.innerHTML = sorted.map(p => `
      <div class="project-card" data-id="${p.id}">
        <div class="project-card__top-row">
          <div class="project-card__icon">📁</div>
          <button class="project-card__delete" data-id="${p.id}" title="Eliminar">🗑</button>
        </div>
        <div class="project-card__info">
          <h3 class="project-card__name">${p.name}</h3>
          <p class="project-card__meta">${p.description || 'Sin descripción'}</p>
          <p class="project-card__meta">${p.versionCount} versión(es)</p>
          <p class="project-card__date">Modificado: ${p.updatedAt ? new Date(p.updatedAt).toLocaleString('es-CO') : 'N/A'}</p>
          <p class="project-card__url">🔗 localhost:${(p.description || '').includes('[plantilla: hogar]') ? '3002' : '3000'}?project=${p.id}</p>
        </div>
      </div>
    `).join('');

    // Open project
    grid.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.project-card__delete')) return;
        const proj = sorted.find(p => p.id === card.dataset.id);
        const tpl = (proj?.description || '').includes('[plantilla: hogar]') ? 'hogar' : 'salud';
        versionStore.setProject(card.dataset.id, tpl);
        init();
      });
    });

    // Delete buttons
    grid.querySelectorAll('.project-card__delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteTargetId = btn.dataset.id;
        document.getElementById('delete-modal').style.display = 'flex';
      });
    });
  }

  await renderProjects();
}

// ===== LOGIN =====
function renderLogin(app) {
  app.innerHTML = `
    <div class="login-page">
      <div class="login-card">
        <div class="login-inner">
          <div class="login-header">
            <img src="/images/logo-seguros-bolivar.png" alt="Seguros Bolívar" class="login-logo">
            <h1 class="login-title">Simulador de Diseño</h1>
            <p class="login-subtitle">Panel de administración</p>
          </div>
          <form id="login-form" novalidate>
            <div class="form-group">
              <label class="form-label" for="login-email">Correo electrónico</label>
              <input type="email" id="login-email" class="sb-input" placeholder="correo@segurosbolivar.com" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="login-password">Contraseña</label>
              <input type="password" id="login-password" class="sb-input" placeholder="••••••••" required>
            </div>
            <div id="login-error" class="login-error" style="display:none"></div>
            <button type="submit" class="btn-primary-lg">Iniciar sesión</button>
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

// ===== DASHBOARD =====
function renderDashboard(app) {
  const user = getUser();
  const liveUrl = versionStore.getLiveUrl();
  app.innerHTML = `
    <div class="admin-shell">
      <!-- Top toolbar -->
      <header class="toolbar">
        <div class="toolbar__left">
          <button class="toolbar__btn-back" id="btn-back-projects" title="Mis proyectos">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <img src="/images/logo-seguros-bolivar.png" alt="Logo" class="toolbar__logo">
          <div class="toolbar__sep"></div>
          <div class="toolbar-tools">
            <button class="tool-btn" data-tool="select" title="Seleccionar">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 2l5 14 2-5 5-2L3 2z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linejoin="round"/></svg>
            </button>
            <button class="tool-btn" data-tool="text" title="Texto">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 4h12M9 4v11M6 4V3h6v1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            </button>
            <button class="tool-btn" data-tool="rect" title="Rectángulo">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="4" width="14" height="10" rx="1.5" stroke="currentColor" stroke-width="1.5"/></svg>
            </button>
            <button class="tool-btn" data-tool="image" title="Imagen">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="14" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/><circle cx="6.5" cy="6.5" r="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M2 13l4-4 3 3 2-2 5 5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <div class="toolbar__sep"></div>
            <button class="tool-btn" data-tool="undo" title="Deshacer">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 8h8a3 3 0 010 6H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M7 5L4 8l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <button class="tool-btn" data-tool="redo" title="Rehacer">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M14 8H6a3 3 0 000 6h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M11 5l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div>
        </div>
        <div class="toolbar__right">
          <button class="toolbar__btn-preview" id="btn-preview" title="Vista previa">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
            Preview
          </button>
          <span class="toolbar__user">👤 ${user.name}</span>
          <button class="toolbar__btn-apply" id="btn-apply-changes">✓ Aplicar cambios</button>
          <button class="toolbar__btn-chat ${chatOpen ? 'active' : ''}" id="btn-toggle-chat" title="Chat IA">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 3h12a1 1 0 011 1v8a1 1 0 01-1 1H6l-3 3V4a1 1 0 011-1z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
          </button>
          <button class="toolbar__btn-logout" id="btn-logout" title="Salir">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 15H4a1 1 0 01-1-1V4a1 1 0 011-1h3M12 12l3-3-3-3M7 9h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>
      </header>

      <!-- Main area -->
      <div class="admin-main">
        <!-- Preview area -->
        <div class="preview-area">
          <div class="preview-iframe-wrap">
            <iframe id="live-iframe" src="${liveUrl}" class="preview-iframe" title="Vista previa"></iframe>
          </div>
          <!-- Page navigation bar -->
          <div class="page-nav">
            ${PAGES.map(p => `
              <button class="page-nav__btn ${p.id === currentPage ? 'active' : ''}" data-page="${p.id}">${p.label}</button>
            `).join('')}
          </div>
        </div>

        <!-- Chat panel (collapsible) -->
        <aside class="chat-panel ${chatOpen ? 'open' : ''}" id="chat-panel">
          <div class="chat-tabs">
            <button class="chat-tab active" data-tab="chat">Chat</button>
            <button class="chat-tab" data-tab="versions">Versiones</button>
            <button class="chat-tab" data-tab="logs">Logs</button>
          </div>

          <!-- Chat content -->
          <div class="chat-content active" id="tab-chat">
            <div class="chat-messages" id="chat-messages">
              <div class="chat-msg bot">
                <div class="chat-bubble">
                  👋 Hola ${user.name}. Soy tu asistente de diseño. Escribe <strong>ayuda</strong> para ver los comandos.
                </div>
              </div>
            </div>
            <div class="chat-input-area">
              <div class="chat-quick-actions">
                <button class="quick-btn" id="btn-select-mode">🎯 Seleccionar</button>
                <span class="pending-badge" id="pending-count"></span>
              </div>
              <form id="chat-form" class="chat-form">
                <input type="text" id="chat-input" class="sb-input chat-input" placeholder="Escribe un comando..." autocomplete="off">
                <button type="submit" class="chat-send-btn">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 9l14-7-4 7 4 7L2 9z" fill="currentColor"/></svg>
                </button>
              </form>
            </div>
          </div>

          <!-- Versions content -->
          <div class="chat-content" id="tab-versions">
            <div class="panel-scroll" id="versions-list"></div>
          </div>

          <!-- Logs content -->
          <div class="chat-content" id="tab-logs">
            <div class="panel-scroll" id="logs-list"></div>
          </div>
        </aside>
      </div>
    </div>

    <!-- Element Editor Popup -->
    <div class="editor-popup" id="editor-popup" style="display:none">
      <div class="editor-popup__inner">
        <div class="editor-popup__header">
          <span class="editor-popup__title">Editar elemento</span>
          <button class="editor-popup__close" id="editor-close">✕</button>
        </div>
        <div class="editor-popup__body" id="editor-body"></div>
      </div>
    </div>

    <!-- Hidden file input for image uploads -->
    <input type="file" id="image-upload" accept="image/*" style="display:none">

    <!-- Preview modal -->
    <div class="preview-modal" id="preview-modal" style="display:none">
      <div class="preview-modal__header">
        <span class="preview-modal__title">👁 Vista previa — Experiencia Live</span>
        <div class="preview-modal__actions">
          <button class="preview-modal__device active" data-width="100%">🖥 Desktop</button>
          <button class="preview-modal__device" data-width="768px">📱 Tablet</button>
          <button class="preview-modal__device" data-width="375px">📱 Mobile</button>
          <button class="preview-modal__close" id="btn-close-preview">✕ Cerrar</button>
        </div>
      </div>
      <div class="preview-modal__body">
        <iframe id="preview-iframe" class="preview-modal__iframe" src="" title="Preview"></iframe>
      </div>
    </div>
  `;

  bindEvents(user);
}

// ===== EVENT BINDINGS =====
function bindEvents(user) {
  document.getElementById('btn-logout').addEventListener('click', () => { logout(); init(); });
  document.getElementById('btn-toggle-chat').addEventListener('click', toggleChat);
  document.getElementById('btn-apply-changes').addEventListener('click', () => applyChanges(user));
  document.getElementById('btn-back-projects').addEventListener('click', () => {
    versionStore.setProject(null);
    init();
  });
  document.getElementById('btn-refresh')?.addEventListener('click', () => {
    document.getElementById('live-iframe').src = versionStore.getLiveUrl();
  });

  // Chat tabs
  document.querySelectorAll('.chat-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.chat-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.chat-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      activeTab = tab.dataset.tab;
      document.getElementById(`tab-${activeTab}`).classList.add('active');
      if (activeTab === 'versions') renderVersions();
      if (activeTab === 'logs') renderLogs();
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

  // Page navigation - navigate iframe to the correct step
  document.querySelectorAll('.page-nav__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.page-nav__btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentPage = btn.dataset.page;
      const iframe = document.getElementById('live-iframe');
      // Send navigation command to iframe
      const stepMap = { home: 1, plans: 2, holder: 3, complementary: 4, confirm: 5, payment: 6 };
      const step = stepMap[currentPage];
      if (step) {
        iframe.contentWindow.postMessage({ type: 'NAVIGATE_TO_STEP', step }, '*');
        // Re-apply saved changes after navigation
        setTimeout(applySavedChanges, 1500);
      }
    });
  });

  // Toolbar tools
  document.querySelectorAll('.tool-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tool = btn.dataset.tool;
      if (tool === 'select') toggleSelectMode();
      if (tool === 'image') document.getElementById('image-upload').click();
      if (tool === 'text') showTextInsertPopup();
      if (tool === 'undo') {
        document.getElementById('live-iframe').contentWindow.postMessage({ type: 'UNDO_ACTION' }, '*');
      }
      if (tool === 'redo') {
        document.getElementById('live-iframe').contentWindow.postMessage({ type: 'REDO_ACTION' }, '*');
      }
      if (tool === 'undo') document.getElementById('live-iframe').contentWindow.postMessage({ type: 'UNDO' }, '*');
      if (tool === 'redo') document.getElementById('live-iframe').contentWindow.postMessage({ type: 'REDO' }, '*');
    });
  });

  // Image upload
  document.getElementById('image-upload').addEventListener('change', handleImageUpload);

  // Preview
  document.getElementById('btn-preview').addEventListener('click', openPreview);
  document.getElementById('btn-close-preview').addEventListener('click', closePreview);
  document.querySelectorAll('.preview-modal__device').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.preview-modal__device').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('preview-iframe').style.maxWidth = btn.dataset.width;
    });
  });

  // Editor close
  document.getElementById('editor-close').addEventListener('click', () => {
    document.getElementById('editor-popup').style.display = 'none';
  });

  // Listen for iframe messages — register BEFORE iframe loads
  window.addEventListener('message', handleIframeMessage);

  // When iframe loads, apply saved changes and enable edit mode
  const iframe = document.getElementById('live-iframe');
  iframe.addEventListener('load', () => {
    applySavedChanges();
    // Auto-enable edit mode after a delay
    setTimeout(() => {
      iframe.contentWindow.postMessage({ type: 'ENABLE_EDIT_MODE' }, '*');
      selectMode = true;
      const btn = document.getElementById('btn-select-mode');
      if (btn) btn.classList.add('active');
    }, 1500);
  });

  updatePendingCount();
}

// ===== APPLY SAVED CHANGES TO IFRAME =====
async function applySavedChanges() {
  if (!versionStore.projectId) return;
  const versions = await versionStore.getVersions();

  const iframe = document.getElementById('live-iframe');
  // Collect all changes from oldest to newest
  const allChanges = [];
  if (versions.length > 0) {
    [...versions].reverse().forEach(v => {
      (v.changes || []).forEach(c => allChanges.push(c));
    });
  }

  // Also apply any pending changes that haven't been saved yet
  versionStore.getPendingChanges().forEach(c => allChanges.push(c));

  if (allChanges.length === 0) return;

  // Wait for iframe content to render
  setTimeout(() => {
    allChanges.forEach(c => {
      try {
        iframe.contentWindow.postMessage({
          type: 'ADMIN_OVERRIDE',
          selector: c.selector,
          property: c.property,
          value: c.value
        }, '*');
      } catch (e) { /* ignore */ }
    });
    addChatMessage(`📂 Proyecto cargado — ${allChanges.length} cambio(s) aplicados.`, 'bot');
  }, 1000);
}

// ===== PREVIEW =====
function openPreview() {
  const modal = document.getElementById('preview-modal');
  const iframe = document.getElementById('preview-iframe');
  iframe.src = versionStore.getLiveUrl();
  modal.style.display = 'flex';

  // Apply saved changes to preview iframe after it loads
  iframe.addEventListener('load', async function onLoad() {
    iframe.removeEventListener('load', onLoad);
    if (!versionStore.projectId) return;
    const versions = await versionStore.getVersions();
    if (versions.length === 0) return;

    const allChanges = [];
    [...versions].reverse().forEach(v => {
      (v.changes || []).forEach(c => allChanges.push(c));
    });

    // Also add pending changes
    versionStore.getPendingChanges().forEach(c => allChanges.push(c));

    setTimeout(() => {
      allChanges.forEach(c => {
        iframe.contentWindow.postMessage({
          type: 'ADMIN_OVERRIDE',
          selector: c.selector,
          property: c.property,
          value: c.value
        }, '*');
      });
    }, 1000);
  });
}

function closePreview() {
  document.getElementById('preview-modal').style.display = 'none';
}

// ===== CHAT =====
function toggleChat() {
  chatOpen = !chatOpen;
  document.getElementById('chat-panel').classList.toggle('open', chatOpen);
  document.getElementById('btn-toggle-chat').classList.toggle('active', chatOpen);
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
  div.innerHTML = `<div class="chat-bubble">${formatMd(text)}</div>`;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function formatMd(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/##\s(.+)/g, '<h4>$1</h4>')
    .replace(/\n- /g, '<br>• ')
    .replace(/\n/g, '<br>');
}

// ===== IFRAME COMMUNICATION =====
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
  document.getElementById('btn-select-mode').classList.toggle('active', selectMode);
  const iframe = document.getElementById('live-iframe');
  iframe.contentWindow.postMessage({
    type: selectMode ? 'ENABLE_EDIT_MODE' : 'DISABLE_EDIT_MODE'
  }, '*');
  if (selectMode) {
    addChatMessage('🎯 **Modo edición activado.** Clic para seleccionar, doble clic para editar texto, arrastra para mover. Ctrl+Z/Y para deshacer/rehacer.', 'bot');
  }
}

function handleIframeMessage(event) {
  if (!event.data) return;
  if (event.data.type === 'ELEMENT_SELECTED') {
    showElementEditor(event.data);
  }
  if (event.data.type === 'ADMIN_CHANGE') {
    versionStore.addPendingChange({
      action: event.data.action,
      selector: event.data.selector,
      property: event.data.property,
      value: event.data.value,
      description: event.data.description
    });
    updatePendingCount();
  }
  if (event.data.type === 'ADMIN_INFO') {
    addChatMessage(event.data.message, 'bot');
  }
  if (event.data.type === 'EDIT_MODE_CHANGED') {
    selectMode = event.data.active;
    const btn = document.getElementById('btn-select-mode');
    if (btn) btn.classList.toggle('active', selectMode);
    const toolBtn = document.getElementById('btn-toggle-chat');
    // Sync state
  }
}

// ===== TEXT INSERT =====
function showTextInsertPopup() {
  const existing = document.getElementById('text-insert-popup');
  if (existing) { existing.remove(); return; }

  const popup = document.createElement('div');
  popup.id = 'text-insert-popup';
  popup.className = 'text-insert-popup';
  popup.innerHTML = `
    <div class="text-insert-card">
      <h3 class="text-insert-title">Insertar texto</h3>
      <div class="form-group">
        <label class="form-label">Texto</label>
        <input type="text" class="sb-input" id="insert-text-value" placeholder="Escribe aquí..." value="Nuevo texto">
      </div>
      <div class="form-group">
        <label class="form-label">Fuente</label>
        <select class="sb-input" id="insert-text-font">
          <option value="Bolivar, sans-serif">Bolivar (Regular)</option>
          <option value="Bolivar, sans-serif" data-weight="300">Bolivar Light</option>
          <option value="Bolivar, sans-serif" data-weight="600">Bolivar SemiBold</option>
          <option value="Bolivar, sans-serif" data-weight="700">Bolivar Bold</option>
          <option value="Bolivar, sans-serif" data-weight="800">Bolivar ExtraBold</option>
          <option value="Georgia, serif">Georgia</option>
          <option value="Arial, sans-serif">Arial</option>
        </select>
      </div>
      <div style="display:flex;gap:8px;">
        <div class="form-group" style="flex:1">
          <label class="form-label">Tamaño</label>
          <select class="sb-input" id="insert-text-size">
            <option value="12px">12px</option>
            <option value="14px">14px</option>
            <option value="16px" selected>16px</option>
            <option value="18px">18px</option>
            <option value="20px">20px</option>
            <option value="24px">24px</option>
            <option value="28px">28px</option>
            <option value="32px">32px</option>
            <option value="40px">40px</option>
          </select>
        </div>
        <div class="form-group" style="flex:1">
          <label class="form-label">Peso</label>
          <select class="sb-input" id="insert-text-weight">
            <option value="300">Light</option>
            <option value="400" selected>Regular</option>
            <option value="600">SemiBold</option>
            <option value="700">Bold</option>
            <option value="800">ExtraBold</option>
          </select>
        </div>
      </div>
      <div style="display:flex;gap:8px;">
        <div class="form-group" style="flex:1">
          <label class="form-label">Color texto</label>
          <input type="color" class="editor-color" id="insert-text-color" value="#333333">
        </div>
        <div class="form-group" style="flex:1">
          <label class="form-label">Color fondo</label>
          <input type="color" class="editor-color" id="insert-text-bg" value="#ffffff">
        </div>
        <div class="form-group" style="flex:1;display:flex;align-items:flex-end;">
          <label class="text-transparent-label">
            <input type="checkbox" id="insert-text-transparent" checked> Fondo transparente
          </label>
        </div>
      </div>
      <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px;">
        <button class="btn-cancel" id="btn-cancel-text">Cancelar</button>
        <button class="btn-create" id="btn-insert-text">Insertar</button>
      </div>
    </div>
  `;
  document.body.appendChild(popup);

  document.getElementById('btn-cancel-text').addEventListener('click', () => popup.remove());
  document.getElementById('btn-insert-text').addEventListener('click', () => {
    const text = document.getElementById('insert-text-value').value || 'Nuevo texto';
    const font = document.getElementById('insert-text-font').value;
    const size = document.getElementById('insert-text-size').value;
    const weight = document.getElementById('insert-text-weight').value;
    const color = document.getElementById('insert-text-color').value;
    const bg = document.getElementById('insert-text-bg').value;
    const transparent = document.getElementById('insert-text-transparent').checked;

    const iframe = document.getElementById('live-iframe');
    iframe.contentWindow.postMessage({
      type: 'ENTER_TEXT_MODE',
      text,
      fontFamily: font,
      fontSize: size,
      fontWeight: weight,
      color: color,
      backgroundColor: transparent ? 'transparent' : bg
    }, '*');

    // Also enable edit mode
    if (!selectMode) toggleSelectMode();
    popup.remove();
  });
}

// ===== ELEMENT EDITOR =====
function showElementEditor(data) {
  const popup = document.getElementById('editor-popup');
  const body = document.getElementById('editor-body');
  const isImage = data.tagName === 'img' || data.tagName === 'svg';

  body.innerHTML = `
    <div class="editor-field">
      <label class="editor-label">Elemento</label>
      <code class="editor-code">${data.tagName} — ${data.selector.substring(0, 60)}</code>
    </div>

    ${!isImage ? `
    <div class="editor-field">
      <label class="editor-label">Texto</label>
      <input type="text" class="sb-input" id="edit-text" value="${(data.textContent || '').substring(0, 200)}">
    </div>` : ''}

    ${isImage ? `
    <div class="editor-field">
      <label class="editor-label">Reemplazar imagen</label>
      <div class="editor-upload-area" id="upload-area">
        <input type="file" id="edit-image-file" accept="image/*" class="editor-file-input">
        <span class="editor-upload-text">📷 Clic para seleccionar imagen</span>
      </div>
      <div id="image-preview" class="editor-image-preview" style="display:none">
        <img id="preview-img" class="editor-preview-img">
      </div>
    </div>` : ''}

    <div class="editor-field">
      <label class="editor-label">Tamaño rápido</label>
      <div class="editor-size-grid">
        <button class="size-btn" data-w="100%" data-h="auto">Ancho completo</button>
        <button class="size-btn" data-w="50%" data-h="auto">50%</button>
        <button class="size-btn" data-w="auto" data-h="auto">Auto</button>
        <button class="size-btn" data-w="200px" data-h="auto">200px</button>
        <button class="size-btn" data-w="300px" data-h="auto">300px</button>
        <button class="size-btn" data-w="400px" data-h="auto">400px</button>
      </div>
    </div>

    <div class="editor-row">
      <div class="editor-field">
        <label class="editor-label">Ancho</label>
        <input type="text" class="sb-input sb-input--sm" id="edit-width" placeholder="auto">
      </div>
      <div class="editor-field">
        <label class="editor-label">Alto</label>
        <input type="text" class="sb-input sb-input--sm" id="edit-height" placeholder="auto">
      </div>
    </div>

    ${!isImage ? `
    <div class="editor-row">
      <div class="editor-field">
        <label class="editor-label">Color texto</label>
        <input type="color" id="edit-color" value="#333333" class="editor-color">
      </div>
      <div class="editor-field">
        <label class="editor-label">Fondo</label>
        <input type="color" id="edit-bg" value="#ffffff" class="editor-color">
      </div>
      <div class="editor-field">
        <label class="editor-label">Tamaño fuente</label>
        <input type="text" class="sb-input sb-input--sm" id="edit-fontsize" placeholder="16px">
      </div>
    </div>` : ''}

    <div class="editor-row">
      <div class="editor-field">
        <label class="editor-label">Visibilidad</label>
        <select class="sb-input sb-input--sm" id="edit-display">
          <option value="">—</option>
          <option value="none">Ocultar</option>
          <option value="block">Mostrar</option>
        </select>
      </div>
    </div>

    <div class="editor-actions">
      <button class="editor-btn-delete" id="btn-delete-el">🗑 Eliminar</button>
      <button class="editor-btn-apply" id="btn-apply-edit">Aplicar</button>
    </div>
  `;

  popup.style.display = 'flex';

  // Image upload preview
  const fileInput = document.getElementById('edit-image-file');
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const preview = document.getElementById('image-preview');
        const img = document.getElementById('preview-img');
        img.src = ev.target.result;
        preview.style.display = 'block';
        // Store for later use
        fileInput.dataset.dataUrl = ev.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  // Quick size buttons
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('edit-width').value = btn.dataset.w;
      document.getElementById('edit-height').value = btn.dataset.h;
      document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Apply
  document.getElementById('btn-apply-edit').addEventListener('click', async () => {
    const changes = [];
    const width = document.getElementById('edit-width').value;
    const height = document.getElementById('edit-height').value;
    const display = document.getElementById('edit-display').value;
    const textEl = document.getElementById('edit-text');
    const colorEl = document.getElementById('edit-color');
    const bgEl = document.getElementById('edit-bg');
    const fontSizeEl = document.getElementById('edit-fontsize');

    // Text change
    if (textEl && textEl.value !== (data.textContent || '').substring(0, 200)) {
      const cmd = { action: 'changeText', selector: data.selector, property: 'textContent', value: textEl.value, description: `Texto: ${data.tagName}` };
      sendToIframe(cmd); changes.push(cmd);
    }

    // Image replacement
    if (fileInput && fileInput.dataset.dataUrl) {
      const cmd = { action: 'changeImage', selector: data.selector, property: 'src', value: fileInput.dataset.dataUrl, description: `Imagen: ${data.tagName}` };
      sendToIframe(cmd); changes.push(cmd);
      // Store image via API
      await versionStore.storeImage(fileInput.files[0]?.name || 'image', fileInput.dataset.dataUrl);
    }

    // Colors
    if (colorEl && colorEl.value !== '#333333') {
      const cmd = { action: 'changeStyle', selector: data.selector, property: 'color', value: colorEl.value, description: `Color: ${data.tagName}` };
      sendToIframe(cmd); changes.push(cmd);
    }
    if (bgEl && bgEl.value !== '#ffffff') {
      const cmd = { action: 'changeStyle', selector: data.selector, property: 'backgroundColor', value: bgEl.value, description: `Fondo: ${data.tagName}` };
      sendToIframe(cmd); changes.push(cmd);
    }
    if (fontSizeEl && fontSizeEl.value) {
      const cmd = { action: 'changeStyle', selector: data.selector, property: 'fontSize', value: fontSizeEl.value, description: `Tamaño: ${data.tagName}` };
      sendToIframe(cmd); changes.push(cmd);
    }

    // Size
    if (width) {
      const cmd = { action: 'changeStyle', selector: data.selector, property: 'width', value: width, description: `Ancho: ${width}` };
      sendToIframe(cmd); changes.push(cmd);
    }
    if (height) {
      const cmd = { action: 'changeStyle', selector: data.selector, property: 'height', value: height, description: `Alto: ${height}` };
      sendToIframe(cmd); changes.push(cmd);
    }
    if (display) {
      const cmd = { action: 'changeStyle', selector: data.selector, property: 'display', value: display, description: `Visibilidad: ${data.tagName}` };
      sendToIframe(cmd); changes.push(cmd);
    }

    changes.forEach(c => versionStore.addPendingChange(c));
    updatePendingCount();
    popup.style.display = 'none';
    if (changes.length > 0) addChatMessage(`✅ ${changes.length} cambio(s) aplicados.`, 'bot');
  });

  document.getElementById('btn-delete-el').addEventListener('click', () => {
    const cmd = { action: 'changeStyle', selector: data.selector, property: 'display', value: 'none', description: `Eliminar: ${data.tagName}` };
    sendToIframe(cmd);
    versionStore.addPendingChange(cmd);
    updatePendingCount();
    popup.style.display = 'none';
    addChatMessage(`🗑 Elemento eliminado.`, 'bot');
  });
}

// ===== IMAGE UPLOAD =====
function handleImageUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async (ev) => {
    const dataUrl = ev.target.result;
    await versionStore.storeImage(file.name, dataUrl);
    addChatMessage(`📷 Imagen "${file.name}" almacenada en apps/api/data/images.json`, 'bot');
  };
  reader.readAsDataURL(file);
  e.target.value = '';
}

// ===== APPLY CHANGES =====
async function applyChanges(user) {
  const pending = versionStore.getPendingChanges();
  if (pending.length === 0) {
    addChatMessage('ℹ️ No hay cambios pendientes.', 'bot');
    return;
  }

  // Show loading on button
  const btn = document.getElementById('btn-apply-changes');
  const originalText = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<span class="btn-spinner"></span> Guardando...';
  btn.classList.add('saving');

  try {
    const version = await versionStore.applyChanges(user);
    updatePendingCount();

    // Success animation
    btn.innerHTML = '✓ Guardado';
    btn.classList.remove('saving');
    btn.classList.add('saved');

    addChatMessage(`📦 **${version.id}** guardada en proyecto **${versionStore.projectId}**\n📂 Ruta: apps/api/data/projects/${versionStore.projectId}/\n🔗 URL: ${versionStore.getLiveUrl()}`, 'bot');

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
      btn.classList.remove('saved');
    }, 2000);
  } catch (e) {
    btn.innerHTML = '✕ Error';
    btn.classList.remove('saving');
    addChatMessage('❌ Error al guardar. Intenta de nuevo.', 'bot');
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }, 2000);
  }
}

function updatePendingCount() {
  const el = document.getElementById('pending-count');
  if (!el) return;
  const count = versionStore.getPendingChanges().length;
  el.textContent = count > 0 ? count : '';
  el.style.display = count > 0 ? 'inline-flex' : 'none';
}

// ===== VERSIONS & LOGS =====
async function renderVersions() {
  const list = document.getElementById('versions-list');
  const versions = await versionStore.getVersions();
  if (versions.length === 0) { list.innerHTML = '<p class="empty-msg">Sin versiones aún</p>'; return; }
  list.innerHTML = versions.map(v => `
    <div class="version-card">
      <div class="version-card__top"><span class="version-id">${v.id}</span><span class="version-date">${new Date(v.timestamp).toLocaleString('es-CO')}</span></div>
      <div class="version-card__meta">👤 ${v.userName} · ${v.changeCount} cambio(s)</div>
      ${(v.changes || []).map(c => `<div class="version-change">• ${c.description}</div>`).join('')}
    </div>
  `).join('');
}

async function renderLogs() {
  const list = document.getElementById('logs-list');
  const logs = await versionStore.getLogs();
  if (logs.length === 0) { list.innerHTML = '<p class="empty-msg">Sin registros aún</p>'; return; }
  list.innerHTML = `<table class="logs-table">
    <thead><tr><th>Fecha</th><th>Usuario</th><th>Descripción</th></tr></thead>
    <tbody>${logs.map(l => `<tr><td>${new Date(l.timestamp).toLocaleString('es-CO')}</td><td>${l.userName}</td><td>${l.description}</td></tr>`).join('')}</tbody>
  </table>`;
}

document.addEventListener('DOMContentLoaded', init);
