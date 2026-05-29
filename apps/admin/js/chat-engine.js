// Enhanced chat engine with smarter NLP-like command parsing

const ELEMENT_MAP = {
  'título': 'h1, h2, .step-title, .sb-hero__title',
  'titulo': 'h1, h2, .step-title, .sb-hero__title',
  'subtítulo': 'h2, h3, p.sb-hero__subtitle',
  'subtitulo': 'h2, h3, p.sb-hero__subtitle',
  'botón': '.sb-ui-button, button',
  'boton': '.sb-ui-button, button',
  'botón principal': '.sb-ui-button--primary',
  'botón continuar': '.bottom-bar__btn, .plans-continue-btn',
  'header': '.app-header, .sb-navbar',
  'encabezado': '.app-header, .sb-navbar',
  'banner': '.sb-hero, .sb-warning',
  'formulario': '.sb-hero__form, form',
  'tarjeta': '.sb-ui-card, .plan-card',
  'card': '.sb-ui-card, .plan-card',
  'plan': '.plan-card',
  'precio': '.plan-card__price, .plan-price',
  'alerta': '.sb-ui-alert, .identity-alert',
  'input': '.sb-ui-input, input',
  'campo': '.sb-ui-input, input',
  'sidebar': '.app-sidebar',
  'stepper': '.stepper-nav',
  'logo': '.sb-navbar__logo-img, .header-logo-img',
  'imagen': 'img',
  'texto': 'p, span, label',
  'enlace': 'a',
  'link': 'a',
  'modal': '.sb-hero__form, .editor-popup',
  'pie': '.plans-bottom-bar, .bottom-bar',
  'barra inferior': '.plans-bottom-bar, .bottom-bar',
  'overlay': '.sb-hero__overlay',
  'badge': '.plan-badge, .sb-ui-badge',
  'check': '.sb-hero__check, .check-label-home',
  'checkbox': 'input[type=checkbox]',
  'select': 'select',
  'tabla': 'table',
  'lista': 'ul, ol',
  'menú': '.sb-navbar__links',
  'navegación': '.sb-navbar, .page-nav',
  'pestañas': '.sb-top-bar, .chat-tabs',
  'tabs': '.sb-top-bar, .chat-tabs'
};

const COLOR_MAP = {
  'rojo': '#d32f2f', 'red': '#d32f2f',
  'azul': '#1976D2', 'blue': '#1976D2',
  'verde': '#0a6741', 'green': '#0a6741',
  'amarillo': '#E8C916', 'yellow': '#E8C916',
  'naranja': '#f57c00', 'orange': '#f57c00',
  'blanco': '#ffffff', 'white': '#ffffff',
  'negro': '#000000', 'black': '#000000',
  'gris': '#888888', 'gray': '#888888',
  'morado': '#7B1FA2', 'purple': '#7B1FA2',
  'rosa': '#E91E63', 'pink': '#E91E63',
  'transparente': 'transparent', 'transparent': 'transparent'
};

function resolveSelector(name) {
  const lower = name.toLowerCase().trim();
  return ELEMENT_MAP[lower] || `.${lower.replace(/\s+/g, '-')}`;
}

function resolveColor(name) {
  const lower = name.toLowerCase().trim();
  return COLOR_MAP[lower] || lower; // Return as-is if it's a hex/rgb value
}

