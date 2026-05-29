export function renderStep5Success(container) {
  // Retrieve state
  const savedState = JSON.parse(sessionStorage.getItem('hogar_step3_state') || 'null');
  const state = savedState || { plan: 'basico', mode: 'anual' };

  const PLANS = {
    basico: { name: 'Básico' },
    intermedio: { name: 'Clásico' },
    completo: { name: 'Premium' }
  };
  const planData = PLANS[state.plan] || PLANS.basico;

  // Coverage dates
  const today = new Date();
  const endDate = new Date(today);
  endDate.setMonth(endDate.getMonth() + (state.mode === 'anual' ? 12 : 1));
  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const startStr = `${today.getDate().toString().padStart(2, '0')} de ${months[today.getMonth()]} del ${today.getFullYear()}`;
  const endStr = `${endDate.getDate().toString().padStart(2, '0')} de ${months[endDate.getMonth()]} del ${endDate.getFullYear()}`;

  container.innerHTML = `
    <div class="step5-page">
      <!-- ========== HEADER ========== -->
      <header class="step-header">
        <div class="step-header__inner">
          <a href="/" class="step-header__back" id="btn-exit">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M13 4L7 10l6 6" stroke="#016D38" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Salir
          </a>
          <div class="step-header__logo">
            <img src="/images/logo-seguros-bolivar.png" alt="Seguros Bolívar" class="step-header__logo-img">
          </div>
        </div>
      </header>

      <!-- ========== HERO BANNER ========== -->
      <div class="step5-hero">
        <div class="step5-hero__bg">
          <img src="/Iconos/Vector.png" alt="" class="step5-hero__vector">
        </div>
        <img src="/Iconos/Group 4581.png" alt="" class="step5-hero__confetti step5-hero__confetti--left">
        <img src="/Iconos/Group 4581.png" alt="" class="step5-hero__confetti step5-hero__confetti--right">
        <div class="step5-hero__content">
          <p class="step5-hero__subtitle">Juan Manuel su compra se ha realizado con éxito</p>
          <h1 class="step5-hero__title">¡Bienvenido a la familia Bolívar!</h1>
        </div>
      </div>

      <!-- ========== MAIN CONTENT ========== -->
      <div class="step5-main">
        <!-- Protection message -->
        <div class="step5-protection">
          <div class="step5-protection__icon">
            <img src="/Iconos/Protection.png" alt="" class="step5-protection__img">
          </div>
          <h2 class="step5-protection__title">Su hogar protegido y asegurado ante cualquier eventualidad</h2>
        </div>

        <p class="step5-dates">El Seguro de Hogar estará activo desde el <strong>${startStr}</strong>, hasta el <strong>${endStr}</strong>.</p>

        <!-- Info card -->
        <div class="step5-info-card">
          <p class="step5-info-card__text">En un momento, enviaremos los detalles de su seguro al correo electrónico <strong>correo@correo.com</strong>, allí podrá consultar:</p>

          <div class="step5-info-card__grid">
            <div class="step5-info-card__item">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="12" rx="2" stroke="#016D38" stroke-width="1.5"/><path d="M7 9h6M7 12h4" stroke="#016D38" stroke-width="1.5" stroke-linecap="round"/></svg>
              <span>Documentos con firma electrónica.</span>
            </div>
            <div class="step5-info-card__item">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="12" rx="2" stroke="#016D38" stroke-width="1.5"/><path d="M7 9h6M7 12h4" stroke="#016D38" stroke-width="1.5" stroke-linecap="round"/></svg>
              <span>Términos y condiciones del seguro.</span>
            </div>
            <div class="step5-info-card__item">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="12" rx="2" stroke="#016D38" stroke-width="1.5"/><path d="M7 9h6M7 12h4" stroke="#016D38" stroke-width="1.5" stroke-linecap="round"/></svg>
              <span>Factura electrónica de la compra.</span>
            </div>
            <div class="step5-info-card__item">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="8" r="3" stroke="#016D38" stroke-width="1.5"/><path d="M5 16c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="#016D38" stroke-width="1.5" stroke-linecap="round"/></svg>
              <span>Canales de atención.</span>
            </div>
          </div>

          <div class="step5-info-card__download">
            <p class="step5-info-card__download-text">Si desea ver y consultar su póliza, de clic en el botón para descargar.</p>
            <button class="step5-info-card__download-btn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 3v10M10 13l-3-3M10 13l3-3M4 15h12" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              Descargar póliza
            </button>
          </div>
        </div>

        <!-- Terms link -->
        <p class="step5-terms-link">Consultar los <a href="#">Términos y Condiciones del seguro</a></p>
      </div>

      <!-- ========== HOW TO USE SECTION ========== -->
      <div class="step5-howto">
        <h2 class="step5-howto__title">Conozca cómo usar su seguro</h2>
        <p class="step5-howto__subtitle">Cuente con acompañamiento y respaldo las 24 horas del día a través de los siguientes canales:</p>

        <div class="step5-howto__cards">
          <!-- Video card -->
          <div class="step5-howto-card step5-howto-card--video">
            <div class="step5-howto-card__overlay">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="22" fill="rgba(255,255,255,0.9)"/><path d="M20 16l12 8-12 8V16z" fill="#016D38"/></svg>
            </div>
          </div>

          <!-- App card -->
          <div class="step5-howto-card step5-howto-card--app">
            <div class="step5-howto-card__app-content">
              <img src="/images/logo-seguros-bolivar.png" alt="Bolívar Conmigo" class="step5-howto-card__app-logo">
              <p class="step5-howto-card__app-text">Descargue la App <strong>Bolívar Conmigo</strong> para usar y disfrutar su seguro</p>
            </div>
          </div>

          <!-- Contact card -->
          <div class="step5-howto-card step5-howto-card--contact">
            <div class="step5-howto-card__contact-content">
              <p class="step5-howto-card__contact-title">Comuníquese a través de nuestro WhatsApp oficial.</p>
              <button class="step5-howto-card__contact-btn">Contactar</button>
            </div>
          </div>
        </div>

        <p class="step5-howto__footer">También puede marcar desde su celular al <strong>#322</strong>, opciones <strong>1-2-2</strong>, le ayudaremos a solucionar cualquier evento que se pueda presentar.</p>
        <p class="step5-howto__footer-link"><a href="#">Tranquilo, Seguros Bolívar protege su hogar.</a></p>
      </div>
    </div>
  `;

  // Exit button
  document.getElementById('btn-exit')?.addEventListener('click', (e) => {
    e.preventDefault();
    sessionStorage.removeItem('hogar_step3_state');
    window.location.href = '/';
  });
}
