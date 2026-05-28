import '@sb/sb-ui-seguros-bolivar-light.min.css';
import '@sb/sb-ui-components.min.js';
import '../css/admin.css';

import { isAuthenticated, login, logout, getUser } from './auth.js';
import { versionStore } from './version-store.js';

// ===== STATE =====
let selectMode = true;
let currentPage = 'home';
let panelOpen = true;
let activeTab = 'design';
let undoStack = [];
let redoStack = [];
let projectName = '';
let showGuide = false;
let guideStep = 0;

const DEFAULT_PAGES_HOGAR = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'step1', label: 'Datos personales', path: '/?step=1' },
  { id: 'step2', label: 'Info vivienda', path: '/?step=2' },
  { id: 'step3', label: 'Arme su plan', path: '/?step=3' },
  { id: 'step4', label: 'Resumen', path: '/?step=4' },
  { id: 'step5', label: 'Validación', path: '/?step=5' },
  { id: 'step6', label: 'Bienvenida', path: '/?step=6' }
];

const DEFAULT_PAGES_SALUD = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'step1', label: 'Elija un plan', path: '/?step=1' },
  { id: 'step2', label: 'Datos titular', path: '/?step=2' },
  { id: 'step3', label: 'Datos complementarios', path: '/?step=3' },
  { id: 'step4', label: 'Confirmar', path: '/?step=4' },
  { id: 'step5', label: 'Pagar', path: '/?step=5' }
];

let PAGES = [];

const FONTS = [
  { name: 'Roboto Condensed', value: "'Roboto Condensed', sans-serif" },
  { name: 'Bolivar', value: "'Bolivar', sans-serif" },
  { name: 'Bolivar Light', value: "'Bolivar', sans-serif", weight: '300' },
  { name: 'Bolivar Bold', value: "'Bolivar', sans-serif", weight: '700' },
  { name: 'Arial', value: "Arial, sans-serif" },
  { name: 'Georgia', value: "Georgia, serif" }
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
    if (result.success) { init(); }
    else { const errEl = document.getElementById('login-error'); errEl.textContent = result.error; errEl.style.display = 'block'; }
  });
}

