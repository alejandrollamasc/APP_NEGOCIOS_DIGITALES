import { store } from '../store.js';
import { navigate } from '../router.js';
import { validateEmail, validatePhone } from '../utils.js';

export function renderStep1(container) {
  const state = store.get('home');

  container.innerHTML = `
    <div class="home-page">
      <div class="home-hero">
        <div class="home-hero-content">
          <h1 class="home-title">Seguro<span class="text-primary">Salud</span> a su Medida</h1>
          <p class="home-subtitle">Proteja su salud y la de su familia con los mejores planes de salud complementaria.</p>
          <div class="home-features">
            <div class="home-feature">
              <span class="feature-icon">🏥</span>
              <span>Acceso a especialistas</span>
            </div>
            <div class="home-feature">
              <span class="feature-icon">🏠</span>
              <span>Médico en casa 24/7</span>
            </div>
            <div class="home-feature">
              <span class="feature-icon">💊</span>
              <span>Medicamentos incluidos</span>
            </div>
          </div>
        </div>
        <div class="home-form-wrapper">
          <div class="sb-ui-card home-form-card">
            <div class="sb-ui-card__body">
              <h2 class="form-title">Cotice su seguro de salud</h2>
              <p class="form-desc">Complete sus datos y conozca nuestros planes</p>
              <form id="home-form" novalidate>
                <div class="form-group">
                  <label class="form-label" for="home-name">Nombres y apellidos</label>
                  <input type="text" id="home-name" class="sb-ui-input" placeholder="Ej: Simón Bolívar" value="${state.fullName}" required>
                </div>
                <div class="form-group">
                  <label class="form-label" for="home-email">Correo electrónico</label>
                  <input type="email" id="home-email" class="sb-ui-input" placeholder="correo@ejemplo.com" value="${state.email}" required>
                </div>
                <div class="form-group">
                  <label class="form-label" for="home-phone">Número de celular</label>
                  <input type="tel" id="home-phone" class="sb-ui-input" placeholder="3001234567" value="${state.phone}" maxlength="10" required>
                </div>
                <div class="form-checks">
                  <label class="sb-ui-checkbox-label">
                    <input type="checkbox" id="home-privacy" ${state.acceptPrivacy ? 'checked' : ''} required>
                    <span>Acepto la <a href="#" class="link-primary">política de privacidad, los términos y condiciones del canal digital.</a></span>
                  </label>
                  <label class="sb-ui-checkbox-label">
                    <input type="checkbox" id="home-data" ${state.acceptData ? 'checked' : ''} required>
                    <span>Autorizo el <a href="#" class="link-primary">tratamiento de mis datos personales.</a></span>
                  </label>
                  <label class="sb-ui-checkbox-label">
                    <input type="checkbox" id="home-offers" ${state.acceptOffers ? 'checked' : ''}>
                    <span>Autorizo el envío de <a href="#" class="link-primary">información y ofertas comerciales.</a></span>
                  </label>
                </div>
                <button type="submit" class="sb-ui-button sb-ui-button--primary sb-ui-button--fill sb-ui-button--large home-submit-btn">
                  Cotizar ahora
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('home-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('home-name').value.trim();
    const email = document.getElementById('home-email').value.trim();
    const phone = document.getElementById('home-phone').value.trim();
    const privacy = document.getElementById('home-privacy').checked;
    const data = document.getElementById('home-data').checked;
    const offers = document.getElementById('home-offers').checked;

    // Validation
    let valid = true;
    document.querySelectorAll('.sb-ui-input--error').forEach(el => el.classList.remove('sb-ui-input--error'));
    document.querySelectorAll('.field-error').forEach(el => el.remove());

    if (!name) { showError('home-name', 'Ingrese su nombre completo'); valid = false; }
    if (!validateEmail(email)) { showError('home-email', 'Ingrese un correo válido'); valid = false; }
    if (!validatePhone(phone)) { showError('home-phone', 'Ingrese un celular válido (10 dígitos)'); valid = false; }
    if (!privacy) { showCheckError('home-privacy', 'Debe aceptar la política de privacidad'); valid = false; }
    if (!data) { showCheckError('home-data', 'Debe autorizar el tratamiento de datos'); valid = false; }

    if (!valid) return;

    store.update('home', { fullName: name, email, phone, acceptPrivacy: privacy, acceptData: data, acceptOffers: offers });
    store.completeStep(1);
    navigate(2);
  });
}

function showError(id, msg) {
  const input = document.getElementById(id);
  input.classList.add('sb-ui-input--error');
  const err = document.createElement('span');
  err.className = 'field-error';
  err.textContent = msg;
  input.parentNode.appendChild(err);
}

function showCheckError(id, msg) {
  const input = document.getElementById(id);
  const err = document.createElement('span');
  err.className = 'field-error';
  err.textContent = msg;
  input.closest('label').appendChild(err);
}
