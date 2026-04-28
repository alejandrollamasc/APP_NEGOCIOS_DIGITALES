import '@sb/sb-ui-seguros-bolivar-light.min.css';
import '@sb/sb-ui-components.min.js';
import '../css/app.css';
import './editor-overlay.js';

import { store } from './store.js';
import { registerRoute, render, navigate } from './router.js';
import { renderStepper, initStepperEvents } from './components/stepper.js';
import { renderHeader } from './components/header.js';

import { renderStep1 } from './views/step1-home.js';
import { renderStep2 } from './views/step2-plans.js';
import { renderStep3 } from './views/step3-holder.js';
import { renderStep4 } from './views/step4-complementary.js';
import { renderStep5 } from './views/step5-confirm.js';
import { renderStep6 } from './views/step6-payment.js';

// Register all routes
registerRoute(1, renderStep1);
registerRoute(2, renderStep2);
registerRoute(3, renderStep3);
registerRoute(4, renderStep4);
registerRoute(5, renderStep5);
registerRoute(6, renderStep6);

function initApp() {
  const app = document.getElementById('app');
  const currentStep = store.get('currentStep');

  if (currentStep === 1) {
    // Home page - full width, no stepper, no generic header
    app.innerHTML = `
      <main id="app-content" class="app-main app-main--home"></main>
    `;
  } else {
    const showBack = currentStep > 2;
    app.innerHTML = `
      ${renderHeader(showBack)}
      <div class="app-layout">
        <aside class="app-sidebar">
          ${renderStepper()}
        </aside>
        <main id="app-content" class="app-main with-sidebar"></main>
      </div>
    `;
    initStepperEvents();

    // Back button - never go back to step 1 (home)
    const backBtn = document.getElementById('btn-back');
    if (backBtn) {
      backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const step = store.get('currentStep');
        if (step > 2) navigate(step - 1);
      });
    }
  }

  render();

  // Re-render layout when step changes
  store.subscribe((state) => {
    const hasLayout = !!document.querySelector('.app-sidebar');
    const backBtn = document.getElementById('btn-back');
    if (state.currentStep === 1 && hasLayout) {
      initApp();
    } else if (state.currentStep > 1 && !hasLayout) {
      initApp();
    } else if (state.currentStep === 2 && backBtn) {
      initApp();
    } else if (state.currentStep > 2 && !backBtn && hasLayout) {
      initApp();
    }
  });
}

// Listen for postMessage from admin iframe
let selectModeActive = false;
let highlightedEl = null;
let clipboard = null; // for copy/paste
let undoStack = [];
let redoStack = [];

// ===== UNDO/REDO =====
function saveState(el, description) {
  undoStack.push({ selector: getUniqueSelector(el), html: el.outerHTML, description });
  redoStack = [];
  window.parent.postMessage({ type: 'UNDO_STACK_UPDATED', undoCount: undoStack.length, redoCount: 0 }, '*');
}

// ===== CONTEXT MENU =====
function showContextMenu(el, x, y) {
  removeContextMenu();
  const menu = document.createElement('div');
  menu.id = 'sb-context-menu';
  menu.style.cssText = `position:fixed;top:${y}px;left:${x}px;background:#fff;border:1px solid #e0e0e0;border-radius:10px;box-shadow:0 4px 20px rgba(0,0,0,0.15);z-index:99999;min-width:160px;padding:4px 0;font-family:system-ui,sans-serif;font-size:13px;`;
  const items = [
    { icon: '✏️', label: 'Editar', action: 'edit' },
    { icon: '📋', label: 'Copiar', action: 'copy' },
    { icon: '📄', label: 'Duplicar', action: 'duplicate' },
    { icon: '↕️', label: 'Mover', action: 'move' },
    { icon: '🗑️', label: 'Eliminar', action: 'delete', danger: true },
  ];
  if (clipboard) items.splice(2, 0, { icon: '📌', label: 'Pegar', action: 'paste' });

  items.forEach(item => {
    const btn = document.createElement('button');
    btn.style.cssText = `display:flex;align-items:center;gap:8px;width:100%;padding:8px 14px;border:none;background:transparent;cursor:pointer;font-size:13px;font-family:inherit;color:${item.danger ? '#d32f2f' : '#333'};transition:background 0.1s;`;
    btn.innerHTML = `<span>${item.icon}</span><span>${item.label}</span>`;
    btn.addEventListener('mouseenter', () => btn.style.background = item.danger ? '#fde8e8' : '#f5f5f5');
    btn.addEventListener('mouseleave', () => btn.style.background = 'transparent');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      removeContextMenu();
      handleContextAction(item.action, el);
    });
    menu.appendChild(btn);
  });

  document.body.appendChild(menu);
  // Close on click outside
  setTimeout(() => document.addEventListener('click', removeContextMenu, { once: true }), 10);
}

