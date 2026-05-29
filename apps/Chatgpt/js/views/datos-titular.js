export function renderDatosTitular(container) {
  container.innerHTML = `
    <!-- HEADER -->
    <header class="plan-header">
      <a href="/" class="cob-back">‹ Volver</a>
      <img src="/images/logo-seguros-bolivar.png" alt="Seguros Bolívar" class="plan-header__logo">
    </header>

    <!-- MAIN LAYOUT -->
    <div class="datos-layout">
      <!-- STEPPER SIDEBAR -->
      <aside class="datos-stepper">
        <div class="stepper-vertical">
          <div class="stepper-vertical__step">
            <div class="stepper-vertical__bull stepper-vertical__bull--active"><div class="stepper-vertical__bull-inner">1</div></div>
            <span class="stepper-vertical__label stepper-vertical__label--active">Datos del titular</span>
          </div>
          <div class="stepper-vertical__line"></div>
          <div class="stepper-vertical__step">
            <div class="stepper-vertical__bull"><div class="stepper-vertical__bull-inner">2</div></div>
            <span class="stepper-vertical__label">Datos del hogar</span>
          </div>
          <div class="stepper-vertical__line"></div>
          <div class="stepper-vertical__step">
            <div class="stepper-vertical__bull"><div class="stepper-vertical__bull-inner">3</div></div>
            <span class="stepper-vertical__label">Confirmar</span>
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
          <img src="/images/icon-datos-titular.png" alt="" class="datos-title-icon">
          <h1 class="datos-title">Datos del titular</h1>
          <img src="/images/icon-tooltip.png" alt="info" class="datos-tooltip-icon" title="La persona que pagará el seguro">
        </div>

        <div class="datos-card">
          <div class="datos-form">
            <!-- Row 1: Tipo doc + Número doc -->
            <div class="datos-form__row">
              <div class="datos-form__field">
                <label class="datos-form__label">Tipo de documento</label>
                <div class="datos-form__select-wrap">
                  <select class="datos-form__select">
                    <option value="">Seleccione una opción</option>
                    <option>Cédula de ciudadanía</option>
                    <option>Cédula de extranjería</option>
                    <option>Pasaporte</option>
                  </select>
                  <span class="datos-form__select-arrow">▾</span>
                </div>
              </div>
              <div class="datos-form__field">
                <label class="datos-form__label">Número de documento</label>
                <input type="text" class="datos-form__input" placeholder="Ej: 1111111111">
              </div>
            </div>

            <!-- Row 2: Fecha expedición (full width) -->
            <div class="datos-form__field datos-form__field--full">
              <label class="datos-form__label">Fecha de expedición del documento</label>
              <div class="datos-form__input-wrap">
                <input type="text" class="datos-form__input" placeholder="DD/MM/AAAA">
                <span class="datos-form__input-icon">📅</span>
              </div>
            </div>

            <!-- Row 3: Primer Nombre + Segundo Nombre -->
            <div class="datos-form__row">
              <div class="datos-form__field">
                <label class="datos-form__label">Primer Nombre</label>
                <input type="text" class="datos-form__input" placeholder="Ej: Simón">
              </div>
              <div class="datos-form__field">
                <label class="datos-form__label">Segundo Nombre</label>
                <input type="text" class="datos-form__input" placeholder="Ej: Andres">
              </div>
            </div>

            <!-- Row 4: Primer Apellido + Segundo Apellido -->
            <div class="datos-form__row">
              <div class="datos-form__field">
                <label class="datos-form__label">Primer Apellido</label>
                <input type="text" class="datos-form__input" placeholder="Ej: Bolívar">
              </div>
              <div class="datos-form__field">
                <label class="datos-form__label">Segundo Apellido</label>
                <input type="text" class="datos-form__input" placeholder="Ej: Libertad">
              </div>
            </div>

            <!-- Row 5: Número de celular (full width) -->
            <div class="datos-form__field datos-form__field--full">
              <label class="datos-form__label">Número de celular</label>
              <input type="text" class="datos-form__input" placeholder="Ej: 311 000 0000">
            </div>

            <!-- Alert info -->
            <div class="datos-alert">
              <div class="datos-alert__line"></div>
              <div class="datos-alert__content">
                <div class="datos-alert__header">
                  <img src="/images/icon-tooltip-azul.png" alt="" class="datos-alert__icon">
                  <strong class="datos-alert__title">Validaremos su identidad para continuar de forma segura.</strong>
                </div>
                <p class="datos-alert__text">Así garantizamos que su información esté protegida en todo momento.</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>

    <!-- FOOTER -->
    <footer class="plan-footer">
      <a href="/?step=3" class="plan-footer__btn" id="btn-footer-titular" style="text-decoration:none;">Continuar</a>
    </footer>
  `;

  // Save form data to sessionStorage on navigation
  setTimeout(() => {
    document.getElementById('btn-footer-titular')?.addEventListener('click', () => {
      const data = {
        tipoDoc: container.querySelector('.datos-form__select')?.value || '',
        numDoc: container.querySelectorAll('.datos-form__input')[0]?.value || '',
        fechaExp: container.querySelectorAll('.datos-form__input')[1]?.value || '',
        primerNombre: container.querySelectorAll('.datos-form__input')[2]?.value || '',
        segundoNombre: container.querySelectorAll('.datos-form__input')[3]?.value || '',
        primerApellido: container.querySelectorAll('.datos-form__input')[4]?.value || '',
        segundoApellido: container.querySelectorAll('.datos-form__input')[5]?.value || '',
        celular: container.querySelectorAll('.datos-form__input')[6]?.value || ''
      };
      sessionStorage.setItem('datos_titular', JSON.stringify(data));
    });
  }, 100);
}