// ===== PROJECT SELECTOR =====
async function renderProjectSelector(app) {
  const user = getUser();
  const TEMPLATES = [
    { id: 'salud', name: 'Seguro Salud', description: 'Experiencia de compra de seguro de salud', icon: '🏥' },
    { id: 'hogar', name: 'Seguro Hogar', description: 'Experiencia de compra de seguro de hogar', icon: '🏠' }
  ];
  app.innerHTML = `
    <div class="projects-page">
      <div class="projects-container">
        <div class="projects-header">
          <img src="/images/logo-seguros-bolivar.png" alt="Logo" class="projects-logo">
          <div><h1 class="projects-title">Mis Proyectos</h1><p class="projects-subtitle">👤 ${user.name}</p></div>
          <button class="projects-logout" id="btn-proj-logout">Cerrar sesión</button>
        </div>
        <div class="projects-toolbar">
          <button class="btn-new-project" id="btn-new-project">+ Nuevo proyecto</button>
          <div class="projects-sort"><label class="sort-label">Ordenar por:</label>
            <select class="sb-input sb-input--sm" id="sort-projects"><option value="updated">Última modificación</option><option value="created">Fecha de creación</option><option value="name">Nombre</option></select>
          </div>
        </div>
        <div class="projects-grid" id="projects-grid"><p class="empty-msg">Cargando...</p></div>
      </div>
    </div>
    <div class="new-project-modal" id="new-project-modal" style="display:none">
      <div class="new-project-card">
        <div id="create-step-1">
          <h2 class="new-project-title">Crear nuevo proyecto</h2>
          <p class="new-project-subtitle">Paso 1 de 2 — Información básica</p>
          <form id="new-project-form-step1">
            <div class="form-group"><label class="form-label">Nombre del proyecto</label><input type="text" class="sb-input" id="proj-name" placeholder="Ej: Seguro Hogar v1" required></div>
            <div class="form-group"><label class="form-label">Descripción (opcional)</label><input type="text" class="sb-input" id="proj-desc" placeholder="Breve descripción"></div>
            <div class="new-project-actions"><button type="button" class="btn-cancel" id="btn-cancel-project">Cancelar</button><button type="submit" class="btn-create">Siguiente →</button></div>
          </form>
        </div>
        <div id="create-step-2" style="display:none">
          <h2 class="new-project-title">Seleccionar plantilla</h2>
          <p class="new-project-subtitle">Paso 2 de 2 — Elige la experiencia base</p>
          <div class="templates-grid" id="templates-grid">
            ${TEMPLATES.map(t => `<div class="template-card ${t.id === 'salud' ? 'selected' : ''}" data-template="${t.id}"><span class="template-icon">${t.icon}</span><h3 class="template-name">${t.name}</h3><p class="template-desc">${t.description}</p></div>`).join('')}
          </div>
          <div class="new-project-actions"><button type="button" class="btn-cancel" id="btn-back-step1">← Atrás</button><button type="button" class="btn-create" id="btn-create-final">Crear proyecto</button></div>
        </div>
      </div>
    </div>
    <div class="delete-modal" id="delete-modal" style="display:none"><div class="delete-modal-card"><div class="delete-modal-icon">⚠️</div><h2 class="delete-modal-title">¿Eliminar este proyecto?</h2><p class="delete-modal-text">Esta acción no se puede deshacer.</p><div class="delete-modal-actions"><button class="btn-cancel" id="btn-cancel-delete">Cancelar</button><button class="btn-delete-confirm" id="btn-confirm-delete">Sí, eliminar</button></div></div></div>
  `;
  let selectedTemplate = 'salud';
  let deleteTargetId = null;
  document.getElementById('btn-proj-logout').addEventListener('click', () => { logout(); init(); });
  document.getElementById('btn-new-project').addEventListener('click', () => { document.getElementById('new-project-modal').style.display = 'flex'; document.getElementById('create-step-1').style.display = 'block'; document.getElementById('create-step-2').style.display = 'none'; });
  document.getElementById('btn-cancel-project').addEventListener('click', () => { document.getElementById('new-project-modal').style.display = 'none'; });
  document.getElementById('new-project-form-step1').addEventListener('submit', (e) => { e.preventDefault(); if (!document.getElementById('proj-name').value.trim()) return; document.getElementById('create-step-1').style.display = 'none'; document.getElementById('create-step-2').style.display = 'block'; });
  document.getElementById('btn-back-step1').addEventListener('click', () => { document.getElementById('create-step-2').style.display = 'none'; document.getElementById('create-step-1').style.display = 'block'; });
  document.querySelectorAll('.template-card').forEach(card => { card.addEventListener('click', () => { document.querySelectorAll('.template-card').forEach(c => c.classList.remove('selected')); card.classList.add('selected'); selectedTemplate = card.dataset.template; }); });
  document.getElementById('btn-create-final').addEventListener('click', async () => {
    const name = document.getElementById('proj-name').value.trim();
    const desc = document.getElementById('proj-desc').value.trim();
    if (!name) return;
    const btn = document.getElementById('btn-create-final'); btn.disabled = true; btn.textContent = 'Creando...';
    const project = await versionStore.createProject(name, desc + ` [plantilla: ${selectedTemplate}]`, user.email, user.name);
    versionStore.setProject(project.id, selectedTemplate);
    showGuide = true; guideStep = 0;
    init();
  });
  document.getElementById('sort-projects').addEventListener('change', () => renderProjects());
  document.getElementById('btn-cancel-delete').addEventListener('click', () => { document.getElementById('delete-modal').style.display = 'none'; deleteTargetId = null; });
  document.getElementById('btn-confirm-delete').addEventListener('click', async () => { if (!deleteTargetId) return; await versionStore.deleteProject(deleteTargetId); document.getElementById('delete-modal').style.display = 'none'; deleteTargetId = null; renderProjects(); });

  async function renderProjects() {
    const projects = await versionStore.listProjects();
    const grid = document.getElementById('projects-grid');
    const sortBy = document.getElementById('sort-projects').value;
    const sorted = [...projects].sort((a, b) => { if (sortBy === 'updated') return new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0); if (sortBy === 'created') return new Date(b.createdAt || 0) - new Date(a.createdAt || 0); return (a.name || '').localeCompare(b.name || ''); });
    if (sorted.length === 0) { grid.innerHTML = '<p class="empty-msg">No hay proyectos. Crea uno nuevo.</p>'; return; }
    grid.innerHTML = sorted.map(p => `<div class="project-card" data-id="${p.id}"><div class="project-card__top-row"><div class="project-card__icon">📁</div><div style="display:flex;gap:4px;"><button class="project-card__duplicate" data-id="${p.id}" title="Duplicar proyecto">📋</button><button class="project-card__delete" data-id="${p.id}" title="Eliminar">🗑</button></div></div><div class="project-card__info"><h3 class="project-card__name">${p.name}</h3><p class="project-card__meta">${p.description || ''}</p><p class="project-card__meta">${p.versionCount || 0} versión(es)</p><p class="project-card__date">Modificado: ${p.updatedAt ? new Date(p.updatedAt).toLocaleString('es-CO') : 'N/A'}</p></div></div>`).join('');
    grid.querySelectorAll('.project-card').forEach(card => { card.addEventListener('click', (e) => { if (e.target.closest('.project-card__delete') || e.target.closest('.project-card__duplicate')) return; const proj = sorted.find(p => p.id === card.dataset.id); const tpl = (proj?.description || '').includes('[plantilla: hogar]') ? 'hogar' : 'salud'; versionStore.setProject(card.dataset.id, tpl); init(); }); });
    grid.querySelectorAll('.project-card__delete').forEach(btn => { btn.addEventListener('click', (e) => { e.stopPropagation(); deleteTargetId = btn.dataset.id; document.getElementById('delete-modal').style.display = 'flex'; }); });
    grid.querySelectorAll('.project-card__duplicate').forEach(btn => { btn.addEventListener('click', (e) => { e.stopPropagation(); duplicateProject(btn.dataset.id); }); });
  }
  await renderProjects();

  async function duplicateProject(sourceId) {
    const name = prompt('Nombre para la copia del proyecto:');
    if (!name || !name.trim()) return;

    try {
      const r = await fetch(`http://localhost:4001/api/projects/${sourceId}/duplicate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), user: user.email, userName: user.name })
      });
      if (r.ok) {
        alert('✅ Proyecto duplicado exitosamente.');
        renderProjects();
      } else {
        alert('❌ Error al duplicar el proyecto.');
      }
    } catch { alert('❌ Error de conexión.'); }
  }
}

// ===== DASHBOARD =====
async function renderDashboard(app) {
  const user = getUser();
  const liveUrl = versionStore.getLiveUrl();
  const meta = await versionStore.getProjectMeta();
  projectName = meta?.name || 'Proyecto';

  app.innerHTML = `
    <div class="admin-shell">
      <header class="toolbar">
        <div class="toolbar__left">
          <button class="toolbar__btn-back" id="btn-back-projects" title="Mis proyectos">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <img src="/images/logo-seguros-bolivar.png" alt="Logo" class="toolbar__logo">
          <div class="toolbar__sep"></div>
          <span class="toolbar__project-name" id="project-name">${projectName}</span>
          <div class="toolbar__sep"></div>
          <div class="toolbar-tools">
            <button class="tool-btn active" data-tool="select" title="Seleccionar/Mover (V)"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 2l5 14 2-5 5-2L3 2z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linejoin="round"/></svg></button>
            <button class="tool-btn" data-tool="text" title="Texto (T)"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 4h12M9 4v11M6 4V3h6v1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button>
            <button class="tool-btn" data-tool="rect" title="Figura (R)"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="4" width="14" height="10" rx="1.5" stroke="currentColor" stroke-width="1.5"/></svg></button>
            <button class="tool-btn" data-tool="image" title="Imagen (I)"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="14" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/><circle cx="6.5" cy="6.5" r="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M2 13l4-4 3 3 2-2 5 5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
            <button class="tool-btn" data-tool="form" title="Campo formulario (F)"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="5" width="14" height="8" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M5 9h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button>
            <div class="toolbar__sep"></div>
            <button class="tool-btn" data-tool="undo" title="Deshacer (Ctrl+Z)"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 8h8a3 3 0 010 6H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M7 5L4 8l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
            <button class="tool-btn" data-tool="redo" title="Rehacer (Ctrl+Y)"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M14 8H6a3 3 0 000 6h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M11 5l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          </div>
        </div>
        <div class="toolbar__right">
          <button class="toolbar__btn-preview" id="btn-preview" title="Vista previa"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" stroke="currentColor" stroke-width="1.5" fill="none"/></svg> Preview</button>
          <div class="toolbar__device-toggle" id="device-toggle">
            <button class="toolbar__device-btn active" data-device="desktop" title="Desktop">🖥</button>
            <button class="toolbar__device-btn" data-device="mobile" title="Mobile">📱</button>
          </div>
          <button class="toolbar__btn-grid ${true ? 'active' : ''}" id="btn-grid" title="Grid de guía">⊞</button>
          <span class="toolbar__user">👤 ${user.name}</span>
          <button class="toolbar__btn-apply" id="btn-apply-changes">💾 Guardar progreso</button>
          <button class="toolbar__btn-export" id="btn-export" title="Exportar para desarrolladores">📤 Exportar</button>
          <button class="toolbar__btn-panel" id="btn-toggle-panel" title="Ocultar/Mostrar panel">☰</button>
          <button class="toolbar__btn-logout" id="btn-logout" title="Salir"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 15H4a1 1 0 01-1-1V4a1 1 0 011-1h3M12 12l3-3-3-3M7 9h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        </div>
      </header>
      <div class="admin-main">
        <aside class="left-panel ${panelOpen ? 'open' : ''}" id="left-panel">
          <div class="left-panel__tabs">
            <button class="left-panel__tab ${activeTab === 'design' ? 'active' : ''}" data-tab="design" title="Diseño"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M3 8h14M8 8v9" stroke="currentColor" stroke-width="1.5"/></svg></button>
            <button class="left-panel__tab ${activeTab === 'elements' ? 'active' : ''}" data-tab="elements" title="Elementos"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.5"/><path d="M10 7v6M7 10h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button>
            <button class="left-panel__tab ${activeTab === 'images' ? 'active' : ''}" data-tab="images" title="Imágenes"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="16" height="16" rx="2" stroke="currentColor" stroke-width="1.5"/><circle cx="7" cy="7" r="2" stroke="currentColor" stroke-width="1.2"/><path d="M2 14l5-5 4 4 3-3 4 4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg></button>
            <button class="left-panel__tab ${activeTab === 'versions' ? 'active' : ''}" data-tab="versions" title="Versiones"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 4v12h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 13l3-4 3 2 4-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
            <button class="left-panel__tab ${activeTab === 'logs' ? 'active' : ''}" data-tab="logs" title="Historial"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 5h12M4 10h12M4 15h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button>
            <button class="left-panel__tab ${activeTab === 'flow' ? 'active' : ''}" data-tab="flow" title="Flujo de navegación"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 4h4v4H4zM12 4h4v4h-4zM8 14h4v4H8z" stroke="currentColor" stroke-width="1.5"/><path d="M6 8v3h4M14 8v3h-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          </div>
          <div class="left-panel__content">
            <div class="left-panel__section ${activeTab === 'design' ? 'active' : ''}" id="section-design">
              <h3 class="left-panel__title">Diseño</h3>
              <div class="left-panel__tools">
                <button class="left-panel__tool-btn active" id="btn-select-mode"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 1l4 12 2-4 4-2L2 1z" stroke="currentColor" stroke-width="1.2" fill="none"/></svg> Seleccionar / Mover</button>
                <button class="left-panel__tool-btn" data-action="duplicate"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="10" height="10" rx="1.5" stroke="currentColor" stroke-width="1.2"/><rect x="5" y="1" width="10" height="10" rx="1.5" stroke="currentColor" stroke-width="1.2"/></svg> Duplicar selección</button>
                <button class="left-panel__tool-btn" data-action="delete"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 4h10M5 4V3h6v1M6 7v5M10 7v5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg> Eliminar selección</button>
              </div>
              <div class="left-panel__divider"></div>
              <h4 class="left-panel__subtitle">Efectos</h4>
              <div class="left-panel__effects">
                <button class="left-panel__effect-btn" data-effect="shadow">🌑 Sombra</button>
                <button class="left-panel__effect-btn" data-effect="opacity">👁 Translúcido</button>
                <button class="left-panel__effect-btn" data-effect="front">⬆ Al frente</button>
                <button class="left-panel__effect-btn" data-effect="back">⬇ Atrás</button>
                <button class="left-panel__effect-btn" data-effect="layer-up">↑ Una capa</button>
                <button class="left-panel__effect-btn" data-effect="layer-down">↓ Una capa</button>
              </div>
              <div class="left-panel__divider"></div>
              <h4 class="left-panel__subtitle">Colores rápidos</h4>
              <div class="left-panel__colors">
                <input type="color" id="quick-color" value="#016D38" class="left-panel__color-picker" title="Color del elemento">
                <button class="left-panel__tool-btn" data-action="eyedropper" title="Igualar color"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13 3l-1-1-8 8-1 3 3-1 8-8-1-1z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg> Cuentagotas</button>
              </div>
              <div class="left-panel__divider"></div>
              <div class="left-panel__pending"><span class="left-panel__pending-label">Cambios pendientes:</span><span class="left-panel__pending-count" id="pending-count">0</span></div>
              <div class="left-panel__divider"></div>
              <h4 class="left-panel__subtitle">Añadir páginas base</h4>
              <p class="left-panel__hint" style="margin-bottom:8px;">Agregue páginas del diseño base original al proyecto.</p>
              <div class="left-panel__tools" id="add-pages-list"></div>
            </div>
            <div class="left-panel__section ${activeTab === 'elements' ? 'active' : ''}" id="section-elements">
              <h3 class="left-panel__title">Elementos</h3>
              <div class="left-panel__tools">
                <button class="left-panel__tool-btn" data-action="insert-text"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 3h12M8 3v10M5 3V2h6v1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg> Texto libre</button>
                <button class="left-panel__tool-btn" data-action="insert-rect"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="4" width="12" height="8" rx="1" stroke="currentColor" stroke-width="1.2"/></svg> Rectángulo</button>
                <button class="left-panel__tool-btn" data-action="insert-circle"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.2"/></svg> Círculo</button>
                <button class="left-panel__tool-btn" data-action="insert-line"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 14L14 2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg> Línea</button>
                <button class="left-panel__tool-btn" data-action="upload-image"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="14" height="14" rx="2" stroke="currentColor" stroke-width="1.2"/><path d="M5 11l3-4 3 4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg> Subir imagen</button>
                <button class="left-panel__tool-btn" data-action="insert-modal"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="10" rx="2" stroke="currentColor" stroke-width="1.2"/><path d="M2 6h12" stroke="currentColor" stroke-width="1.2"/></svg> Modal / Stepper</button>
              </div>
              <div class="left-panel__divider"></div>
              <h4 class="left-panel__subtitle">Campos de formulario</h4>
              <div class="left-panel__tools">
                <button class="left-panel__tool-btn" data-action="form-text"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="5" width="14" height="6" rx="1.5" stroke="currentColor" stroke-width="1.2"/></svg> Texto libre</button>
                <button class="left-panel__tool-btn" data-action="form-select"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="5" width="14" height="6" rx="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M10 7l2 2 2-2" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg> Desplegable</button>
                <button class="left-panel__tool-btn" data-action="form-date"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M2 6h12M5 1v3M11 1v3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg> Fecha</button>
                <button class="left-panel__tool-btn" data-action="form-toggle"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="5" width="12" height="6" rx="3" stroke="currentColor" stroke-width="1.2"/><circle cx="11" cy="8" r="2" fill="currentColor"/></svg> Toggle</button>
                <button class="left-panel__tool-btn" data-action="form-radio"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5" stroke="currentColor" stroke-width="1.2"/><circle cx="8" cy="8" r="2.5" fill="currentColor"/></svg> Selección</button>
              </div>
            </div>
            <div class="left-panel__section ${activeTab === 'images' ? 'active' : ''}" id="section-images">
              <h3 class="left-panel__title">Imágenes</h3>
              <p class="left-panel__hint">Suba imágenes al repositorio y arrástrelas al canvas cuando lo necesite.</p>
              <button class="left-panel__tool-btn" id="btn-upload-repo"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v8M5 7l3-3 3 3M3 12h10" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg> Subir al repositorio</button>
              <div class="left-panel__divider"></div>
              <h4 class="left-panel__subtitle">Repositorio</h4>
              <div class="left-panel__image-grid" id="image-repo-grid"><p class="left-panel__hint">Sin imágenes aún</p></div>
              <div class="left-panel__divider"></div>
              <h4 class="left-panel__subtitle">Iconos de la experiencia</h4>
              <div class="left-panel__image-grid" id="base-icons-grid"></div>
            </div>
            <div class="left-panel__section ${activeTab === 'versions' ? 'active' : ''}" id="section-versions">
              <h3 class="left-panel__title">Versiones</h3>
              <div class="panel-scroll" id="versions-list"></div>
            </div>
            <div class="left-panel__section ${activeTab === 'logs' ? 'active' : ''}" id="section-logs">
              <h3 class="left-panel__title">Historial</h3>
              <div class="panel-scroll" id="logs-list"></div>
            </div>
            <div class="left-panel__section ${activeTab === 'flow' ? 'active' : ''}" id="section-flow">
              <h3 class="left-panel__title">Flujo de navegación</h3>
              <p class="left-panel__hint">Configure el orden de navegación entre pantallas. Asigne a cada botón la pantalla destino.</p>
              <div id="flow-config-list"></div>
            </div>
          </div>
        </aside>
        <div class="preview-area">
          <div class="preview-iframe-wrap" id="iframe-wrap">
            <div class="grid-overlay" id="grid-overlay"></div>
            <iframe id="live-iframe" src="" class="preview-iframe" title="Vista previa"></iframe>
          </div>
          <div class="page-nav" id="page-nav">
            ${PAGES.map(p => `<button class="page-nav__btn ${p.id === currentPage ? 'active' : ''}" data-page="${p.id}">${p.label}</button>`).join('')}
            <button class="page-nav__btn page-nav__btn--add" id="btn-add-page" title="Duplicar pantalla">+</button>
          </div>
        </div>
      </div>
    </div>
    <div class="editor-popup" id="editor-popup" style="display:none"><div class="editor-popup__inner"><div class="editor-popup__header"><span class="editor-popup__title">Editar elemento</span><button class="editor-popup__close" id="editor-close">✕</button></div><div class="editor-popup__body" id="editor-body"></div></div></div>
    <div class="saving-modal" id="saving-modal" style="display:none"><div class="saving-modal__content"><div class="page-loading__spinner"></div><p class="saving-modal__text">Guardando proyecto...</p><p class="saving-modal__sub">No cierre la ventana</p></div></div>
    <input type="file" id="image-upload" accept="image/*" style="display:none">
    <input type="file" id="image-repo-upload" accept="image/*" style="display:none" multiple>
    <div class="preview-modal" id="preview-modal" style="display:none"><div class="preview-modal__header"><span class="preview-modal__title">👁 Vista previa</span><div class="preview-modal__actions"><button class="preview-modal__device" id="btn-preview-home" title="Ir al inicio">🏠 Inicio</button><div class="toolbar__sep" style="height:20px;background:#555;"></div><button class="preview-modal__device" id="btn-preview-split" title="Antes y después">⬜⬜ Comparar</button><div class="toolbar__sep" style="height:20px;background:#555;"></div><button class="preview-modal__device active" data-width="100%">🖥 Desktop</button><button class="preview-modal__device" data-width="768px">📱 Tablet</button><button class="preview-modal__device" data-width="375px">📱 Mobile</button><button class="preview-modal__close" id="btn-close-preview">✕ Cerrar</button></div></div><div class="preview-modal__body"><div class="preview-loading" id="preview-loading"><div class="preview-loading__content"><div class="page-loading__spinner"></div><p class="page-loading__text">Preparando experiencia...</p></div></div><div class="preview-split" id="preview-split" style="display:none;"><div class="preview-split__pane"><div class="preview-split__label">✏️ Editado</div><iframe id="preview-iframe-edited" class="preview-modal__iframe" src="" title="Editado"></iframe></div><div class="preview-split__divider"></div><div class="preview-split__pane"><div class="preview-split__label">📄 Original</div><iframe id="preview-iframe-original" class="preview-modal__iframe" src="" title="Original"></iframe></div></div><iframe id="preview-iframe" class="preview-modal__iframe" src="" title="Preview"></iframe></div><div class="preview-page-nav" id="preview-page-nav"></div></div>
    ${showGuide ? renderGuideOverlay() : ''}
  `;
  bindDashboardEvents(user);
  loadBaseIcons();
  loadImageRepo();
}

// ===== GUIDE OVERLAY =====
function renderGuideOverlay() {
  const steps = [
    { title: '¡Bienvenido al editor!', desc: 'Esta guía le mostrará cómo usar el editor de diseño en simples pasos.' },
    { title: '1. Seleccionar y mover', desc: 'Un clic selecciona un elemento. Arrástrelo para moverlo. Doble clic abre el editor.' },
    { title: '2. Panel izquierdo', desc: 'Aquí encontrará herramientas, elementos, imágenes y versiones. Puede ocultarlo con ☰.' },
    { title: '3. Añadir elementos', desc: 'Use la pestaña "Elementos" para insertar textos, figuras, imágenes y campos de formulario.' },
    { title: '4. Guardar progreso', desc: 'Presione "Guardar progreso" para almacenar sus cambios. Use Ctrl+Z para deshacer.' },
    { title: '5. Pantallas', desc: 'Navegue entre pantallas en la barra inferior. Puede duplicarlas o eliminarlas.' },
    { title: '¡Listo!', desc: 'Ya puede empezar a diseñar. Recuerde: un clic = mover, doble clic = editar.' }
  ];
  return `<div class="guide-overlay" id="guide-overlay"><div class="guide-card"><div class="guide-card__progress">${steps.map((_, i) => `<span class="guide-dot ${i === 0 ? 'active' : ''}"></span>`).join('')}</div><h3 class="guide-card__title" id="guide-title">${steps[0].title}</h3><p class="guide-card__desc" id="guide-desc">${steps[0].desc}</p><div class="guide-card__actions"><button class="btn-cancel" id="guide-skip">Omitir</button><button class="btn-create" id="guide-next">Siguiente →</button></div></div></div>`;
}

function bindGuideEvents() {
  const overlay = document.getElementById('guide-overlay');
  if (!overlay) return;
  const steps = [
    { title: '¡Bienvenido al editor!', desc: 'Esta guía le mostrará cómo usar el editor de diseño en simples pasos.' },
    { title: '1. Seleccionar y mover', desc: 'Un clic selecciona un elemento. Arrástrelo para moverlo. Doble clic abre el editor.' },
    { title: '2. Panel izquierdo', desc: 'Aquí encontrará herramientas, elementos, imágenes y versiones. Puede ocultarlo con ☰.' },
    { title: '3. Añadir elementos', desc: 'Use la pestaña "Elementos" para insertar textos, figuras, imágenes y campos de formulario.' },
    { title: '4. Guardar progreso', desc: 'Presione "Guardar progreso" para almacenar sus cambios. Use Ctrl+Z para deshacer.' },
    { title: '5. Pantallas', desc: 'Navegue entre pantallas en la barra inferior. Puede duplicarlas o eliminarlas.' },
    { title: '¡Listo!', desc: 'Ya puede empezar a diseñar. Recuerde: un clic = mover, doble clic = editar.' }
  ];
  document.getElementById('guide-skip')?.addEventListener('click', () => { overlay.remove(); showGuide = false; });
  document.getElementById('guide-next')?.addEventListener('click', () => {
    guideStep++;
    if (guideStep >= steps.length) { overlay.remove(); showGuide = false; return; }
    document.getElementById('guide-title').textContent = steps[guideStep].title;
    document.getElementById('guide-desc').textContent = steps[guideStep].desc;
    document.querySelectorAll('.guide-dot').forEach((d, i) => d.classList.toggle('active', i <= guideStep));
    if (guideStep === steps.length - 1) document.getElementById('guide-next').textContent = '✓ Empezar';
  });
}

// ===== DASHBOARD EVENTS =====
async function bindDashboardEvents(user) {
  bindGuideEvents();
  document.getElementById('btn-logout').addEventListener('click', async () => {
    showSavingModal();
    await saveCurrentPageToAPI();
    hideSavingModal();
    logout(); init();
  });
  document.getElementById('btn-apply-changes').addEventListener('click', () => applyChanges(user));
  document.getElementById('btn-export')?.addEventListener('click', () => exportProject());
  document.getElementById('btn-back-projects').addEventListener('click', async () => {
    showSavingModal();
    await saveCurrentPageToAPI();
    hideSavingModal();
    versionStore.setProject(null); init();
  });
  document.getElementById('btn-toggle-panel').addEventListener('click', () => { panelOpen = !panelOpen; document.getElementById('left-panel').classList.toggle('open', panelOpen); });
  document.getElementById('btn-grid').addEventListener('click', (e) => { e.currentTarget.classList.toggle('active'); document.getElementById('grid-overlay').classList.toggle('visible'); });

  // Device mode toggle (Desktop/Mobile)
  document.querySelectorAll('.toolbar__device-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const newDevice = btn.dataset.device;
      if (newDevice === deviceMode) return;
      // Save current snapshot before switching
      await saveCurrentPageToAPI();
      // Switch mode
      deviceMode = newDevice;
      document.querySelectorAll('.toolbar__device-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // Resize iframe
      const wrap = document.getElementById('iframe-wrap');
      const iframe = document.getElementById('live-iframe');
      if (deviceMode === 'mobile') {
        wrap.style.display = 'flex';
        wrap.style.alignItems = 'flex-start';
        wrap.style.justifyContent = 'center';
        wrap.style.paddingTop = '20px';
        iframe.style.position = 'relative';
        iframe.style.width = '375px';
        iframe.style.height = 'calc(100% - 40px)';
        iframe.style.maxWidth = '375px';
        iframe.style.boxShadow = '0 4px 24px rgba(0,0,0,0.12)';
        iframe.style.borderRadius = '24px';
        iframe.style.border = '2px solid #e0e0e0';
      } else {
        wrap.style.display = '';
        wrap.style.alignItems = '';
        wrap.style.justifyContent = '';
        wrap.style.paddingTop = '';
        iframe.style.position = 'absolute';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.maxWidth = '';
        iframe.style.boxShadow = '';
        iframe.style.borderRadius = '';
        iframe.style.border = 'none';
      }
      // Load the appropriate snapshot for this device
      applySavedChanges();
    });
  });

  document.getElementById('btn-select-mode').addEventListener('click', toggleSelectMode);

  // Left panel tabs
  document.querySelectorAll('.left-panel__tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.left-panel__tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.left-panel__section').forEach(s => s.classList.remove('active'));
      tab.classList.add('active'); activeTab = tab.dataset.tab;
      document.getElementById(`section-${activeTab}`)?.classList.add('active');
      if (activeTab === 'versions') renderVersions();
      if (activeTab === 'logs') renderLogs();
      if (activeTab === 'flow') renderFlowConfig();
    });
  });

  // Page navigation - rendered dynamically
  await loadPagesOrder();
  // Always set currentPage to the first page in the saved order when opening a project
  if (PAGES.length > 0) {
    currentPage = PAGES[0].id;
  }
  renderPageNav();
  renderAddPagesList();

  // Toolbar tools
  document.querySelectorAll('.tool-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tool = btn.dataset.tool;
      if (tool === 'select') { toggleSelectMode(); document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); }
      if (tool === 'text') sendIframeAction('INSERT_TEXT', { text: 'Nuevo texto', fontFamily: "'Roboto Condensed', sans-serif", fontSize: '16px', fontWeight: '400', color: '#1B1B1B', backgroundColor: 'transparent' });
      if (tool === 'rect') insertShape('rect');
      if (tool === 'image') document.getElementById('image-upload').click();
      if (tool === 'form') sendIframeAction('INSERT_FORM_FIELD', { title: 'Campo', fieldType: 'text', placeholder: 'Ingrese aquí', options: [] });
      if (tool === 'undo') performUndo();
      if (tool === 'redo') performRedo();
    });
  });

  // Left panel actions
  document.querySelectorAll('.left-panel__tool-btn[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      if (action === 'insert-text') sendIframeAction('INSERT_TEXT', { text: 'Nuevo texto', fontFamily: "'Roboto Condensed', sans-serif", fontSize: '16px', fontWeight: '400', color: '#1B1B1B', backgroundColor: 'transparent' });
      if (action === 'insert-rect') insertShape('rect');
      if (action === 'insert-circle') insertShape('circle');
      if (action === 'insert-line') insertShape('line');
      if (action === 'upload-image') document.getElementById('image-upload').click();
      if (action === 'insert-modal') insertModal();
      if (action === 'duplicate') sendIframeAction('DUPLICATE_SELECTED');
      if (action === 'delete') sendIframeAction('DELETE_SELECTED');
      if (action === 'eyedropper') sendIframeAction('EYEDROPPER_MODE');
      if (action === 'form-text') sendIframeAction('INSERT_FORM_FIELD', { title: 'Campo de texto', fieldType: 'text', placeholder: 'Ingrese aquí', options: [] });
      if (action === 'form-select') sendIframeAction('INSERT_FORM_FIELD', { title: 'Seleccione una opción', fieldType: 'select', placeholder: '', options: ['Opción 1', 'Opción 2', 'Opción 3'] });
      if (action === 'form-date') sendIframeAction('INSERT_FORM_FIELD', { title: 'Fecha', fieldType: 'date', placeholder: 'DD/MM/AAAA', options: [] });
      if (action === 'form-toggle') sendIframeAction('INSERT_FORM_FIELD', { title: '¿Acepta?', fieldType: 'toggle', placeholder: '', options: [] });
      if (action === 'form-radio') sendIframeAction('INSERT_FORM_FIELD', { title: 'Seleccione', fieldType: 'radio', placeholder: '', options: ['Opción 1', 'Opción 2', 'Opción 3'] });
    });
  });

  // Effects
  document.querySelectorAll('.left-panel__effect-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const effect = btn.dataset.effect;
      if (effect === 'shadow') sendIframeAction('APPLY_EFFECT', { effect: 'boxShadow', value: '0 4px 12px rgba(0,0,0,0.2)' });
      if (effect === 'opacity') sendIframeAction('APPLY_EFFECT', { effect: 'opacity', value: '0.7' });
      if (effect === 'front') sendIframeAction('LAYER_CHANGE', { direction: 'front' });
      if (effect === 'back') sendIframeAction('LAYER_CHANGE', { direction: 'back' });
      if (effect === 'layer-up') sendIframeAction('LAYER_CHANGE', { direction: 'up' });
      if (effect === 'layer-down') sendIframeAction('LAYER_CHANGE', { direction: 'down' });
    });
  });

  // Quick color
  document.getElementById('quick-color')?.addEventListener('input', (e) => {
    sendIframeAction('APPLY_EFFECT', { effect: 'color', value: e.target.value });
  });

  // Image uploads
  document.getElementById('image-upload').addEventListener('change', handleImageUpload);
  document.getElementById('image-repo-upload').addEventListener('change', handleRepoUpload);
  document.getElementById('btn-upload-repo')?.addEventListener('click', () => document.getElementById('image-repo-upload').click());

  // Preview
  document.getElementById('btn-preview').addEventListener('click', openPreview);
  document.getElementById('btn-close-preview').addEventListener('click', () => document.getElementById('preview-modal').style.display = 'none');
  document.querySelectorAll('.preview-modal__device').forEach(btn => { btn.addEventListener('click', () => { document.querySelectorAll('.preview-modal__device').forEach(b => b.classList.remove('active')); btn.classList.add('active'); document.getElementById('preview-iframe').style.maxWidth = btn.dataset.width; }); });

  // Editor close - re-enable edit mode after closing
  document.getElementById('editor-close').addEventListener('click', () => {
    document.getElementById('editor-popup').style.display = 'none';
    // Re-enable edit mode in iframe
    const iframe = document.getElementById('live-iframe');
    iframe.contentWindow.postMessage({ type: 'ENABLE_EDIT_MODE' }, '*');
    selectMode = true;
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', handleKeyboard);

  // Iframe messages
  window.addEventListener('message', handleIframeMessage);

  // Iframe load
  const iframe = document.getElementById('live-iframe');

  // Save snapshot before page unload (browser close/refresh) — fire and forget
  window.addEventListener('beforeunload', () => {
    if (versionStore.projectId) {
      // Use sendBeacon for reliable delivery on page close
      const data = JSON.stringify({ page: currentPage, html: '' });
      navigator.sendBeacon?.(`http://localhost:4001/api/projects/${versionStore.projectId}/snapshots`, new Blob([data], { type: 'application/json' }));
      // Also try postMessage (may not complete)
      iframe.contentWindow.postMessage({ type: 'SAVE_SNAPSHOT', page: currentPage, projectId: versionStore.projectId }, '*');
    }
  });

  scaleIframeToFit();
  window.addEventListener('resize', scaleIframeToFit);

  // Navigate iframe to the correct initial page (first page in saved order)
  const initialPage = PAGES.find(p => p.id === currentPage);
  const initialBaseId = initialPage?.basePageId || currentPage;
  const initialStepMap = { home: 1, step1: 2, step2: 3, step3: 4, step4: 5, step5: 6, step6: 7 };
  const initialStep = initialStepMap[initialBaseId] || 1;
  // Set iframe src to the correct page
  const baseUrl = versionStore.getLiveUrl();
  if (initialStep > 1) {
    iframe.src = baseUrl + `&step=${initialStep - 1}`;
  } else {
    iframe.src = baseUrl;
  }

  // Show loading overlay on initial load
  showLoadingOverlay();

  iframe.addEventListener('load', () => {
    scaleIframeToFit();
    applySavedChanges();
    setTimeout(() => {
      iframe.contentWindow.postMessage({ type: 'ENABLE_EDIT_MODE' }, '*');
      selectMode = true;
      hideLoadingOverlay();
    }, 2000);
  });

  updatePendingCount();
}

