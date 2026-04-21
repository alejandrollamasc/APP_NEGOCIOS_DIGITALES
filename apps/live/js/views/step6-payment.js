import { store } from '../store.js';
import { formatCurrency } from '../utils.js';

export function renderStep6(container) {
  const state = store.get();
  const plan = state.selectedPlan;
  const payment = state.payment;

  container.innerHTML = `
    <div class="step-page">
      <h1 class="step-title">💳 Pasarela de pagos</h1>

      <div class="payment-layout">
        <div class="payment-form-section">
          <div class="sb-ui-card">
            <div class="sb-ui-card__body">
              <h3 class="payment-card-title">Información de pago</h3>
              <form id="payment-form" novalidate>
                <div class="form-group">
                  <label class="form-label" for="card-number">Número de tarjeta</label>
                  <input type="text" id="card-number" class="sb-ui-input" placeholder="1234 5678 9012 3456" maxlength="19" value="${payment.cardNumber}">
                </div>
                <div class="form-group">
                  <label class="form-label" for="card-holder">Nombre del titular</label>
                  <input type="text" id="card-holder" class="sb-ui-input" placeholder="Como aparece en la tarjeta" value="${payment.cardHolder}">
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label" for="card-expiry">Fecha de vencimiento</label>
                    <input type="text" id="card-expiry" class="sb-ui-input" placeholder="MM/AA" maxlength="5" value="${payment.expiryDate}">
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="card-cvv">CVV</label>
                    <input type="password" id="card-cvv" class="sb-ui-input" placeholder="***" maxlength="4" value="${payment.cvv}">
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label" for="installments">Número de cuotas</label>
                  <select id="installments" class="sb-ui-input sb-ui-select">
                    <option value="1" ${payment.installments === '1' ? 'selected' : ''}>1 cuota</option>
                    <option value="3" ${payment.installments === '3' ? 'selected' : ''}>3 cuotas</option>
                    <option value="6" ${payment.installments === '6' ? 'selected' : ''}>6 cuotas</option>
                    <option value="12" ${payment.installments === '12' ? 'selected' : ''}>12 cuotas</option>
                  </select>
                </div>

                <div class="payment-methods">
                  <span class="payment-method-label">Métodos aceptados:</span>
                  <div class="payment-icons">
                    <span class="payment-icon" title="Visa">💳 Visa</span>
                    <span class="payment-icon" title="Mastercard">💳 Mastercard</span>
                    <span class="payment-icon" title="PSE">🏦 PSE</span>
                  </div>
                </div>

                <div class="form-actions">
                  <button type="submit" class="sb-ui-button sb-ui-button--primary sb-ui-button--fill sb-ui-button--large payment-btn">
                    Pagar ${plan ? formatCurrency(plan.monthlyPrice) : ''}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="payment-summary-section">
          <div class="sb-ui-card">
            <div class="sb-ui-card__body">
              <h3 class="summary-title">Resumen de compra</h3>
              <div class="summary-plan">
                <span class="summary-plan-name">${plan ? plan.name : ''}</span>
                <span class="sb-ui-badge sb-ui-badge--success">${plan ? plan.tag : ''}</span>
              </div>
              <div class="summary-line">
                <span>Valor mensual</span>
                <span>${plan ? formatCurrency(plan.monthlyPrice) : ''}</span>
              </div>
              <div class="summary-line">
                <span>IVA incluido</span>
                <span>Sí</span>
              </div>
              <hr class="summary-divider">
              <div class="summary-line summary-total">
                <span>Total a pagar</span>
                <span>${plan ? formatCurrency(plan.monthlyPrice) : ''}</span>
              </div>
              <div class="sb-ui-alert sb-ui-alert--info summary-alert">
                <span>🔒 Pago seguro. Su información está protegida con encriptación SSL.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Card number formatting
  document.getElementById('card-number').addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 16);
    val = val.replace(/(\d{4})(?=\d)/g, '$1 ');
    e.target.value = val;
  });

  // Expiry formatting
  document.getElementById('card-expiry').addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (val.length >= 2) val = val.substring(0, 2) + '/' + val.substring(2);
    e.target.value = val;
  });

  // Form submit
  document.getElementById('payment-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
      cardNumber: document.getElementById('card-number').value,
      cardHolder: document.getElementById('card-holder').value.trim(),
      expiryDate: document.getElementById('card-expiry').value,
      cvv: document.getElementById('card-cvv').value,
      installments: document.getElementById('installments').value
    };

    let valid = true;
    document.querySelectorAll('.field-error').forEach(el => el.remove());
    document.querySelectorAll('.sb-ui-input--error').forEach(el => el.classList.remove('sb-ui-input--error'));

    if (data.cardNumber.replace(/\s/g, '').length < 16) { markError('card-number', 'Número de tarjeta inválido'); valid = false; }
    if (!data.cardHolder) { markError('card-holder', 'Ingrese el nombre del titular'); valid = false; }
    if (data.expiryDate.length < 5) { markError('card-expiry', 'Fecha inválida'); valid = false; }
    if (data.cvv.length < 3) { markError('card-cvv', 'CVV inválido'); valid = false; }

    if (!valid) return;

    store.update('payment', data);
    store.completeStep(6);

    // Show success
    showSuccess(container);
  });
}

function showSuccess(container) {
  container.innerHTML = `
    <div class="step-page success-page">
      <div class="success-card sb-ui-card">
        <div class="sb-ui-card__body success-body">
          <div class="success-icon">✅</div>
          <h1 class="success-title">¡Pago exitoso!</h1>
          <p class="success-text">Su seguro de salud ha sido activado correctamente.</p>
          <p class="success-text">Recibirá un correo electrónico con los detalles de su póliza.</p>
          <div class="sb-ui-alert sb-ui-alert--success">
            <span>Su póliza estará disponible en las próximas 24 horas en su correo electrónico.</span>
          </div>
          <button class="sb-ui-button sb-ui-button--primary sb-ui-button--fill" onclick="location.reload()">
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  `;
}

function markError(id, msg) {
  const el = document.getElementById(id);
  el.classList.add('sb-ui-input--error');
  const err = document.createElement('span');
  err.className = 'field-error';
  err.textContent = msg;
  el.parentNode.appendChild(err);
}
