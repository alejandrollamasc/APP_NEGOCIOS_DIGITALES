export function renderStep4Summary(container) {
  // Retrieve state from step 3 (via sessionStorage or defaults)
  const savedState = JSON.parse(sessionStorage.getItem('hogar_step3_state') || 'null');
  const state = savedState || {
    plan: 'basico',
    mode: 'anual',
    assistPackage: 'M',
    optionalCoverages: ['Daños por sismos', 'Desgaste por daños de agua', 'Seguridad Digital Full']
  };

  const PLANS = {
    basico: { name: 'Básico', monthly: 39166 },
    intermedio: { name: 'Clásico', monthly: 55833 },
    completo: { name: 'Premium', monthly: 83833 }
  };
  const ASSISTANCES = { S: 2500, M: 4500, L: 8333 };
  const ASSIST_NAMES = { S: 'Plan S', M: 'Plan M', L: 'Plan L' };
  const ASSIST_INCLUDES = {
    S: 'Plomería, Electricidad y Cerrajería',
    M: 'Plomería, Electricidad, Asesoría jurídica y legal, Cerrajería, Gastos de hospedaje, Gastos mudanza urbana, Traslado médico urbano, Gas domiciliario y Reparación de vidrios',
    L: 'Plomería, Electricidad, Asesoría jurídica y legal, Cerrajería, Gastos de hospedaje, Gastos mudanza urbana, Traslado médico urbano, Gas domiciliario, Reparación de vidrios, Servicio de vigilancia, Mascotas y Muebles'
  };

  const planData = PLANS[state.plan];
  const planMonthly = planData.monthly;
  const assistMonthly = ASSISTANCES[state.assistPackage];
  const totalMonthly = planMonthly + assistMonthly;
  const totalAnnual = totalMonthly * 12;
  const discountRate = 0.10;
  const totalAnnualDiscount = Math.round(totalAnnual * (1 - discountRate));

  function formatPrice(value) {
    return '$' + value.toLocaleString('es-CO');
  }

  // Calculate coverage dates
  const today = new Date();
  const endDate = new Date(today);
  endDate.setFullYear(endDate.getFullYear() + 1);
  const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  const startStr = `${today.getDate().toString().padStart(2, '0')} ${months[today.getMonth()]}. ${today.getFullYear()}`;
  const endStr = `${endDate.getDate().toString().padStart(2, '0')} ${months[endDate.getMonth()]}. ${endDate.getFullYear()}`;

  container.innerHTML = `
    <div class="step1-page">
      <!-- ========== HEADER ========== -->
      <header class="step-header">
        <div class="step-header__inner">
          <a href="?step=3" class="step-header__back" id="btn-back">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M13 4L7 10l6 6" stroke="#016D38" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            VOLVER
          </a>
          <div class="step-header__logo">
            <img src="/images/logo-seguros-bolivar.png" alt="Seguros Bolívar" class="step-header__logo-img">
          </div>
        </div>
      </header>

      <!-- ========== CONTENT ========== -->
      <div class="step4-container">
        <!-- Title + Stepper -->
        <div class="step4-top">
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
            <div class="step1-stepper__step">
              <div class="step1-stepper__bull step1-stepper__bull--completed">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 10l3.5 3.5L15 7" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
              <p class="step1-stepper__label">Arme su plan</p>
            </div>
            <div class="step1-stepper__line step1-stepper__line--completed"></div>
            <div class="step1-stepper__step step1-stepper__step--active">
              <div class="step1-stepper__bull-wrap">
                <div class="step1-stepper__bull step1-stepper__bull--active">
                  <span>3</span>
                </div>
              </div>
              <p class="step1-stepper__label step1-stepper__label--active">Confirme su compra</p>
            </div>
            <div class="step1-stepper__line"></div>
            <div class="step1-stepper__step">
              <div class="step1-stepper__bull"><span>4</span></div>
              <p class="step1-stepper__label">Pague su seguro</p>
            </div>
          </div>
        </div>

        <!-- ========== SUMMARY CARD ========== -->
        <div class="step4-card">
          <!-- Card Header -->
          <div class="step4-card__header">
            <img src="/Iconos/Group 2416.png" alt="" class="step4-card__icon">
            <h2 class="step4-card__title">Resumen de compra</h2>
            <p class="step4-card__subtitle">¡A un paso de asegurar todo el hogar!</p>
            <a href="#" class="step4-download-link" id="btn-download">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2v10M9 12l-3-3M9 12l3-3M3 14h12" stroke="#05794A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              Descargar resumen
            </a>
          </div>

          <!-- Titular Section -->
          <div class="step4-section step4-section--titular">
            <h3 class="step4-titular-title">Titular</h3>
            <div class="step4-info-rows">
              <p class="step4-info-row"><strong>Nombre:</strong> Juan Manuel</p>
              <p class="step4-info-row">Enviaremos la póliza al siguiente correo:</p>
              <p class="step4-info-row step4-info-row--email">juanmanuel@correo.com <a href="#" class="step4-edit-link">Editar correo</a></p>
            </div>
          </div>

          <!-- Plan Selected -->
          <div class="step4-section step4-section--plan">
            <div class="step4-plan-header">
              <span class="step4-plan-header__label">Plan seleccionado:</span>
              <h3 class="step4-plan-header__name">Plan ${planData.name} Anual</h3>
            </div>
            <div class="step4-plan-details">
              <p class="step4-plan-detail"><strong>Días asegurados:</strong> 365 días (Vigencia 1 año)</p>
              <p class="step4-plan-detail">Fecha inicio de la cobertura:</p>
              <p class="step4-plan-detail step4-plan-detail--date"><strong>${startStr}</strong> – <strong>${endStr}</strong> <a href="#" class="step4-edit-link">Editar fecha de inicio</a></p>
            </div>

            <!-- Warning Alert -->
            <div class="step4-alert step4-alert--warning">
              <div class="step4-alert__bar"></div>
              <div class="step4-alert__content">
                <div class="step4-alert__top">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2L1 18h18L10 2z" fill="#FFC100"/><path d="M10 8v4M10 14h.01" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>
                  <span class="step4-alert__title">Importante:</span>
                  <button class="step4-alert__close" aria-label="Cerrar">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="#1B1B1B" stroke-width="1.5" stroke-linecap="round"/></svg>
                  </button>
                </div>
                <p class="step4-alert__desc">El plan seleccionado no incluye la cobertura de Terremoto. <a href="?step=3" class="step4-alert__link">Cambiar plan</a></p>
              </div>
            </div>
          </div>

          <!-- Optional Coverages -->
          <div class="step4-section step4-section--coverages">
            <h4 class="step4-section__subtitle">Coberturas opcionales seleccionadas:</h4>
            <div class="step4-coverages-list" id="step4-coverages-list">
              ${state.optionalCoverages.map((cov, i) => `
                <div class="step4-coverage-row ${i % 2 !== 0 ? 'step4-coverage-row--alt' : ''}">
                  <span class="step4-coverage-row__name">${cov}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Assistances -->
          <div class="step4-section step4-section--assistances">
            <div class="step4-assist-header">
              <span class="step4-assist-header__label">Asistencias seleccionadas:</span>
              <h4 class="step4-assist-header__name">${ASSIST_NAMES[state.assistPackage]}</h4>
            </div>
            <p class="step4-assist-includes">Incluye: ${ASSIST_INCLUDES[state.assistPackage]}.</p>
            <p class="step4-assist-value">Valor: ${formatPrice(assistMonthly)}</p>
          </div>

          <!-- Payment Frequency -->
          <div class="step4-section step4-section--frequency">
            <div class="step4-frequency-options">
              <!-- Mensual -->
              <div class="step4-frequency-card" id="freq-mensual">
                <div class="step4-frequency-card__top">
                  <span class="step4-frequency-card__label">Mensual</span>
                  <label class="step4-radio">
                    <input type="radio" name="frequency" value="mensual">
                    <span class="step4-radio__circle"></span>
                  </label>
                </div>
                <div class="step4-frequency-card__bottom">
                  <span class="step4-frequency-card__total-label">Total <span class="step4-frequency-card__iva">IVA incluido:</span></span>
                  <span class="step4-frequency-card__total-price">${formatPrice(totalMonthly)}</span>
                </div>
              </div>

              <!-- Anual -->
              <div class="step4-frequency-card step4-frequency-card--selected" id="freq-anual">
                <div class="step4-frequency-card__top">
                  <span class="step4-frequency-card__label">Anual (aplica descuento)</span>
                  <label class="step4-radio">
                    <input type="radio" name="frequency" value="anual" checked>
                    <span class="step4-radio__circle"></span>
                  </label>
                </div>
                <div class="step4-frequency-card__discount-row">
                  <span class="step4-frequency-card__discount-label">Sin descuento:</span>
                  <span class="step4-frequency-card__discount-price">${formatPrice(totalAnnual)}</span>
                </div>
                <div class="step4-frequency-card__bottom">
                  <span class="step4-frequency-card__total-label step4-frequency-card__total-label--green">Total con descuento <span class="step4-frequency-card__iva">IVA incluido:</span></span>
                  <span class="step4-frequency-card__total-price step4-frequency-card__total-price--green">${formatPrice(totalAnnualDiscount)}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Auto debit checkbox -->
          <div class="step4-section step4-section--autodebit">
            <label class="step4-checkbox-row">
              <input type="checkbox" id="chk-autodebit" checked>
              <span class="step4-checkbox-box"></span>
              <span class="step4-checkbox-label"><strong>Autorizo realizar el débito automático cada año</strong> de mi Seguro Hogar Digital.</span>
            </label>
          </div>

          <!-- Payment Method -->
          <div class="step4-section step4-section--payment">
            <p class="step4-payment-title">Seleccione el método de pago que desea:</p>

            <!-- Tarjeta débito (selected) -->
            <div class="step4-payment-card step4-payment-card--selected" id="pay-debit">
              <div class="step4-payment-card__top">
                <label class="step4-radio">
                  <input type="radio" name="paymethod" value="debit" checked>
                  <span class="step4-radio__circle"></span>
                </label>
                <span class="step4-payment-card__label">Tarjeta débito</span>
                <div class="step4-payment-card__logos">
                  <span class="step4-payment-card__logo-text">VISA</span>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" class="step4-card-logo">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" alt="Maestro" class="step4-card-logo step4-card-logo--small">
                </div>
              </div>

              <!-- Debit Form -->
              <div class="step4-card-form" id="debit-form">
                <div class="step4-form-field">
                  <label class="step4-form-field__label">Seleccione el banco</label>
                  <div class="step4-form-field__select-wrap">
                    <select class="step4-form-field__select" id="input-bank">
                      <option value="bolivariano">Bolivariano</option>
                      <option value="bancolombia">Bancolombia</option>
                      <option value="davivienda">Davivienda</option>
                      <option value="bbva">BBVA</option>
                    </select>
                    <svg class="step4-form-field__chevron" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 7l5 5 5-5" stroke="#016D38" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </div>
                </div>
                <div class="step4-form-field">
                  <label class="step4-form-field__label">Tipo de cuenta</label>
                  <div class="step4-form-field__select-wrap">
                    <select class="step4-form-field__select" id="input-account-type">
                      <option value="ahorros">Ahorros</option>
                      <option value="corriente">Corriente</option>
                    </select>
                    <svg class="step4-form-field__chevron" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 7l5 5 5-5" stroke="#016D38" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </div>
                </div>
                <div class="step4-form-field">
                  <label class="step4-form-field__label">Número de cuenta</label>
                  <div class="step4-form-field__input-wrap">
                    <input type="text" class="step4-form-field__input" placeholder="4884 6940 4040" id="input-account-number">
                  </div>
                </div>
              </div>
            </div>

            <!-- Tarjeta Crédito -->
            <div class="step4-payment-card" id="pay-credit">
              <div class="step4-payment-card__top">
                <label class="step4-radio">
                  <input type="radio" name="paymethod" value="credit">
                  <span class="step4-radio__circle"></span>
                </label>
                <span class="step4-payment-card__label">Tarjeta Crédito</span>
                <div class="step4-payment-card__logos">
                  <span class="step4-payment-card__logo-text">VISA</span>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" class="step4-card-logo">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" alt="Maestro" class="step4-card-logo step4-card-logo--small">
                  <span class="step4-payment-card__logo-amex">AMEX</span>
                </div>
              </div>

              <!-- Credit Card Form (hidden by default) -->
              <div class="step4-card-form step4-card-form--hidden" id="credit-form">
                <div class="step4-form-field">
                  <label class="step4-form-field__label">Número de tarjeta</label>
                  <div class="step4-form-field__input-wrap">
                    <input type="text" class="step4-form-field__input" placeholder="0000 0000 0000 0000" maxlength="19" id="input-card-number">
                  </div>
                </div>
                <div class="step4-form-field">
                  <label class="step4-form-field__label">Cuotas</label>
                  <div class="step4-form-field__select-wrap">
                    <select class="step4-form-field__select" id="input-cuotas">
                      <option value="">Seleccione</option>
                      <option value="1">1 cuota</option>
                      <option value="3">3 cuotas</option>
                      <option value="6">6 cuotas</option>
                      <option value="12">12 cuotas</option>
                      <option value="24">24 cuotas</option>
                      <option value="36">36 cuotas</option>
                    </select>
                    <svg class="step4-form-field__chevron" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 7l5 5 5-5" stroke="#016D38" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </div>
                </div>
                <div class="step4-form-field">
                  <label class="step4-form-field__label">Nombre del titular</label>
                  <div class="step4-form-field__input-wrap">
                    <input type="text" class="step4-form-field__input" placeholder="Como aparece en la tarjeta" id="input-card-name">
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Terms & Conditions -->
          <div class="step4-section step4-section--terms">
            <label class="step4-checkbox-row">
              <input type="checkbox" id="chk-terms">
              <span class="step4-checkbox-box"></span>
              <span class="step4-checkbox-label">Acepto la <a href="#" class="step4-link">Política de Privacidad</a>, los <a href="#" class="step4-link">Términos y Condiciones</a> del Seguro Hogar y la Cobertura Seguridad Digital, el <a href="#" class="step4-link">tratamiento de mis datos personales</a> en <a href="#" class="step4-link">Términos y Condiciones del canal digital</a>.</span>
            </label>
            <label class="step4-checkbox-row">
              <input type="checkbox" id="chk-offers">
              <span class="step4-checkbox-box"></span>
              <span class="step4-checkbox-label">Autorizo el envío de <a href="#" class="step4-link">información y ofertas comerciales</a>.</span>
            </label>
          </div>
        </div>
      </div>

      <!-- ========== BOTTOM BAR ========== -->
      <div class="step4-bottom-bar">
        <div class="step4-bottom-bar__inner">
          <button class="step4-bottom-bar__btn" id="btn-pay" disabled>Continuar</button>
        </div>
      </div>
    </div>
  `;

  // ===== INTERACTIVITY =====

  // Frequency selection
  const freqCards = document.querySelectorAll('.step4-frequency-card');
  const freqRadios = document.querySelectorAll('input[name="frequency"]');
  freqRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      freqCards.forEach(c => c.classList.remove('step4-frequency-card--selected'));
      const card = radio.closest('.step4-frequency-card');
      if (card) card.classList.add('step4-frequency-card--selected');
    });
  });

  // Payment method selection
  const payRadios = document.querySelectorAll('input[name="paymethod"]');
  const debitForm = document.getElementById('debit-form');
  const creditForm = document.getElementById('credit-form');
  const payCards = document.querySelectorAll('.step4-payment-card');

  payRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      payCards.forEach(c => c.classList.remove('step4-payment-card--selected'));
      const card = radio.closest('.step4-payment-card');
      if (card) card.classList.add('step4-payment-card--selected');

      // Show/hide forms
      if (radio.value === 'debit') {
        debitForm.classList.remove('step4-card-form--hidden');
        creditForm.classList.add('step4-card-form--hidden');
      } else {
        debitForm.classList.add('step4-card-form--hidden');
        creditForm.classList.remove('step4-card-form--hidden');
      }
    });
  });

  // Terms checkbox enables pay button
  const chkTerms = document.getElementById('chk-terms');
  const btnPay = document.getElementById('btn-pay');

  function updatePayBtn() {
    btnPay.disabled = !chkTerms.checked;
  }
  chkTerms.addEventListener('change', updatePayBtn);

  // Alert close
  const alertClose = document.querySelector('.step4-alert__close');
  if (alertClose) {
    alertClose.addEventListener('click', () => {
      alertClose.closest('.step4-alert').style.display = 'none';
    });
  }

  // Back button
  document.getElementById('btn-back')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = window.location.pathname + '?step=3';
  });

  // Continue button - go to identity validation
  btnPay.addEventListener('click', () => {
    sessionStorage.setItem('hogar_step3_state', JSON.stringify(state || {}));
    window.location.href = window.location.pathname + '?step=5';
  });

  // Card number formatting
  const cardInput = document.getElementById('input-card-number');
  if (cardInput) {
    cardInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 16);
      val = val.replace(/(.{4})/g, '$1 ').trim();
      e.target.value = val;
    });
  }

  // Account number formatting
  const accountInput = document.getElementById('input-account-number');
  if (accountInput) {
    accountInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 12);
      val = val.replace(/(.{4})/g, '$1 ').trim();
      e.target.value = val;
    });
  }
}

function getNextDebitDate() {
  const next = new Date();
  next.setMonth(next.getMonth() + 1);
  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  return `${next.getDate()} ${months[next.getMonth()]} del ${next.getFullYear()}`;
}
