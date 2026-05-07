import '@sb/sb-ui-seguros-bolivar-light.min.css';
import '@sb/sb-ui-components.min.js';
import '../css/hogar.css';

import { renderHome } from './views/home.js';
import { renderStep1 } from './views/step1-info.js';
import { renderStep2Property } from './views/step2-property.js';
import { renderStep2House } from './views/step2-house.js';

function initApp() {
  const app = document.getElementById('app');
  const params = new URLSearchParams(window.location.search);
  const step = params.get('step');
  const option = params.get('option');

  app.innerHTML = `<main id="app-content" class="app-main app-main--home"></main>`;
  const content = document.getElementById('app-content');

  if (step === '2' && option === 'casa') {
    renderStep2House(content);
  } else if (step === '2') {
    renderStep2Property(content);
  } else if (step === '1') {
    renderStep1(content);
  } else {
    renderHome(content);
  }
}

// ===== MESSAGE HANDLER (for admin iframe communication) =====
window.addEventListener('message', (event) => {
  if (!event.data) return;

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

  if (event.data.type === 'ENABLE_SELECT_MODE' || event.data.type === 'ENABLE_EDIT_MODE') {
    document.body.style.cursor = 'crosshair';
    enableSelectMode();
  }

  if (event.data.type === 'DISABLE_SELECT_MODE' || event.data.type === 'DISABLE_EDIT_MODE') {
    document.body.style.cursor = '';
    disableSelectMode();
  }
});

// ===== SELECT MODE =====
let selectModeActive = false;
let highlightedEl = null;

function enableSelectMode() {
  selectModeActive = true;
}

function disableSelectMode() {
  selectModeActive = false;
  if (highlightedEl) {
    highlightedEl.style.outline = '';
    highlightedEl = null;
  }
}

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

function getUniqueSelector(el) {
  if (el.id) return `#${el.id}`;
  if (el.className && typeof el.className === 'string') {
    const classes = el.className.trim().split(/\s+/).filter(c => !c.startsWith('hover'));
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

// ===== LOAD PROJECT OVERRIDES =====
async function loadProjectOverrides() {
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get('project');
  if (!projectId) return;

  try {
    const res = await fetch(`http://localhost:4001/api/projects/${projectId}/overrides`);
    if (!res.ok) return;
    const changes = await res.json();
    if (!Array.isArray(changes) || changes.length === 0) return;

    setTimeout(() => {
      changes.forEach(c => {
        try {
          const el = document.querySelector(c.selector);
          if (el) {
            if (c.property === 'textContent') el.textContent = c.value;
            else if (c.property === 'innerHTML') el.innerHTML = c.value;
            else if (c.property === 'src') el.src = c.value;
            else el.style[c.property] = c.value;
          }
        } catch (e) { /* ignore */ }
      });
    }, 500);
  } catch (e) { /* API not available */ }
}

// Initialize app - modules are deferred so DOM is ready
function boot() {
  initApp();
  loadProjectOverrides();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
