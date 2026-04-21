// Simulated LLM chat engine for design modifications
const COMMAND_PATTERNS = [
  {
    patterns: [/cambiar?\s+(el\s+)?texto\s+(de[l]?\s+)?(.+?)\s+(a|por|con)\s+"(.+)"/i, /text[o]?\s+"(.+?)"\s*(?:a|por|->)\s*"(.+)"/i],
    handler: parseTextChange
  },
  {
    patterns: [/cambiar?\s+(el\s+)?color\s+(de[l]?\s+)?(.+?)\s+(a|por)\s+(.+)/i],
    handler: parseColorChange
  },
  {
    patterns: [/ocultar?\s+(.+)/i, /esconder?\s+(.+)/i, /hide\s+(.+)/i],
    handler: parseHideElement
  },
  {
    patterns: [/mostrar?\s+(.+)/i, /show\s+(.+)/i],
    handler: parseShowElement
  },
  {
    patterns: [/cambiar?\s+(el\s+)?fondo\s+(de[l]?\s+)?(.+?)\s+(a|por)\s+(.+)/i, /background\s+(.+?)\s+(a|to)\s+(.+)/i],
    handler: parseBackgroundChange
  },
  {
    patterns: [/cambiar?\s+(el\s+)?tamaño\s+(de[l]?\s+)?(.+?)\s+(a|por)\s+(.+)/i, /font.?size\s+(.+?)\s+(a|to)\s+(.+)/i],
    handler: parseFontSizeChange
  },
  {
    patterns: [/mover?\s+(.+?)\s+(arriba|abajo|izquierda|derecha)/i],
    handler: parseMoveElement
  },
  {
    patterns: [/cambiar?\s+(la\s+)?imagen\s+(de[l]?\s+)?(.+?)\s+(a|por)\s+"?(.+)"?/i],
    handler: parseImageChange
  }
];

const ELEMENT_MAP = {
  'título': '.step-title, .home-title, h1, h2',
  'titulo': '.step-title, .home-title, h1, h2',
  'botón': '.sb-ui-button',
  'boton': '.sb-ui-button',
  'botón principal': '.sb-ui-button--primary',
  'header': '.app-header',
  'encabezado': '.app-header',
  'banner': '.confirm-banner, .home-hero',
  'tarjeta': '.sb-ui-card',
  'card': '.sb-ui-card',
  'plan': '.plan-card',
  'precio': '.plan-price',
  'alerta': '.sb-ui-alert',
  'input': '.sb-ui-input',
  'formulario': 'form',
  'sidebar': '.app-sidebar',
  'stepper': '.stepper-nav',
  'logo': '.header-logo'
};

function resolveSelector(elementName) {
  const lower = elementName.toLowerCase().trim();
  return ELEMENT_MAP[lower] || `.${lower.replace(/\s+/g, '-')}`;
}

function parseTextChange(match) {
  // Try different match groups
  if (match.length >= 6) {
    return {
      action: 'changeText',
      selector: resolveSelector(match[3]),
      property: 'textContent',
      value: match[5],
      description: `Cambiar texto de "${match[3]}" a "${match[5]}"`
    };
  }
  return null;
}

function parseColorChange(match) {
  return {
    action: 'changeStyle',
    selector: resolveSelector(match[3]),
    property: 'color',
    value: match[5].trim(),
    description: `Cambiar color de "${match[3]}" a ${match[5]}`
  };
}

function parseHideElement(match) {
  const target = match[1] || match[0];
  return {
    action: 'changeStyle',
    selector: resolveSelector(target),
    property: 'display',
    value: 'none',
    description: `Ocultar "${target}"`
  };
}

function parseShowElement(match) {
  const target = match[1] || match[0];
  return {
    action: 'changeStyle',
    selector: resolveSelector(target),
    property: 'display',
    value: '',
    description: `Mostrar "${target}"`
  };
}

function parseBackgroundChange(match) {
  return {
    action: 'changeStyle',
    selector: resolveSelector(match[3]),
    property: 'backgroundColor',
    value: match[5].trim(),
    description: `Cambiar fondo de "${match[3]}" a ${match[5]}`
  };
}

