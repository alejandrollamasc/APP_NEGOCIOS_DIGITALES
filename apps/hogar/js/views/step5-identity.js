export function renderStep5Identity(container) {
  let currentScreen = 1; // 1=datos, 2=OTP, 3=preguntas, 4=validando, 5=redirigiendo

  container.innerHTML = `
    <div class="step5id-page">
      <div class="step5id-overlay"></div>
      <div class="step5id-modal" id="identity-modal">
        <!-- Screen 1: Datos de validación -->
        <div class="step5id-screen active" id="screen-1">
          <div class="step5id-modal__close-row">
            <button class="step5id-modal__close" id="btn-close-identity">✕</button>
          </div>
          <div class="step5id-modal__header">
            <h2 class="step5id-modal__title">Antes de pagar y por su seguridad vamos a validar su identidad</h2>
            <p class="step5id-modal__subtitle">Ingrese sus datos para continuar con la validación.</p>
          </div>
          <div class="step5id-modal__body">
            <div class="step5id-form">
              <div class="step5id-field">
                <label class="step5id-field__label">Celular</label>
                <input type="text" class="step5id-field__input" id="id-phone" placeholder="300 000 0000" value="318 555 8278">
              </div>
              <div class="step5id-field">
                <label class="step5id-field__label">Correo</label>
                <input type="email" class="step5id-field__input" id="id-email" placeholder="correo@ejemplo.com" value="juanmanuel@correo.com">
              </div>
              <div class="step5id-field">
                <label class="step5id-field__label">Fecha de expedición</label>
                <input type="text" class="step5id-field__input" id="id-expedition" placeholder="DD/MM/AAAA">
              </div>
            </div>
          </div>
          <div class="step5id-modal__footer">
            <button class="step5id-btn" id="btn-screen1-next" disabled>Validar</button>
          </div>
        </div>

        <!-- Screen 2: Código OTP -->
        <div class="step5id-screen" id="screen-2">
          <div class="step5id-modal__close-row">
            <button class="step5id-modal__close" id="btn-close-identity-2">✕</button>
          </div>
          <div class="step5id-modal__header">
            <h2 class="step5id-modal__title">Antes de pagar y por su seguridad vamos a validar su identidad</h2>
            <p class="step5id-modal__subtitle">Ingrese sus datos para continuar con la validación.</p>
          </div>
          <div class="step5id-modal__body step5id-modal__body--otp">
            <div class="step5id-otp-section">
              <img src="/Iconos/Group 2432.png" alt="" class="step5id-otp-icon">
              <h3 class="step5id-otp-title">Ingrese el código de verificación</h3>
              <p class="step5id-otp-phone">Enviado al número <strong>31* *** 8278</strong></p>
            </div>
            <div class="step5id-otp-input-row">
              <input type="text" class="step5id-otp-field" id="otp-code" placeholder="- - - - - -" maxlength="6">
              <button class="step5id-otp-send" id="btn-otp-send">Enviar</button>
            </div>
            <p class="step5id-otp-timer" id="otp-timer">Reenviar en <strong>30</strong> segundos</p>
            <div class="step5id-otp-alt">
              <p class="step5id-otp-alt__title">¿Celular no disponible?</p>
              <a href="#" class="step5id-otp-alt__link">Intente con otro método</a>
            </div>
          </div>
          <div class="step5id-modal__footer">
            <button class="step5id-btn" id="btn-screen2-next" disabled>Validar</button>
          </div>
        </div>

        <!-- Screen 3: Preguntas de seguridad (Experian) -->
        <div class="step5id-screen" id="screen-3">
          <div class="step5id-modal__close-row">
            <button class="step5id-modal__close" id="btn-close-identity-3">✕</button>
          </div>
          <div class="step5id-modal__header">
            <h2 class="step5id-modal__title">Antes de pagar y por su seguridad vamos a validar su identidad</h2>
            <p class="step5id-modal__subtitle">Ingrese sus datos para continuar con la validación.</p>
          </div>
          <div class="step5id-modal__body step5id-modal__body--questions">
            <p class="step5id-question-label">¿Con cuál de las siguientes entidades ha tenido algún vínculo?</p>
            <div class="step5id-options" id="question-options">
              <label class="step5id-radio-option"><input type="radio" name="q1" value="bancolombia"><span class="step5id-radio-circle"></span><span>Bancolombia</span></label>
              <label class="step5id-radio-option"><input type="radio" name="q1" value="bbva"><span class="step5id-radio-circle"></span><span>BBVA</span></label>
              <label class="step5id-radio-option"><input type="radio" name="q1" value="none"><span class="step5id-radio-circle"></span><span>Ninguna</span></label>
              <label class="step5id-radio-option"><input type="radio" name="q1" value="davivienda"><span class="step5id-radio-circle"></span><span>Davivienda Corredores de Seguros</span></label>
            </div>
          </div>
          <div class="step5id-modal__footer">
            <button class="step5id-btn" id="btn-screen3-next" disabled>Validar</button>
          </div>
        </div>

        <!-- Screen 4: Validando (loading) -->
        <div class="step5id-screen" id="screen-4">
          <div class="step5id-modal__body step5id-modal__body--loading">
            <img src="/Iconos/Protection.png" alt="" class="step5id-loading-icon">
            <h3 class="step5id-loading-title">Estamos validando su información...</h3>
            <div class="step5id-spinner"></div>
            <p class="step5id-loading-hint">Espere un momento...</p>
          </div>
        </div>

        <!-- Screen 5: Redirigiendo -->
        <div class="step5id-screen" id="screen-5">
          <div class="step5id-modal__body step5id-modal__body--loading">
            <img src="/Iconos/Protection.png" alt="" class="step5id-loading-icon">
            <h3 class="step5id-loading-title">Lo vamos a redirigir para que realice el pago de su seguro.</h3>
            <div class="step5id-spinner"></div>
            <p class="step5id-loading-hint">Lo vamos a redirigir en un momento...</p>
          </div>
        </div>
      </div>
    </div>
  `;

  // ===== INTERACTIVITY =====
  const screens = document.querySelectorAll('.step5id-screen');

  function showScreen(num) {
    currentScreen = num;
    screens.forEach((s, i) => s.classList.toggle('active', i === num - 1));
  }

  // Screen 1: Enable button when expedition date is filled
  const expeditionInput = document.getElementById('id-expedition');
  const btn1 = document.getElementById('btn-screen1-next');
  expeditionInput.addEventListener('input', () => { btn1.disabled = !expeditionInput.value.trim(); });
  btn1.addEventListener('click', () => showScreen(2));

  // Screen 2: OTP
  const otpInput = document.getElementById('otp-code');
  const btnOtpSend = document.getElementById('btn-otp-send');
  const btn2 = document.getElementById('btn-screen2-next');

  otpInput.addEventListener('input', () => {
    otpInput.value = otpInput.value.replace(/\D/g, '').substring(0, 6);
    btn2.disabled = otpInput.value.length < 6;
  });
  btnOtpSend.addEventListener('click', () => {
    if (otpInput.value.length >= 4) btn2.disabled = false;
  });
  btn2.addEventListener('click', () => showScreen(3));

  // Timer
  let timeLeft = 30;
  const timerEl = document.getElementById('otp-timer');
  const timerInterval = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) { clearInterval(timerInterval); timerEl.innerHTML = '<a href="#" class="step5id-otp-resend">Reenviar código</a>'; }
    else timerEl.innerHTML = `Reenviar en <strong>${timeLeft}</strong> segundos`;
  }, 1000);

  // Screen 3: Questions
  const btn3 = document.getElementById('btn-screen3-next');
  document.getElementById('question-options').addEventListener('change', () => { btn3.disabled = false; });
  btn3.addEventListener('click', () => {
    showScreen(4);
    // After 3 seconds show redirect screen
    setTimeout(() => {
      showScreen(5);
      // After 2 more seconds navigate to success
      setTimeout(() => {
        window.location.href = window.location.pathname + '?step=6';
      }, 2500);
    }, 3000);
  });

  // Close buttons - go back to step 4
  document.querySelectorAll('.step5id-modal__close').forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('¿Desea cancelar la validación? Volverá al resumen de compra.')) {
        window.location.href = window.location.pathname + '?step=4';
      }
    });
  });
}