function removeContextMenu() {
  const m = document.getElementById('sb-context-menu');
  if (m) m.remove();
}

function handleContextAction(action, el) {
  const selector = getUniqueSelector(el);
  switch (action) {
    case 'edit':
      // Send to admin for full editor
      window.parent.postMessage({
        type: 'ELEMENT_SELECTED',
        tagName: el.tagName.toLowerCase(),
        selector, textContent: el.textContent, className: el.className, id: el.id
      }, '*');
      break;
    case 'copy':
      clipboard = { html: el.outerHTML, tag: el.tagName };
      window.parent.postMessage({ type: 'CHAT_MSG', text: '📋 Elemento copiado.' }, '*');
      break;
    case 'paste':
      if (clipboard) {
        saveState(el, 'Pegar elemento');
        el.insertAdjacentHTML('afterend', clipboard.html);
        window.parent.postMessage({ type: 'CHAT_MSG', text: '📌 Elemento pegado.' }, '*');
      }
      break;
    case 'duplicate':
      saveState(el, 'Duplicar elemento');
      el.insertAdjacentHTML('afterend', el.outerHTML);
      window.parent.postMessage({ type: 'CHAT_MSG', text: '📄 Elemento duplicado.' }, '*');
      break;
    case 'move':
      enableDragMode(el);
      break;
    case 'delete':
      saveState(el, 'Eliminar elemento');
      el.style.display = 'none';
      window.parent.postMessage({ type: 'CHAT_MSG', text: '🗑️ Elemento eliminado.' }, '*');
      break;
  }
}

// ===== DRAG MODE =====
function enableDragMode(el) {
  saveState(el, 'Mover elemento');
  el.style.outline = '2px dashed #E8C916';
  el.style.cursor = 'grab';
  el.style.position = 'relative';
  let startX, startY, origLeft, origTop;

  function onDown(e) {
    e.preventDefault();
    startX = e.clientX; startY = e.clientY;
    origLeft = parseInt(el.style.left || 0); origTop = parseInt(el.style.top || 0);
    el.style.cursor = 'grabbing';
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp, { once: true });
  }
  function onMove(e) {
    el.style.left = (origLeft + e.clientX - startX) + 'px';
    el.style.top = (origTop + e.clientY - startY) + 'px';
  }
  function onUp() {
    document.removeEventListener('mousemove', onMove);
    el.style.cursor = '';
    el.style.outline = '';
    window.parent.postMessage({ type: 'CHAT_MSG', text: '↕️ Elemento movido.' }, '*');
  }
  el.addEventListener('mousedown', onDown, { once: true });
}

// ===== INLINE TEXT EDITING =====
function enableInlineEdit(el) {
  if (el.tagName === 'INPUT' || el.tagName === 'SELECT' || el.tagName === 'TEXTAREA' || el.tagName === 'BUTTON') return;
  if (el.querySelector('input, select, textarea')) return;
  if (!el.textContent.trim()) return;

  const original = el.textContent;
  el.contentEditable = true;
  el.style.outline = '2px solid #0a6741';
  el.style.outlineOffset = '2px';
  el.style.borderRadius = '4px';
  el.focus();

  // Show editing indicator
  const indicator = document.createElement('div');
  indicator.style.cssText = 'position:absolute;top:-22px;left:0;background:#0a6741;color:#fff;font-size:10px;padding:2px 8px;border-radius:4px 4px 0 0;font-family:system-ui;z-index:99998;pointer-events:none;';
  indicator.textContent = '✏️ Editando';
  el.style.position = el.style.position || 'relative';
  el.appendChild(indicator);

  function finish() {
    el.contentEditable = false;
    el.style.outline = '';
    el.style.outlineOffset = '';
    indicator.remove();
    if (el.textContent !== original) {
      window.parent.postMessage({ type: 'CHAT_MSG', text: `✏️ Texto editado: "${el.textContent.substring(0, 50)}..."` }, '*');
    }
  }
  el.addEventListener('blur', finish, { once: true });
  el.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); el.blur(); } });
}