export function processMessage(message) {
  const lower = message.toLowerCase().trim();

  // Help
  if (lower === 'ayuda' || lower === 'help' || lower === '?') {
    return { type: 'help', response: getHelpText() };
  }

  // Change text: "cambiar texto del título a "nuevo""
  let match = message.match(/cambiar?\s+(?:el\s+)?texto\s+(?:del?\s+)?(.+?)\s+(?:a|por)\s+"(.+?)"/i);
  if (match) {
    return makeCommand('changeText', resolveSelector(match[1]), 'textContent', match[2], `Cambiar texto de "${match[1]}" a "${match[2]}"`);
  }

  // Change color: "cambiar color del título a rojo"
  match = message.match(/cambiar?\s+(?:el\s+)?color\s+(?:del?\s+)?(.+?)\s+(?:a|por)\s+(.+)/i);
  if (match) {
    return makeCommand('changeStyle', resolveSelector(match[1]), 'color', resolveColor(match[2]), `Cambiar color de "${match[1]}" a ${match[2]}`);
  }

  // Change background: "cambiar fondo del header a azul"
  match = message.match(/cambiar?\s+(?:el\s+)?fondo\s+(?:del?\s+)?(.+?)\s+(?:a|por)\s+(.+)/i);
  if (match) {
    return makeCommand('changeStyle', resolveSelector(match[1]), 'backgroundColor', resolveColor(match[2]), `Cambiar fondo de "${match[1]}" a ${match[2]}`);
  }

  // Change size: "cambiar tamaño del título a 32px"
  match = message.match(/cambiar?\s+(?:el\s+)?tamaño\s+(?:del?\s+)?(.+?)\s+(?:a|por)\s+(.+)/i);
  if (match) {
    return makeCommand('changeStyle', resolveSelector(match[1]), 'fontSize', match[2].trim(), `Cambiar tamaño de "${match[1]}" a ${match[2]}`);
  }

  // Change width: "cambiar ancho del formulario a 400px"
  match = message.match(/cambiar?\s+(?:el\s+)?ancho\s+(?:del?\s+)?(.+?)\s+(?:a|por)\s+(.+)/i);
  if (match) {
    return makeCommand('changeStyle', resolveSelector(match[1]), 'width', match[2].trim(), `Cambiar ancho de "${match[1]}" a ${match[2]}`);
  }

  // Hide: "ocultar el banner"
  match = message.match(/(?:ocultar?|esconder?|hide)\s+(?:el\s+|la\s+|los\s+)?(.+)/i);
  if (match) {
    return makeCommand('changeStyle', resolveSelector(match[1]), 'display', 'none', `Ocultar "${match[1]}"`);
  }

  // Show: "mostrar el banner"
  match = message.match(/(?:mostrar?|show|ver)\s+(?:el\s+|la\s+|los\s+)?(.+)/i);
  if (match) {
    return makeCommand('changeStyle', resolveSelector(match[1]), 'display', '', `Mostrar "${match[1]}"`);
  }

  // Move: "mover título arriba 20px"
  match = message.match(/mover?\s+(?:el\s+|la\s+)?(.+?)\s+(arriba|abajo|izquierda|derecha)\s*(\d+)?/i);
  if (match) {
    const dir = match[2].toLowerCase();
    const px = (match[3] || '20') + 'px';
    const propMap = { arriba: 'marginTop', abajo: 'marginBottom', izquierda: 'marginLeft', derecha: 'marginRight' };
    return makeCommand('changeStyle', resolveSelector(match[1]), propMap[dir], px, `Mover "${match[1]}" ${dir} ${px}`);
  }

  // Border radius: "redondear botón a 20px"
  match = message.match(/(?:redondear?|border.?radius)\s+(?:del?\s+|el\s+)?(.+?)\s+(?:a|por)\s+(.+)/i);
  if (match) {
    return makeCommand('changeStyle', resolveSelector(match[1]), 'borderRadius', match[2].trim(), `Redondear "${match[1]}" a ${match[2]}`);
  }

  // Opacity: "opacidad del banner a 0.5"
  match = message.match(/(?:opacidad|opacity)\s+(?:del?\s+|el\s+)?(.+?)\s+(?:a|por)\s+(.+)/i);
  if (match) {
    return makeCommand('changeStyle', resolveSelector(match[1]), 'opacity', match[2].trim(), `Opacidad de "${match[1]}" a ${match[2]}`);
  }

  // Direct CSS: "css: .selector | propiedad | valor"
  if (lower.startsWith('css:')) {
    const parts = message.substring(4).trim().split('|');
    if (parts.length >= 3) {
      return makeCommand('changeStyle', parts[0].trim(), parts[1].trim(), parts[2].trim(), `CSS: ${parts[0].trim()} → ${parts[1].trim()}: ${parts[2].trim()}`);
    }
  }

  // Select mode
  if (lower.includes('seleccionar') || lower.includes('select') || lower.includes('elegir')) {
    return { type: 'select-mode', response: '🎯 **Modo selección activado.** Haz clic en un elemento para editarlo.' };
  }

  // Conversational responses
  if (lower.includes('hola') || lower.includes('hey') || lower.includes('buenas')) {
    return { type: 'chat', response: '👋 ¡Hola! Soy tu asistente de diseño. Puedo ayudarte a modificar textos, colores, tamaños, visibilidad y más. Escribe **ayuda** para ver todos los comandos.' };
  }

  if (lower.includes('gracias') || lower.includes('thanks')) {
    return { type: 'chat', response: '😊 ¡De nada! Estoy aquí para ayudarte. ¿Necesitas algo más?' };
  }

  if (lower.includes('qué puedo') || lower.includes('que puedo') || lower.includes('qué haces') || lower.includes('que haces')) {
    return { type: 'chat', response: 'Puedo ayudarte a:\n- **Cambiar textos**: "cambiar texto del título a \\"Nuevo\\"\"\n- **Cambiar colores**: "cambiar color del botón a rojo"\n- **Cambiar fondos**: "cambiar fondo del header a azul"\n- **Ocultar/mostrar**: "ocultar el banner"\n- **Cambiar tamaños**: "cambiar tamaño del título a 32px"\n- **Mover elementos**: "mover título arriba 20px"\n- Y mucho más. Escribe **ayuda** para la lista completa.' };
  }

  return {
    type: 'unknown',
    response: `No entendí ese comando. Intenta con frases como:\n- "Cambiar texto del título a \\"Nuevo título\\""\n- "Cambiar color del botón a rojo"\n- "Ocultar el banner"\n\nEscribe **ayuda** para ver todos los comandos.`
  };
}

function makeCommand(action, selector, property, value, description) {
  return {
    type: 'command',
    command: { action, selector, property, value, description },
    response: `✅ **${description}**\n\nCambio aplicado en la vista previa. Presiona "✓ Aplicar cambios" para guardarlo.`
  };
}

function getHelpText() {
  return `## 🤖 Comandos disponibles

**Texto:**
- \`Cambiar texto del título a "Nuevo título"\`

**Colores:**
- \`Cambiar color del botón a rojo\`
- \`Cambiar fondo del header a azul\`

**Tamaño:**
- \`Cambiar tamaño del título a 32px\`
- \`Cambiar ancho del formulario a 400px\`

**Visibilidad:**
- \`Ocultar el banner\`
- \`Mostrar la alerta\`

**Posición:**
- \`Mover título arriba 20px\`

**Estilo:**
- \`Redondear botón a 20px\`
- \`Opacidad del banner a 0.5\`

**CSS directo:**
- \`css: .selector | propiedad | valor\`

**Selección:**
- \`Seleccionar elemento\`

**Colores disponibles:** rojo, azul, verde, amarillo, naranja, blanco, negro, gris, morado, rosa, transparente (o cualquier valor hex/rgb)

**Elementos:** título, botón, header, banner, formulario, tarjeta, plan, precio, alerta, input, logo, imagen, enlace, modal, overlay, badge, menú, tabs`;
}
