import '@sb/sb-ui-seguros-bolivar-light.min.css';
import '@sb/sb-ui-components.min.js';
import '../css/app.css';

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
    app.innerHTML = `
      ${renderHeader(true)}
      <div class="app-layout">
        <aside class="app-sidebar">
          ${renderStepper()}
        </aside>
        <main id="app-content" class="app-main with-sidebar"></main>
      </div>
    `;
    initStepperEvents();

    // Back button
    const backBtn = document.getElementById('btn-back');
    if (backBtn) {
      backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const step = store.get('currentStep');
        if (step > 1) navigate(step - 1);
      });
    }
  }

  render();

  // Re-render layout when step changes between 1 and 2+
  store.subscribe((state) => {
    const hasLayout = !!document.querySelector('.app-sidebar');
    if (state.currentStep === 1 && hasLayout) {
      initApp();
    } else if (state.currentStep > 1 && !hasLayout) {
      initApp();
    }
  });
}

// Listen for postMessage from admin iframe
let selectModeActive = false;
let highlightedEl = null;

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
    } catch (e) { /* ignore invalid selectors */ }
  }

  if (event.data.type === 'ENABLE_SELECT_MODE') {
    selectModeActive = true;
    document.body.style.cursor = 'crosshair';
  }

  if (event.data.type === 'DISABLE_SELECT_MODE') {
    selectModeActive = false;
    document.body.style.cursor = '';
    if (highlightedEl) {
      highlightedEl.style.outline = '';
      highlightedEl = null;
    }
  }
});

// Element selection for admin
document.addEventListener('mouseover', (e) => {
  if (!selectModeActive) return;
  if (highlightedEl) highlightedEl.style.outline = '';
  highlightedEl = e.target;
  highlightedEl.style.outline = '2px solid #007a33';
});

document.addEventListener('click', (e) => {
  if (!selectModeActive) return;
  e.preventDefault();
  e.stopPropagation();

  const el = e.target;
  const selector = getUniqueSelector(el);

  window.parent.postMessage({
    type: 'ELEMENT_SELECTED',
    tagName: el.tagName.toLowerCase(),
    selector: selector,
    textContent: el.textContent,
    className: el.className,
    id: el.id
  }, '*');

  selectModeActive = false;
  document.body.style.cursor = '';
  if (highlightedEl) {
    highlightedEl.style.outline = '';
    highlightedEl = null;
  }
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
  // Build path
  const path = [];
  let current = el;
  while (current && current !== document.body) {
    let seg = current.tagName.toLowerCase();
    if (current.id) { path.unshift(`#${current.id}`); break; }
    const parent = current.parentElement;
    if (parent) {
      const siblings = Array.from(parent.children).filter(c => c.tagName === current.tagName);
      if (siblings.length > 1) {
        seg += `:nth-of-type(${siblings.indexOf(current) + 1})`;
      }
    }
    path.unshift(seg);
    current = current.parentElement;
  }
  return path.join(' > ');
}

document.addEventListener('DOMContentLoaded', initApp);
