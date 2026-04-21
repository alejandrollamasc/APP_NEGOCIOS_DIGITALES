import { store } from '../store.js';
import { navigate } from '../router.js';
import { PLANS } from '../data/plans.js';
import { formatCurrency } from '../utils.js';

export function renderStep2(container) {
  const state = store.get();
  const selectedId = state.selectedPlan?.id || 'plan-m';

  container.innerHTML = `
    <div class="step-page">
      <h1 class="step-title">📋 Escoja su plan ideal</h1>
      <div class="sb-ui-alert sb-ui-alert--info plan-info-alert">
        <span>ℹ️ El costo de cada plan, corresponde al valor mensual por todos los asegurados.</span>
      </div>
      <div class="plans-grid">
        ${PLANS.map(plan => renderPlanCard(plan, selectedId)).join('')}
      </div>
      <p class="plans-disclaimer">Tenga en cuenta: Los servicios y puntos de atención varían de acuerdo a la ubicación de los asegurados.</p>
    </div>
  `;

  // Plan selection events
  document.querySelectorAll('.plan-card').forEach(card => {
    card.addEventListener('click', () => {
      const planId = card.dataset.planId;
      const plan = PLANS.find(p => p.id === planId);
      document.querySelectorAll('.plan-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      document.querySelectorAll('.plan-radio').forEach(r => r.checked = false);
      card.querySelector('.plan-radio').checked = true;
      store.set('selectedPlan', plan);
    });
  });

  document.querySelectorAll('.btn-select-plan').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const planId = btn.closest('.plan-card').dataset.planId;
      const plan = PLANS.find(p => p.id === planId);
      store.set('selectedPlan', plan);
      store.completeStep(2);
      navigate(3);
    });
  });

  // Auto-select default
  const defaultCard = document.querySelector(`[data-plan-id="${selectedId}"]`);
  if (defaultCard) {
    defaultCard.classList.add('selected');
    defaultCard.querySelector('.plan-radio').checked = true;
  }
}

function renderPlanCard(plan, selectedId) {
  const isSelected = plan.id === selectedId;
  return `
    <div class="plan-card sb-ui-card ${isSelected ? 'selected' : ''} ${plan.recommended ? 'recommended' : ''}" data-plan-id="${plan.id}">
      <div class="plan-card-header">
        <div class="plan-name-row">
          <h3 class="plan-name">${plan.name}</h3>
          <span class="sb-ui-badge sb-ui-badge--${plan.tagColor === 'primary' ? 'info' : 'success'}">${plan.tag}</span>
          <input type="radio" name="plan" class="plan-radio" ${isSelected ? 'checked' : ''} aria-label="Seleccionar ${plan.name}">
        </div>
        <div class="plan-price-row">
          <span class="plan-price-label">Total mensual (IVA incluido)</span>
          <span class="plan-price">${formatCurrency(plan.monthlyPrice)}</span>
        </div>
      </div>
      <div class="plan-card-body">
        <ul class="plan-benefits">
          ${plan.benefits.map(b => `
            <li class="benefit-item ${b.included ? 'included' : 'excluded'}">
              ${b.included 
                ? '<svg class="benefit-check" width="18" height="18" viewBox="0 0 18 18"><circle cx="9" cy="9" r="9" fill="#2E7D32"/><path d="M5 9l3 3 5-5" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'
                : '<svg class="benefit-x" width="18" height="18" viewBox="0 0 18 18"><circle cx="9" cy="9" r="9" fill="#E0E0E0"/><path d="M6 6l6 6M12 6l-6 6" stroke="#999" stroke-width="2" stroke-linecap="round"/></svg>'
              }
              <span>${b.text}</span>
              ${b.hasInfo ? '<span class="info-icon" title="Más información">ℹ️</span>' : ''}
            </li>
          `).join('')}
        </ul>
      </div>
      <div class="plan-card-footer">
        <button class="btn-select-plan sb-ui-button sb-ui-button--primary sb-ui-button--fill">
          Seleccionar plan
        </button>
        <a href="#" class="plan-details-link">📋 Consultar detalles</a>
      </div>
    </div>
  `;
}
