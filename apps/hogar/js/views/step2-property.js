export function renderStep2Property(container) {
  container.innerHTML = `
    <div class="step1-page">
      <!-- ========== HEADER ========== -->
      <header class="step-header">
        <div class="step-header__inner">
          <a href="?step=1" class="step-header__back">
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
        <h1 class="step1-title">¡Configure las coberturas a su medida!</h1>

        <!-- Stepper -->
        <div class="step1-stepper">
          <div class="step1-stepper__step step1-stepper__step--active">
            <div class="step1-stepper__bull-wrap"><div class="step1-stepper__bull step1-stepper__bull--active"><span>1</span></div></div>
            <p class="step1-stepper__label step1-stepper__label--active">Ingrese sus datos</p>
          </div>
          <div class="step1-stepper__line"></div>
          <div class="step1-stepper__step"><div class="step1-stepper__bull"><span>2</span></div><p class="step1-stepper__label">Arme su plan</p></div>
          <div class="step1-stepper__line"></div>
          <div class="step1-stepper__step"><div class="step1-stepper__bull"><span>3</span></div><p class="step1-stepper__label">Confirme su compra</p></div>
          <div class="step1-stepper__line"></div>
          <div class="step1-stepper__step"><div class="step1-stepper__bull"><span>4</span></div><p class="step1-stepper__label">Pague su seguro</p></div>
        </div>

        <!-- Banner: Asegure su hogar y pertenencias -->
        <div class="step2-banner">
          <img src="/Iconos/Protection.png" alt="" class="step2-banner__icon">
          <h2 class="step2-banner__title">Asegure su hogar y pertenencias</h2>
          <p class="step2-banner__desc">Complete la siguiente información para <strong>cotizar su seguro como propietario.</strong></p>
        </div>

        <!-- Card 1: Información del hogar -->
        <div class="step2-card">
          <div class="step2-card__header">
            <img src="/Iconos/Group 2432.png" alt="" class="step2-card__icon">
            <h2 class="step2-card__title">Información del hogar que desea proteger</h2>
            <p class="step2-card__desc">Consulte la cobertura de este seguro en su ciudad.</p>
          </div>
          <div class="step2-card__form">
            <div class="step2-form-row">
              <div class="step1-form-group">
                <label class="step1-form-label">Ciudad o municipio</label>
                <select class="step1-input step1-select"><option>Ej: Bogotá</option></select>
              </div>
              <div class="step1-form-group">
                <label class="step1-form-label">Dirección de la vivienda</label>
                <div class="step1-input-icon">
                  <input type="text" class="step1-input" placeholder="Ej: Calle 1 # 1 - 15">
                  <svg class="step1-input-icon__svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="6" stroke="#016D38" stroke-width="1.5"/><path d="M14 14l4 4" stroke="#016D38" stroke-width="1.5" stroke-linecap="round"/></svg>
                </div>
              </div>
            </div>
            <div class="step2-form-row">
              <div class="step1-form-group">
                <label class="step1-form-label">Tipo de vivienda</label>
                <div class="step1-radio-group">
                  <label class="step1-radio"><input type="radio" name="housing-type" value="casa" checked><span class="step1-radio__custom"></span><span class="step1-radio__text">Casa</span></label>
                  <label class="step1-radio"><input type="radio" name="housing-type" value="apartamento"><span class="step1-radio__custom"></span><span class="step1-radio__text">Apartamento</span></label>
                </div>
              </div>
              <div class="step1-form-group">
                <label class="step1-form-label">Estrato de la vivienda</label>
                <input type="text" class="step1-input" placeholder="Ej: entre / piso / torre / casa">
              </div>
            </div>
            <div class="step2-form-row">
              <div class="step1-form-group">
                <label class="step1-form-label">Años de antigüedad de la vivienda</label>
                <select class="step1-input step1-select"><option>Seleccione el rango de años...</option></select>
              </div>
              <div class="step1-form-group">
                <label class="step1-form-label">¿La vivienda está construida con materiales no quemables?</label>
                <select class="step1-input step1-select"><option>Seleccione...</option></select>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 2: Información de la vivienda -->
        <div class="step2-card">
          <div class="step2-card__header">
            <img src="/Iconos/Group 2432.png" alt="" class="step2-card__icon">
            <h2 class="step2-card__title">Información de la vivienda</h2>
            <p class="step2-card__desc">Ingrese el <strong>valor comercial del inmueble</strong>. Este será el valor por el que quedará asegurado.</p>
          </div>
          <div class="step2-card__form">
            <div class="step2-form-row">
              <div class="step1-form-group">
                <label class="step1-form-label">Valor comercial del inmueble</label>
                <input type="text" class="step1-input" placeholder="Ej: $224.000.000">
              </div>
              <div class="step1-form-group">
                <label class="step1-form-label">Material predominante en que está construida la vivienda</label>
                <select class="step1-input step1-select"><option>Seleccione el material predominante...</option></select>
              </div>
            </div>
            <div class="step2-form-row">
              <div class="step1-form-group">
                <label class="step1-form-label">Años de antigüedad de la vivienda</label>
                <input type="text" class="step1-input" placeholder="">
              </div>
              <div class="step1-form-group"></div>
            </div>
          </div>
        </div>

        <!-- Banner: Asegure sus objetos personales -->
        <div class="step2-banner">
          <h2 class="step2-banner__title">Asegure sus objetos personales</h2>
          <p class="step2-banner__desc">Registre sus objetos más importantes, tenga en cuenta que <strong>debe registrar mínimo uno.</strong></p>
        </div>

        <!-- Card 3: Equipos electrónicos -->
        <div class="step2-card">
          <div class="step2-card__header">
            <img src="/Iconos/Group 2443.png" alt="" class="step2-card__icon">
            <h2 class="step2-card__title">Equipos electrónicos</h2>
            <p class="step2-card__desc">Incluir los <strong>electrodomésticos, computadores</strong>, entre otros.<br><strong>No cubrimos</strong> celulares, tablets ni Smartwatch.</p>
          </div>
          <div class="step2-card__form step2-card__form--centered">
            <div class="step1-form-group" style="max-width:327px;">
              <label class="step1-form-label">Escriba el valor total de sus equipos electrónicos</label>
              <input type="text" class="step1-input" placeholder="$ 0.000.000">
              <span class="step2-caption">Aseguramos hasta $40.000.000, pero solo cubrimos hasta $10.000.000 por evento.</span>
            </div>
          </div>
        </div>

        <!-- Card 4: Muebles y enseres -->
        <div class="step2-card">
          <div class="step2-card__header">
            <img src="/Iconos/Group 2430.png" alt="" class="step2-card__icon">
            <h2 class="step2-card__title">Muebles y enseres</h2>
            <p class="step2-card__desc">Incluir <strong>muebles del hogar</strong> como: armarios, sillas, mesas, entre otros.<br><strong>No cubrimos:</strong> joyas, obras de arte, relojes.</p>
          </div>
          <div class="step2-card__form step2-card__form--centered">
            <div class="step1-form-group" style="max-width:327px;">
              <label class="step1-form-label">Escriba el valor total de sus muebles y enseres</label>
              <input type="text" class="step1-input" placeholder="$ 0.000.000">
              <span class="step2-caption">Aseguramos hasta $40.000.000, pero solo cubrimos hasta $10.000.000 por evento.</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ========== BOTTOM BAR ========== -->
      <div class="step1-bottom">
        <button class="step1-bottom__btn" id="btn-continue-step2">Continuar</button>
      </div>
    </div>
  `;

  document.getElementById('btn-continue-step2')?.addEventListener('click', () => {
    window.location.href = window.location.pathname + '?step=3';
  });
}
