export function renderHome(container) {
  container.innerHTML = `
    <!-- HEADER -->
    <header class="plan-header">
      <div class="plan-header__logo-wrap">
        <img src="/images/logo-seguros-bolivar.png" alt="Seguros Bolívar" class="plan-header__logo">
      </div>
    </header>

    <!-- HERO PLAN -->
    <section class="plan-hero">
      <!-- Decorations right -->
      <div class="plan-hero__decor-right">
        <img src="/images/group-4391.png" alt="" class="plan-hero__decor-img">
      </div>
      <!-- Decorations left -->
      <div class="plan-hero__decor-left">
        <img src="/images/group-4392.png" alt="" class="plan-hero__decor-img">
      </div>
      <!-- Top ellipse with label -->
      <div class="plan-hero__top-ellipse"></div>
      <div class="plan-hero__top-content">
        <p class="plan-hero__label">Seguro de Hogar</p>
        <div class="plan-hero__tag">
          <span class="plan-hero__tag-icon">✨</span>
          <span class="plan-hero__tag-text">Basado en tu conversación en ChatGPT</span>
        </div>
      </div>
      <!-- Content -->
      <div class="plan-hero__content">
        <div class="plan-hero__price-row">
          <h1 class="plan-hero__price">$41.500</h1>
        </div>
        <div class="plan-hero__suggested">
          <span class="plan-hero__suggested-text">Plan Sugerido</span>
        </div>
      </div>
    </section>

    <!-- PLAN DETAILS -->
    <section class="plan-details">
      <h2 class="plan-details__title">¿Qué incluye su plan?</h2>

      <div class="plan-card">
        <div class="plan-card__grid">
          <!-- Row 1 -->
          <div class="plan-card__item">
            <span class="plan-card__check">✓</span>
            <div class="plan-card__info">
              <p class="plan-card__desc">Daños por incendio o agua al interior del inmueble</p>
              <p class="plan-card__amount">Hasta por <strong>$1.000.000</strong></p>
            </div>
            <span class="plan-card__arrow">→</span>
          </div>
          <div class="plan-card__item">
            <span class="plan-card__check">✓</span>
            <div class="plan-card__info">
              <p class="plan-card__desc">Daños causados por lluvias, vientos fuertes, granizadas e inundaciones</p>
              <p class="plan-card__amount">Hasta por <strong>$1.000.000</strong></p>
            </div>
            <span class="plan-card__arrow">→</span>
          </div>

          <!-- Row 2 -->
          <div class="plan-card__item">
            <span class="plan-card__check">✓</span>
            <div class="plan-card__info">
              <p class="plan-card__desc">Daños en electrodomésticos por fallas eléctricas o de instalación</p>
              <p class="plan-card__amount">Hasta por <strong>$1.000.000</strong></p>
            </div>
            <span class="plan-card__arrow">→</span>
          </div>
          <div class="plan-card__item">
            <span class="plan-card__check">✓</span>
            <div class="plan-card__info">
              <p class="plan-card__desc">Robo al interior de su hogar con violencia o forzamiento</p>
              <p class="plan-card__amount">Hasta por <strong>$1.000.000</strong></p>
            </div>
            <span class="plan-card__arrow">→</span>
          </div>

          <!-- Row 3 -->
          <div class="plan-card__item">
            <span class="plan-card__check">✓</span>
            <div class="plan-card__info">
              <p class="plan-card__desc">Daños y pérdidas por disturbios sociales como protestas o huelgas</p>
              <p class="plan-card__amount">Hasta por <strong>$1.000.000</strong></p>
            </div>
            <span class="plan-card__arrow">→</span>
          </div>
          <div class="plan-card__item">
            <span class="plan-card__check">✓</span>
            <div class="plan-card__info">
              <p class="plan-card__desc">Daños a su hogar por impacto de vehículos o caída de árboles</p>
              <p class="plan-card__amount">Hasta por <strong>$1.000.000</strong></p>
            </div>
            <span class="plan-card__arrow">→</span>
          </div>

          <!-- Row 4 -->
          <div class="plan-card__item">
            <span class="plan-card__check">✓</span>
            <div class="plan-card__info">
              <p class="plan-card__desc">Daños por terremoto, maremoto o erupción volcánica</p>
              <p class="plan-card__amount">Hasta por <strong>$1.000.000</strong></p>
            </div>
            <span class="plan-card__arrow">→</span>
          </div>
        </div>

        <!-- Consultar coberturas -->
        <a href="/?step=1" class="plan-card__footer">
          <span class="plan-card__footer-text">Consultar todas las coberturas</span>
          <span class="plan-card__footer-arrow">›</span>
        </a>
      </div>
    </section>

    <!-- TERMS -->
    <section class="plan-terms">
      <label class="plan-terms__item">
        <input type="checkbox" class="plan-terms__checkbox" checked>
        <span class="plan-terms__text">Acepto la <a href="#">Política de Privacidad</a>, los <a href="#">Términos y Condiciones del Seguro Hogar y la Cobertura Seguridad Digital</a>, el <a href="#">Tratamiento de mis datos personales</a> y los <a href="#">Términos y Condiciones del canal digital</a></span>
      </label>
      <label class="plan-terms__item">
        <input type="checkbox" class="plan-terms__checkbox" checked>
        <span class="plan-terms__text">Autorizo el envío de la <a href="#">Información y ofertas comerciales.</a></span>
      </label>
    </section>

    <!-- FOOTER -->
    <footer class="plan-footer">
      <a href="/?step=2" class="plan-footer__btn" style="text-decoration:none;">Continuar</a>
    </footer>
  `;
}
