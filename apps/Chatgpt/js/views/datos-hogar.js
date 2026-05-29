export function renderDatosHogar(container) {
  container.innerHTML = `
    <!-- HEADER -->
    <header class="plan-header">
      <a href="/?step=2" class="cob-back">‹ Volver</a>
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
            <div class="stepper-vertical__bull stepper-vertical__bull--active"><div class="stepper-vertical__bull-inner">2</div></div>
            <span class="stepper-vertical__label stepper-vertical__label--active">Datos del hogar</span>
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
          <img src="/images/icon-cobertura.png" alt="" class="datos-title-icon">
          <h1 class="datos-title">Datos del hogar</h1>
        </div>

        <div class="datos-card">
          <div class="datos-form">
            <!-- Section header -->
            <div class="datos-form__section-header">
              <strong class="datos-form__section-title">Sobre su hogar y sus pertenencias 🏠</strong>
              <p class="datos-form__section-desc">Queremos conocer su espacio para darle el respaldo correcto.</p>
            </div>

            <!-- Valor comercial del inmueble (full width) -->
            <div class="datos-form__field datos-form__field--full">
              <label class="datos-form__label">Valor comercial del inmueble</label>
              <input type="text" class="datos-form__input" placeholder="Ej: 200.000.000">
            </div>

            <!-- Row: Equipos electrónicos + Muebles y enseres -->
            <div class="datos-form__row">
              <div class="datos-form__field">
                <label class="datos-form__label">Valor total de sus equipos electrónicos</label>
                <input type="text" class="datos-form__input" placeholder="Ej: 200.000.000">
                <span class="datos-form__help"><span class="datos-form__help-icon">ⓘ</span> Aseguramos hasta $40.000.000</span>
              </div>
              <div class="datos-form__field">
                <label class="datos-form__label">Valor total de sus muebles y enseres</label>
                <input type="text" class="datos-form__input" placeholder="Ej: 200.000.000">
                <span class="datos-form__help"><span class="datos-form__help-icon">ⓘ</span> Aseguramos hasta $40.000.000</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- FOOTER -->
    <footer class="plan-footer">
      <button class="plan-footer__btn" id="btn-continuar-hogar">Continuar</button>
    </footer>

    <!-- MODAL OVERLAY -->
    <div class="otp-overlay" id="otp-overlay" style="display:none;">
      <!-- Modal 1: Código enviado -->
      <div class="otp-modal" id="modal-otp" style="display:none;">
        <h2 class="otp-modal__title">¡Código enviado!</h2>
        <p class="otp-modal__subtitle">Enviamos un código a:</p>
        <div class="otp-modal__phone"><span>📱</span> <strong>******6194</strong></div>
        <div class="otp-modal__field">
          <label class="otp-modal__label">Por favor ingrese el código aquí:</label>
          <div class="otp-modal__input-wrap">
            <input type="text" class="otp-modal__input" placeholder="Ej: 111111">
            <span class="otp-modal__input-icon">⌨</span>
          </div>
          <span class="otp-modal__help">El código estará activo por 80 segundos</span>
        </div>
        <p class="otp-modal__resend">¿No recibió el código? <a href="#" id="btn-resend">Reenviar código</a>.</p>
        <div class="otp-modal__actions">
          <button class="otp-modal__btn-link" id="btn-otro-metodo">Intentar otro método</button>
          <button class="otp-modal__btn-secondary" id="btn-validar-codigo" disabled>Validar código</button>
        </div>
      </div>

      <!-- Modal 2: Otro método -->
      <div class="otp-modal" id="modal-otro-metodo" style="display:none;">
        <h2 class="otp-modal__title" style="text-align:left;">Por su seguridad, validaremos su identidad</h2>
        <p class="otp-modal__subtitle" style="text-align:left;">¿Ha tenido tarjeta de crédito con alguno de estos bancos en los últimos 5 años?</p>
        <div class="otp-modal__radios">
          <label class="otp-modal__radio"><input type="radio" name="banco" value="davivienda"><span>Davivienda</span></label>
          <label class="otp-modal__radio"><input type="radio" name="banco" value="colpatria"><span>Colpatria</span></label>
          <label class="otp-modal__radio"><input type="radio" name="banco" value="bbva"><span>BBVA</span></label>
          <label class="otp-modal__radio"><input type="radio" name="banco" value="ninguna"><span>No reconozco ninguna de las entidades</span></label>
        </div>
        <div class="otp-modal__actions" style="justify-content:center;">
          <button class="otp-modal__btn-secondary" id="btn-continuar-metodo" disabled>Continuar</button>
        </div>
      </div>

      <!-- Modal 3: Loader -->
      <div class="otp-modal otp-modal--loader" id="modal-loader" style="display:none;">
        <img src="/images/protection.png" alt="" class="otp-modal__icon-protection">
        <h2 class="otp-modal__title">Estamos validando su información...</h2>
        <p class="otp-modal__subtitle">Ya casi está listo</p>
        <div class="otp-modal__spinner"></div>
      </div>
    </div>
  `;

  // OTP Flow logic
  setTimeout(() => {
    const overlay = document.getElementById('otp-overlay');
    const modalOtp = document.getElementById('modal-otp');
    const modalOtro = document.getElementById('modal-otro-metodo');
    const modalLoader = document.getElementById('modal-loader');
    const btnValidar = document.getElementById('btn-validar-codigo');
    const otpInput = document.querySelector('.otp-modal__input');

    // Enable/disable Validar código based on 6 digits
    otpInput?.addEventListener('input', () => {
      const val = otpInput.value.replace(/\D/g, '');
      otpInput.value = val.substring(0, 6);
      if (val.length >= 6) {
        btnValidar.disabled = false;
        btnValidar.classList.add('otp-modal__btn-secondary--active');
      } else {
        btnValidar.disabled = true;
        btnValidar.classList.remove('otp-modal__btn-secondary--active');
      }
    });

    // Show modal 1 when clicking Continuar
    document.getElementById('btn-continuar-hogar')?.addEventListener('click', () => {
      // Save hogar data
      const inputs = document.querySelectorAll('.datos-form__input');
      const data = {
        valorInmueble: inputs[0]?.value || '',
        valorElectronicos: inputs[1]?.value || '',
        valorMuebles: inputs[2]?.value || ''
      };
      sessionStorage.setItem('datos_hogar', JSON.stringify(data));
      overlay.style.display = 'flex';
      modalOtp.style.display = 'flex';
    });

    // Validar código -> show loader -> redirect
    btnValidar?.addEventListener('click', () => {
      if (btnValidar.disabled) return;
      modalOtp.style.display = 'none';
      modalLoader.style.display = 'flex';
      setTimeout(() => { window.location.href = '/?step=4'; }, 3000);
    });

    // Intentar otro método -> show modal 2
    document.getElementById('btn-otro-metodo')?.addEventListener('click', () => {
      modalOtp.style.display = 'none';
      modalOtro.style.display = 'flex';
    });

    // Enable Continuar in modal 2 when a radio is selected
    const btnContinuarMetodo = document.getElementById('btn-continuar-metodo');
    document.querySelectorAll('input[name="banco"]').forEach(radio => {
      radio.addEventListener('change', () => {
        btnContinuarMetodo.disabled = false;
        btnContinuarMetodo.classList.add('otp-modal__btn-secondary--active');
      });
    });

    // Continuar en modal 2 -> show loader -> redirect
    btnContinuarMetodo?.addEventListener('click', () => {
      if (btnContinuarMetodo.disabled) return;
      modalOtro.style.display = 'none';
      modalLoader.style.display = 'flex';
      setTimeout(() => { window.location.href = '/?step=4'; }, 3000);
    });
  }, 100);
}