// ===== KEYBOARD SHORTCUTS =====
let clipboard = null; // Stores copied element HTML
let deviceMode = 'desktop'; // 'desktop' or 'mobile'

function handleKeyboard(e) {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
  if (e.ctrlKey && e.key === 'z') { e.preventDefault(); performUndo(); }
  if (e.ctrlKey && e.key === 'y') { e.preventDefault(); performRedo(); }
  if (e.ctrlKey && e.key === 'c') { e.preventDefault(); copySelected(); }
  if (e.ctrlKey && e.key === 'v') { e.preventDefault(); pasteClipboard(); }
  if (e.ctrlKey && e.key === 'd') { e.preventDefault(); sendIframeAction('DUPLICATE_SELECTED'); }
  if (e.key === 'Delete' || e.key === 'Backspace') { sendIframeAction('DELETE_SELECTED'); }
  if (!e.ctrlKey && (e.key === 't' || e.key === 'T')) { sendIframeAction('INSERT_TEXT', { text: 'Nuevo texto', fontFamily: "'Roboto Condensed', sans-serif", fontSize: '16px', fontWeight: '400', color: '#1B1B1B', backgroundColor: 'transparent' }); }
  if (!e.ctrlKey && (e.key === 'r' || e.key === 'R')) { insertShape('rect'); }
}

