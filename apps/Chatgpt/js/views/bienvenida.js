export function renderBienvenida(container) {
  const titular = JSON.parse(sessionStorage.getItem('datos_titular') || '{}');
  const nombre = [titular.primerNombre, titular.primerApellido].filter(Boolean).join('.').toLowerCase() || 'susana.casta';
  const correo = nombre ? `${nombre}@gmail.com` : 'susana.casta@gmail.com';
  container.innerHTML = `
    <!-- HEADER -->
    <header class="plan-header">
      <a href="/" class="cob-back">‹ Volver al inicio</a>
      <img src="/images/logo-seguros-bolivar.png" alt="Seguros Bolívar" class="plan-header__logo">
    </header>

    <!-- BANNER -->
    <section class="bienvenida-banner">
      <div class="bienvenida-banner__decor-left">
        <img src="/images/group-4392.png" alt="" class="bienvenida-banner__decor-img">
      </div>
      <div class="bienvenida-banner__decor-right">
        <img src="/images/group-4391.png" alt="" class="bienvenida-banner__decor-img">
      </div>
      <div class="bienvenida-banner__content">
        <p class="bienvenida-banner__subtitle">¡Su compra fue aprobada!</p>
        <h1 class="bienvenida-banner__title">Le damos la bienvenida a Seguros Bolívar</h1>
      </div>
    </section>

    <!-- CONTENT -->
    <section class="bienvenida-content">
      <div class="bienvenida-main">
        <!-- Title row -->
        <div class="bienvenida-title-row">
          <img src="/images/icon-llave-hogar.png" alt="" class="bienvenida-title-icon">
          <h2 class="bienvenida-title">Su hogar protegido y asegurado ante cualquier eventualidad</h2>
        </div>

        <!-- Vigencia -->
        <p class="bienvenida-vigencia">Puede disfrutar y hacer uso de su póliza desde el <strong>12 de febrero de 2024</strong> hasta el <strong>12 de febrero de 2025</strong>.</p>

        <!-- Info card -->
        <div class="bienvenida-info-card">
          <p class="bienvenida-info-card__text">En un máximo de 12 horas, enviaremos los detalles de su seguro al correo electrónico <strong>${correo}</strong>, allí podrá consultar:</p>
          <div class="bienvenida-info-card__grid">
            <div class="bienvenida-info-card__col">
              <div class="bienvenida-info-card__item">📝 Documentos con firma electrónica.</div>
              <div class="bienvenida-info-card__item">🔍 Términos y condiciones del seguro.</div>
            </div>
            <div class="bienvenida-info-card__col">
              <div class="bienvenida-info-card__item">💰 Factura electrónica de la compra.</div>
              <div class="bienvenida-info-card__item">🎧 Canales de atención.</div>
            </div>
          </div>
        </div>

        <!-- Approval -->
        <div class="bienvenida-approval">
          <img src="/images/icon-exitoso.png" alt="" class="bienvenida-approval__icon">
          <div class="bienvenida-approval__text">
            <span>Número de aprobación de la compra</span>
            <strong>45454654684</strong>
          </div>
        </div>
      </div>
    </section>
  `;
}
