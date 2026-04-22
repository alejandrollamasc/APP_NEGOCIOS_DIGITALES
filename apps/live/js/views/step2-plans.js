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
      <div class="plan-info-alert">
        <span>ℹ️ El costo de cada plan, corresponde al valor mensual por todos los asegurados.</span>
      </div>
      <div class="plans-grid">
        ${PLANS.map(plan => renderPlanCard(plan, selectedId)).join('')}
      </div>
      <p class="plans-disclaimer">Tenga en cuenta: Los servicios y puntos de atención varían de acuerdo a la ubicación de los asegurados.</p>
      
      <!-- Barra inferior estática -->
      <div class="plans-bottom-bar">
        <button class="plans-continue-btn" id="btn-continue-plan" disabled>Continuar</button>
      </div>
    </div>
  `;

  // Plan selection events
  document.querySelectorAll('.plan-card').forEach(card => {
    card.addEventListener('click', () => {
      const planId = card.dataset.planId;
      const plan = PLANS.find(p => p.id === planId);
      const wasSelected = card.classList.contains('selected');
      document.querySelectorAll('.plan-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      document.querySelectorAll('.plan-radio').forEach(r => r.checked = false);
      card.querySelector('.plan-radio').checked = true;
      store.set('selectedPlan', plan);
      // If already selected, advance
      if (wasSelected) {
        store.completeStep(2);
        navigate(3);
      }
      updateContinueBtn();
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

  // Enable/disable continue button
  updateContinueBtn();

  document.getElementById('btn-continue-plan').addEventListener('click', () => {
    const plan = store.get('selectedPlan');
    if (plan) {
      store.completeStep(2);
      navigate(3);
    }
  });
}

function updateContinueBtn() {
  const btn = document.getElementById('btn-continue-plan');
  if (!btn) return;
  const hasSelection = document.querySelector('.plan-card.selected');
  btn.disabled = !hasSelection;
}

function renderPlanCard(plan, selectedId) {
  const isSelected = plan.id === selectedId;
  const badgeClass = plan.tagColor === 'primary' ? 'plan-badge--blue' : 'plan-badge--green';
  return `
    <div class="plan-card ${isSelected ? 'selected' : ''} ${plan.recommended ? 'recommended' : ''}" data-plan-id="${plan.id}">
      <!-- Header: Plan Name + Badge + Radio -->
      <div class="plan-card__top">
        <div class="plan-card__title-row">
          <h3 class="plan-card__name">${plan.name}</h3>
          <span class="plan-badge ${badgeClass}">${plan.tag}</span>
          <input type="radio" name="plan" class="plan-radio" ${isSelected ? 'checked' : ''} aria-label="Seleccionar ${plan.name}">
        </div>
        <!-- Price sub-row -->
        <div class="plan-card__price-row">
          <span class="plan-card__price-label">Total mensual (IVA<br>incluido):</span>
          <span class="plan-card__price">${formatCurrency(plan.monthlyPrice)}</span>
        </div>
      </div>
      <!-- Benefits -->
      <div class="plan-card__body">
        <ul class="plan-benefits">
          ${plan.benefits.map(b => `
            <li class="benefit-item ${b.included ? 'included' : 'excluded'}">
              ${b.included 
                ? '<svg class="benefit-check" width="16" height="16" viewBox="0 0 18 18"><circle cx="9" cy="9" r="9" fill="#2E7D32"/><path d="M5 9l3 3 5-5" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'
                : '<svg class="benefit-x" width="16" height="16" viewBox="0 0 18 18"><circle cx="9" cy="9" r="9" fill="#E0E0E0"/><path d="M6 6l6 6M12 6l-6 6" stroke="#999" stroke-width="2" stroke-linecap="round"/></svg>'
              }
              <span>${b.text}</span>
              ${b.hasInfo ? '<span class="info-icon" title="Más información">ℹ️</span>' : ''}
            </li>
          `).join('')}
        </ul>
      </div>
      <!-- Footer -->
      <div class="plan-card__footer">
        <a href="#" class="plan-details-link">📋 Consultar detalles</a>
      </div>
    </div>
  `;
}
