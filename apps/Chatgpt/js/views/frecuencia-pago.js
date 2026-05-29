export function renderFrecuenciaPago(container) {
  container.innerHTML = `
    <!-- HEADER -->
    <header class="plan-header">
      <a href="/?step=4" class="cob-back">‹ Volver</a>
      <img src="/images/logo-seguros-bolivar.png" alt="Seguros Bolívar" class="plan-header__logo">
    </header>

    <!-- MAIN LAYOUT -->
    <div class="datos-layout">
      <!-- STEPPER SIDEBAR -->
      <aside class="datos-stepper">
        <div class="stepper-vertical">
          <div class="stepper-vertical__step">
            <div class="stepper-vertical__bull stepper-vertical__bull--completed"><div class="stepper-vertical__bull-inner stepper-vertical__bull-inner--completed">✓</div></div>
            <span class="stepper-vertical__label">Datos del titular</span>
          </div>
          <div class="stepper-vertical__line stepper-vertical__line--completed"></div>
          <div class="stepper-vertical__step">
            <div class="stepper-vertical__bull stepper-vertical__bull--completed"><div class="stepper-vertical__bull-inner stepper-vertical__bull-inner--completed">✓</div></div>
            <span class="stepper-vertical__label">Datos del hogar</span>
          </div>
          <div class="stepper-vertical__line stepper-vertical__line--completed"></div>
          <div class="stepper-vertical__step">
            <div class="stepper-vertical__bull stepper-vertical__bull--active"><div class="stepper-vertical__bull-inner">3</div></div>
            <span class="stepper-vertical__label stepper-vertical__label--active">Confirmar</span>
          </div>
          <div class="stepper-vertical__line"></div>
          <div class="stepper-vertical__step">
            <div class="stepper-vertical__bull"><div class="stepper-vertical__bull-inner">4</div></div>
            <span class="stepper-vertical__label">Pagar</span>
          </div>
        </div>
      </aside>

      <!-- CONTENT -->
      <section class="datos-content">
        <div class="datos-title-row">
          <img src="/images/icon-confirme.png" alt="" class="datos-title-icon">
          <h1 class="datos-title">Confirme su compra</h1>
        </div>

        <div class="confirm-cards">
          <!-- Frecuencia de pago -->
          <div class="confirm-card">
            <div class="confirm-card__title-row">
              <img src="/images/icon-calendar.png" alt="" class="confirm-card__icon">
              <h3 class="confirm-card__title">Frecuencia de pago</h3>
            </div>
            <div class="freq-options">
              <label class="freq-option">
                <div class="freq-option__tag">⭐ Ahorra pagando de contado</div>
                <div class="freq-option__content">
                  <div class="freq-option__label">
                    <strong>Pago<br>anual</strong>
                  </div>
                  <div class="freq-option__price-wrap">
                    <input type="radio" name="frecuencia" value="anual" class="freq-option__radio">
                    <div class="freq-option__price">
                      <strong class="freq-option__amount">$41.500</strong>
                      <span class="freq-option__iva">IVA incluido</span>
                    </div>
                  </div>
                </div>
              </label>
              <label class="freq-option">
                <div class="freq-option__content">
                  <div class="freq-option__label">
                    <strong>Pago<br>mensual</strong>
                  </div>
                  <div class="freq-option__price-wrap">
                    <input type="radio" name="frecuencia" value="mensual" class="freq-option__radio">
                    <div class="freq-option__price">
                      <strong class="freq-option__amount">$3.458</strong>
                      <span class="freq-option__iva">IVA incluido</span>
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- FOOTER -->
    <footer class="plan-footer">
      <button class="plan-footer__btn" disabled id="btn-pagar">Continuar</button>
    </footer>
  `;

  // Enable button when a frequency is selected
  setTimeout(() => {
    const btn = document.getElementById('btn-pagar');
    const radios = document.querySelectorAll('input[name="frecuencia"]');

    radios.forEach(r => r.addEventListener('change', () => {
      btn.disabled = false;
      btn.style.background = '#FFE16F';
      btn.style.color = '#038450';
      btn.style.cursor = 'pointer';
    }));

    btn.addEventListener('click', () => {
      if (!btn.disabled) window.location.href = '/?step=6';
    });
  }, 100);
}