function parseFontSizeChange(match) {
  return {
    action: 'changeStyle',
    selector: resolveSelector(match[3]),
    property: 'fontSize',
    value: match[5].trim(),
    description: `Cambiar tamaño de "${match[3]}" a ${match[5]}`
  };
}

function parseMoveElement(match) {
  const direction = match[2].toLowerCase();
  const marginMap = { arriba: 'marginTop', abajo: 'marginBottom', izquierda: 'marginLeft', derecha: 'marginRight' };
  return {
    action: 'changeStyle',
    selector: resolveSelector(match[1]),
    property: marginMap[direction] || 'marginTop',
    value: '20px',
    description: `Mover "${match[1]}" hacia ${direction}`
  };
}

function parseImageChange(match) {
  return {
    action: 'changeImage',
    selector: resolveSelector(match[3]),
    property: 'src',
    value: match[5].trim().replace(/"/g, ''),
    description: `Cambiar imagen de "${match[3]}"`
  };
}

export function processMessage(message) {
  const lower = message.toLowerCase().trim();

  // Help command
  if (lower === 'ayuda' || lower === 'help' || lower === '?') {
    return {
      type: 'help',
      response: getHelpText()
    };
  }

  // Try to match command patterns
  for (const { patterns, handler } of COMMAND_PATTERNS) {
    for (const pattern of patterns) {
      const match = message.match(pattern);
      if (match) {
        const command = handler(match);
        if (command) {
          return {
            type: 'command',
            command,
            response: `✅ Entendido. Voy a: **${command.description}**\n\nEl cambio se ha aplicado en la vista previa. Presiona "Aplicar cambios" para guardarlo.`
          };
        }
      }
    }
  }

  // Direct CSS selector support
  if (lower.startsWith('css:')) {
    const parts = message.substring(4).trim().split('|');
    if (parts.length >= 3) {
      return {
        type: 'command',
        command: {
          action: 'changeStyle',
          selector: parts[0].trim(),
          property: parts[1].trim(),
          value: parts[2].trim(),
          description: `CSS: ${parts[0].trim()} → ${parts[1].trim()}: ${parts[2].trim()}`
        },
        response: `✅ Aplicado cambio CSS directo.\nSelector: \`${parts[0].trim()}\`\nPropiedad: \`${parts[1].trim()}\`\nValor: \`${parts[2].trim()}\``
      };
    }
  }

  // Element selection mode
  if (lower.includes('seleccionar') || lower.includes('select') || lower.includes('elegir elemento')) {
    return {
      type: 'select-mode',
      response: '🎯 **Modo selección activado.** Haz clic en cualquier elemento de la vista previa para seleccionarlo y editarlo.'
    };
  }

  return {
    type: 'unknown',
    response: `No entendí el comando. Intenta con frases como:\n- "Cambiar el texto del título a \\"Nuevo título\\""\n- "Cambiar el color del botón a rojo"\n- "Ocultar el banner"\n- Escribe **ayuda** para ver todos los comandos disponibles.`
  };
}

function getHelpText() {
  return `## 🤖 Comandos disponibles

**Texto:**
- \`Cambiar el texto del título a "Nuevo título"\`
- \`Cambiar texto de "viejo" a "nuevo"\`

**Colores:**
- \`Cambiar el color del botón a #ff0000\`
- \`Cambiar el fondo del header a azul\`

**Visibilidad:**
- \`Ocultar el banner\`
- \`Mostrar la alerta\`

**Tamaño:**
- \`Cambiar el tamaño del título a 32px\`

**Posición:**
- \`Mover el logo arriba\`

**Imágenes:**
- \`Cambiar la imagen del banner a "url"\`

**CSS directo:**
- \`css: .selector | propiedad | valor\`

**Selección visual:**
- \`Seleccionar elemento\` - activa modo clic para editar

**Otros:**
- \`ayuda\` - muestra este mensaje`;
}