function copySelected() {
  // Ask iframe for the selected element's HTML
  sendIframeAction('COPY_SELECTED');
}

function pasteClipboard() {
  if (!clipboard) { return; }
  // Insert the copied HTML into the current page
  const iframe = document.getElementById('live-iframe');
  iframe.contentWindow.postMessage({ type: 'PASTE_ELEMENT', html: clipboard }, '*');
}

// ===== UNDO/REDO =====
function performUndo() {
  const iframe = document.getElementById('live-iframe');
  iframe.contentWindow.postMessage({ type: 'UNDO' }, '*');
  if (undoStack.length > 0) { const item = undoStack.pop(); redoStack.push(item); }
}
function performRedo() {
  const iframe = document.getElementById('live-iframe');
  iframe.contentWindow.postMessage({ type: 'REDO' }, '*');
  if (redoStack.length > 0) { const item = redoStack.pop(); undoStack.push(item); }
}

// ===== NAVIGATION =====
async function navigateToPage(pageId) {
  // Show loading overlay
  showLoadingOverlay();
  // Save current page to API before leaving
  await saveCurrentPageToAPI();
  // Navigate
  currentPage = pageId;
  renderPageNav();
  const iframe = document.getElementById('live-iframe');
  // Find the actual step for this page (might be a copy with basePageId)
  const page = PAGES.find(p => p.id === pageId);
  const baseId = page?.basePageId || pageId;
  const stepMap = { home: 1, step1: 2, step2: 3, step3: 4, step4: 5, step5: 6, step6: 7 };
  const step = stepMap[baseId] || 1;
  iframe.contentWindow.postMessage({ type: 'NAVIGATE_TO_STEP', step }, '*');
}

function showLoadingOverlay() {
  let overlay = document.getElementById('page-loading-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'page-loading-overlay';
    overlay.innerHTML = `<div class="page-loading__content"><div class="page-loading__spinner"></div><p class="page-loading__text">Cargando página...</p></div>`;
    const wrap = document.getElementById('iframe-wrap');
    if (wrap) wrap.appendChild(overlay);
  }
  overlay.style.display = 'flex';
}

function hideLoadingOverlay() {
  const overlay = document.getElementById('page-loading-overlay');
  if (overlay) overlay.style.display = 'none';
}

function renderPageNav() {
  const nav = document.getElementById('page-nav');
  if (!nav) return;
  nav.innerHTML = PAGES.map((p, i) => `
    <div class="page-nav__item ${p.id === currentPage ? 'active' : ''}" data-page="${p.id}" draggable="true" data-index="${i}">
      <button class="page-nav__btn ${p.id === currentPage ? 'active' : ''}" data-page="${p.id}">${p.label}</button>
      <div class="page-nav__actions">
        <button class="page-nav__action" data-action="rename" data-page="${p.id}" title="Renombrar">✎</button>
        <button class="page-nav__action" data-action="restore" data-page="${p.id}" title="Restaurar versión original">↺</button>
        <button class="page-nav__action" data-action="duplicate" data-page="${p.id}" title="Duplicar">⧉</button>
        ${PAGES.length > 1 ? `<button class="page-nav__action page-nav__action--delete" data-action="delete" data-page="${p.id}" title="Eliminar">✕</button>` : ''}
      </div>
    </div>
  `).join('') + `<button class="page-nav__btn page-nav__btn--add" id="btn-add-page" title="Duplicar pantalla actual">+</button>`;

  // Bind clicks
  nav.querySelectorAll('.page-nav__btn[data-page]').forEach(btn => {
    btn.addEventListener('click', (e) => { e.stopPropagation(); navigateToPage(btn.dataset.page); });
  });
  nav.querySelectorAll('.page-nav__item').forEach(item => {
    item.addEventListener('click', () => navigateToPage(item.dataset.page));
  });

  // Duplicate/Delete/Restore actions
  nav.querySelectorAll('.page-nav__action').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const action = btn.dataset.action;
      const pageId = btn.dataset.page;
      if (action === 'rename') renamePage(pageId);
      if (action === 'duplicate') duplicatePage(pageId);
      if (action === 'delete') deletePage(pageId);
      if (action === 'restore') restorePage(pageId);
    });
  });

  // Add button
  document.getElementById('btn-add-page')?.addEventListener('click', () => duplicatePage(currentPage));

  // Drag to reorder
  let draggedIdx = null;
  nav.querySelectorAll('.page-nav__item').forEach(item => {
    item.addEventListener('dragstart', (e) => {
      draggedIdx = parseInt(item.dataset.index);
      item.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
    });
    item.addEventListener('dragend', () => { item.classList.remove('dragging'); draggedIdx = null; });
    item.addEventListener('dragover', (e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; item.classList.add('drag-over'); });
    item.addEventListener('dragleave', () => { item.classList.remove('drag-over'); });
    item.addEventListener('drop', (e) => {
      e.preventDefault();
      item.classList.remove('drag-over');
      const targetIdx = parseInt(item.dataset.index);
      if (draggedIdx !== null && draggedIdx !== targetIdx) {
        const [moved] = PAGES.splice(draggedIdx, 1);
        PAGES.splice(targetIdx, 0, moved);
        savePagesOrder();
        renderPageNav();
      }
    });
  });
}

function renamePage(pageId) {
  const page = PAGES.find(p => p.id === pageId);
  if (!page) return;
  const newName = prompt(`Renombrar "${page.label}":`, page.label);
  if (!newName || !newName.trim() || newName.trim() === page.label) return;
  page.label = newName.trim();
  savePagesOrder();
  renderPageNav();
}

function duplicatePage(sourcePageId) {
  const source = PAGES.find(p => p.id === sourcePageId);
  if (!source) return;
  const newId = `page-${Date.now().toString(36)}`;
  const newLabel = `${source.label} (copia)`;
  const sourceIdx = PAGES.findIndex(p => p.id === sourcePageId);
  PAGES.splice(sourceIdx + 1, 0, { id: newId, label: newLabel, path: source.path, basePageId: source.basePageId || sourcePageId });
  savePagesOrder();

  // Copy the snapshot from source page to the new page (exact replica) — both desktop and mobile
  ['desktop', 'mobile'].forEach(device => {
    const sourceSnap = localStorage.getItem(`sb_snap_${versionStore.projectId}_${sourcePageId}_${device}`);
    if (sourceSnap) {
      localStorage.setItem(`sb_snap_${versionStore.projectId}_${newId}_${device}`, sourceSnap);
      const pageKey = device === 'mobile' ? `${newId}_mobile` : newId;
      fetch(`http://localhost:4001/api/projects/${versionStore.projectId}/snapshots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: pageKey, html: sourceSnap })
      }).catch(() => {});
    }
  });

  // Fallback: try old-style key (no device suffix)
  const sourceSnap = localStorage.getItem(`sb_snap_${versionStore.projectId}_${sourcePageId}`);
  if (sourceSnap && !localStorage.getItem(`sb_snap_${versionStore.projectId}_${newId}_desktop`)) {
    localStorage.setItem(`sb_snap_${versionStore.projectId}_${newId}_desktop`, sourceSnap);
    fetch(`http://localhost:4001/api/projects/${versionStore.projectId}/snapshots`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: newId, html: sourceSnap })
    }).catch(() => {});
  }

  // If nothing in localStorage, try from API
  if (!localStorage.getItem(`sb_snap_${versionStore.projectId}_${newId}_desktop`)) {
    fetch(`http://localhost:4001/api/projects/${versionStore.projectId}/snapshots`)
      .then(r => r.json())
      .then(snaps => {
        if (snaps[sourcePageId] && snaps[sourcePageId].html) {
          localStorage.setItem(`sb_snap_${versionStore.projectId}_${newId}_desktop`, snaps[sourcePageId].html);
          fetch(`http://localhost:4001/api/projects/${versionStore.projectId}/snapshots`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ page: newId, html: snaps[sourcePageId].html })
          }).catch(() => {});
        }
        const mobileKey = `${sourcePageId}_mobile`;
        if (snaps[mobileKey] && snaps[mobileKey].html) {
          localStorage.setItem(`sb_snap_${versionStore.projectId}_${newId}_mobile`, snaps[mobileKey].html);
          fetch(`http://localhost:4001/api/projects/${versionStore.projectId}/snapshots`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ page: `${newId}_mobile`, html: snaps[mobileKey].html })
          }).catch(() => {});
        }
      }).catch(() => {});
  }

  renderPageNav();
  navigateToPage(newId);
}

