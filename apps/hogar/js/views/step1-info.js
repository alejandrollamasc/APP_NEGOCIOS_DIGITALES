export function renderStep1(container) {
  container.innerHTML = `
    <div class="step1-page">
      <!-- ========== HEADER SIMPLE ========== -->
      <header class="step-header">
        <div class="step-header__inner">
          <a href="#" class="step-header__back" id="btn-back">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M13 4L7 10l6 6" stroke="#016D38" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            VOLVER
          </a>
          <div class="step-header__logo">
            <img src="/images/logo-seguros-bolivar.png" alt="Seguros Bolívar" class="step-header__logo-img">
          </div>
        </div>
      </header>

      <!-- ========== CONTENT ========== -->
      <div class="step1-content">
        <!-- Title -->
        <h1 class="step1-title">¡Configure las coberturas a su medida!</h1>

        <!-- Stepper -->
        <div class="step1-stepper">
          <div class="step1-stepper__step step1-stepper__step--active">
            <div class="step1-stepper__bull-wrap">
              <div class="step1-stepper__bull step1-stepper__bull--active">
                <span>1</span>
              </div>
            </div>
            <p class="step1-stepper__label step1-stepper__label--active">Ingrese sus datos</p>
          </div>
          <div class="step1-stepper__line"></div>
          <div class="step1-stepper__step">
            <div class="step1-stepper__bull">
              <span>2</span>
            </div>
            <p class="step1-stepper__label">Arme su plan</p>
          </div>
          <div class="step1-stepper__line"></div>
          <div class="step1-stepper__step">
            <div class="step1-stepper__bull">
              <span>3</span>
            </div>
            <p class="step1-stepper__label">Confirme su compra</p>
          </div>
          <div class="step1-stepper__line"></div>
          <div class="step1-stepper__step">
            <div class="step1-stepper__bull">
              <span>4</span>
            </div>
            <p class="step1-stepper__label">Pague su seguro</p>
          </div>
        </div>

        <!-- Form Card -->
        <div class="step1-card">
          <!-- Header with icon -->
          <div class="step1-card__header">
            <img src="/Iconos/Group 4579.png" alt="" class="step1-card__icon">
            <h2 class="step1-card__title">Su información personal</h2>
            <p class="step1-card__desc">Conocer sus datos personales como <strong>propietario</strong> nos permite saber qué tipo de seguro es mejor para usted.</p>
          </div>

          <!-- Form columns -->
          <div class="step1-card__body">
            <!-- Left column: personal data -->
            <div class="step1-card__col-left">
              <div class="step1-form-row">
                <div class="step1-form-group step1-form-group--small">
                  <label class="step1-form-label">Tipo de documento</label>
                  <select class="step1-input step1-select" id="doc-type">
                    <option value="cc">C.C.</option>
                    <option value="ce">C.E.</option>
                    <option value="nit">NIT</option>
                  </select>
                </div>
                <div class="step1-form-group step1-form-group--large">
                  <label class="step1-form-label">Número de documento</label>
                  <input type="text" class="step1-input" id="doc-number" placeholder="Ej: 1111.123.123">
                </div>
              </div>
              <div class="step1-form-group">
                <label class="step1-form-label">Fecha de nacimiento</label>
                <div class="step1-input-icon">
                  <input type="text" class="step1-input" id="birthdate" placeholder="DD / MM / AAAA">
                  <img src="/Iconos/Icon calendar.png" alt="" class="step1-input-icon__img">
                </div>
              </div>
              <div class="step1-form-group">
                <label class="step1-form-label">Género:</label>
                <div class="step1-radio-group">
                  <label class="step1-radio">
                    <input type="radio" name="gender" value="mujer" checked>
                    <span class="step1-radio__custom"></span>
                    <span class="step1-radio__text">Mujer</span>
                  </label>
                  <label class="step1-radio">
                    <input type="radio" name="gender" value="hombre">
                    <span class="step1-radio__custom"></span>
                    <span class="step1-radio__text">Hombre</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Right column: service type -->
            <div class="step1-card__col-right">
              <h3 class="step1-card__question">¿Cuál de estos casos se ajusta a sus necesidades?</h3>
              <div class="step1-options">
                <div class="step1-option step1-option--selected" data-option="casa-pertenencias">
                  <div class="step1-option__radio">
                    <span class="step1-option__radio-dot"></span>
                  </div>
                  <img src="/Iconos/Icon 1.png" alt="" class="step1-option__icon">
                  <p class="step1-option__label">Quiero asegurar mi casa y pertenencias</p>
                </div>
                <div class="step1-option" data-option="casa">
                  <div class="step1-option__radio"></div>
                  <img src="/Iconos/Icon 2.png" alt="" class="step1-option__icon">
                  <p class="step1-option__label">Quiero asegurar mi casa</p>
                </div>
                <div class="step1-option" data-option="pertenencias">
                  <div class="step1-option__radio"></div>
                  <img src="/Iconos/Icon 3.png" alt="" class="step1-option__icon">
                  <p class="step1-option__label">Quiero asegurar mis pertenencias</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ========== BOTTOM BAR ========== -->
      <div class="step1-bottom">
        <button class="step1-bottom__btn" id="btn-continue">Continuar</button>
      </div>
    </div>
  `;

  // Option selection
  const options = document.querySelectorAll('.step1-option');
  options.forEach(opt => {
    opt.addEventListener('click', () => {
      options.forEach(o => o.classList.remove('step1-option--selected'));
      opt.classList.add('step1-option--selected');
    });
  });

  // Back button
  document.getElementById('btn-back')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = window.location.pathname;
  });

  // Continue button
  document.getElementById('btn-continue')?.addEventListener('click', () => {
    const selected = document.querySelector('.step1-option--selected');
    const option = selected?.dataset.option || 'casa-pertenencias';
    window.location.href = window.location.pathname + '?step=2&option=' + option;
  });
}
