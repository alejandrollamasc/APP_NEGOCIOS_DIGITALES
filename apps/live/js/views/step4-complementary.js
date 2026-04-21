import { store } from '../store.js';
import { navigate } from '../router.js';
import { EPS_OPTIONS, INCOME_SOURCES, COLOMBIAN_CITIES } from '../data/plans.js';
import { validateEmail } from '../utils.js';

export function renderStep4(container) {
  const comp = store.get('complementary');

  container.innerHTML = `
    <div class="step-page">
      <h1 class="step-title">👤 Datos del titular <span class="info-icon">ℹ️</span></h1>

      <div class="accordion-section">
        <div class="accordion-header completed-section">
          <span>✓ Datos básicos</span>
          <span class="accordion-arrow">&#8964;</span>
        </div>
      </div>

      <div class="accordion-section">
        <div class="accordion-header active" id="acc-comp-header">
          <span class="accordion-title">Datos Complementarios</span>
          <span class="accordion-arrow">&#8963;</span>
        </div>
        <div class="accordion-body show" id="acc-comp-body">
          <form id="comp-form" novalidate>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="birth-date">Fecha de nacimiento</label>
                <input type="date" id="birth-date" class="sb-ui-input" value="${comp.birthDate}">
              </div>
              <div class="form-group">
                <label class="form-label">Género de nacimiento</label>
                <div class="gender-toggle">
                  <button type="button" class="gender-btn ${comp.gender === 'Hombre' ? 'active' : ''}" data-gender="Hombre">Hombre</button>
                  <button type="button" class="gender-btn ${comp.gender === 'Mujer' ? 'active' : ''}" data-gender="Mujer">Mujer</button>
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="birth-city">Ciudad de nacimiento</label>
                <input type="text" id="birth-city" class="sb-ui-input" placeholder="Ej: Bogotá" value="${comp.birthCity}">
              </div>
              <div class="form-group">
                <label class="form-label" for="comp-email">Correo electrónico</label>
                <input type="email" id="comp-email" class="sb-ui-input" value="${comp.email || store.get('home').email}" placeholder="correo@ejemplo.com">
                <span class="field-hint">ℹ️ Este correo y número de celular serán sus llaves personales de acceso a canales digitales para usar su seguro.</span>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="res-city">Ciudad de residencia</label>
                <select id="res-city" class="sb-ui-input sb-ui-select">
                  <option value="">Seleccione una opción</option>
                  ${COLOMBIAN_CITIES.map(c => `<option value="${c}" ${comp.residenceCity === c ? 'selected' : ''}>${c}</option>`).join('')}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" for="res-address">Dirección de residencia</label>
                <input type="text" id="res-address" class="sb-ui-input" placeholder="CL 26 70 43" value="${comp.residenceAddress}">
              </div>
            </div>
            <div class="form-group">
              <label class="sb-ui-checkbox-label toggle-label">
                <input type="checkbox" id="use-address-all" ${comp.useAddressForAll ? 'checked' : ''}>
                <span class="toggle-switch"></span>
                <span>Usar esta dirección para todos los asegurados.</span>
              </label>
            </div>
            <div class="form-group">
              <label class="form-label" for="eps-select">EPS Actual</label>
              <select id="eps-select" class="sb-ui-input sb-ui-select">
                <option value="">Seleccione una opción</option>
                ${EPS_OPTIONS.map(e => `<option value="${e}" ${comp.currentEPS === e ? 'selected' : ''}>${e}</option>`).join('')}
              </select>
              <span class="field-hint">ℹ️ Su afiliación a una EPS en el régimen contributivo debe ser vigente o su seguro podrá ser cancelado.</span>
            </div>
            <div class="form-group">
              <label class="form-label" for="income-source">¿De dónde provienen sus ingresos?</label>
              <select id="income-source" class="sb-ui-input sb-ui-select">
                <option value="">Seleccione una opción</option>
                ${INCOME_SOURCES.map(i => `<option value="${i}" ${comp.incomeSource === i ? 'selected' : ''}>${i}</option>`).join('')}
              </select>
            </div>
            <div class="form-actions">
              <button type="submit" class="sb-ui-button sb-ui-button--primary sb-ui-button--fill">Continuar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;

  // Gender toggle
  document.querySelectorAll('.gender-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.gender-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Form submit
  document.getElementById('comp-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const activeGender = document.querySelector('.gender-btn.active');
    const data = {
      birthDate: document.getElementById('birth-date').value,
      gender: activeGender ? activeGender.dataset.gender : '',
      birthCity: document.getElementById('birth-city').value.trim(),
      email: document.getElementById('comp-email').value.trim(),
      residenceCity: document.getElementById('res-city').value,
      residenceAddress: document.getElementById('res-address').value.trim(),
      useAddressForAll: document.getElementById('use-address-all').checked,
      currentEPS: document.getElementById('eps-select').value,
      incomeSource: document.getElementById('income-source').value
    };

    let valid = true;
    document.querySelectorAll('.field-error').forEach(el => el.remove());
    document.querySelectorAll('.sb-ui-input--error').forEach(el => el.classList.remove('sb-ui-input--error'));

    if (!data.birthDate) { markError('birth-date', 'Ingrese fecha de nacimiento'); valid = false; }
    if (!data.gender) { valid = false; }
    if (!validateEmail(data.email)) { markError('comp-email', 'Ingrese un correo válido'); valid = false; }
    if (!data.residenceCity) { markError('res-city', 'Seleccione ciudad de residencia'); valid = false; }
    if (!data.currentEPS) { markError('eps-select', 'Seleccione su EPS'); valid = false; }
    if (!data.incomeSource) { markError('income-source', 'Seleccione fuente de ingresos'); valid = false; }

    if (!valid) return;

    store.update('complementary', data);
    store.completeStep(4);
    navigate(5);
  });
}

function markError(id, msg) {
  const el = document.getElementById(id);
  el.classList.add('sb-ui-input--error');
  const err = document.createElement('span');
  err.className = 'field-error';
  err.textContent = msg;
  el.parentNode.appendChild(err);
}