function deletePage(pageId) {
  if (PAGES.length <= 1) return;
  const page = PAGES.find(p => p.id === pageId);
  if (!confirm(`¿Eliminar la pantalla "${page?.label || pageId}"?`)) return;
  const idx = PAGES.findIndex(p => p.id === pageId);
  if (idx === -1) return;
  PAGES.splice(idx, 1);
  savePagesOrder();

  // If we deleted the current page, navigate to the first one
  if (currentPage === pageId) {
    navigateToPage(PAGES[0].id);
  } else {
    renderPageNav();
  }
}

function restorePage(pageId) {
  const page = PAGES.find(p => p.id === pageId);
  if (!confirm(`¿Restaurar "${page?.label || pageId}" a su versión original?\n\nSe eliminarán TODOS los cambios realizados en esta página.`)) return;

  showLoadingOverlay();

  // Remove snapshot for this page (localStorage + API) — both desktop and mobile
  localStorage.removeItem(`sb_snap_${versionStore.projectId}_${pageId}`);
  localStorage.removeItem(`sb_snap_${versionStore.projectId}_${pageId}_desktop`);
  localStorage.removeItem(`sb_snap_${versionStore.projectId}_${pageId}_mobile`);
  fetch(`http://localhost:4001/api/projects/${versionStore.projectId}/snapshots/${pageId}`, { method: 'DELETE' }).catch(() => {});
  fetch(`http://localhost:4001/api/projects/${versionStore.projectId}/snapshots/${pageId}_mobile`, { method: 'DELETE' }).catch(() => {});

  // Remove all pending changes for this page
  versionStore.pendingChanges = versionStore.pendingChanges.filter(c => (c.page || 'home') !== pageId);
  versionStore._savePendingLocal();

  // Remove from local versions
  const versionsKey = `sb_versions_${versionStore.projectId}`;
  try {
    let versions = JSON.parse(localStorage.getItem(versionsKey) || '[]');
    versions.forEach(v => { if (v.changes) v.changes = v.changes.filter(c => (c.page || 'home') !== pageId); });
    localStorage.setItem(versionsKey, JSON.stringify(versions));
  } catch {}

  // Also remove from API
  if (versionStore.projectId) {
    fetch(`http://localhost:4001/api/projects/${versionStore.projectId}/restore-page`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: pageId })
    }).catch(() => {});
  }

  // Navigate to the same page (forces reload with no snapshot)
  if (currentPage === pageId) {
    const iframe = document.getElementById('live-iframe');
    const stepMap = { home: 1, step1: 2, step2: 3, step3: 4, step4: 5, step5: 6, step6: 7 };
    const step = stepMap[pageId] || 1;
    iframe.contentWindow.postMessage({ type: 'NAVIGATE_TO_STEP', step }, '*');
  }

  updatePendingCount();
  setTimeout(() => { hideLoadingOverlay(); alert(`✅ Página "${page?.label || pageId}" restaurada a su versión original.`); }, 2500);
}

function savePagesOrder() {
  if (versionStore.projectId) {
    localStorage.setItem(`sb_pages_${versionStore.projectId}`, JSON.stringify(PAGES));
    // Also persist to API (disk) for reliability
    fetch(`http://localhost:4001/api/projects/${versionStore.projectId}/snapshots`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: '__pages_order', html: JSON.stringify(PAGES) })
    }).catch(() => {});
  }
}

async function loadPagesOrder() {
  // Always start with the default pages for the current template
  const defaults = versionStore.template === 'hogar' ? DEFAULT_PAGES_HOGAR : DEFAULT_PAGES_SALUD;
  PAGES.length = 0;
  defaults.forEach(p => PAGES.push({ ...p }));

  // Only override with saved custom order if it exists for this project
  if (!versionStore.projectId) return;

  // Try localStorage first
  const saved = localStorage.getItem(`sb_pages_${versionStore.projectId}`);
  if (saved) {
    try {
      const pages = JSON.parse(saved);
      if (Array.isArray(pages) && pages.length > 0) {
        PAGES.length = 0;
        pages.forEach(p => PAGES.push(p));
        return;
      }
    } catch { /* ignore */ }
  }

  // Fallback: try from API (disk)
  try {
    const r = await fetch(`http://localhost:4001/api/projects/${versionStore.projectId}/snapshots`);
    if (r.ok) {
      const snapshots = await r.json();
      if (snapshots.__pages_order && snapshots.__pages_order.html) {
        const pages = JSON.parse(snapshots.__pages_order.html);
        if (Array.isArray(pages) && pages.length > 0) {
          PAGES.length = 0;
          pages.forEach(p => PAGES.push(p));
          // Cache in localStorage
          localStorage.setItem(`sb_pages_${versionStore.projectId}`, JSON.stringify(PAGES));
        }
      }
    }
  } catch { /* ignore */ }
}

// ===== IFRAME COMMUNICATION =====
function sendIframeAction(type, data = {}) {
  const iframe = document.getElementById('live-iframe');
  iframe.contentWindow.postMessage({ ...data, type }, '*');
}

function sendToIframe(command) {
  const iframe = document.getElementById('live-iframe');
  iframe.contentWindow.postMessage({ type: 'ADMIN_OVERRIDE', selector: command.selector, property: command.property, value: command.value }, '*');
}

function toggleSelectMode() {
  selectMode = !selectMode;
  const iframe = document.getElementById('live-iframe');
  iframe.contentWindow.postMessage({ type: selectMode ? 'ENABLE_EDIT_MODE' : 'DISABLE_EDIT_MODE' }, '*');
  document.getElementById('btn-select-mode')?.classList.toggle('active', selectMode);
}

function handleIframeMessage(event) {
  if (!event.data) return;
  if (event.data.type === 'ELEMENT_SELECTED') showElementEditor(event.data);
  if (event.data.type === 'ADMIN_CHANGE') {
    const change = { action: event.data.action, selector: event.data.selector, property: event.data.property, value: event.data.value, description: event.data.description, page: currentPage };
    versionStore.addPendingChange(change);
    undoStack.push(change);
    redoStack = [];
    updatePendingCount();
  }
  if (event.data.type === 'SNAPSHOT_DATA') {
    // Iframe sent its HTML — save to API (disk) and localStorage (cache)
    const projectId = event.data.projectId;
    const page = event.data.page;
    const html = event.data.html;
    // Save with device suffix for device-specific snapshots
    const pageKey = deviceMode === 'mobile' ? `${page}_mobile` : page;
    try { localStorage.setItem(`sb_snap_${projectId}_${page}_${deviceMode}`, html); } catch {}
    fetch(`http://localhost:4001/api/projects/${projectId}/snapshots`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: pageKey, html })
    }).catch(() => {});
  }
  if (event.data.type === 'COPIED_ELEMENT') {
    clipboard = event.data.html;
  }
}

// ===== SHAPES =====
function insertShape(type) {
  sendIframeAction('INSERT_SHAPE', { shape: type });
}

function insertModal() {
  sendIframeAction('INSERT_MODAL', { type: 'stepper' });
}

// ===== TEXT INSERT =====
function showTextInsertPopup() {
  const existing = document.getElementById('text-insert-popup');
  if (existing) { existing.remove(); return; }
  const popup = document.createElement('div');
  popup.id = 'text-insert-popup';
  popup.className = 'text-insert-popup';
  popup.innerHTML = `<div class="text-insert-card"><h3 class="text-insert-title">Insertar texto</h3>
    <div class="form-group"><label class="form-label">Texto</label><input type="text" class="sb-input" id="insert-text-value" placeholder="Escriba aquí..." value="Nuevo texto"></div>
    <div class="form-group"><label class="form-label">Fuente</label><select class="sb-input" id="insert-text-font">${FONTS.map(f => `<option value="${f.value}" data-weight="${f.weight || '400'}">${f.name}</option>`).join('')}</select></div>
    <div style="display:flex;gap:8px;">
      <div class="form-group" style="flex:1"><label class="form-label">Tamaño</label><select class="sb-input" id="insert-text-size"><option value="12px">12px</option><option value="14px">14px</option><option value="16px" selected>16px</option><option value="18px">18px</option><option value="20px">20px</option><option value="24px">24px</option><option value="28px">28px</option><option value="32px">32px</option><option value="40px">40px</option></select></div>
      <div class="form-group" style="flex:1"><label class="form-label">Peso</label><select class="sb-input" id="insert-text-weight"><option value="300">Light</option><option value="400" selected>Regular</option><option value="600">SemiBold</option><option value="700">Bold</option></select></div>
    </div>
    <div style="display:flex;gap:8px;"><div class="form-group" style="flex:1"><label class="form-label">Color</label><input type="color" class="editor-color" id="insert-text-color" value="#333333"></div><div class="form-group" style="flex:1"><label class="form-label">Fondo</label><input type="color" class="editor-color" id="insert-text-bg" value="#ffffff"></div><div class="form-group" style="flex:1;display:flex;align-items:flex-end;"><label class="text-transparent-label"><input type="checkbox" id="insert-text-transparent" checked> Transparente</label></div></div>
    <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px;"><button class="btn-cancel" id="btn-cancel-text">Cancelar</button><button class="btn-create" id="btn-insert-text">Insertar</button></div></div>`;
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
    sendIframeAction('INSERT_TEXT', { text, fontFamily: font, fontSize: size, fontWeight: weight, color, backgroundColor: transparent ? 'transparent' : bg });
    popup.remove();
  });
}

// ===== FORM FIELD INSERT =====
function showFormFieldPopup(preselect) {
  const existing = document.getElementById('form-field-popup');
  if (existing) { existing.remove(); return; }
  const popup = document.createElement('div');
  popup.id = 'form-field-popup';
  popup.className = 'text-insert-popup';
  popup.innerHTML = `<div class="text-insert-card"><h3 class="text-insert-title">Campo de formulario</h3>
    <div class="form-group"><label class="form-label">Título del campo</label><input type="text" class="sb-input" id="field-title" placeholder="Ej: Nombre completo" value=""></div>
    <div class="form-group"><label class="form-label">Tipo de campo</label><select class="sb-input" id="field-type"><option value="text" ${preselect === 'text' ? 'selected' : ''}>Texto libre</option><option value="select" ${preselect === 'select' ? 'selected' : ''}>Desplegable</option><option value="date" ${preselect === 'date' ? 'selected' : ''}>Fecha</option><option value="toggle" ${preselect === 'toggle' ? 'selected' : ''}>Toggle</option><option value="radio" ${preselect === 'radio' ? 'selected' : ''}>Selección</option></select></div>
    <div class="form-group"><label class="form-label">Texto guía (placeholder)</label><input type="text" class="sb-input" id="field-placeholder" placeholder="Ej: Ingrese su nombre"></div>
    <div class="form-group" id="field-options-group" style="display:none"><label class="form-label">Opciones (una por línea)</label><textarea class="sb-input" id="field-options" rows="4" placeholder="Opción 1\nOpción 2\nOpción 3"></textarea></div>
    <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px;"><button class="btn-cancel" id="btn-cancel-field">Cancelar</button><button class="btn-create" id="btn-insert-field">Insertar</button></div></div>`;
  document.body.appendChild(popup);
  const typeSelect = document.getElementById('field-type');
  const optionsGroup = document.getElementById('field-options-group');
  typeSelect.addEventListener('change', () => { optionsGroup.style.display = typeSelect.value === 'select' || typeSelect.value === 'radio' ? 'block' : 'none'; });
  if (preselect === 'select' || preselect === 'radio') optionsGroup.style.display = 'block';
  document.getElementById('btn-cancel-field').addEventListener('click', () => popup.remove());
  document.getElementById('btn-insert-field').addEventListener('click', () => {
    const title = document.getElementById('field-title').value || 'Campo';
    const type = document.getElementById('field-type').value;
    const placeholder = document.getElementById('field-placeholder').value;
    const options = document.getElementById('field-options').value.split('\n').filter(o => o.trim());
    sendIframeAction('INSERT_FORM_FIELD', { title, type, placeholder, options });
    popup.remove();
  });
}

