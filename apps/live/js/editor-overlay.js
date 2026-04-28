// Editor overlay - only active when loaded inside admin iframe
if (window.self === window.top) {
  // Not in an iframe — this is the standalone live app, skip editor
} else {
  // Inside iframe (admin) — initialize editor
  initEditor();
}

function initEditor() {
let editMode = false;
let selectedEl = null;
let isDragging = false;
let dragStartPos = { x: 0, y: 0 };
let elStartPos = { left: 0, top: 0 };
let undoStack = [];
let redoStack = [];
let textPlacementMode = false;
let textConfig = {};
let placementGuide = null;
let textZIndex = 10000;
const SNAP_THRESHOLD = 5;

// ===== CREATE UI ELEMENTS =====

// Floating toolbar
const toolbar = document.createElement('div');
toolbar.id = 'editor-toolbar';
toolbar.innerHTML = `
  <button data-action="edit" title="Editar texto">✏️</button>
  <button data-action="move" title="Mover (arrastrar)">↕️</button>
  <button data-action="copy" title="Copiar">📋</button>
  <button data-action="duplicate" title="Duplicar">⧉</button>
  <button data-action="delete" title="Eliminar">🗑️</button>
  <button data-action="settings" title="Configuración">⚙️</button>
`;
toolbar.style.cssText = 'display:none;position:fixed;z-index:99999;background:#fff;border:1px solid #ddd;border-radius:10px;padding:4px;box-shadow:0 4px 16px rgba(0,0,0,0.12);gap:2px;flex-wrap:nowrap;';
document.body.appendChild(toolbar);

// Resize handles
const resizeBox = document.createElement('div');
resizeBox.id = 'resize-box';
resizeBox.style.cssText = 'display:none;position:fixed;z-index:99998;pointer-events:none;border:2px solid #0a6741;';
['nw','ne','sw','se','n','s','e','w'].forEach(pos => {
  const h = document.createElement('div');
  h.className = 'resize-handle';
  h.dataset.dir = pos;
  h.style.cssText = `position:absolute;width:8px;height:8px;background:#0a6741;border-radius:2px;pointer-events:all;cursor:${pos}-resize;`;
  const pm = { nw:'top:-4px;left:-4px;', ne:'top:-4px;right:-4px;', sw:'bottom:-4px;left:-4px;', se:'bottom:-4px;right:-4px;', n:'top:-4px;left:50%;transform:translateX(-50%);', s:'bottom:-4px;left:50%;transform:translateX(-50%);', e:'top:50%;right:-4px;transform:translateY(-50%);', w:'top:50%;left:-4px;transform:translateY(-50%);' };
  h.style.cssText += pm[pos];
  resizeBox.appendChild(h);
});
document.body.appendChild(resizeBox);

// Edit indicator (tag label on hover)
const editIndicator = document.createElement('div');
editIndicator.style.cssText = 'display:none;position:fixed;z-index:99997;background:#E8C916;color:#333;font-size:10px;font-weight:700;padding:2px 8px;border-radius:4px;pointer-events:none;';
document.body.appendChild(editIndicator);

// Alignment guides container
const guidesContainer = document.createElement('div');
guidesContainer.id = 'alignment-guides';
guidesContainer.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99996;';
document.body.appendChild(guidesContainer);

// Text cursor indicator
const textCursor = document.createElement('div');
textCursor.id = 'text-cursor';
textCursor.style.cssText = 'display:none;position:fixed;z-index:99999;pointer-events:none;';
textCursor.innerHTML = `
  <div style="display:flex;align-items:center;gap:4px;">
    <div style="width:2px;height:20px;background:#0a6741;animation:blink 0.8s infinite;"></div>
    <span style="font-size:10px;color:#0a6741;font-weight:600;background:rgba(255,255,255,0.9);padding:1px 6px;border-radius:4px;white-space:nowrap;">Clic para insertar texto</span>
  </div>
`;
document.body.appendChild(textCursor);

// Styles
const style = document.createElement('style');
style.textContent = `
  #editor-toolbar button { width:30px;height:30px;border:none;background:transparent;border-radius:6px;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;transition:background 0.1s; }
  #editor-toolbar button:hover { background:#f0f0f0; }
  [contenteditable=true] { outline:2px dashed #0a6741 !important; outline-offset:2px; background:rgba(10,103,65,0.03) !important; cursor:text !important; }
  .editor-highlight { outline:2px solid #0a6741 !important; outline-offset:1px; }
  .editor-dragging { opacity:0.8; cursor:move !important; }
  .guide-line { position:fixed; background:#ff4081; z-index:99996; pointer-events:none; }
  .guide-line-h { height:1px; left:0; right:0; }
  .guide-line-v { width:1px; top:0; bottom:0; }
  .guide-distance { position:fixed; background:#ff4081; color:#fff; font-size:9px; padding:1px 4px; border-radius:3px; pointer-events:none; z-index:99996; }
`;
document.head.appendChild(style);

// ===== HELPERS =====
function getSelector(el) {
  if (el.id) return '#' + el.id;
  if (el.className && typeof el.className === 'string') {
    const cls = el.className.trim().split(/\s+/).filter(c => c !== 'editor-highlight' && c !== 'editor-dragging');
    if (cls.length) { const s = '.' + cls.join('.'); try { if (document.querySelectorAll(s).length === 1) return s; } catch(e) {} }
  }
  const path = [];
  let cur = el;
  while (cur && cur !== document.body) {
    let seg = cur.tagName.toLowerCase();
    if (cur.id) { path.unshift('#' + cur.id); break; }
    const parent = cur.parentElement;
    if (parent) { const sibs = Array.from(parent.children).filter(c => c.tagName === cur.tagName); if (sibs.length > 1) seg += ':nth-of-type(' + (sibs.indexOf(cur) + 1) + ')'; }
    path.unshift(seg);
    cur = cur.parentElement;
  }
  return path.join(' > ');
}

function saveState(el, prop, oldVal) {
  undoStack.push({ selector: getSelector(el), property: prop, oldValue: oldVal, newValue: prop === 'textContent' ? el.textContent : el.style[prop] });
  redoStack = [];
}

function positionToolbar(el) {
  const r = el.getBoundingClientRect();
  toolbar.style.display = 'flex';
  toolbar.style.left = Math.max(4, r.left) + 'px';
  toolbar.style.top = Math.max(4, r.top - 42) + 'px';
}

function positionResizeBox(el) {
  const r = el.getBoundingClientRect();
  resizeBox.style.display = 'block';
  resizeBox.style.left = r.left + 'px';
  resizeBox.style.top = r.top + 'px';
  resizeBox.style.width = r.width + 'px';
  resizeBox.style.height = r.height + 'px';
}

function selectElement(el) {
  if (selectedEl) { selectedEl.classList.remove('editor-highlight'); selectedEl.removeAttribute('contenteditable'); }
  selectedEl = el;
  selectedEl.classList.add('editor-highlight');
  positionToolbar(el);
  positionResizeBox(el);
}

function deselectAll() {
  if (selectedEl) { selectedEl.classList.remove('editor-highlight', 'editor-dragging'); selectedEl.removeAttribute('contenteditable'); }
  selectedEl = null;
  toolbar.style.display = 'none';
  resizeBox.style.display = 'none';
  editIndicator.style.display = 'none';
  clearGuides();
}

function notifyParent(action, el, property, value) {
  window.parent.postMessage({
    type: action === 'info' ? 'ADMIN_INFO' : 'ADMIN_CHANGE',
    action, selector: el ? getSelector(el) : '', property, value,
    description: action === 'info' ? value : `${action}: ${el?.tagName || ''}`
  }, '*');
}

// ===== ALIGNMENT GUIDES =====
function getOtherElements() {
  const all = document.querySelectorAll('body *:not(#editor-toolbar):not(#resize-box):not(#alignment-guides):not(.guide-line):not(.guide-distance):not(script):not(style):not(link)');
  return Array.from(all).filter(el => {
    if (el === selectedEl || el.contains(selectedEl) || selectedEl?.contains(el)) return false;
    const r = el.getBoundingClientRect();
    return r.width > 10 && r.height > 10 && r.top < window.innerHeight && r.bottom > 0;
  });
}

function clearGuides() {
  guidesContainer.innerHTML = '';
}

function showAlignmentGuides(draggedRect) {
  clearGuides();
  const others = getOtherElements();
  const cx = draggedRect.left + draggedRect.width / 2;
  const cy = draggedRect.top + draggedRect.height / 2;

  others.forEach(el => {
    const r = el.getBoundingClientRect();
    const ocx = r.left + r.width / 2;
    const ocy = r.top + r.height / 2;

    // Horizontal center alignment
    if (Math.abs(cy - ocy) < SNAP_THRESHOLD) {
      addGuide('h', ocy);
    }
    // Top alignment
    if (Math.abs(draggedRect.top - r.top) < SNAP_THRESHOLD) {
      addGuide('h', r.top);
    }
    // Bottom alignment
    if (Math.abs(draggedRect.bottom - r.bottom) < SNAP_THRESHOLD) {
      addGuide('h', r.bottom);
    }
    // Vertical center alignment
    if (Math.abs(cx - ocx) < SNAP_THRESHOLD) {
      addGuide('v', ocx);
    }
    // Left alignment
    if (Math.abs(draggedRect.left - r.left) < SNAP_THRESHOLD) {
      addGuide('v', r.left);
    }
    // Right alignment
    if (Math.abs(draggedRect.right - r.right) < SNAP_THRESHOLD) {
      addGuide('v', r.right);
    }
  });
}

function addGuide(type, pos) {
  const line = document.createElement('div');
  line.className = `guide-line guide-line-${type}`;
  if (type === 'h') {
    line.style.top = pos + 'px';
  } else {
    line.style.left = pos + 'px';
  }
  guidesContainer.appendChild(line);
}

function snapPosition(el, newLeft, newTop) {
  const r = el.getBoundingClientRect();
  const w = r.width;
  const h = r.height;
  const others = getOtherElements();
  let snappedLeft = newLeft;
  let snappedTop = newTop;

  // Calculate what the rect would be at the new position
  const futureRect = { left: newLeft, top: newTop, right: newLeft + w, bottom: newTop + h };
  const fcx = newLeft + w / 2;
  const fcy = newTop + h / 2;

  others.forEach(other => {
    const or = other.getBoundingClientRect();
    const ocx = or.left + or.width / 2;
    const ocy = or.top + or.height / 2;

    // Snap horizontal
    if (Math.abs(fcy - ocy) < SNAP_THRESHOLD) snappedTop = ocy - h / 2;
    if (Math.abs(futureRect.top - or.top) < SNAP_THRESHOLD) snappedTop = or.top;
    if (Math.abs(futureRect.bottom - or.bottom) < SNAP_THRESHOLD) snappedTop = or.bottom - h;

    // Snap vertical
    if (Math.abs(fcx - ocx) < SNAP_THRESHOLD) snappedLeft = ocx - w / 2;
    if (Math.abs(futureRect.left - or.left) < SNAP_THRESHOLD) snappedLeft = or.left;
    if (Math.abs(futureRect.right - or.right) < SNAP_THRESHOLD) snappedLeft = or.right - w;
  });

  return { left: snappedLeft, top: snappedTop };
}

// ===== EVENT HANDLERS =====

// Hover
document.addEventListener('mouseover', (e) => {
  if (!editMode || isDragging) return;
  if (textPlacementMode) return; // Don't show tag label in text mode
  if (e.target === toolbar || toolbar.contains(e.target) || e.target === resizeBox || resizeBox.contains(e.target)) return;
  const r = e.target.getBoundingClientRect();
  editIndicator.textContent = e.target.tagName.toLowerCase();
  editIndicator.style.display = 'block';
  editIndicator.style.left = r.left + 'px';
  editIndicator.style.top = Math.max(0, r.top - 18) + 'px';
});

// Placement guide follows mouse
document.addEventListener('mousemove', (e) => {
  if (!textPlacementMode || !placementGuide) return;
  placementGuide.style.display = 'block';
  placementGuide.style.left = (e.clientX + 12) + 'px';
  placementGuide.style.top = (e.clientY + 12) + 'px';
});

document.addEventListener('mouseout', (e) => {
  if (!editMode) return;
  if (e.target !== selectedEl) editIndicator.style.display = 'none';
});

// Click to select
document.addEventListener('click', (e) => {
  if (!editMode) return;
  if (e.target === toolbar || toolbar.contains(e.target) || e.target === resizeBox || resizeBox.contains(e.target)) return;
  e.preventDefault();
  e.stopPropagation();

  // Text placement mode — insert text at click position
  if (textPlacementMode) {
    textZIndex++;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const el = document.createElement('div');
    el.textContent = textConfig.text || 'Nuevo texto';
    el.style.cssText = `position:absolute;left:${e.clientX + scrollX}px;top:${e.clientY + scrollY}px;z-index:${textZIndex};font-family:${textConfig.fontFamily || 'Bolivar, sans-serif'};font-size:${textConfig.fontSize || '16px'};font-weight:${textConfig.fontWeight || '400'};color:${textConfig.color || '#333'};padding:4px 8px;cursor:move;background:${textConfig.backgroundColor || 'transparent'};border-radius:4px;`;
    document.body.appendChild(el);
    textPlacementMode = false;
    document.body.style.cursor = '';
    if (placementGuide) placementGuide.style.display = 'none';
    selectElement(el);
    el.setAttribute('contenteditable', 'true');
    el.focus();
    el.addEventListener('blur', () => { el.removeAttribute('contenteditable'); }, { once: true });
    notifyParent('info', null, '', '📝 Texto insertado. Edítalo o muévelo.');
    return;
  }

  selectElement(e.target);
}, true);

// Double click for inline text edit
document.addEventListener('dblclick', (e) => {
  // Auto-enable edit mode on double click
  if (!editMode) {
    editMode = true;
    window.parent.postMessage({ type: 'ADMIN_INFO', message: '🎯 Modo edición activado automáticamente.' }, '*');
    window.parent.postMessage({ type: 'EDIT_MODE_CHANGED', active: true }, '*');
  }
  if (e.target === toolbar || toolbar.contains(e.target)) return;
  e.preventDefault();
  const el = e.target;
  const textTags = ['BUTTON','A','SPAN','P','H1','H2','H3','H4','H5','LABEL','LI','TD','TH','STRONG','EM'];
  if (el.children.length === 0 || textTags.includes(el.tagName)) {
    const oldText = el.textContent;
    el.setAttribute('contenteditable', 'true');
    el.focus();
    selectElement(el);
    el.addEventListener('blur', () => {
      el.removeAttribute('contenteditable');
      if (el.textContent !== oldText) {
        saveState(el, 'textContent', oldText);
        notifyParent('changeText', el, 'textContent', el.textContent);
      }
    }, { once: true });
  }
}, true);

// Toolbar actions
toolbar.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn || !selectedEl) return;
  const action = btn.dataset.action;

  if (action === 'edit') {
    const oldText = selectedEl.textContent;
    selectedEl.setAttribute('contenteditable', 'true');
    selectedEl.focus();
    selectedEl.addEventListener('blur', () => {
      selectedEl.removeAttribute('contenteditable');
      if (selectedEl.textContent !== oldText) {
        saveState(selectedEl, 'textContent', oldText);
        notifyParent('changeText', selectedEl, 'textContent', selectedEl.textContent);
      }
    }, { once: true });
  }

  if (action === 'move') {
    // Enable drag mode - next mousedown on the element starts dragging
    selectedEl.classList.add('editor-dragging');
    selectedEl.style.position = 'relative';
    isDragging = true;
    const r = selectedEl.getBoundingClientRect();
    dragStartPos = { x: r.left, y: r.top };
    elStartPos = { left: parseFloat(selectedEl.style.left) || 0, top: parseFloat(selectedEl.style.top) || 0 };

    const onMove = (ev) => {
      const dx = ev.clientX - dragStartPos.x;
      const dy = ev.clientY - dragStartPos.y;
      let newLeft = elStartPos.left + dx;
      let newTop = elStartPos.top + dy;

      // Get snapped position
      const futureRect = selectedEl.getBoundingClientRect();
      const snapped = snapPosition(selectedEl, futureRect.left + dx - (parseFloat(selectedEl.style.left) || 0) + elStartPos.left, futureRect.top + dy - (parseFloat(selectedEl.style.top) || 0) + elStartPos.top);

      selectedEl.style.left = newLeft + 'px';
      selectedEl.style.top = newTop + 'px';

      // Show guides
      showAlignmentGuides(selectedEl.getBoundingClientRect());
      positionToolbar(selectedEl);
      positionResizeBox(selectedEl);
    };

    const onUp = () => {
      isDragging = false;
      selectedEl.classList.remove('editor-dragging');
      clearGuides();
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      notifyParent('changeStyle', selectedEl, 'top', selectedEl.style.top);
      notifyParent('info', null, '', '↕️ Elemento movido.');
    };

    // Start listening immediately - the user clicked "move" button
    dragStartPos = { x: selectedEl.getBoundingClientRect().left + selectedEl.getBoundingClientRect().width / 2, y: selectedEl.getBoundingClientRect().top + selectedEl.getBoundingClientRect().height / 2 };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }

  if (action === 'copy') {
    localStorage.setItem('sb_clipboard', selectedEl.outerHTML);
    notifyParent('info', null, '', '📋 Elemento copiado.');
  }

  if (action === 'duplicate') {
    const clone = selectedEl.cloneNode(true);
    clone.classList.remove('editor-highlight');
    clone.style.position = 'relative';
    clone.style.top = '10px';
    selectedEl.parentNode.insertBefore(clone, selectedEl.nextSibling);
    saveState(selectedEl, 'duplicate', '');
    notifyParent('info', null, '', '⧉ Elemento duplicado.');
  }

  if (action === 'delete') {
    const oldDisplay = selectedEl.style.display;
    saveState(selectedEl, 'display', oldDisplay);
    selectedEl.style.display = 'none';
    notifyParent('changeStyle', selectedEl, 'display', 'none');
    deselectAll();
  }

  if (action === 'settings') {
    window.parent.postMessage({
      type: 'ELEMENT_SELECTED',
      tagName: selectedEl.tagName.toLowerCase(),
      selector: getSelector(selectedEl),
      textContent: selectedEl.textContent,
      className: selectedEl.className,
      id: selectedEl.id
    }, '*');
  }
});

