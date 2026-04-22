import { store } from '../store.js';
import { navigate } from '../router.js';
import { validateEmail, validatePhone } from '../utils.js';

export function renderStep1(container) {
  const state = store.get('home');

  container.innerHTML = `
    <div class="home-page">
      <!-- ========== TOP TABS BAR (green) ========== -->
      <div class="sb-top-bar">
        <div class="sb-top-bar__inner">
          <a href="#" class="sb-top-bar__tab sb-top-bar__tab--active">Personas</a>
          <a href="https://www.segurosbolivar.com/empresas" target="_blank" class="sb-top-bar__tab">Empresas</a>
          <a href="https://www.segurosbolivar.com/arl" target="_blank" class="sb-top-bar__tab">ARL</a>
          <a href="https://www.segurosbolivar.com/clientes-davivienda" target="_blank" class="sb-top-bar__tab">Clientes Davivienda</a>
        </div>
      </div>

      <!-- ========== MAIN NAVBAR (white) ========== -->
      <nav class="sb-navbar">
        <div class="sb-navbar__inner">
          <!-- Logo -->
          <a href="https://www.segurosbolivar.com" target="_blank" class="sb-navbar__logo" aria-label="Seguros Bolívar">
            <img src="/images/logo-seguros-bolivar.png" alt="Seguros Bolívar" class="sb-navbar__logo-img">
          </a>

          <!-- Nav links -->
          <div class="sb-navbar__links">
            <a href="https://www.segurosbolivar.com" target="_blank" class="sb-navbar__link">Seguros <svg width="10" height="6" viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg></a>
            <a href="https://www.segurosbolivar.com" target="_blank" class="sb-navbar__link">Títulos de Capitalización <svg width="10" height="6" viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg></a>
            <a href="https://www.segurosbolivar.com" target="_blank" class="sb-navbar__link">Trámites <svg width="10" height="6" viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg></a>
            <a href="https://www.segurosbolivar.com" target="_blank" class="sb-navbar__link">Conózcanos <svg width="10" height="6" viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg></a>
          </div>

          <!-- Right actions -->
          <div class="sb-navbar__actions">
            <a href="#" class="sb-navbar__action">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5.5" stroke="#333" stroke-width="1.5"/><path d="M11 11l3.5 3.5" stroke="#333" stroke-width="1.5" stroke-linecap="round"/></svg>
              Búsqueda
            </a>
            <a href="https://recaudos.segurosbolivar.com/login" target="_blank" class="sb-navbar__action sb-navbar__action--btn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="10" rx="2" stroke="#007a33" stroke-width="1.5"/><path d="M1 7h14" stroke="#007a33" stroke-width="1.5"/></svg>
              Pagos
            </a>
            <a href="https://clientes.segurosbolivar.com/login" target="_blank" class="sb-navbar__action sb-navbar__action--btn sb-navbar__action--primary">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="3.5" stroke="#007a33" stroke-width="1.5"/><path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#007a33" stroke-width="1.5" stroke-linecap="round"/></svg>
              Acceso Clientes
            </a>
          </div>

          <!-- Mobile hamburger -->
          <button class="sb-navbar__hamburger" id="mobile-menu-btn" aria-label="Menú">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      <!-- ========== BREADCRUMB ========== -->
      <div class="sb-breadcrumb">
        <div class="sb-breadcrumb__inner">
          <a href="https://www.segurosbolivar.com" target="_blank" class="sb-breadcrumb__link">Inicio</a>
          <span class="sb-breadcrumb__sep">&gt;</span>
          <span class="sb-breadcrumb__current">Seguros En Línea</span>
          <span class="sb-breadcrumb__sep">&gt;</span>
          <span class="sb-breadcrumb__current">Seguro de Salud a su Medida</span>
        </div>
      </div>

      <!-- ========== HERO SECTION (full-width background) ========== -->
      <div class="sb-hero">
        <img src="/images/banner_desktop-1.webp"
             alt="Doctora con paciente" class="sb-hero__bg">

        <!-- Warning banner floating top-left -->
        <div class="sb-warning">
          <strong>Tenga en cuenta:</strong> Aquí solo podrá comprar seguros de salud. (Ni ARL ni EPS).
        </div>

        <!-- Title overlay bottom-left -->
        <div class="sb-hero__overlay">
          <h1 class="sb-hero__title">Seguro Salud a su Medida</h1>
          <p class="sb-hero__subtitle">Planes que se ajustan a todas las necesidades</p>
        </div>

        <!-- Form card floating right -->
        <div class="sb-hero__form">
          <h2 class="sb-hero__form-title">
            <span class="sb-hero__form-pre">Seguro</span>
            Salud a su Medida
          </h2>
          <p class="sb-hero__form-desc">Arme su plan y descubra una mejor forma de estar protegido.</p>

          <form id="home-form" novalidate>
            <div class="form-group">
              <label class="form-label" for="home-name">Nombres y apellidos</label>
              <input type="text" id="home-name" class="sb-ui-input" placeholder="Ej: Ana Pinzón" value="${state.fullName}" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="home-email">Correo electrónico</label>
              <div class="input-with-icon">
                <input type="email" id="home-email" class="sb-ui-input" placeholder="Ej: sucorreo@email.com" value="${state.email}" required>
                <svg class="input-trail-icon" width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="3" width="16" height="12" rx="2" stroke="#999" stroke-width="1.2"/><path d="M1 5l8 5 8-5" stroke="#999" stroke-width="1.2"/></svg>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label" for="home-phone">Número de celular</label>
              <div class="input-with-icon">
                <input type="tel" id="home-phone" class="sb-ui-input" placeholder="Ej: 311 123 1234" value="${state.phone}" maxlength="10" required>
                <svg class="input-trail-icon" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M16 12.4l-3.2-1.4a1 1 0 00-1 .1l-1.4 1.1a10.5 10.5 0 01-4.6-4.6l1.1-1.4a1 1 0 00.1-1L5.6 2A1 1 0 004.5 1.5l-2 .5A1 1 0 002 3c0 7.7 6.3 14 14 14a1 1 0 001-0.5l.5-2a1 1 0 00-.5-1.1z" stroke="#999" stroke-width="1.2" fill="none"/></svg>
              </div>
            </div>
            <div class="sb-hero__checks">
              <label class="sb-hero__check">
                <input type="checkbox" id="home-privacy" ${state.acceptPrivacy ? 'checked' : ''} required>
                <span>Acepto la <a href="https://d9b6rardqz97a.cloudfront.net/wp-content/uploads/2024/02/16112906/240213_transv_5335_15Feb24.pdf" target="_blank" class="link-green">política de privacidad, los términos y condiciones del canal digital.</a></span>
              </label>
              <label class="sb-hero__check">
                <input type="checkbox" id="home-data" ${state.acceptData ? 'checked' : ''} required>
                <span>Autorizo el <a href="#" class="link-green">tratamiento de mis datos personales.</a></span>
              </label>
              <label class="sb-hero__check">
                <input type="checkbox" id="home-offers" ${state.acceptOffers ? 'checked' : ''}>
                <span>Autorizo el envío de <a href="#" class="link-green">información y ofertas comerciales.</a></span>
              </label>
            </div>
            <div class="sb-hero__form-action">
              <button type="submit" class="sb-hero__submit">
                Cotice y compre
              </button>
            </div>
          </form>
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
  input.closest('.form-group').appendChild(err);
}

function showCheckError(id, msg) {
  const input = document.getElementById(id);
  const err = document.createElement('span');
  err.className = 'field-error';
  err.textContent = msg;
  input.closest('label').appendChild(err);
}