// ===== ELEMENT EDITOR =====
function showElementEditor(data) {
  const popup = document.getElementById('editor-popup');
  const body = document.getElementById('editor-body');
  const styles = data.styles || {};
  const isImage = data.isImage || data.tagName === 'img' || data.tagName === 'svg';
  const isFormField = data.isFormField || data.tagName === 'input' || data.tagName === 'select' || data.tagName === 'textarea';
  const isText = data.isText || (!isImage && !isFormField);

  function rgbToHex(rgb) {
    if (!rgb || rgb === 'transparent' || rgb === 'rgba(0, 0, 0, 0)') return '#ffffff';
    const match = rgb.match(/\d+/g);
    if (!match || match.length < 3) return '#333333';
    return '#' + match.slice(0, 3).map(n => parseInt(n).toString(16).padStart(2, '0')).join('');
  }
  const currentColor = rgbToHex(styles.color);
  const currentBg = rgbToHex(styles.backgroundColor);
  const currentFontSize = styles.fontSize || '16px';
  const currentFontWeight = String(parseInt(styles.fontWeight) || 400);
  const editorTitle = isImage ? '🖼 Editor de imagen' : isFormField ? '📋 Editor de formulario' : '✏️ Editor de texto';

  let html = `<div class="editor-field"><label class="editor-label">${editorTitle}</label><code class="editor-code">&lt;${data.tagName}&gt; ${(data.selector || '').substring(0, 40)}</code></div>`;

  if (isText && !isImage && !isFormField) {
    html += `<div class="editor-field"><label class="editor-label">Texto</label><input type="text" class="sb-input" id="edit-text" value="${(data.textContent || '').substring(0, 200).replace(/"/g, '&quot;')}"></div>
    <div class="editor-field"><label class="editor-label">Formato</label>
      <div class="editor-text-toolbar">
        <button class="editor-text-toolbar__btn" data-format="bold" title="Negrita"><b>B</b></button>
        <button class="editor-text-toolbar__btn" data-format="italic" title="Cursiva"><i>I</i></button>
        <button class="editor-text-toolbar__btn" data-format="highlight" title="Resaltar" style="background:#FFDC5D;border-color:#FFDC5D;color:#333;">H</button>
        <div class="editor-text-toolbar__sep"></div>
        <button class="editor-text-toolbar__btn" data-align="left" title="Izquierda"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 2h12M1 5h8M1 8h12M1 11h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button>
        <button class="editor-text-toolbar__btn" data-align="center" title="Centrar"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 2h12M3 5h8M1 8h12M4 11h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button>
        <button class="editor-text-toolbar__btn" data-align="right" title="Derecha"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 2h12M5 5h8M1 8h12M7 11h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button>
        <button class="editor-text-toolbar__btn" data-align="justify" title="Justificar"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 2h12M1 5h12M1 8h12M1 11h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button>
      </div>
    </div>
    <div class="editor-row"><div class="editor-field"><label class="editor-label">Color texto</label><input type="color" id="edit-color" value="${currentColor}" class="editor-color"></div><div class="editor-field"><label class="editor-label">Fondo</label><input type="color" id="edit-bg" value="${currentBg}" class="editor-color"></div></div>
    <div class="editor-row"><div class="editor-field"><label class="editor-label">Fuente</label><select class="sb-input sb-input--sm" id="edit-font">${FONTS.map(f => `<option value="${f.value}" ${(styles.fontFamily || '').includes(f.name) ? 'selected' : ''}>${f.name}</option>`).join('')}</select></div></div>
    <div class="editor-row"><div class="editor-field"><label class="editor-label">Tamaño</label><select class="sb-input sb-input--sm" id="edit-fontsize">${[6,8,9,10,11,12,13,14,16,18,20,22,24,26,28,30,32,36,40,44,48,54,60].map(s => `<option value="${s}px" ${currentFontSize===s+'px'||currentFontSize===String(s)?'selected':''}>${s}</option>`).join('')}</select></div><div class="editor-field"><label class="editor-label">Peso</label><select class="sb-input sb-input--sm" id="edit-fontweight"><option value="300" ${currentFontWeight==='300'?'selected':''}>Light</option><option value="400" ${currentFontWeight==='400'?'selected':''}>Regular</option><option value="600" ${currentFontWeight==='600'?'selected':''}>SemiBold</option><option value="700" ${currentFontWeight==='700'?'selected':''}>Bold</option></select></div></div>`;
  }
  if (isImage) {
    html += `<div class="editor-field"><label class="editor-label">Imagen actual</label>${data.src ? `<img src="${data.src}" class="editor-preview-img" style="max-height:80px;border-radius:6px;margin-bottom:8px;">` : '<span style="font-size:12px;color:#999;">SVG / Icono</span>'}</div>
    <div class="editor-field"><label class="editor-label">Reemplazar imagen</label><div class="editor-upload-area"><input type="file" id="edit-image-file" accept="image/*" class="editor-file-input"><span class="editor-upload-text">📷 Clic o arrastre para reemplazar</span></div><div id="image-preview" class="editor-image-preview" style="display:none"><img id="preview-img" class="editor-preview-img"></div></div>`;
  }
  if (isFormField) {
    html += `<div class="editor-field"><label class="editor-label">Tipo</label><code class="editor-code">${data.tagName === 'select' ? 'Desplegable' : data.tagName === 'textarea' ? 'Área de texto' : 'Campo de texto'}</code></div>`;
    html += `<div class="editor-field"><label class="editor-label">Título / Label</label><input type="text" class="sb-input" id="edit-label" value="${(data.label || '').replace(/"/g, '&quot;')}"></div>`;
    if (data.tagName === 'select') {
      html += `<div class="editor-field"><label class="editor-label">Opciones</label><textarea class="sb-input" id="edit-select-options" rows="4">${(data.options || []).join('\n')}</textarea><div style="display:flex;gap:4px;margin-top:6px;"><button class="btn-create" id="btn-add-option" style="font-size:11px;padding:4px 10px;">+ Añadir</button><button class="btn-cancel" id="btn-remove-option" style="font-size:11px;padding:4px 10px;">- Quitar</button></div></div>`;
    } else {
      html += `<div class="editor-field"><label class="editor-label">Placeholder</label><input type="text" class="sb-input" id="edit-placeholder" value="${(data.placeholder || '').replace(/"/g, '&quot;')}"></div>`;
    }
    html += `<div class="editor-row"><div class="editor-field"><label class="editor-label">Color borde</label><input type="color" id="edit-color" value="${currentColor}" class="editor-color"></div><div class="editor-field"><label class="editor-label">Fondo</label><input type="color" id="edit-bg" value="${currentBg}" class="editor-color"></div></div>`;
  }
  html += `<div class="editor-actions"><button class="editor-btn-delete" id="btn-delete-el">🗑 Eliminar</button><button class="btn-cancel" id="btn-duplicate-el" style="margin-left:auto;margin-right:8px;">📋 Duplicar</button><button class="editor-btn-apply" id="btn-apply-edit">Aplicar</button></div>`;

  body.innerHTML = html;
  popup.style.display = 'flex';

  // Image preview
  const fileInput = document.getElementById('edit-image-file');
  if (fileInput) { fileInput.addEventListener('change', (e) => { const file = e.target.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = (ev) => { document.getElementById('preview-img').src = ev.target.result; document.getElementById('image-preview').style.display = 'block'; fileInput.dataset.dataUrl = ev.target.result; }; reader.readAsDataURL(file); }); }

  // Text formatting buttons
  document.querySelectorAll('.editor-text-toolbar__btn[data-format]').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      const fmt = btn.dataset.format;
      if (fmt === 'bold') sendIframeAction('APPLY_EFFECT', { effect: 'fontWeight', value: btn.classList.contains('active') ? '700' : '400' });
      if (fmt === 'italic') sendIframeAction('APPLY_EFFECT', { effect: 'fontStyle', value: btn.classList.contains('active') ? 'italic' : 'normal' });
      if (fmt === 'highlight') sendIframeAction('APPLY_EFFECT', { effect: 'backgroundColor', value: btn.classList.contains('active') ? '#FFDC5D' : 'transparent' });
    });
  });
  document.querySelectorAll('.editor-text-toolbar__btn[data-align]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.editor-text-toolbar__btn[data-align]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      sendIframeAction('APPLY_EFFECT', { effect: 'textAlign', value: btn.dataset.align });
    });
  });

  // Select options
  document.getElementById('btn-add-option')?.addEventListener('click', () => { const ta = document.getElementById('edit-select-options'); ta.value += '\nNueva opción'; });
  document.getElementById('btn-remove-option')?.addEventListener('click', () => { const ta = document.getElementById('edit-select-options'); const lines = ta.value.split('\n'); lines.pop(); ta.value = lines.join('\n'); });

  // Select options
  document.getElementById('btn-add-option')?.addEventListener('click', () => { const ta = document.getElementById('edit-select-options'); ta.value += '\nNueva opción'; });
  document.getElementById('btn-remove-option')?.addEventListener('click', () => { const ta = document.getElementById('edit-select-options'); const lines = ta.value.split('\n'); lines.pop(); ta.value = lines.join('\n'); });
  // Apply
  document.getElementById('btn-apply-edit').addEventListener('click', async () => {
    const changes = [];
    const textEl = document.getElementById('edit-text');
    const colorEl = document.getElementById('edit-color');
    const bgEl = document.getElementById('edit-bg');
    const fontSizeEl = document.getElementById('edit-fontsize');
    const fontWeightEl = document.getElementById('edit-fontweight');
    const fontEl = document.getElementById('edit-font');

    if (textEl && textEl.value !== (data.textContent || '').substring(0, 200)) { const cmd = { selector: data.selector, property: 'textContent', value: textEl.value, description: `Texto: ${data.tagName}` }; sendToIframe(cmd); changes.push(cmd); }
    if (fileInput && fileInput.dataset?.dataUrl) { const cmd = { selector: data.selector, property: 'src', value: fileInput.dataset.dataUrl, description: `Imagen: ${data.tagName}` }; sendToIframe(cmd); changes.push(cmd); await versionStore.storeImage(fileInput.files[0]?.name || 'img', fileInput.dataset.dataUrl); }
    if (colorEl && colorEl.value !== currentColor) { const prop = isFormField ? 'borderColor' : 'color'; const cmd = { selector: data.selector, property: prop, value: colorEl.value, description: `Color` }; sendToIframe(cmd); changes.push(cmd); }
    if (bgEl && bgEl.value !== currentBg) { const cmd = { selector: data.selector, property: 'backgroundColor', value: bgEl.value, description: `Fondo` }; sendToIframe(cmd); changes.push(cmd); }
    if (fontSizeEl?.value && fontSizeEl.value !== currentFontSize) { const cmd = { selector: data.selector, property: 'fontSize', value: fontSizeEl.value, description: `Tamaño fuente` }; sendToIframe(cmd); changes.push(cmd); }
    if (fontWeightEl?.value && fontWeightEl.value !== currentFontWeight) { const cmd = { selector: data.selector, property: 'fontWeight', value: fontWeightEl.value, description: `Peso fuente` }; sendToIframe(cmd); changes.push(cmd); }
    if (fontEl?.value) { const cmd = { selector: data.selector, property: 'fontFamily', value: fontEl.value, description: `Fuente` }; sendToIframe(cmd); changes.push(cmd); }
    const optionsEl = document.getElementById('edit-select-options');
    if (optionsEl) { const opts = optionsEl.value.split('\n').filter(o => o.trim()); sendIframeAction('UPDATE_SELECT_OPTIONS', { selector: data.selector, options: opts }); }
    const placeholderEl = document.getElementById('edit-placeholder');
    if (placeholderEl && placeholderEl.value !== (data.placeholder || '')) { sendIframeAction('UPDATE_PLACEHOLDER', { selector: data.selector, value: placeholderEl.value }); changes.push({ selector: data.selector, property: '__placeholder', value: placeholderEl.value, description: 'Placeholder actualizado' }); }
    const labelEl = document.getElementById('edit-label');
    if (labelEl && labelEl.value !== (data.label || '')) { sendIframeAction('UPDATE_LABEL', { selector: data.selector, value: labelEl.value }); changes.push({ selector: data.selector, property: '__label', value: labelEl.value, description: 'Label actualizado' }); }
    changes.forEach(c => { c.page = currentPage; versionStore.addPendingChange(c); undoStack.push(c); });
    redoStack = [];
    updatePendingCount();
    popup.style.display = 'none';
    document.getElementById('live-iframe').contentWindow.postMessage({ type: 'ENABLE_EDIT_MODE' }, '*');
    selectMode = true;
  });

  // Delete
  document.getElementById('btn-delete-el').addEventListener('click', () => { const cmd = { selector: data.selector, property: 'display', value: 'none', description: `Eliminar: ${data.tagName}`, page: currentPage }; sendToIframe(cmd); versionStore.addPendingChange(cmd); undoStack.push(cmd); updatePendingCount(); popup.style.display = 'none'; document.getElementById('live-iframe').contentWindow.postMessage({ type: 'ENABLE_EDIT_MODE' }, '*'); selectMode = true; });

  // Duplicate
  document.getElementById('btn-duplicate-el')?.addEventListener('click', () => { sendIframeAction('DUPLICATE_SELECTED'); popup.style.display = 'none'; document.getElementById('live-iframe').contentWindow.postMessage({ type: 'ENABLE_EDIT_MODE' }, '*'); selectMode = true; });

}

