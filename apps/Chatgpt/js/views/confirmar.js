export function renderConfirmar(container) {
  const titular = JSON.parse(sessionStorage.getItem('datos_titular') || '{}');
  const hogar = JSON.parse(sessionStorage.getItem('datos_hogar') || '{}');
  const nombreCompleto = [titular.primerNombre, titular.segundoNombre, titular.primerApellido, titular.segundoApellido].filter(Boolean).join(' ') || 'Susana Castaño Valencia';
  const numDoc = titular.numDoc || '1023874383';
  const tipoDoc = titular.tipoDoc || 'Cédula de ciudadanía';
  const celular = titular.celular || '311 000 0000';
  const valorInmueble = hogar.valorInmueble || '$200.000.000';
  const valorElectronicos = hogar.valorElectronicos || '$54.000.000';
  const valorMuebles = hogar.valorMuebles || '$21.000.000';
  container.innerHTML = `
    <!-- HEADER -->
    <header class="plan-header">
      <a href="/?step=3" class="cob-back">‹ Volver</a>
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
          <!-- Header: Ya casi terminamos -->
          <div class="confirm-header">
            <img src="/images/icon-casi-terminamos.png" alt="" class="confirm-header__icon">
            <div class="confirm-header__text">
              <h2 class="confirm-header__title">¡Ya casi terminamos!</h2>
              <p class="confirm-header__desc">Verifique que toda la información esté correcta.</p>
            </div>
          </div>

          <!-- Card: Datos del titular -->
          <div class="confirm-card">
            <div class="confirm-card__title-row">
              <img src="/images/icon-datos-titular2.png" alt="" class="confirm-card__icon">
              <h3 class="confirm-card__title">Datos del titular</h3>
            </div>
            <div class="confirm-card__grid">
              <div class="confirm-card__item">
                <span class="confirm-card__label">Nombre:</span>
                <strong class="confirm-card__value">${nombreCompleto}</strong>
              </div>
              <div class="confirm-card__item">
                <span class="confirm-card__label">${tipoDoc}:</span>
                <strong class="confirm-card__value">${numDoc}</strong>
              </div>
              <div class="confirm-card__item">
                <span class="confirm-card__label-italic">Enviaremos la póliza al siguiente correo:</span>
                <span class="confirm-card__email">susana.casta@gmail.com <a href="#">✏️</a></span>
              </div>
            </div>
          </div>

          <!-- Card: Datos del hogar -->
          <div class="confirm-card">
            <div class="confirm-card__title-row">
              <img src="/images/icon-datos-hogar.png" alt="" class="confirm-card__icon">
              <h3 class="confirm-card__title">Datos del hogar</h3>
            </div>
            <div class="confirm-card__grid confirm-card__grid--4">
              <div class="confirm-card__item">
                <span class="confirm-card__label">Dirección:</span>
                <strong class="confirm-card__value">Cra 55b #183-32</strong>
              </div>
              <div class="confirm-card__item">
                <span class="confirm-card__label">Valor vivienda:</span>
                <strong class="confirm-card__value">${valorInmueble}</strong>
              </div>
              <div class="confirm-card__item">
                <span class="confirm-card__label">Equipos electrónicos:</span>
                <strong class="confirm-card__value">${valorElectronicos}</strong>
              </div>
              <div class="confirm-card__item">
                <span class="confirm-card__label">Muebles y enseres:</span>
                <strong class="confirm-card__value">${valorMuebles}</strong>
              </div>
            </div>
          </div>

          <!-- Card: Plan sugerido -->
          <div class="confirm-card">
            <div class="confirm-card__title-row">
              <img src="/images/icon-plan-sugerido.png" alt="" class="confirm-card__icon">
              <h3 class="confirm-card__title">Plan sugerido</h3>
            </div>
            <div class="confirm-card__checklist">
              <div class="confirm-card__check-item"><span class="confirm-card__check">✓</span> Daños por <strong>incendio o agua</strong> al interior del inmueble</div>
              <div class="confirm-card__check-item"><span class="confirm-card__check">✓</span> Daños causados por <strong>lluvias, vientos fuertes</strong>, granizadas e inundaciones</div>
              <div class="confirm-card__check-item"><span class="confirm-card__check">✓</span> Daños en <strong>electrodomésticos</strong> por <strong>fallas eléctricas</strong> o de instalación</div>
              <div class="confirm-card__check-item"><span class="confirm-card__check">✓</span> <strong>Robo</strong> al interior de su hogar con <strong>violencia</strong> o forzamiento</div>
              <div class="confirm-card__check-item"><span class="confirm-card__check">✓</span> Daños y pérdidas por <strong>disturbios sociales</strong> como protestas o huelgas</div>
              <div class="confirm-card__check-item"><span class="confirm-card__check">✓</span> Daños a su hogar por <strong>impacto de vehículos</strong> o caída de árboles</div>
              <div class="confirm-card__check-item"><span class="confirm-card__check">✓</span> Daños por <strong>terremoto, maremoto</strong> o erupción volcánica</div>
            </div>
          </div>

          <!-- Card: Vigencia de la póliza -->
          <div class="confirm-card">
            <div class="confirm-card__title-row">
              <img src="/images/icon-vigencia.png" alt="" class="confirm-card__icon">
              <h3 class="confirm-card__title">Vigencia de la póliza</h3>
            </div>
            <div class="confirm-card__dates">
              <strong>${(() => { const d = new Date(); d.setDate(d.getDate() + 1); return d.toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' }); })()}</strong>
              <span class="confirm-card__arrow">→</span>
              <strong>${(() => { const d = new Date(); d.setDate(d.getDate() + 1); d.setFullYear(d.getFullYear() + 1); return d.toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' }); })()}</strong>
            </div>
            <p class="confirm-card__note">La cobertura tiene vigencia de un año ininterrumpida hasta que usted decida voluntariamente cancelar el seguro.</p>
          </div>
        </div>
      </section>
    </div>

    <!-- FOOTER -->
    <footer class="plan-footer">
      <a href="/?step=5" class="plan-footer__btn" style="text-decoration:none;">Continuar</a>
    </footer>
  `;
}
