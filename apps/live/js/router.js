import { store } from './store.js';

const routes = {};

export function registerRoute(step, renderFn) {
  routes[step] = renderFn;
}

export function navigate(step) {
  store.goToStep(step);
  render();
}

export function render() {
  const step = store.get('currentStep');
  const container = document.getElementById('app-content');
  if (!container) return;

  const renderFn = routes[step];
  if (renderFn) {
    container.innerHTML = '';
    renderFn(container);
  }

  updateStepper();
}

function updateStepper() {
  const state = store.get();
  const steps = document.querySelectorAll('.stepper-item');

  steps.forEach(el => {
    const stepNum = parseInt(el.dataset.step);
    el.classList.remove('active', 'completed');

    if (state.completedSteps.includes(stepNum)) {
      el.classList.add('completed');
    }
    if (stepNum === state.currentStep) {
      el.classList.add('active');
    }
  });
}