// ===== IMAGE HANDLING =====
function handleImageUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async (ev) => {
    const dataUrl = ev.target.result;
    sendIframeAction('INSERT_IMAGE', { src: dataUrl, name: file.name });
    await versionStore.storeImage(file.name, dataUrl);
  };
  reader.readAsDataURL(file);
  e.target.value = '';
}

async function handleRepoUpload(e) {
  const files = Array.from(e.target.files);
  for (const file of files) {
    const reader = new FileReader();
    reader.onload = async (ev) => { await versionStore.storeImage(file.name, ev.target.result); };
    reader.readAsDataURL(file);
  }
  e.target.value = '';
  setTimeout(loadImageRepo, 500);
}

async function loadImageRepo() {
  const grid = document.getElementById('image-repo-grid');
  if (!grid) return;
  // Try to load from API
  try {
    const r = await fetch(`http://localhost:4001/api/projects/${versionStore.projectId}/images`);
    const images = await r.json();
    if (images.length === 0) { grid.innerHTML = '<p class="left-panel__hint">Sin imágenes aún</p>'; return; }
    grid.innerHTML = images.map(img => `<div class="repo-image-item" draggable="true" data-src="${img.data || ''}" title="${img.name}"><img src="${img.data}" alt="${img.name}" class="repo-image-thumb"><span class="repo-image-name">${img.name}</span></div>`).join('');
    // Drag to insert
    grid.querySelectorAll('.repo-image-item').forEach(item => {
      item.addEventListener('click', () => { sendIframeAction('INSERT_IMAGE', { src: item.dataset.src, name: item.title }); });
    });
  } catch { grid.innerHTML = '<p class="left-panel__hint">Sin imágenes aún</p>'; }
}

function loadBaseIcons() {
  const grid = document.getElementById('base-icons-grid');
  if (!grid) return;
  const icons = ['Protection.png','Group 2416.png','Group 2430.png','Group 2432.png','Group 2443.png','Group 4579.png','Group 4581.png','icono_plomería.png','Icono_Electricidad.png','Icono_Vigilancia.png','Logo Jelpit.png','NUEVO 2.png','Frame 180.png','Group 142.png','Vector.png'];
  const port = versionStore.template === 'hogar' ? 3002 : 3000;
  grid.innerHTML = icons.map(name => `<div class="repo-image-item" title="${name}"><img src="http://localhost:${port}/Iconos/${name}" alt="${name}" class="repo-image-thumb" onerror="this.parentElement.style.display='none'"><span class="repo-image-name">${name.replace('.png','')}</span></div>`).join('');
  grid.querySelectorAll('.repo-image-item').forEach(item => {
    item.addEventListener('click', () => { sendIframeAction('INSERT_IMAGE', { src: item.querySelector('img').src, name: item.title }); });
  });
}

// ===== APPLY SAVED CHANGES =====
async function applySavedChanges() {
  if (!versionStore.projectId) return;
  const iframe = document.getElementById('live-iframe');

  // Check for device-specific snapshot first, then fallback to desktop, then generic (old-style)
  const deviceKey = `sb_snap_${versionStore.projectId}_${currentPage}_${deviceMode}`;
  const desktopKey = `sb_snap_${versionStore.projectId}_${currentPage}_desktop`;
  const genericKey = `sb_snap_${versionStore.projectId}_${currentPage}`;
  let snapshot = localStorage.getItem(deviceKey) || localStorage.getItem(desktopKey) || localStorage.getItem(genericKey);

  // If not in cache, load from API (disk)
  if (!snapshot) {
    try {
      const r = await fetch(`http://localhost:4001/api/projects/${versionStore.projectId}/snapshots`);
      if (r.ok) {
        const snapshots = await r.json();
        // Priority: device-specific > desktop > generic page key
        const devicePageKey = `${currentPage}_${deviceMode}`;
        const desktopPageKey = `${currentPage}_desktop`;
        if (snapshots[devicePageKey] && snapshots[devicePageKey].html) {
          snapshot = snapshots[devicePageKey].html;
        } else if (deviceMode === 'mobile' && snapshots[currentPage] && snapshots[currentPage].html) {
          // Mobile inherits from desktop if no mobile-specific snapshot exists
          snapshot = snapshots[currentPage].html;
        } else if (snapshots[currentPage] && snapshots[currentPage].html) {
          snapshot = snapshots[currentPage].html;
        }
        if (snapshot) { try { localStorage.setItem(deviceKey, snapshot); } catch {} }
      }
    } catch {}
  }

  if (snapshot) {
    setTimeout(() => {
      iframe.contentWindow.postMessage({ type: 'RESTORE_SNAPSHOT', html: snapshot }, '*');
    }, 1500);
  }
}

// ===== CENTRALIZED SAVE =====
function showSavingModal() { const m = document.getElementById('saving-modal'); if (m) m.style.display = 'flex'; }
function hideSavingModal() { const m = document.getElementById('saving-modal'); if (m) m.style.display = 'none'; }