// Resize
let resizing = false;
let resizeDir = '';
let resizeStart = {};

resizeBox.addEventListener('mousedown', (e) => {
  const handle = e.target.closest('.resize-handle');
  if (!handle || !selectedEl) return;
  e.preventDefault();
  e.stopPropagation();
  resizing = true;
  resizeDir = handle.dataset.dir;
  resizeStart = { x: e.clientX, y: e.clientY, w: selectedEl.offsetWidth, h: selectedEl.offsetHeight };
});

document.addEventListener('mousemove', (e) => {
  if (!resizing || !selectedEl) return;
  const dx = e.clientX - resizeStart.x;
  const dy = e.clientY - resizeStart.y;
  if (resizeDir.includes('e')) selectedEl.style.width = Math.max(20, resizeStart.w + dx) + 'px';
  if (resizeDir.includes('w')) selectedEl.style.width = Math.max(20, resizeStart.w - dx) + 'px';
  if (resizeDir.includes('s')) selectedEl.style.height = Math.max(20, resizeStart.h + dy) + 'px';
  if (resizeDir.includes('n')) selectedEl.style.height = Math.max(20, resizeStart.h - dy) + 'px';
  positionResizeBox(selectedEl);
  positionToolbar(selectedEl);
});

document.addEventListener('mouseup', () => {
  if (resizing && selectedEl) {
    resizing = false;
    notifyParent('changeStyle', selectedEl, 'width', selectedEl.style.width);
    if (selectedEl.style.height) notifyParent('changeStyle', selectedEl, 'height', selectedEl.style.height);
  }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (!editMode) return;
  if (e.key === 'Escape') deselectAll();
  if (e.key === 'Delete' && selectedEl && !selectedEl.hasAttribute('contenteditable')) {
    selectedEl.style.display = 'none';
    notifyParent('changeStyle', selectedEl, 'display', 'none');
    deselectAll();
  }
  // Arrow keys to nudge
  if (selectedEl && !selectedEl.hasAttribute('contenteditable') && ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) {
    e.preventDefault();
    selectedEl.style.position = 'relative';
    const step = e.shiftKey ? 10 : 1;
    if (e.key === 'ArrowUp') selectedEl.style.top = ((parseFloat(selectedEl.style.top) || 0) - step) + 'px';
    if (e.key === 'ArrowDown') selectedEl.style.top = ((parseFloat(selectedEl.style.top) || 0) + step) + 'px';
    if (e.key === 'ArrowLeft') selectedEl.style.left = ((parseFloat(selectedEl.style.left) || 0) - step) + 'px';
    if (e.key === 'ArrowRight') selectedEl.style.left = ((parseFloat(selectedEl.style.left) || 0) + step) + 'px';
    positionToolbar(selectedEl);
    positionResizeBox(selectedEl);
    showAlignmentGuides(selectedEl.getBoundingClientRect());
    clearTimeout(window._guideTimer);
    window._guideTimer = setTimeout(clearGuides, 500);
  }
  // Ctrl+Z undo
  if (e.ctrlKey && e.key === 'z' && !selectedEl?.hasAttribute('contenteditable')) { e.preventDefault(); undo(); }
  // Ctrl+Y redo
  if (e.ctrlKey && e.key === 'y' && !selectedEl?.hasAttribute('contenteditable')) { e.preventDefault(); redo(); }
  // Ctrl+D duplicate
  if (e.ctrlKey && e.key === 'd' && selectedEl) {
    e.preventDefault();
    const clone = selectedEl.cloneNode(true);
    clone.classList.remove('editor-highlight');
    clone.style.position = 'relative';
    clone.style.top = '10px';
    selectedEl.parentNode.insertBefore(clone, selectedEl.nextSibling);
    notifyParent('info', null, '', '⧉ Duplicado (Ctrl+D).');
  }
});

