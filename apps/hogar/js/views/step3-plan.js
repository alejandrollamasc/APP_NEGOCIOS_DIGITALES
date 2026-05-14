export function renderStep3Plan(container) {
  container.innerHTML = `
    <div class="step1-page">
      <!-- ========== HEADER ========== -->
      <header class="step-header">
        <div class="step-header__inner">
          <a href="?step=2&option=casa" class="step-header__back" id="btn-back">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M13 4L7 10l6 6" stroke="#016D38" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            VOLVER
          </a>
          <div class="step-header__logo">
            <img src="/images/logo-seguros-bolivar.png" alt="Seguros Bolívar" class="step-header__logo-img">
          </div>
        </div>
      </header>

      <!-- ========== CONTENT ========== -->
      <div class="step3-layout">
        <!-- Left main content -->
        <div class="step3-main">
          <!-- Title -->
          <h1 class="step1-title">¡Configure las coberturas a su medida!</h1>

          <!-- Stepper -->
          <div class="step1-stepper step3-stepper">
            <div class="step1-stepper__step">
              <div class="step1-stepper__bull step1-stepper__bull--completed">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 10l3.5 3.5L15 7" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
              <p class="step1-stepper__label">Ingrese sus datos</p>
            </div>
            <div class="step1-stepper__line step1-stepper__line--completed"></div>
            <div class="step1-stepper__step step1-stepper__step--active">
              <div class="step1-stepper__bull-wrap">
                <div class="step1-stepper__bull step1-stepper__bull--active">
                  <span>2</span>
                </div>
              </div>
              <p class="step1-stepper__label step1-stepper__label--active">Arme su plan</p>
            </div>
            <div class="step1-stepper__line"></div>
            <div class="step1-stepper__step">
              <div class="step1-stepper__bull"><span>3</span></div>
              <p class="step1-stepper__label">Confirme su compra</p>
            </div>
            <div class="step1-stepper__line"></div>
            <div class="step1-stepper__step">
              <div class="step1-stepper__bull"><span>4</span></div>
              <p class="step1-stepper__label">Pague su seguro</p>
            </div>
          </div>

          <!-- ========== CARD 1: Seleccione un plan ========== -->
          <div class="step3-card">
            <div class="step3-card__header">
              <img src="/Iconos/Group 2416.png" alt="" class="step3-card__icon">
              <h2 class="step3-card__title">Seleccione un plan</h2>
              <p class="step3-card__subtitle">Ajústelo a las necesidades de su hogar</p>
            </div>

            <!-- Payment toggle -->
            <div class="step3-payment-toggle">
              <span class="step3-payment-toggle__label">Modo de pago:</span>
              <div class="step3-payment-toggle__switch">
                <button class="step3-payment-toggle__btn step3-payment-toggle__btn--active" data-mode="mensual">Mensual</button>
                <button class="step3-payment-toggle__btn" data-mode="anual">Anual</button>
              </div>
            </div>

            <!-- Plan tabs -->
            <div class="step3-plan-tabs">
              <button class="step3-plan-tab step3-plan-tab--active" data-plan="basico">Plan Básico</button>
              <button class="step3-plan-tab" data-plan="intermedio">Plan Intermedio</button>
              <button class="step3-plan-tab" data-plan="completo">
                Plan Completo
                <span class="step3-plan-tab__badge">Recomendado</span>
              </button>
            </div>

            <!-- Plan details -->
            <div class="step3-plan-details">
              <h3 class="step3-plan-details__title">Nuestro Plan Básico incluye:</h3>
              <p class="step3-plan-details__subtitle">6 coberturas básicas ($39.166) + el paquete S de asistencias ($2.500)</p>

              <div class="step3-coverage-list">
                <div class="step3-coverage-item">
                  <h4 class="step3-coverage-item__title">Daños por incendio o inundación</h4>
                  <p class="step3-coverage-item__desc">Cubre daños por incendios, inundaciones y explosiones.</p>
                </div>
                <div class="step3-coverage-item">
                  <h4 class="step3-coverage-item__title">Daños por desastres naturales</h4>
                  <p class="step3-coverage-item__desc">Cubre daños causados a la vivienda por maremotos, tsunamis, erupción de volcanes, huracanes, vientos fuertes o granizadas.</p>
                </div>
                <div class="step3-coverage-item">
                  <h4 class="step3-coverage-item__title">Daños y pérdidas por disturbios sociales</h4>
                  <p class="step3-coverage-item__desc">Protegemos su hogar ante alteraciones del orden público, huelgas o disturbios ocasionados por conflicto armado.</p>
                </div>
                <div class="step3-coverage-item">
                  <h4 class="step3-coverage-item__title">Robo con violencia</h4>
                  <p class="step3-coverage-item__desc">Cubre la pérdida de objetos asegurados o daños a la vivienda ocasionados por robos violentos dentro del hogar.</p>
                </div>
                <div class="step3-coverage-item">
                  <h4 class="step3-coverage-item__title">Daños accidentales a la estructura</h4>
                  <p class="step3-coverage-item__desc">Cubre posibles accidentes que dañen su hogar como caída de aviones, choque de autos o caída de árboles.</p>
                </div>
                <div class="step3-coverage-item">
                  <h4 class="step3-coverage-item__title">Daños eléctricos</h4>
                  <p class="step3-coverage-item__desc">Su hogar estará seguro ante cortos circuítos, caída de rayos, malas conexiones o bajonazos de luz.</p>
                </div>
              </div>

              <a href="#" class="step3-coverage-link">Conozca las coberturas de este plan</a>
            </div>
          </div>

          <!-- ========== CARD 2: Coberturas opcionales ========== -->
          <div class="step3-card">
            <div class="step3-card__header">
              <img src="/Iconos/Group 2430.png" alt="" class="step3-card__icon">
              <h2 class="step3-card__title">Coberturas opcionales</h2>
              <p class="step3-card__subtitle"><strong>Personalice su plan con coberturas adicionales</strong></p>
            </div>

            <div class="step3-optional-list">
              <div class="step3-optional-item">
                <div class="step3-optional-item__row">
                  <label class="step3-checkbox step3-checkbox--checked">
                    <input type="checkbox" checked>
                    <span class="step3-checkbox__box"></span>
                  </label>
                  <h4 class="step3-optional-item__title">Daños por sismos</h4>
                  <span class="step3-optional-item__badge">Gratis</span>
                </div>
                <p class="step3-optional-item__desc">Cubre daños ocasionados por temblores y/o terremotos.</p>
              </div>
              <div class="step3-optional-item">
                <div class="step3-optional-item__row">
                  <label class="step3-checkbox step3-checkbox--checked">
                    <input type="checkbox" checked>
                    <span class="step3-checkbox__box"></span>
                  </label>
                  <h4 class="step3-optional-item__title">Desgaste de tuberías</h4>
                  <span class="step3-optional-item__badge">Gratis</span>
                </div>
                <p class="step3-optional-item__desc">Cubrimos su hogar ante daños ocasionados por falta de mantenimiento a las tuberías.</p>
              </div>
              <div class="step3-optional-item">
                <div class="step3-optional-item__row">
                  <label class="step3-checkbox">
                    <input type="checkbox">
                    <span class="step3-checkbox__box"></span>
                  </label>
                  <h4 class="step3-optional-item__title">Robo sin violencia</h4>
                  <span class="step3-optional-item__badge">Gratis</span>
                </div>
                <p class="step3-optional-item__desc">Cubre la pérdida de objetos asegurados o daños a la vivienda ocasionados por robos dentro de su hogar. Que no involucren actos de violencia.</p>
              </div>
              <div class="step3-optional-item">
                <div class="step3-optional-item__row">
                  <label class="step3-checkbox">
                    <input type="checkbox">
                    <span class="step3-checkbox__box"></span>
                  </label>
                  <h4 class="step3-optional-item__title">Cobertura extendida por robo</h4>
                  <span class="step3-optional-item__badge">Gratis</span>
                </div>
                <p class="step3-optional-item__desc">Cubre la perdida de objetos electrónicos asegurados, fuera de la vivienda causados por robos violentos.</p>
              </div>
              <div class="step3-optional-item">
                <div class="step3-optional-item__row">
                  <label class="step3-checkbox">
                    <input type="checkbox">
                    <span class="step3-checkbox__box"></span>
                  </label>
                  <h4 class="step3-optional-item__title">Seguridad digital básica</h4>
                  <span class="step3-optional-item__badge">Gratis</span>
                </div>
                <p class="step3-optional-item__desc">Protegemos sus datos personales ante robo de identidad o extorsiones a través de internet.</p>
              </div>
              <div class="step3-optional-item">
                <div class="step3-optional-item__row">
                  <label class="step3-checkbox">
                    <input type="checkbox">
                    <span class="step3-checkbox__box"></span>
                  </label>
                  <h4 class="step3-optional-item__title">Seguridad digital completo</h4>
                  <span class="step3-optional-item__badge">Gratis</span>
                </div>
                <p class="step3-optional-item__desc">Protegemos sus datos personales ante robo de identidad o extorsiones a través de internet y gastos legales por cyberbulling.</p>
              </div>
              <div class="step3-optional-item">
                <div class="step3-optional-item__row">
                  <label class="step3-checkbox">
                    <input type="checkbox">
                    <span class="step3-checkbox__box"></span>
                  </label>
                  <h4 class="step3-optional-item__title">Bici protección</h4>
                  <span class="step3-optional-item__badge">Gratis</span>
                </div>
                <p class="step3-optional-item__desc">Cubre daños o hurto de su bicicletas fuera del hogar.</p>
              </div>
              <div class="step3-optional-item">
                <div class="step3-optional-item__row">
                  <label class="step3-checkbox">
                    <input type="checkbox">
                    <span class="step3-checkbox__box"></span>
                  </label>
                  <h4 class="step3-optional-item__title">Responsabilidad civil y daños a terceros</h4>
                  <span class="step3-optional-item__badge">Gratis</span>
                </div>
                <p class="step3-optional-item__desc">Cubre daños dentro o fuera del hogar y lesiones ocasionadas por el asegurado o los beneficiarios.</p>
              </div>
              <div class="step3-optional-item">
                <div class="step3-optional-item__row">
                  <label class="step3-checkbox">
                    <input type="checkbox">
                    <span class="step3-checkbox__box"></span>
                  </label>
                  <h4 class="step3-optional-item__title">Amparo por invalidez o fallecimiento</h4>
                  <span class="step3-optional-item__badge">Gratis</span>
                </div>
                <p class="step3-optional-item__desc">Usted o sus beneficiarios estarán protegidos ante eventos de invalidez o fallecimiento.</p>
              </div>
              <div class="step3-optional-item">
                <div class="step3-optional-item__row">
                  <label class="step3-checkbox">
                    <input type="checkbox">
                    <span class="step3-checkbox__box"></span>
                  </label>
                  <h4 class="step3-optional-item__title">Gastos médicos mascotas</h4>
                  <span class="step3-optional-item__badge">Gratis</span>
                </div>
                <p class="step3-optional-item__desc">Reembolso de gastos médicos veterinarios para sus mascotas.</p>
              </div>
            </div>

            <!-- CTA Banner -->
            <div class="step3-cta-banner">
              <p class="step3-cta-banner__title">¿Quiere conocer más detalles?</p>
              <p class="step3-cta-banner__desc">Consulte los <a href="#" class="step3-cta-banner__link">Términos y Condiciones</a> del seguro</p>
            </div>
          </div>

          <!-- ========== CARD 3: Paquetes de asistencias ========== -->
          <div class="step3-card">
            <div class="step3-card__header">
              <img src="/Iconos/Protection.png" alt="" class="step3-card__icon">
              <h2 class="step3-card__title">Paquetes de asistencias</h2>
              <p class="step3-card__subtitle">Seleccione el paquete de asistencias que mejor se ajuste a sus necesidades</p>
            </div>

            <!-- Assistance tabs -->
            <div class="step3-plan-tabs">
              <button class="step3-plan-tab step3-plan-tab--active" data-assist="s">S</button>
              <button class="step3-plan-tab" data-assist="m">M</button>
              <button class="step3-plan-tab" data-assist="l">
                L
                <span class="step3-plan-tab__badge">Recomendado</span>
              </button>
            </div>

            <!-- Jelpit banner -->
            <div class="step3-jelpit-banner">
              <img src="/Iconos/Logo Jelpit.png" alt="Jelpit" class="step3-jelpit-banner__logo">
              <p class="step3-jelpit-banner__text">Todas nuestras asistencias son prestadas por <strong>Jelpit</strong>, la plataforma de servicios para el hogar de Seguros Bolívar.</p>
            </div>

            <!-- Assistance details -->
            <div class="step3-assistance-details">
              <div class="step3-assistance-group">
                <h4 class="step3-assistance-group__title">Plomería</h4>
                <p class="step3-assistance-group__coverage"><em>Cubrimos hasta $1.000.000. (30 SMDLV)</em></p>
                <ul class="step3-assistance-group__list">
                  <li><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 5" stroke="#016D38" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> Llaves sanitarias y accesorios</li>
                  <li><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 5" stroke="#016D38" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> Conexiones de agua y redes sanitarias</li>
                  <li><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 5" stroke="#016D38" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> Redes de agua potable, aguas negras o residuales</li>
                </ul>
              </div>
              <div class="step3-assistance-group">
                <h4 class="step3-assistance-group__title">Electricidad</h4>
                <p class="step3-assistance-group__coverage"><em>Cubrimos hasta $1.000.000. (30 SMDLV)</em></p>
                <ul class="step3-assistance-group__list">
                  <li><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 5" stroke="#016D38" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> Tomas eléctricas y salidas de iluminación</li>
                  <li><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 5" stroke="#016D38" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> Tacos o breakers</li>
                </ul>
              </div>
              <div class="step3-assistance-group">
                <h4 class="step3-assistance-group__title">Cerrajería</h4>
                <p class="step3-assistance-group__coverage"><em>Cubrimos hasta $1.000.000. (30 SMDLV)</em></p>
                <ul class="step3-assistance-group__list">
                  <li><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 5" stroke="#016D38" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> Pérdida de llaves y apertura de puertas exteriores</li>
                </ul>
              </div>
            </div>

            <a href="#" class="step3-coverage-link">Conozca todo lo que incluyen las asistencias</a>
          </div>
        </div>

        <!-- ========== RIGHT SIDEBAR ========== -->
        <aside class="step3-sidebar">
          <div class="step3-sidebar__card">
            <h3 class="step3-sidebar__title">Seguro de Hogar</h3>
            <p class="step3-sidebar__desc">Usted tendrá cobertura continua, hasta que decida cancelar el seguro.</p>

            <div class="step3-sidebar__section" id="sidebar-plan">
              <span class="step3-sidebar__label">Plan seleccionado:</span>
              <div class="step3-sidebar__row">
                <span class="step3-sidebar__item-name" id="sidebar-plan-name">Básico mensual</span>
                <span class="step3-sidebar__item-price" id="sidebar-plan-price">$39.166</span>
              </div>
            </div>

            <div class="step3-sidebar__section" id="sidebar-coverages">
              <span class="step3-sidebar__label">Coberturas opcionales:</span>
            </div>

            <div class="step3-sidebar__section" id="sidebar-assistance">
              <span class="step3-sidebar__label">Paquete de asistencias:</span>
              <div class="step3-sidebar__row">
                <span class="step3-sidebar__item-name" id="sidebar-assist-name">S</span>
                <span class="step3-sidebar__item-price" id="sidebar-assist-price">$2.500</span>
              </div>
            </div>

            <div class="step3-sidebar__divider"></div>

            <div class="step3-sidebar__total">
              <span class="step3-sidebar__total-label">Total:</span>
              <span class="step3-sidebar__total-price" id="sidebar-total">$44.998</span>
            </div>
            <p class="step3-sidebar__iva">IVA incluido</p>
          </div>
        </aside>
      </div>

      <!-- ========== BOTTOM BAR ========== -->
      <div class="step1-bottom">
        <button class="step1-bottom__btn" id="btn-continue">Continuar</button>
      </div>
    </div>
  `;

  // ===== PRICING DATA =====
  const PLANS = {
    basico: { name: 'Básico', monthly: 39166, assistPackage: 'S' },
    intermedio: { name: 'Clásico', monthly: 55833, assistPackage: 'M' },
    completo: { name: 'Premium', monthly: 83833, assistPackage: 'L' }
  };
  const ASSISTANCES = { S: 2500, M: 4500, L: 8333 };

  const PLAN_COVERAGES = {
    basico: {
      title: 'Nuestro Plan Básico incluye:',
      subtitle: '6 coberturas básicas ($39.166) + el paquete S de asistencias ($2.500)',
      items: [
        { title: 'Daños por incendio o inundación', desc: 'Cubre daños por incendios, inundaciones y explosiones.' },
        { title: 'Daños por desastres naturales', desc: 'Cubre daños causados a la vivienda por maremotos, tsunamis, erupción de volcanes, huracanes, vientos fuertes o granizadas.' },
        { title: 'Daños y pérdidas por disturbios sociales', desc: 'Protegemos su hogar ante alteraciones del orden público, huelgas o disturbios ocasionados por conflicto armado.' },
        { title: 'Robo con violencia', desc: 'Cubre la pérdida de objetos asegurados o daños a la vivienda ocasionados por robos violentos dentro del hogar.' },
        { title: 'Daños accidentales a la estructura', desc: 'Cubre posibles accidentes que dañen su hogar como caída de aviones, choque de autos o caída de árboles.' },
        { title: 'Daños eléctricos', desc: 'Su hogar estará seguro ante cortos circuítos, caída de rayos, malas conexiones o bajonazos de luz.' }
      ]
    },
    intermedio: {
      title: 'Nuestro Plan Clásico incluye:',
      subtitle: 'Todas las coberturas del Plan Básico y 4 coberturas adicionales ($55.833) + el paquete M de asistencias ($4.500)',
      items: [
        { title: 'Daños por sismos', desc: 'Cubre daños ocasionados por temblores y/o terremotos.' },
        { title: 'Responsabilidad civil y daños a terceros', desc: 'Cubre daños dentro o fuera del hogar y lesiones ocasionadas por el asegurado o los beneficiarios.' },
        { title: 'Amparo por invalidez o fallecimiento', desc: 'Usted o sus beneficiarios estarán protegidos si tienen algún tipo de lesión o enfermedad que les cause invalidez o la muerte.' },
        { title: 'Seguridad digital básica', desc: 'Protegemos sus datos personales ante robo de identidad o extorsiones a través de internet.' }
      ]
    },
    completo: {
      title: 'Nuestro Plan Completo incluye:',
      subtitle: 'Todas las coberturas del Plan Clásico + 6 coberturas adicionales ($80.833) + el paquete S de asistencias ($2.500)',
      items: [
        { title: 'Daños por sismos', desc: 'Cubre daños ocasionados por temblores y/o terremotos.' },
        { title: 'Responsabilidad civil y daños a terceros', desc: 'Cubre daños dentro o fuera del hogar y lesiones ocasionadas por el asegurado o los beneficiarios.' },
        { title: 'Amparo por invalidez o fallecimiento', desc: 'Usted o sus beneficiarios estarán protegidos ante eventos de invalidez o fallecimiento.' },
        { title: 'Seguridad digital completo', desc: 'Protegemos sus datos personales ante robo de identidad, extorsiones y gastos legales por cyberbulling.' },
        { title: 'Robo sin violencia', desc: 'Cubre la pérdida de objetos asegurados por robos que no involucren actos de violencia.' },
        { title: 'Cobertura extendida por robo', desc: 'Cubre la perdida de objetos electrónicos asegurados fuera de la vivienda.' },
        { title: 'Bici protección', desc: 'Cubre daños o hurto de su bicicletas fuera del hogar.' },
        { title: 'Gastos médicos mascotas', desc: 'Reembolso de gastos médicos veterinarios para sus mascotas.' }
      ]
    }
  };

  const ASSIST_DETAILS = {
    S: [
      { title: 'Plomería', coverage: 'Cubrimos hasta $1.000.000. (30 SMDLV)', items: ['Llaves sanitarias y accesorios', 'Conexiones de agua y redes sanitarias', 'Redes de agua potable, aguas negras o residuales'] },
      { title: 'Electricidad', coverage: 'Cubrimos hasta $1.000.000. (30 SMDLV)', items: ['Tomas eléctricas y salidas de iluminación', 'Tacos o breakers'] },
      { title: 'Cerrajería', coverage: 'Cubrimos hasta $1.000.000. (30 SMDLV)', items: ['Pérdida de llaves y apertura de puertas exteriores'] }
    ],
    M: [
      { title: 'Plomería', coverage: 'Cubrimos hasta $1.000.000. (30 SMDLV)', items: ['Llaves sanitarias y accesorios', 'Griferías sanitarias y accesorios de sobreponer', 'Conexiones de agua y redes sanitarias', 'Redes de agua potable, aguas negras o residuales'] },
      { title: 'Electricidad', coverage: 'Cubrimos hasta $1.000.000. (30 SMDLV)', items: ['Tomas eléctricas y salidas de iluminación', 'Tacos o breakers', 'Cableado de conducción eléctrica'] },
      { title: 'Cerrajería', coverage: 'Cubrimos hasta $1.000.000. (30 SMDLV)', items: ['Cerraduras de puertas exteriores', 'Pérdida de llaves y apertura de puertas exteriores'] },
      { title: 'Gas domiciliario', coverage: 'Cubrimos hasta $1.000.000. (30 SMDLV)', items: ['Fuga de gas', 'Conexiones de electrodomésticos que utilicen gas'] },
      { title: 'Vidrios', coverage: 'Cubrimos hasta $1.000.000. (30 SMDLV)', items: ['Vidrios: ventanas o puertas', 'Vidrios de cubierta'] },
      { title: 'Orientación jurídica telefónica', coverage: 'Cubrimos hasta $1.000.000. (30 SMDLV)', items: ['Asesorías en materia familiar, civil, laboral y tributaria'] },
      { title: 'Gastos de hospedaje', coverage: 'Cubrimos hasta $1.000.000. (30 SMDLV)', items: ['Servicio de alojamiento en hotel si el inmueble no puede ser habitado'] },
      { title: 'Gastos de mudanza', coverage: 'Cubrimos hasta $1.000.000. (30 SMDLV)', items: ['Servicio de mudanza para traslado de pertenencias'] }
    ],
    L: [
      { title: 'Plomería', coverage: 'Cubrimos hasta $2.000.000. (60 SMDLV)', items: ['Llaves sanitarias y accesorios', 'Griferías sanitarias y accesorios de sobreponer', 'Conexiones de agua y redes sanitarias', 'Redes de agua potable, aguas negras o residuales', 'Juntas de baldosas'] },
      { title: 'Electricidad', coverage: 'Cubrimos hasta $2.000.000. (60 SMDLV)', items: ['Tomas eléctricas y salidas de iluminación', 'Tacos o breakers', 'Cableado de conducción eléctrica', 'Tableros eléctricos', 'Conexiones de timbres'] },
      { title: 'Cerrajería', coverage: 'Cubrimos hasta $2.000.000. (60 SMDLV)', items: ['Cerraduras de puertas exteriores', 'Pérdida de llaves y apertura de puertas exteriores', 'Apertura puertas interiores', 'Apertura muebles', 'Cambio de guardas'] },
      { title: 'Gas domiciliario', coverage: 'Cubrimos hasta $2.000.000. (60 SMDLV)', items: ['Fuga de gas', 'Conexiones de electrodomésticos que utilicen gas'] },
      { title: 'Vidrios', coverage: 'Cubrimos hasta $2.000.000. (60 SMDLV)', items: ['Vidrios: ventanas o puertas', 'Vidrios de cubierta', 'Espejos fijos'] },
      { title: 'Orientación jurídica telefónica', coverage: 'Cubrimos hasta $2.000.000. (60 SMDLV)', items: ['Asesorías en materia familiar, civil, laboral y tributaria'] },
      { title: 'Gastos de hospedaje', coverage: 'Cubrimos hasta $2.000.000. (60 SMDLV)', items: ['Servicio de alojamiento en hotel si el inmueble no puede ser habitado'] },
      { title: 'Gastos de mudanza', coverage: 'Cubrimos hasta $2.000.000. (60 SMDLV)', items: ['Servicio de mudanza para traslado de pertenencias'] },
      { title: 'Servicio de vigilancia', coverage: 'Cubrimos hasta $2.000.000. (60 SMDLV)', items: ['Servicio de vigilancia temporal en caso de siniestro'] },
      { title: 'Mascotas', coverage: 'Cubrimos hasta $2.000.000. (60 SMDLV)', items: ['Guardería por siniestro', 'Guardería por hospitalización'] },
      { title: 'Muebles', coverage: 'Cubrimos hasta $2.000.000. (60 SMDLV)', items: ['Ajuste carpintería', 'Ajuste/cambio bisagras'] }
    ]
  };

  function updatePlanDetails() {
    const plan = PLAN_COVERAGES[state.plan];
    const detailsEl = document.querySelector('.step3-plan-details');
    if (!detailsEl || !plan) return;

    let html = `<h3 class="step3-plan-details__title">${plan.title}</h3>
      <p class="step3-plan-details__subtitle">${plan.subtitle}</p>
      <div class="step3-coverage-list">`;
    plan.items.forEach(item => {
      html += `<div class="step3-coverage-item"><h4 class="step3-coverage-item__title">${item.title}</h4><p class="step3-coverage-item__desc">${item.desc}</p></div>`;
    });
    html += `</div><a href="#" class="step3-coverage-link">Conozca las coberturas de este plan</a>`;
    detailsEl.innerHTML = html;
  }

  const ASSIST_ICONS = {
    'Plomería': '/Iconos/icono_plomería.png',
    'Electricidad': '/Iconos/Icono_Electricidad.png',
    'Orientación jurídica telefónica': '/Iconos/Icono_Orientación jurídica telefónica.png',
    'Servicio de vigilancia': '/Iconos/Icono_Vigilancia.png'
  };

  function updateAssistanceDetails() {
    const details = ASSIST_DETAILS[state.assistPackage];
    const el = document.querySelector('.step3-assistance-details');
    if (!el || !details) return;

    let html = '';
    details.forEach(group => {
      const icon = ASSIST_ICONS[group.title];
      const iconHtml = icon ? `<img src="${icon}" alt="" class="step3-assistance-group__icon">` : '';
      html += `<div class="step3-assistance-group">
        <div class="step3-assistance-group__header">${iconHtml}<h4 class="step3-assistance-group__title">${group.title}</h4></div>
        <p class="step3-assistance-group__coverage"><em>${group.coverage}</em></p>
        <ul class="step3-assistance-group__list">`;
      group.items.forEach(item => {
        html += `<li><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 5" stroke="#016D38" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> ${item}</li>`;
      });
      html += `</ul></div>`;
    });
    el.innerHTML = html;
  }

  let state = {
    plan: 'basico',
    mode: 'mensual', // 'mensual' or 'anual'
    assistPackage: 'S',
    optionalCoverages: ['Daños por sismos', 'Desgaste de tuberías']
  };

  function formatPrice(value) {
    return '$' + value.toLocaleString('es-CO');
  }

  function updateSidebar() {
    const multiplier = state.mode === 'anual' ? 12 : 1;
    const planData = PLANS[state.plan];
    const planPrice = planData.monthly * multiplier;
    const assistPrice = ASSISTANCES[state.assistPackage] * multiplier;
    const total = planPrice + assistPrice;

    // Plan
    document.getElementById('sidebar-plan-name').textContent = `${planData.name} ${state.mode}`;
    document.getElementById('sidebar-plan-price').textContent = formatPrice(planPrice);

    // Coverages
    const coveragesSection = document.getElementById('sidebar-coverages');
    let coveragesHTML = '<span class="step3-sidebar__label">Coberturas opcionales:</span>';
    state.optionalCoverages.forEach(name => {
      coveragesHTML += `<div class="step3-sidebar__row"><span class="step3-sidebar__item-name">${name}</span><span class="step3-sidebar__item-price">$0</span></div>`;
    });
    if (state.optionalCoverages.length === 0) {
      coveragesHTML += '<div class="step3-sidebar__row"><span class="step3-sidebar__item-name">Ninguna</span><span class="step3-sidebar__item-price">$0</span></div>';
    }
    coveragesSection.innerHTML = coveragesHTML;

    // Assistance
    document.getElementById('sidebar-assist-name').textContent = state.assistPackage;
    document.getElementById('sidebar-assist-price').textContent = formatPrice(assistPrice);

    // Total
    document.getElementById('sidebar-total').textContent = formatPrice(total);
  }

  // ===== INTERACTIVITY =====

  // Payment toggle
  const paymentBtns = document.querySelectorAll('.step3-payment-toggle__btn');
  paymentBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      paymentBtns.forEach(b => b.classList.remove('step3-payment-toggle__btn--active'));
      btn.classList.add('step3-payment-toggle__btn--active');
      state.mode = btn.dataset.mode;
      updateSidebar();
    });
  });

  // Plan tabs (first group only - plan selection)
  const planTabs = document.querySelectorAll('.step3-plan-tabs')[0]?.querySelectorAll('.step3-plan-tab');
  if (planTabs) {
    planTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        planTabs.forEach(t => t.classList.remove('step3-plan-tab--active'));
        tab.classList.add('step3-plan-tab--active');
        state.plan = tab.dataset.plan;
        updatePlanDetails();
        updateSidebar();
      });
    });
  }

  // Assistance tabs (third group)
  const assistTabs = document.querySelectorAll('.step3-plan-tabs')[2]?.querySelectorAll('.step3-plan-tab');
  if (assistTabs) {
    assistTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        assistTabs.forEach(t => t.classList.remove('step3-plan-tab--active'));
        tab.classList.add('step3-plan-tab--active');
        state.assistPackage = tab.dataset.assist.toUpperCase();
        updateAssistanceDetails();
        updateSidebar();
      });
    });
  }

  // Checkboxes - update optional coverages
  const checkboxes = document.querySelectorAll('.step3-checkbox input[type="checkbox"]');
  checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      const label = cb.closest('.step3-checkbox');
      const item = cb.closest('.step3-optional-item');
      const title = item?.querySelector('.step3-optional-item__title')?.textContent || '';

      if (cb.checked) {
        label.classList.add('step3-checkbox--checked');
        if (!state.optionalCoverages.includes(title)) {
          state.optionalCoverages.push(title);
        }
      } else {
        label.classList.remove('step3-checkbox--checked');
        state.optionalCoverages = state.optionalCoverages.filter(c => c !== title);
      }
      updateSidebar();
    });
  });

  // Back button
  document.getElementById('btn-back')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = window.location.pathname + '?step=2&option=casa';
  });

  // Continue button
  document.getElementById('btn-continue')?.addEventListener('click', () => {
    sessionStorage.setItem('hogar_step3_state', JSON.stringify(state));
    window.location.href = window.location.pathname + '?step=4';
  });

  // Initial render
  updateSidebar();
}