// Save current page snapshot to API and wait for confirmation
function saveCurrentPageToAPI() {
  return new Promise((resolve) => {
    if (!versionStore.projectId) { resolve(); return; }
    const iframe = document.getElementById('live-iframe');

    // Listen for the snapshot data response
    const handler = (event) => {
      if (!event.data || event.data.type !== 'SNAPSHOT_DATA') return;
      if (event.data.projectId !== versionStore.projectId || event.data.page !== currentPage) return;
      window.removeEventListener('message', handler);

      // Save with device suffix for device-specific snapshots
      const pageKey = deviceMode === 'mobile' ? `${event.data.page}_mobile` : event.data.page;

      // Save to API (disk)
      fetch(`http://localhost:4001/api/projects/${versionStore.projectId}/snapshots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: pageKey, html: event.data.html })
      }).then(() => resolve()).catch(() => resolve());

      // Also cache in localStorage
      try { localStorage.setItem(`sb_snap_${event.data.projectId}_${currentPage}_${deviceMode}`, event.data.html); } catch {}
    };
    window.addEventListener('message', handler);

    // Ask iframe to send its HTML
    iframe.contentWindow.postMessage({ type: 'SAVE_SNAPSHOT', page: currentPage, projectId: versionStore.projectId }, '*');

    // Timeout fallback
    setTimeout(() => { window.removeEventListener('message', handler); resolve(); }, 3000);
  });
}

// ===== PREVIEW =====
function openPreview() {
  const modal = document.getElementById('preview-modal');
  const iframe = document.getElementById('preview-iframe');
  const loading = document.getElementById('preview-loading');

  // Load flow config
  const flowKey = `sb_flow_${versionStore.projectId}`;
  let flowConfig = {};
  try { flowConfig = JSON.parse(localStorage.getItem(flowKey) || '{}'); } catch {}

  // Page step mapping
  const pageToStep = { home: 0, step1: 1, step2: 2, step3: 3, step4: 4, step5: 5, step6: 6 };
  const stepToPage = { '0': 'home', '1': 'step1', '2': 'step2', '3': 'step3', '4': 'step4', '5': 'step5', '6': 'step6' };

  let previewingPage = currentPage;

  function showPreviewLoading() { if (loading) loading.style.display = 'flex'; }
  function hidePreviewLoading() { if (loading) loading.style.display = 'none'; }

  function loadPreviewPage(pageId) {
    showPreviewLoading();
    previewingPage = pageId;
    const step = pageToStep[pageId] || 0;
    let url = versionStore.getLiveUrl();
    if (step > 0) url += (url.includes('?') ? '&' : '?') + `step=${step}`;
    iframe.src = url;
  }

  // Initial load
  loadPreviewPage(currentPage);
  modal.style.display = 'flex';

  // Render page tabs in preview
  const previewNav = document.getElementById('preview-page-nav');
  if (previewNav) {
    previewNav.innerHTML = PAGES.map(p => `<button class="preview-page-nav__btn ${p.id === currentPage ? 'active' : ''}" data-page="${p.id}">${p.label}</button>`).join('');
    previewNav.querySelectorAll('.preview-page-nav__btn').forEach(btn => {
      btn.addEventListener('click', () => {
        previewNav.querySelectorAll('.preview-page-nav__btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        loadPreviewPage(btn.dataset.page);
      });
    });
  }

  // Handle iframe load
  const onIframeLoad = () => {
    // Disable edit mode in preview
    iframe.contentWindow.postMessage({ type: 'DISABLE_EDIT_MODE' }, '*');
    // Restore snapshot for the page we're previewing (check device-specific first)
    const previewDevice = iframe.style.maxWidth === '375px' ? 'mobile' : 'desktop';
    const deviceKey = `sb_snap_${versionStore.projectId}_${previewingPage}_${previewDevice}`;
    const genericKey = `sb_snap_${versionStore.projectId}_${previewingPage}_desktop`;
    const fallbackKey = `sb_snap_${versionStore.projectId}_${previewingPage}`;
    const snapshot = localStorage.getItem(deviceKey) || localStorage.getItem(genericKey) || localStorage.getItem(fallbackKey);

    setTimeout(() => {
      if (snapshot) {
        iframe.contentWindow.postMessage({ type: 'RESTORE_SNAPSHOT', html: snapshot }, '*');
      }
      // Send flow config AFTER snapshot is restored (needs delay for DOM update)
      setTimeout(() => {
        iframe.contentWindow.postMessage({ type: 'SET_FLOW_CONFIG', config: flowConfig }, '*');
        setTimeout(hidePreviewLoading, 500);
      }, 500);
    }, 1500);
  };

  iframe.addEventListener('load', onIframeLoad);

  // Listen for navigation from within the preview iframe
  window.addEventListener('message', function previewMsgHandler(event) {
    if (!event.data || modal.style.display === 'none') return;
    // If iframe navigates via flow, it will reload — onIframeLoad handles it
    // We need to detect which page it navigated to
    if (event.data.type === 'SNAPSHOT_DATA' || event.data.type === 'ADMIN_CHANGE') return;
    if (event.data.type === 'FLOW_NAVIGATE') {
      loadPreviewPage(event.data.targetPage);
    }
    if (event.data.type === 'NAVIGATE_TO_STEP_PREVIEW') {
      const targetStep = event.data.step;
      const targetPage = stepToPage[String(targetStep - 1)] || 'home';
      loadPreviewPage(targetPage);
    }
  });

  // Home button
  const homeBtn = document.getElementById('btn-preview-home');
  const homeBtnClone = homeBtn.cloneNode(true);
  homeBtn.parentNode.replaceChild(homeBtnClone, homeBtn);
  homeBtnClone.id = 'btn-preview-home';
  homeBtnClone.addEventListener('click', () => loadPreviewPage('home'));

  // Split view (compare) button
  let splitMode = false;
  const splitBtn = document.getElementById('btn-preview-split');
  const splitBtnClone = splitBtn.cloneNode(true);
  splitBtn.parentNode.replaceChild(splitBtnClone, splitBtn);
  splitBtnClone.id = 'btn-preview-split';
  splitBtnClone.addEventListener('click', () => {
    splitMode = !splitMode;
    const splitContainer = document.getElementById('preview-split');
    const singleIframe = document.getElementById('preview-iframe');
    splitBtnClone.classList.toggle('active', splitMode);

    if (splitMode) {
      singleIframe.style.display = 'none';
      splitContainer.style.display = 'flex';
      // Load edited version (with snapshot)
      const editedIframe = document.getElementById('preview-iframe-edited');
      const originalIframe = document.getElementById('preview-iframe-original');
      const pageToStep = { home: 0, step1: 1, step2: 2, step3: 3, step4: 4, step5: 5, step6: 6 };
      const step = pageToStep[previewingPage] || 0;
      let url = versionStore.getLiveUrl();
      if (step > 0) url += (url.includes('?') ? '&' : '?') + `step=${step}`;
      editedIframe.src = url;
      originalIframe.src = url;
      // Restore snapshot on edited iframe only (device-aware)
      editedIframe.addEventListener('load', function onLoad() {
        editedIframe.removeEventListener('load', onLoad);
        editedIframe.contentWindow.postMessage({ type: 'DISABLE_EDIT_MODE' }, '*');
        const previewDevice = singleIframe.style.maxWidth === '375px' ? 'mobile' : 'desktop';
        const deviceKey = `sb_snap_${versionStore.projectId}_${previewingPage}_${previewDevice}`;
        const genericKey = `sb_snap_${versionStore.projectId}_${previewingPage}_desktop`;
        const fallbackKey = `sb_snap_${versionStore.projectId}_${previewingPage}`;
        const snapshot = localStorage.getItem(deviceKey) || localStorage.getItem(genericKey) || localStorage.getItem(fallbackKey);
        if (snapshot) { setTimeout(() => { editedIframe.contentWindow.postMessage({ type: 'RESTORE_SNAPSHOT', html: snapshot }, '*'); }, 1500); }
      });
      // Original stays as-is (no snapshot)
      originalIframe.addEventListener('load', function onLoad() {
        originalIframe.removeEventListener('load', onLoad);
        originalIframe.contentWindow.postMessage({ type: 'DISABLE_EDIT_MODE' }, '*');
      });
    } else {
      splitContainer.style.display = 'none';
      singleIframe.style.display = 'block';
    }
  });

  // Close button
  const closeBtn = document.getElementById('btn-close-preview');
  const closeBtnClone = closeBtn.cloneNode(true);
  closeBtn.parentNode.replaceChild(closeBtnClone, closeBtn);
  closeBtnClone.id = 'btn-close-preview';
  closeBtnClone.addEventListener('click', () => {
    iframe.removeEventListener('load', onIframeLoad);
    modal.style.display = 'none';
    iframe.src = '';
  });
}

// ===== SAVE =====
async function applyChanges(user) {
  showSavingModal();
  // Save current page snapshot to API
  await saveCurrentPageToAPI();

  const pending = versionStore.getPendingChanges();
  if (pending.length === 0) { hideSavingModal(); return; }
  const btn = document.getElementById('btn-apply-changes');
  const originalText = btn.innerHTML;
  btn.disabled = true; btn.innerHTML = '<span class="btn-spinner"></span> Guardando...'; btn.classList.add('saving');
  try {
    await versionStore.applyChanges(user);
    updatePendingCount();
    hideSavingModal();
    btn.innerHTML = '✓ Guardado'; btn.classList.remove('saving'); btn.classList.add('saved');
    setTimeout(() => { btn.innerHTML = originalText; btn.disabled = false; btn.classList.remove('saved'); }, 2000);
  } catch {
    hideSavingModal();
    btn.innerHTML = '✕ Error'; btn.classList.remove('saving');
    setTimeout(() => { btn.innerHTML = originalText; btn.disabled = false; }, 2000);
  }
}

function updatePendingCount() {
  const el = document.getElementById('pending-count');
  if (!el) return;
  el.textContent = versionStore.getPendingChanges().length;
}

// ===== VERSIONS & LOGS =====
async function renderVersions() {
  const list = document.getElementById('versions-list');
  if (!list) return;
  const versions = await versionStore.getVersions();
  if (versions.length === 0) { list.innerHTML = '<p class="empty-msg">Sin versiones aún</p>'; return; }
  list.innerHTML = versions.map(v => `<div class="version-card"><div class="version-card__top"><span class="version-id">${v.id}</span><span class="version-date">${new Date(v.timestamp).toLocaleString('es-CO')}</span></div><div class="version-card__meta">👤 ${v.userName} · ${v.changeCount} cambio(s)</div>${(v.changes || []).map(c => `<div class="version-change">• ${c.description || 'Cambio'}</div>`).join('')}</div>`).join('');
}

async function renderLogs() {
  const list = document.getElementById('logs-list');
  if (!list) return;
  const logs = await versionStore.getLogs();
  if (logs.length === 0) { list.innerHTML = '<p class="empty-msg">Sin registros aún</p>'; return; }
  list.innerHTML = `<table class="logs-table"><thead><tr><th>Fecha</th><th>Usuario</th><th>Descripción</th></tr></thead><tbody>${logs.map(l => `<tr><td>${new Date(l.timestamp).toLocaleString('es-CO')}</td><td>${l.userName}</td><td>${l.description}</td></tr>`).join('')}</tbody></table>`;
}

// ===== ADD PAGES FROM BASE =====
function renderAddPagesList() {
  const container = document.getElementById('add-pages-list');
  if (!container) return;

  // All available base pages for this template
  const allBasePages = versionStore.template === 'hogar' ? [
    { id: 'home', label: 'Home' },
    { id: 'step1', label: 'Datos personales' },
    { id: 'step2', label: 'Info vivienda' },
    { id: 'step3', label: 'Arme su plan' },
    { id: 'step4', label: 'Resumen' },
    { id: 'step5', label: 'Validación' },
    { id: 'step6', label: 'Bienvenida' }
  ] : [
    { id: 'home', label: 'Home' },
    { id: 'step1', label: 'Elija un plan' },
    { id: 'step2', label: 'Datos titular' },
    { id: 'step3', label: 'Datos complementarios' },
    { id: 'step4', label: 'Confirmar' },
    { id: 'step5', label: 'Pagar' }
  ];

  // Show ALL base pages — user can add any page even if already included (creates a copy)
  container.innerHTML = allBasePages.map(p => `
    <button class="left-panel__tool-btn add-page-btn" data-pageid="${p.id}" data-pagelabel="${p.label}">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      ${p.label}
    </button>
  `).join('');

  container.querySelectorAll('.add-page-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pageId = btn.dataset.pageid;
      const pageLabel = btn.dataset.pagelabel;
      addBasePageToProject(pageId, pageLabel);
    });
  });
}

function addBasePageToProject(pageId, label) {
  // Ask user where to place it
  const positions = PAGES.map((p, i) => `${i + 1}. Después de "${p.label}"`);
  const choice = prompt(`Añadir "${label}" al proyecto.\n\n¿Dónde desea ubicarla?\n\n${positions.join('\n')}\n\nIngrese el número:`);
  if (!choice) return;
  const idx = parseInt(choice);
  if (isNaN(idx) || idx < 1 || idx > PAGES.length) { alert('Posición no válida.'); return; }

  // Generate unique ID if page already exists
  const existingCount = PAGES.filter(p => p.id === pageId || p.id.startsWith(pageId + '-')).length;
  const uniqueId = existingCount > 0 ? `${pageId}-${Date.now().toString(36)}` : pageId;
  const displayLabel = existingCount > 0 ? `${label} (${existingCount + 1})` : label;

  // Determine the path for this page (uses the base page's step)
  const stepMap = { home: '/', step1: '/?step=1', step2: '/?step=2', step3: '/?step=3', step4: '/?step=4', step5: '/?step=5', step6: '/?step=6' };

  // Insert at the chosen position
  PAGES.splice(idx, 0, { id: uniqueId, label: displayLabel, path: stepMap[pageId] || '/', basePageId: pageId });
  savePagesOrder();
  renderPageNav();

  // Delete any existing snapshot for this page (start fresh with base design)
  localStorage.removeItem(`sb_snap_${versionStore.projectId}_${uniqueId}`);
  fetch(`http://localhost:4001/api/projects/${versionStore.projectId}/snapshots/${uniqueId}`, { method: 'DELETE' }).catch(() => {});

  alert(`✅ "${displayLabel}" añadida en la posición ${idx + 1} (diseño base original).`);
}

// ===== FLOW CONFIGURATION =====
async function renderFlowConfig() {
  const container = document.getElementById('flow-config-list');
  if (!container) return;

  // Load saved flow config (localStorage first, then API)
  const flowKey = `sb_flow_${versionStore.projectId}`;
  let flowConfig = {};
  try { flowConfig = JSON.parse(localStorage.getItem(flowKey) || '{}'); } catch {}
  // If empty, try API
  if (Object.keys(flowConfig).length === 0) {
    try {
      const r = await fetch(`http://localhost:4001/api/projects/${versionStore.projectId}/snapshots`);
      if (r.ok) { const snaps = await r.json(); if (snaps.__flow_config) { flowConfig = JSON.parse(snaps.__flow_config.html || '{}'); localStorage.setItem(flowKey, JSON.stringify(flowConfig)); } }
    } catch {}
  }

  let html = '';
  PAGES.forEach((page, idx) => {
    const nextPage = flowConfig[page.id] || (PAGES[idx + 1]?.id || 'none');
    html += `
      <div class="flow-item">
        <div class="flow-item__header">
          <span class="flow-item__number">${idx + 1}</span>
          <span class="flow-item__name">${page.label}</span>
        </div>
        <div class="flow-item__config">
          <label class="flow-item__label">Botón principal → ir a:</label>
          <select class="sb-input sb-input--sm flow-item__select" data-page="${page.id}">
            <option value="none" ${nextPage === 'none' ? 'selected' : ''}>— Sin acción —</option>
            ${PAGES.filter(p => p.id !== page.id).map(p => `<option value="${p.id}" ${nextPage === p.id ? 'selected' : ''}>${p.label}</option>`).join('')}
          </select>
        </div>
        <div class="flow-item__arrow">↓</div>
      </div>
    `;
  });

  html += `<button class="left-panel__tool-btn" id="btn-save-flow" style="margin-top:16px;">💾 Guardar flujo</button>`;
  container.innerHTML = html;

  // Save flow button
  document.getElementById('btn-save-flow')?.addEventListener('click', () => {
    const config = {};
    container.querySelectorAll('.flow-item__select').forEach(sel => {
      config[sel.dataset.page] = sel.value;
    });
    localStorage.setItem(flowKey, JSON.stringify(config));

    // Save to API (disk persistence)
    fetch(`http://localhost:4001/api/projects/${versionStore.projectId}/snapshots`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: '__flow_config', html: JSON.stringify(config) })
    }).catch(() => {});

    // Send flow config to iframe so buttons navigate correctly
    const iframe = document.getElementById('live-iframe');
    iframe.contentWindow.postMessage({ type: 'SET_FLOW_CONFIG', config }, '*');

    alert('✅ Flujo de navegación guardado.');
  });
}

// ===== IFRAME SCALING =====
function scaleIframeToFit() {
  // Iframe is now 100% width/height — no scaling needed
  // This function is kept for the resize event listener compatibility
}

// ===== EXPORT PROJECT =====
async function exportProject() {
  if (!versionStore.projectId) return;
  // First save any pending changes
  const pending = versionStore.getPendingChanges();
  if (pending.length > 0) {
    const user = getUser();
    await applyChanges(user);
  }
  // Trigger export
  try {
    const r = await fetch(`http://localhost:4001/api/projects/${versionStore.projectId}/export`, { method: 'POST' });
    const result = await r.json();
    if (result.ok) {
      alert(`✅ Proyecto exportado exitosamente.\n\n📁 Ubicación: apps/api/data/${result.exportDir}\n📄 ${result.manifest.totalChanges} cambio(s) en ${result.manifest.pages.length} página(s).\n\nComparta esta carpeta con el equipo de desarrollo.`);
    } else {
      alert('❌ Error al exportar.');
    }
  } catch (e) {
    alert('❌ Error de conexión al exportar.');
  }
}

document.addEventListener('DOMContentLoaded', init);