// ===== MESSAGE HANDLER =====
window.addEventListener('message', (event) => {
  if (!event.data) return;

  if (event.data.type === 'NAVIGATE_TO_STEP') {
    const step = event.data.step;
    for (let i = 1; i < step; i++) store.completeStep(i);
    store.goToStep(step);
    initApp();
    return;
  }

  if (event.data.type === 'ADMIN_OVERRIDE') {
    const { selector, property, value } = event.data;
    try {
      const el = document.querySelector(selector);
      if (el) {
        if (property === 'textContent') el.textContent = value;
        else if (property === 'innerHTML') el.innerHTML = value;
        else if (property === 'src') el.src = value;
        else el.style[property] = value;
      }
    } catch (e) { /* ignore */ }
  }

  if (event.data.type === 'ENABLE_SELECT_MODE') {
    selectModeActive = true;
    document.body.style.cursor = 'crosshair';
  }

  if (event.data.type === 'DISABLE_SELECT_MODE') {
    selectModeActive = false;
    document.body.style.cursor = '';
    if (highlightedEl) { highlightedEl.style.outline = ''; highlightedEl = null; }
  }

  if (event.data.type === 'UNDO') {
    if (undoStack.length > 0) {
      const state = undoStack.pop();
      try {
        const el = document.querySelector(state.selector);
        if (el) {
          redoStack.push({ selector: state.selector, html: el.outerHTML, description: state.description });
          el.outerHTML = state.html;
        }
      } catch (e) { /* ignore */ }
      window.parent.postMessage({ type: 'UNDO_STACK_UPDATED', undoCount: undoStack.length, redoCount: redoStack.length }, '*');
      window.parent.postMessage({ type: 'CHAT_MSG', text: `↩️ Deshecho: ${state.description}` }, '*');
    }
  }

  if (event.data.type === 'REDO') {
    if (redoStack.length > 0) {
      const state = redoStack.pop();
      try {
        const el = document.querySelector(state.selector);
        if (el) {
          undoStack.push({ selector: state.selector, html: el.outerHTML, description: state.description });
          el.outerHTML = state.html;
        }
      } catch (e) { /* ignore */ }
      window.parent.postMessage({ type: 'UNDO_STACK_UPDATED', undoCount: undoStack.length, redoCount: redoStack.length }, '*');
      window.parent.postMessage({ type: 'CHAT_MSG', text: `↪️ Rehecho: ${state.description}` }, '*');
    }
  }
});

// ===== HOVER & CLICK HANDLERS =====
document.addEventListener('mouseover', (e) => {
  if (!selectModeActive) return;
  if (highlightedEl) highlightedEl.style.outline = '';
  highlightedEl = e.target;
  highlightedEl.style.outline = '2px solid #0a6741';
});

document.addEventListener('click', (e) => {
  if (!selectModeActive) return;
  e.preventDefault();
  e.stopPropagation();
  const el = e.target;

  // If text element, enable inline editing
  const isTextEl = ['P','SPAN','H1','H2','H3','H4','H5','H6','A','LABEL','LI','TD','TH'].includes(el.tagName);
  if (isTextEl && el.textContent.trim().length > 0 && el.children.length === 0) {
    enableInlineEdit(el);
    selectModeActive = false;
    document.body.style.cursor = '';
    if (highlightedEl) { highlightedEl.style.outline = ''; highlightedEl = null; }
    return;
  }

  // Otherwise send to admin editor
  window.parent.postMessage({
    type: 'ELEMENT_SELECTED',
    tagName: el.tagName.toLowerCase(),
    selector: getUniqueSelector(el),
    textContent: el.textContent,
    className: el.className,
    id: el.id
  }, '*');

  selectModeActive = false;
  document.body.style.cursor = '';
  if (highlightedEl) { highlightedEl.style.outline = ''; highlightedEl = null; }
}, true);

// Right-click context menu
document.addEventListener('contextmenu', (e) => {
  if (!selectModeActive) return;
  e.preventDefault();
  e.stopPropagation();
  showContextMenu(e.target, e.clientX, e.clientY);
}, true);

function getUniqueSelector(el) {
  if (el.id) return `#${el.id}`;
  if (el.className && typeof el.className === 'string') {
    const classes = el.className.trim().split(/\s+/).filter(c => !c.startsWith('hover') && !c.startsWith('sb-context'));
    if (classes.length > 0) {
      const selector = '.' + classes.join('.');
      if (document.querySelectorAll(selector).length === 1) return selector;
    }
  }
  const path = [];
  let current = el;
  while (current && current !== document.body) {
    let seg = current.tagName.toLowerCase();
    if (current.id) { path.unshift(`#${current.id}`); break; }
    const parent = current.parentElement;
    if (parent) {
      const siblings = Array.from(parent.children).filter(c => c.tagName === current.tagName);
      if (siblings.length > 1) seg += `:nth-of-type(${siblings.indexOf(current) + 1})`;
    }
    path.unshift(seg);
    current = current.parentElement;
  }
  return path.join(' > ');
}

document.addEventListener('DOMContentLoaded', initApp);
