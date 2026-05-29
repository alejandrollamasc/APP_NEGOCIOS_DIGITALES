import { store } from '../store.js';
import { navigate } from '../router.js';
import { formatDate, getTodayISO, addOneYear } from '../utils.js';

export function renderStep5(container) {
  const state = store.get();
  const holder = state.holder;
  const comp = state.complementary;
  const plan = state.selectedPlan;
  const today = getTodayISO();
  const nextYear = addOneYear(today);

  const fullName = [holder.firstName, holder.secondName, holder.firstLastName, holder.secondLastName].filter(Boolean).join(' ');

  // Use Plan M Plus details for confirmation (as shown in the image)
  const confirmBenefits = plan ? plan.benefits.filter(b => b.included).map(b => b.text) : [];

  container.innerHTML = `
    <div class="step-page">
      <h1 class="step-title">✅ Confirme su compra</h1>

      <div class="confirm-banner sb-ui-card">
        <div class="confirm-banner-inner">
          <span class="confirm-banner-icon">📋</span>
          <div>
            <h2 class="confirm-banner-title">¡Ya casi terminamos!</h2>
            <p class="confirm-banner-text">Verifique que toda la información esté correcta.</p>
          </div>
        </div>
      </div>

      <div class="confirm-section sb-ui-card">
        <h3 class="confirm-section-title">👤 Datos del titular</h3>
        <div class="confirm-data-grid">
          <div class="confirm-data-item">
            <span class="confirm-data-label">Nombre:</span>
            <span class="confirm-data-value">${fullName}</span>
          </div>
          <div class="confirm-data-item">
            <span class="confirm-data-label">Cédula de Ciudadanía:</span>
            <span class="confirm-data-value">${holder.documentNumber}</span>
          </div>
          <div class="confirm-data-item">
            <span class="confirm-data-label">Correo electrónico:</span>
            <span class="confirm-data-value">${comp.email}</span>
          </div>
        </div>
      </div>

      <div class="confirm-section sb-ui-card">
        <h3 class="confirm-section-title">🏥 ${plan ? plan.name : 'Plan seleccionado'}</h3>
        <ul class="confirm-benefits">
          ${confirmBenefits.map(b => `
            <li class="confirm-benefit-item">
              <svg class="benefit-check" width="18" height="18" viewBox="0 0 18 18"><circle cx="9" cy="9" r="9" fill="#2E7D32"/><path d="M5 9l3 3 5-5" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
              <span>${b}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <div class="confirm-section sb-ui-card">
        <h3 class="confirm-section-title">📅 Vigencia de la póliza</h3>
        <div class="confirm-vigencia">
          <span class="vigencia-date">${formatDate(today)}</span>
          <span class="vigencia-arrow">➜</span>
          <span class="vigencia-date">${formatDate(nextYear)}</span>
        </div>
        <p class="vigencia-note">La cobertura tiene vigencia de un año (ininterrumpida) hasta que usted decida voluntariamente cancelar el seguro.</p>
      </div>

      <div class="confirm-edit-row">
        <a href="#" class="confirm-edit-link" id="btn-edit">✏️ Editar información</a>
      </div>

      <div class="bottom-bar">
        <button class="bottom-bar__btn" id="btn-confirm">Confirmar y pagar</button>
      </div>
    </div>
  `;

  document.getElementById('btn-edit').addEventListener('click', () => navigate(3));
  document.getElementById('btn-confirm').addEventListener('click', () => {
    store.completeStep(5);
    navigate(6);
  });
}
