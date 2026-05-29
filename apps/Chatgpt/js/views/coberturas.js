export function renderCoberturas(container) {
  const categories = [
    {
      icon: '/images/plomeria.png',
      title: 'Plomería',
      items: [
        { text: 'Llaves sanitarias y accesorios', desc: 'Nos encargaremos de realizar el arreglo o cambio del kit de descarga del tanque sanitario de su casa y accesorios como empaques, émbolos, pomas, entre otros.', amount: '$1.000.000' },
        { text: 'Griferías sanitarias y accesorios de sobreponer', desc: 'Si la llave o mezclador de su lavamanos, lavaplatos o lavadero presenta algún daño, usted podrá solicitar el servicio de plomería para repararlo.', amount: '$1.000.000' },
        { text: 'Conexiones de agua y redes sanitarias', desc: 'Realizaremos el arreglo o cambio en conexiones de agua entre las redes y los aparatos sanitarios como acoples, sifones, mangueras, adaptadores o accesorios de las tuberías.', amount: '$1.000.000' },
        { text: 'Redes de agua potable, aguas negras o residuales', desc: 'Con este servicio identificaremos dónde se presenta el taponamiento en lavamanos, lavaplatos, lavadero, ducha, baño, cocina o sanitario y de ser necesario desmontaremos el sifón y rejilla.', amount: '$1.000.000' },
        { text: 'Juntas de baldosas', desc: 'Reparamos las juntas de acabados en sus pisos, paredes del baño, mesones o muebles y los aparatos sanitarios como lavaplatos, lavamanos y sanitarios.', amount: '$1.000.000' }
      ]
    },
    {
      icon: '/images/electricidad.png',
      title: 'Electricidad',
      items: [
        { text: 'Tomas eléctricas y salidas de iluminación', desc: 'Reemplazamos enchufes o conexiones eléctricas que presenten fallas para restablecer el servicio en su casa.', amount: '$1.000.000' },
        { text: 'Tacos o breakers', desc: 'Reactivamos la salida de corriente eléctrica, identificando el taco que presenta intermitencias y sustituyéndolo por un nuevo breaker.', amount: '$1.000.000' },
        { text: 'Cableado de conducción eléctrica', desc: 'Reparamos el cableado afectado por corto eléctrico.', amount: '$1.000.000' },
        { text: 'Conexiones de timbres', desc: 'Cambiamos el cableado, la caja plástica o el interruptor del timbre de su casa.', amount: '$1.000.000' }
      ]
    },
    {
      icon: '/images/gas.png',
      title: 'Gas domiciliario',
      items: [
        { text: 'Fuga de gas', desc: 'Reparamos las tuberías que presenten fuga de gas por rotura.', amount: '$1.000.000' },
        { text: 'Conexiones de electrodomésticos que utilicen gas', desc: 'Arreglamos las conexiones de tuberías de suministro de gas en estufas, calentadores, hornos, secadoras, chimeneas, entre otros.', amount: '$1.000.000' }
      ]
    },
    {
      icon: '/images/cerrajeria.png',
      title: 'Cerrajería',
      items: [
        { text: 'Cerraduras de puertas exteriores', desc: 'Instalación de repuesto en cerraduras que presenten funcionamiento defectuoso.', amount: '$1.000.000' },
        { text: 'Pérdida de llaves y apertura de puertas exteriores', desc: 'Nuestros especialistas abrirán la puerta exterior de su vivienda en caso de que no encuentre las llaves o la haya cerrado accidentalmente.', amount: '$1.000.000' },
        { text: 'Apertura de puertas interiores', desc: 'Contamos con servicio especializado en apertura de puertas al interior del inmueble.', amount: '$1.000.000' },
        { text: 'Apertura de muebles', desc: 'Abrimos por usted los muebles de carpintería interna, tales como alacenas, armarios, entre otros.', amount: '$1.000.000' }
      ]
    },
    {
      icon: '/images/vidrios.png',
      title: 'Vidrios',
      items: [
        { text: 'Vidrios: ventanas o puertas', desc: 'Reponemos los vidrios rotos que formen parte del cerramiento de su vivienda.', amount: '$1.000.000' },
        { text: 'Vidrios de cubierta', desc: 'Cambio de vidrios de cubierta rotos como claraboyas, tragaluz o marquesinas que sean parte del cerramiento del inmueble.', amount: '$1.000.000' },
        { text: 'Espejos fijos', desc: 'Contamos con servicio especializado en reposición de espejos fijos al interior del inmueble.', amount: '$1.000.000' }
      ]
    },
    {
      icon: '/images/juridica.png',
      title: 'Orientación jurídica y telefónica',
      items: [
        { text: '', desc: 'Brindamos asesorías en materia familiar, civil, laboral y tributaria en eventos que sucedan en su día a día.', amount: '' }
      ]
    },
    {
      icon: '/images/hospedaje.png',
      title: 'Gastos de hospedaje',
      items: [
        { text: '', desc: 'Si el inmueble asegurado no puede ser habitado por algún siniestro amparado por la póliza, nos encargaremos de prestar el servicio de alojamiento en un hotel. Hasta por (5) noches seguidas con una cuantía por noche de $666.660 y un límite máximo de $3.333.333', amount: '' }
      ]
    },
    {
      icon: '/images/mudanza.png',
      title: 'Gastos de mudanza',
      items: [
        { text: '', desc: 'Si el inmueble asegurado no puede ser habitado por algún siniestro amparado por la póliza, nos encargaremos de brindarle el servicio de mudanza para el traslado de sus pertenencias.', amount: '$1.000.000' }
      ]
    },
    {
      icon: '/images/vigilancia.png',
      title: 'Servicio de vigilancia',
      items: [
        { text: '', desc: 'Si el cerramiento de su inmueble se ve afectado por algún daño, nos encargaremos de prestarle el servicio de vigilancia para el cuidado y protección de los bienes del asegurado.', amount: '$1.000.000' }
      ]
    },
    {
      icon: '/images/mascotas.png',
      title: 'Guardería para mascotas',
      items: [
        { text: 'Guardería para mascotas por siniestro', desc: 'Si el inmueble asegurado no puede ser habitado por algún siniestro amparado por la póliza, nos encargaremos del cuidado de su mascota.', amount: '$1.000.000' },
        { text: 'Guardería para mascotas por hospitalización del propietario', desc: 'Si usted se encuentra hospitalizado, tranquilo, nos encargaremos del cuidado de su mascota durante dicho periodo.', amount: '$1.000.000' }
      ]
    },
    {
      icon: '/images/muebles.png',
      title: 'Muebles',
      items: [
        { text: 'Ajuste de muebles de carpintería', desc: 'Realizaremos el arreglo de los accesorios de sus muebles en madera que se encuentren desprendidos como manijas, rieles, botones y más.', amount: '$1.000.000' },
        { text: 'Ajuste o cambio de bisagras', desc: 'Instalamos, desmontamos o ajustamos las bisagras en los muebles de carpintería al interior de su inmueble.', amount: '$1.000.000' }
      ]
    }
  ];

  container.innerHTML = `
    <header class="plan-header">
      <a href="/" class="cob-back">‹ Volver</a>
      <img src="/images/logo-seguros-bolivar.png" alt="Seguros Bolívar" class="plan-header__logo">
    </header>

    <section class="cob-page">
      <div class="cob-container">
        <div class="cob-title-row">
          <img src="/images/icon-cobertura.png" alt="" class="cob-title-icon">
          <h1 class="cob-title">Detalle de la cobertura</h1>
        </div>

        <div class="cob-card">
          <div class="cob-card__header">
            <p class="cob-card__subtitle">Todo lo que debe conocer del</p>
            <h2 class="cob-card__plan-name">Plan sugerido</h2>
          </div>

          ${categories.map(cat => `
            <div class="cob-category">
              <div class="cob-category__header">
                <img src="${cat.icon}" alt="${cat.title}" class="cob-category__icon">
                <h3 class="cob-category__title">${cat.title}</h3>
              </div>
              ${cat.items.map(item => `
                <div class="cob-category__item">
                  <span class="cob-category__check">✓</span>
                  <div class="cob-category__text">
                    ${item.text ? `<strong>${item.text}</strong> ` : ''}${item.desc}${item.amount ? ` <strong>Hasta por ${item.amount}</strong>` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          `).join('')}

          <a href="#" class="cob-download">
            <span class="cob-download__icon">⬇</span>
            <span class="cob-download__text">Descargar condiciones del seguro</span>
          </a>
        </div>
      </div>
    </section>

    <footer class="plan-footer">
      <button class="plan-footer__btn" onclick="window.location.href='/'">Continuar</button>
    </footer>
  `;
}