function undo() {
  if (undoStack.length === 0) return;
  const action = undoStack.pop();
  const el = document.querySelector(action.selector);
  if (!el) return;
  const currentVal = action.property === 'textContent' ? el.textContent : el.style[action.property];
  redoStack.push({ ...action, newValue: currentVal });
  if (action.property === 'textContent') el.textContent = action.oldValue;
  else el.style[action.property] = action.oldValue;
  window.parent.postMessage({ type: 'ADMIN_INFO', message: '↩️ Deshecho.' }, '*');
}

function redo() {
  if (redoStack.length === 0) return;
  const action = redoStack.pop();
  const el = document.querySelector(action.selector);
  if (!el) return;
  undoStack.push({ ...action });
  if (action.property === 'textContent') el.textContent = action.newValue;
  else el.style[action.property] = action.newValue;
  window.parent.postMessage({ type: 'ADMIN_INFO', message: '↪️ Rehecho.' }, '*');
}

// ===== MESSAGE HANDLER =====
window.addEventListener('message', (event) => {
  if (!event.data) return;
  if (event.data.type === 'ENABLE_EDIT_MODE') { editMode = true; }
  if (event.data.type === 'DISABLE_EDIT_MODE') { editMode = false; deselectAll(); }
  if (event.data.type === 'UNDO_ACTION') undo();
  if (event.data.type === 'REDO_ACTION') redo();
  if (event.data.type === 'ENTER_TEXT_MODE') {
    editMode = true;
    textPlacementMode = true;
    textConfig = {
      text: event.data.text || 'Nuevo texto',
      fontFamily: event.data.fontFamily || 'Bolivar, sans-serif',
      fontSize: event.data.fontSize || '16px',
      fontWeight: event.data.fontWeight || '400',
      color: event.data.color || '#333333',
      backgroundColor: event.data.backgroundColor || 'transparent'
    };
    document.body.style.cursor = 'text';
    if (!placementGuide) {
      placementGuide = document.createElement('div');
      placementGuide.style.cssText = 'position:fixed;pointer-events:none;z-index:99999;background:rgba(10,103,65,0.1);border:1px dashed #0a6741;border-radius:4px;padding:4px 10px;display:none;';
      document.body.appendChild(placementGuide);
    }
    placementGuide.textContent = textConfig.text;
    placementGuide.style.fontFamily = textConfig.fontFamily;
    placementGuide.style.fontSize = textConfig.fontSize;
    placementGuide.style.fontWeight = textConfig.fontWeight;
    placementGuide.style.color = '#0a6741';
    window.parent.postMessage({ type: 'ADMIN_INFO', message: '📝 Haz clic donde quieras colocar el texto.' }, '*');
  }
});

} // end initEditor
