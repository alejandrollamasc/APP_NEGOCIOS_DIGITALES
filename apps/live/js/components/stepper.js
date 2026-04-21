import { store } from '../store.js';
import { navigate } from '../router.js';

const STEPS = [
  { num: 1, label: 'Cantidad de Asegurados' },
  { num: 2, label: 'Elija un plan' },
  { num: 3, label: 'Datos del titular' },
  { num: 4, label: 'Datos de los asegurados' },
  { num: 5, label: 'Confirmar' },
  { num: 6, label: 'Pagar' }
];

export function renderStepper() {
  const state = store.get();

  return `
    <nav class="stepper-nav" aria-label="Progreso de compra">
      ${STEPS.map(s => {
        const isCompleted = state.completedSteps.includes(s.num);
        const isActive = state.currentStep === s.num;
        const canClick = isCompleted || s.num <= state.currentStep;
        return `
          <div class="stepper-item ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}" 
               data-step="${s.num}" 
               ${canClick ? 'role="button" tabindex="0"' : ''}>
            <div class="stepper-circle">
              ${isCompleted ? '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' : s.num}
            </div>
            <span class="stepper-label">${s.label}</span>
            ${s.num < 6 ? '<div class="stepper-line"></div>' : ''}
          </div>
        `;
      }).join('')}
    </nav>
  `;
}

export function initStepperEvents() {
  document.querySelectorAll('.stepper-item[role="button"]').forEach(el => {
    el.addEventListener('click', () => {
      const step = parseInt(el.dataset.step);
      const state = store.get();
      if (state.completedSteps.includes(step) || step <= state.currentStep) {
        navigate(step);
      }
    });
  });
}
