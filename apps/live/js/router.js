import { store } from './store.js';
import { showLoadingModal } from './components/modals.js';

const routes = {};
let isNavigating = false;

export function registerRoute(step, renderFn) {
  routes[step] = renderFn;
}

export async function navigate(step) {
  if (isNavigating) return;
  const currentStep = store.get('currentStep');

  // Show loading when moving forward (not backward or same)
  if (step > currentStep) {
    isNavigating = true;
    const messages = {
      2: ['Cargando planes disponibles...', 'Un momento por favor'],
      3: ['Preparando el formulario...', 'Ya casi está listo'],
      4: ['Estamos validando su información...', 'Ya casi está listo'],
      5: ['Preparando el resumen...', 'Verificando datos'],
      6: ['Conectando con la pasarela de pagos...', 'Entorno seguro']
    };
    const [title, subtitle] = messages[step] || ['Cargando...', 'Un momento por favor'];
    store.goToStep(step);
    await showLoadingModal(title, subtitle);
    isNavigating = false;
    render();
  } else {
    store.goToStep(step);
    render();
  }
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
