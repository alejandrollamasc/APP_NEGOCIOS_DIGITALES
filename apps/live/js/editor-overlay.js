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
  [contenteditable=true] { outline:1.5px dashed #0a6741 !important; outline-offset:2px; background:rgba(10,103,65,0.02) !important; cursor:text !important; border-radius:4px; }
  .editor-highlight { outline:1.5px solid rgba(10,103,65,0.6) !important; outline-offset:2px; border-radius:4px; }
  .editor-hover { outline:1px solid rgba(10,103,65,0.25) !important; outline-offset:1px; border-radius:3px; }
  .editor-dragging { opacity:0.85; cursor:move !important; outline:1.5px solid #0a6741 !important; }
  .guide-line { position:fixed; background:#ff4081; z-index:99996; pointer-events:none; opacity:0.9; }
  .guide-line-h { height:1px; left:0; right:0; }
  .guide-line-v { width:1px; top:0; bottom:0; }
  .guide-line--center { background:#2196F3; }
  .guide-line--edge { background:#ff4081; }
  .guide-line--viewport { background:#9C27B0; opacity:0.6; }
  .guide-line--cursor { background:rgba(10,103,65,0.3); }
  .guide-distance { position:fixed; background:#ff4081; color:#fff; font-size:9px; padding:1px 4px; border-radius:3px; pointer-events:none; z-index:99997; white-space:nowrap; }
  .guide-distance--center { background:#2196F3; }
  .guide-marker { position:fixed; width:6px; height:6px; background:#ff4081; border-radius:50%; pointer-events:none; z-index:99997; transform:translate(-50%,-50%); }
  .guide-marker--center { background:#2196F3; }
  @keyframes guide-pulse { 0%,100%{opacity:0.9} 50%{opacity:0.5} }
  .guide-line--snapped { animation: guide-pulse 0.6s ease-in-out; box-shadow: 0 0 4px currentColor; }
  .frame-drop-highlight { outline:1.5px dashed #016D38 !important; outline-offset:4px; background:rgba(10,103,65,0.03) !important; border-radius:6px; transition:background 0.15s; }
  .cursor-guide-h { position:fixed; left:0; right:0; height:1px; background:rgba(10,103,65,0.2); pointer-events:none; z-index:99995; }
  .cursor-guide-v { position:fixed; top:0; bottom:0; width:1px; background:rgba(10,103,65,0.2); pointer-events:none; z-index:99995; }
`;
document.head.appendChild(style);

// Cursor crosshair guides
const cursorGuideH = document.createElement('div');
cursorGuideH.className = 'cursor-guide-h';
cursorGuideH.style.display = 'none';
document.body.appendChild(cursorGuideH);
const cursorGuideV = document.createElement('div');
cursorGuideV.className = 'cursor-guide-v';
cursorGuideV.style.display = 'none';
document.body.appendChild(cursorGuideV);

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
  undoStack.push({ selector: getSelector(el), property: prop, oldValue: oldVal, newValue: prop === 'textContent' ? el.textContent : (prop === '__fullStyle' ? el.style.cssText : el.style[prop]) });
  redoStack = [];
}

// Save full style state (for move/resize operations)
function saveFullState(el) {
  undoStack.push({ selector: getSelector(el), property: '__fullStyle', oldValue: el.style.cssText, newValue: '' });
  redoStack = [];
}
// Update the newValue of the last undo entry (call after operation completes)
function updateLastUndoState(el) {
  if (undoStack.length > 0) {
    undoStack[undoStack.length - 1].newValue = el.style.cssText;
  }
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

// Update selection UI on scroll so it follows the element
document.addEventListener('scroll', () => {
  if (selectedEl && !isDragging) {
    positionToolbar(selectedEl);
    positionResizeBox(selectedEl);
  }
}, true);

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
  clearGuides();
}

function notifyParent(action, el, property, value) {
  window.parent.postMessage({
    type: action === 'info' ? 'ADMIN_INFO' : 'ADMIN_CHANGE',
    action, selector: el ? getSelector(el) : '', property, value,
    description: action === 'info' ? value : `${action}: ${el?.tagName || ''}`
  }, '*');
}

// ===== ALIGNMENT GUIDES (Enhanced) =====
function getOtherElements() {
  const all = document.querySelectorAll('body *:not(#editor-toolbar):not(#resize-box):not(#alignment-guides):not(.guide-line):not(.guide-distance):not(.guide-marker):not(#text-cursor):not(script):not(style):not(link)');
  return Array.from(all).filter(el => {
    if (el === selectedEl || el.contains(selectedEl) || selectedEl?.contains(el)) return false;
    if (el.offsetParent === null && el.style.position !== 'fixed') return false;
    const r = el.getBoundingClientRect();
    return r.width > 5 && r.height > 5 && r.top < window.innerHeight + 50 && r.bottom > -50 && r.left < window.innerWidth + 50 && r.right > -50;
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
  const vpCx = window.innerWidth / 2;
  const vpCy = window.innerHeight / 2;

  const guides = { h: new Set(), v: new Set() };
  const snappedGuides = [];

  // Viewport center guides
  if (Math.abs(cx - vpCx) < SNAP_THRESHOLD) {
    addGuide('v', vpCx, 'viewport');
    snappedGuides.push({ type: 'v', pos: vpCx, label: 'Centro' });
  }
  if (Math.abs(cy - vpCy) < SNAP_THRESHOLD) {
    addGuide('h', vpCy, 'viewport');
    snappedGuides.push({ type: 'h', pos: vpCy, label: 'Centro' });
  }
  // Viewport edges
  if (Math.abs(draggedRect.left) < SNAP_THRESHOLD) addGuide('v', 0, 'viewport');
  if (Math.abs(draggedRect.right - window.innerWidth) < SNAP_THRESHOLD) addGuide('v', window.innerWidth, 'viewport');
  if (Math.abs(draggedRect.top) < SNAP_THRESHOLD) addGuide('h', 0, 'viewport');

  others.forEach(el => {
    const r = el.getBoundingClientRect();
    const ocx = r.left + r.width / 2;
    const ocy = r.top + r.height / 2;

    // Horizontal center alignment
    if (Math.abs(cy - ocy) < SNAP_THRESHOLD && !guides.h.has(Math.round(ocy))) {
      guides.h.add(Math.round(ocy));
      addGuide('h', ocy, 'center');
      addMarker(cx, ocy, 'center');
      addMarker(ocx, ocy, 'center');
    }
    // Top-to-top alignment
    if (Math.abs(draggedRect.top - r.top) < SNAP_THRESHOLD && !guides.h.has(Math.round(r.top))) {
      guides.h.add(Math.round(r.top));
      addGuide('h', r.top, 'edge');
    }
    // Bottom-to-bottom alignment
    if (Math.abs(draggedRect.bottom - r.bottom) < SNAP_THRESHOLD && !guides.h.has(Math.round(r.bottom))) {
      guides.h.add(Math.round(r.bottom));
      addGuide('h', r.bottom, 'edge');
    }
    // Top-to-bottom alignment
    if (Math.abs(draggedRect.top - r.bottom) < SNAP_THRESHOLD && !guides.h.has(Math.round(r.bottom) + 1000)) {
      guides.h.add(Math.round(r.bottom) + 1000);
      addGuide('h', r.bottom, 'edge');
      addDistanceLabel(cx, r.bottom, 0, 'h');
    }
    // Bottom-to-top alignment
    if (Math.abs(draggedRect.bottom - r.top) < SNAP_THRESHOLD && !guides.h.has(Math.round(r.top) + 2000)) {
      guides.h.add(Math.round(r.top) + 2000);
      addGuide('h', r.top, 'edge');
      addDistanceLabel(cx, r.top, 0, 'h');
    }
    // Vertical center alignment
    if (Math.abs(cx - ocx) < SNAP_THRESHOLD && !guides.v.has(Math.round(ocx))) {
      guides.v.add(Math.round(ocx));
      addGuide('v', ocx, 'center');
      addMarker(ocx, cy, 'center');
      addMarker(ocx, ocy, 'center');
    }
    // Left-to-left alignment
    if (Math.abs(draggedRect.left - r.left) < SNAP_THRESHOLD && !guides.v.has(Math.round(r.left))) {
      guides.v.add(Math.round(r.left));
      addGuide('v', r.left, 'edge');
    }
    // Right-to-right alignment
    if (Math.abs(draggedRect.right - r.right) < SNAP_THRESHOLD && !guides.v.has(Math.round(r.right))) {
      guides.v.add(Math.round(r.right));
      addGuide('v', r.right, 'edge');
    }
    // Left-to-right alignment
    if (Math.abs(draggedRect.left - r.right) < SNAP_THRESHOLD && !guides.v.has(Math.round(r.right) + 1000)) {
      guides.v.add(Math.round(r.right) + 1000);
      addGuide('v', r.right, 'edge');
      addDistanceLabel(r.right, cy, 0, 'v');
    }
    // Right-to-left alignment
    if (Math.abs(draggedRect.right - r.left) < SNAP_THRESHOLD && !guides.v.has(Math.round(r.left) + 2000)) {
      guides.v.add(Math.round(r.left) + 2000);
      addGuide('v', r.left, 'edge');
      addDistanceLabel(r.left, cy, 0, 'v');
    }

    // Equal spacing detection — show distance between nearby elements
    const gapTop = draggedRect.top - r.bottom;
    const gapBottom = r.top - draggedRect.bottom;
    const gapLeft = draggedRect.left - r.right;
    const gapRight = r.left - draggedRect.right;

    if (gapTop > 0 && gapTop < 60) {
      addDistanceLabel(cx, r.bottom + gapTop / 2, Math.round(gapTop), 'h');
    }
    if (gapBottom > 0 && gapBottom < 60) {
      addDistanceLabel(cx, draggedRect.bottom + gapBottom / 2, Math.round(gapBottom), 'h');
    }
    if (gapLeft > 0 && gapLeft < 60) {
      addDistanceLabel(r.right + gapLeft / 2, cy, Math.round(gapLeft), 'v');
    }
    if (gapRight > 0 && gapRight < 60) {
      addDistanceLabel(draggedRect.right + gapRight / 2, cy, Math.round(gapRight), 'v');
    }
  });
}

function addGuide(type, pos, variant) {
  const line = document.createElement('div');
  line.className = `guide-line guide-line-${type} guide-line--${variant || 'edge'}`;
  if (type === 'h') {
    line.style.top = pos + 'px';
  } else {
    line.style.left = pos + 'px';
  }
  guidesContainer.appendChild(line);
}

function addMarker(x, y, variant) {
  const marker = document.createElement('div');
  marker.className = `guide-marker${variant === 'center' ? ' guide-marker--center' : ''}`;
  marker.style.left = x + 'px';
  marker.style.top = y + 'px';
  guidesContainer.appendChild(marker);
}

function addDistanceLabel(x, y, distance, direction) {
  if (distance <= 0) return;
  const label = document.createElement('div');
  label.className = 'guide-distance';
  label.textContent = distance + 'px';
  label.style.left = x + 'px';
  label.style.top = y + 'px';
  if (direction === 'h') {
    label.style.transform = 'translate(-50%, -50%)';
  } else {
    label.style.transform = 'translate(-50%, -50%)';
  }
  guidesContainer.appendChild(label);
}

function snapPosition(el, newLeft, newTop) {
  const r = el.getBoundingClientRect();
  const w = r.width;
  const h = r.height;
  const others = getOtherElements();
  let snappedLeft = newLeft;
  let snappedTop = newTop;
  let didSnap = false;

  // Calculate future rect
  const futureLeft = newLeft;
  const futureTop = newTop;
  const futureRight = newLeft + w;
  const futureBottom = newTop + h;
  const fcx = newLeft + w / 2;
  const fcy = newTop + h / 2;
  const vpCx = window.innerWidth / 2;
  const vpCy = window.innerHeight / 2;

  // Snap to viewport center
  if (Math.abs(fcx - vpCx) < SNAP_THRESHOLD) { snappedLeft = vpCx - w / 2; didSnap = true; }
  if (Math.abs(fcy - vpCy) < SNAP_THRESHOLD) { snappedTop = vpCy - h / 2; didSnap = true; }
  // Snap to viewport edges
  if (Math.abs(futureLeft) < SNAP_THRESHOLD) { snappedLeft = 0; didSnap = true; }
  if (Math.abs(futureRight - window.innerWidth) < SNAP_THRESHOLD) { snappedLeft = window.innerWidth - w; didSnap = true; }
  if (Math.abs(futureTop) < SNAP_THRESHOLD) { snappedTop = 0; didSnap = true; }

  others.forEach(other => {
    const or = other.getBoundingClientRect();
    const ocx = or.left + or.width / 2;
    const ocy = or.top + or.height / 2;

    // Snap horizontal center
    if (Math.abs(fcy - ocy) < SNAP_THRESHOLD) { snappedTop = ocy - h / 2; didSnap = true; }
    // Snap top-to-top
    if (Math.abs(futureTop - or.top) < SNAP_THRESHOLD) { snappedTop = or.top; didSnap = true; }
    // Snap bottom-to-bottom
    if (Math.abs(futureBottom - or.bottom) < SNAP_THRESHOLD) { snappedTop = or.bottom - h; didSnap = true; }
    // Snap top-to-bottom (spacing)
    if (Math.abs(futureTop - or.bottom) < SNAP_THRESHOLD) { snappedTop = or.bottom; didSnap = true; }
    // Snap bottom-to-top (spacing)
    if (Math.abs(futureBottom - or.top) < SNAP_THRESHOLD) { snappedTop = or.top - h; didSnap = true; }

    // Snap vertical center
    if (Math.abs(fcx - ocx) < SNAP_THRESHOLD) { snappedLeft = ocx - w / 2; didSnap = true; }
    // Snap left-to-left
    if (Math.abs(futureLeft - or.left) < SNAP_THRESHOLD) { snappedLeft = or.left; didSnap = true; }
    // Snap right-to-right
    if (Math.abs(futureRight - or.right) < SNAP_THRESHOLD) { snappedLeft = or.right - w; didSnap = true; }
    // Snap left-to-right (spacing)
    if (Math.abs(futureLeft - or.right) < SNAP_THRESHOLD) { snappedLeft = or.right; didSnap = true; }
    // Snap right-to-left (spacing)
    if (Math.abs(futureRight - or.left) < SNAP_THRESHOLD) { snappedLeft = or.left - w; didSnap = true; }
  });

  return { left: snappedLeft, top: snappedTop, snapped: didSnap };
}

// ===== EVENT HANDLERS =====

// Hover — subtle highlight without tag name
let hoveredEl = null;
document.addEventListener('mouseover', (e) => {
  if (!editMode || isDragging) return;
  if (textPlacementMode) return;
  if (e.target === toolbar || toolbar.contains(e.target) || e.target === resizeBox || resizeBox.contains(e.target)) return;
  if (e.target === selectedEl) return;
  if (hoveredEl && hoveredEl !== selectedEl) hoveredEl.classList.remove('editor-hover');
  hoveredEl = e.target;
  hoveredEl.classList.add('editor-hover');
});

document.addEventListener('mouseout', (e) => {
  if (!editMode || isDragging) return;
  if (e.target === selectedEl) return;
  if (hoveredEl) { hoveredEl.classList.remove('editor-hover'); hoveredEl = null; }
});

// Cursor crosshair guides — always visible in edit mode
document.addEventListener('mousemove', (e) => {
  if (!editMode) { cursorGuideH.style.display = 'none'; cursorGuideV.style.display = 'none'; return; }
  if (textPlacementMode && placementGuide) {
    placementGuide.style.display = 'block';
    placementGuide.style.left = (e.clientX + 12) + 'px';
    placementGuide.style.top = (e.clientY + 12) + 'px';
  }
  // Show crosshair guides following cursor
  if (!isDragging) {
    cursorGuideH.style.display = 'block';
    cursorGuideV.style.display = 'block';
    cursorGuideH.style.top = e.clientY + 'px';
    cursorGuideV.style.left = e.clientX + 'px';
  }
});

// Click to select + immediate drag capability
document.addEventListener('mousedown', (e) => {
  if (!editMode) return;
  if (e.target === toolbar || toolbar.contains(e.target) || e.target === resizeBox || resizeBox.contains(e.target)) return;
  if (textPlacementMode) return; // handled by click
  e.preventDefault();
  e.stopPropagation();

  const el = e.target;
  selectElement(el);
  if (hoveredEl) { hoveredEl.classList.remove('editor-hover'); hoveredEl = null; }

  // Hide cursor guides during potential drag
  cursorGuideH.style.display = 'none';
  cursorGuideV.style.display = 'none';

  // Prepare for immediate drag on this same mousedown
  const r = el.getBoundingClientRect();
  const offsetX = e.clientX - r.left;
  const offsetY = e.clientY - r.top;
  const startX = e.clientX;
  const startY = e.clientY;
  let dragging = false;
  let highlightedFrame = null;

  // Capture the current computed left/top offset (what the element actually has)
  const computedLeft = parseFloat(el.style.left) || 0;
  const computedTop = parseFloat(el.style.top) || 0;
  const savedWidth = el.style.width;
  const savedMargin = el.style.margin;
  const savedZIndex = el.style.zIndex;
  const originalParent = el.parentElement;

  // Save full state for undo
  saveFullState(el);

  const onMove = (ev) => {
    if (!dragging) {
      if (Math.abs(ev.clientX - startX) > 3 || Math.abs(ev.clientY - startY) > 3) {
        dragging = true;
        isDragging = true;
        el.classList.add('editor-dragging');
        el.style.position = 'relative';
        el.style.zIndex = '99999';
        resizeBox.style.display = 'none';
      }
    }
    if (dragging) {
      // Simple: how far did the mouse move from where we started?
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      el.style.left = (computedLeft + dx) + 'px';
      el.style.top = (computedTop + dy) + 'px';

      showAlignmentGuides(el.getBoundingClientRect());

      // Highlight target frame — show ANY frame under cursor (including current parent)
      el.style.visibility = 'hidden';
      const tgt = document.elementFromPoint(ev.clientX, ev.clientY);
      el.style.visibility = '';
      let frame = tgt;
      while (frame && frame !== document.body) {
        if (['DIV','SECTION','MAIN','ARTICLE','ASIDE','FORM','HEADER','FOOTER','NAV'].includes(frame.tagName) && frame.offsetWidth > 80 && frame.offsetHeight > 30 && frame !== el) break;
        frame = frame.parentElement;
      }
      if (highlightedFrame && highlightedFrame !== frame) { highlightedFrame.classList.remove('frame-drop-highlight'); }
      if (frame && frame !== document.body && frame !== el) {
        frame.classList.add('frame-drop-highlight'); highlightedFrame = frame;
      } else {
        if (highlightedFrame) highlightedFrame.classList.remove('frame-drop-highlight');
        highlightedFrame = null;
      }

      positionToolbar(el);
    }
  };

  const onUp = (ev) => {
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);

    if (dragging) {
      isDragging = false;
      el.classList.remove('editor-dragging');
      clearGuides();
      if (highlightedFrame) { highlightedFrame.classList.remove('frame-drop-highlight'); }

      // Check if dropped into a different frame
      el.style.visibility = 'hidden';
      const tgt = document.elementFromPoint(ev.clientX, ev.clientY);
      el.style.visibility = '';
      let frame = tgt;
      while (frame && frame !== document.body) {
        if (['DIV','SECTION','MAIN','ARTICLE','ASIDE','FORM','HEADER','FOOTER','NAV'].includes(frame.tagName) && frame.offsetWidth > 80 && frame.offsetHeight > 30 && frame !== el) break;
        frame = frame.parentElement;
      }

      // Determine target frame — element MUST belong to a frame
      let targetFrame = frame;
      if (!targetFrame || targetFrame === document.body) {
        // No valid frame found — keep in original parent frame
        targetFrame = originalParent;
      }

      if (targetFrame && targetFrame !== originalParent) {
        // Moving to a DIFFERENT frame
        const finalRect = el.getBoundingClientRect();
        const frameRect = targetFrame.getBoundingClientRect();
        targetFrame.style.position = targetFrame.style.position || 'relative';
        el.style.position = 'absolute';
        el.style.left = (finalRect.left - frameRect.left) + 'px';
        el.style.top = (finalRect.top - frameRect.top) + 'px';
        el.style.width = savedWidth;
        el.style.margin = '0';
        el.style.zIndex = '99999';
        targetFrame.appendChild(el);
      } else {
        // Same frame — keep relative offset, ensure z-index stays on top
        el.style.zIndex = '99999';
      }

      updateLastUndoState(el);
      positionToolbar(el);
      positionResizeBox(el);
      notifyParent('changeStyle', el, 'left', el.style.left);
      notifyParent('changeStyle', el, 'top', el.style.top);
    } else {
      // No drag happened — just a click select (undo entry not needed)
      undoStack.pop();
    }
  };

  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onUp);
}, true);

// Click handler for text placement mode only
document.addEventListener('click', (e) => {
  if (!editMode || !textPlacementMode) return;
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
    notifyParent('info', null, '', '📝 Texto insertado.');
  }
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
    // Free drag with frame insertion support
    selectedEl.classList.add('editor-dragging');
    isDragging = true;
    const r = selectedEl.getBoundingClientRect();
    const originalParent = selectedEl.parentElement;
    const offsetX = r.width / 2;
    const offsetY = r.height / 2;
    let highlightedFrame = null;

    // Save full state for undo
    saveFullState(selectedEl);

    // Save original styles
    const savedPosition = selectedEl.style.position;
    const savedLeft = selectedEl.style.left;
    const savedTop = selectedEl.style.top;
    const savedWidth = selectedEl.style.width;
    const savedMargin = selectedEl.style.margin;
    const savedZIndex = selectedEl.style.zIndex;

    // Float the element for dragging
    selectedEl.style.position = 'fixed';
    selectedEl.style.zIndex = '999999';
    selectedEl.style.width = r.width + 'px';
    selectedEl.style.left = r.left + 'px';
    selectedEl.style.top = r.top + 'px';
    selectedEl.style.margin = '0';

    const onMove = (ev) => {
      const newLeft = ev.clientX - offsetX;
      const newTop = ev.clientY - offsetY;
      selectedEl.style.left = newLeft + 'px';
      selectedEl.style.top = newTop + 'px';

      // Snap to guides
      const currentRect = selectedEl.getBoundingClientRect();
      const snapped = snapPosition(selectedEl, currentRect.left, currentRect.top);
      if (snapped.snapped) {
        selectedEl.style.left = (newLeft + snapped.left - currentRect.left) + 'px';
        selectedEl.style.top = (newTop + snapped.top - currentRect.top) + 'px';
      }

      showAlignmentGuides(selectedEl.getBoundingClientRect());

      // Highlight target frame using visibility trick (not pointerEvents)
      selectedEl.style.visibility = 'hidden';
      const tgt = document.elementFromPoint(ev.clientX, ev.clientY);
      selectedEl.style.visibility = '';
      let frame = tgt;
      while (frame && frame !== document.body) {
        if (['DIV','SECTION','MAIN','ARTICLE','ASIDE','FORM','HEADER','FOOTER','NAV'].includes(frame.tagName) && frame.offsetWidth > 80 && frame.offsetHeight > 30 && frame !== selectedEl) break;
        frame = frame.parentElement;
      }
      if (highlightedFrame && highlightedFrame !== frame) { highlightedFrame.classList.remove('frame-drop-highlight'); }
      if (frame && frame !== document.body && frame !== selectedEl && frame !== originalParent) {
        frame.classList.add('frame-drop-highlight'); highlightedFrame = frame;
      } else {
        highlightedFrame = null;
      }

      positionToolbar(selectedEl);
      positionResizeBox(selectedEl);
    };

    const onUp = (ev) => {
      isDragging = false;
      selectedEl.classList.remove('editor-dragging');
      clearGuides();
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      if (highlightedFrame) { highlightedFrame.classList.remove('frame-drop-highlight'); }

      // Detect if dropping into a different frame
      selectedEl.style.visibility = 'hidden';
      const tgt = document.elementFromPoint(ev.clientX, ev.clientY);
      selectedEl.style.visibility = '';
      let frame = tgt;
      while (frame && frame !== document.body) {
        if (['DIV','SECTION','MAIN','ARTICLE','ASIDE','FORM','HEADER','FOOTER','NAV'].includes(frame.tagName) && frame.offsetWidth > 80 && frame.offsetHeight > 30 && frame !== selectedEl) break;
        frame = frame.parentElement;
      }

      const finalRect = selectedEl.getBoundingClientRect();

      if (frame && frame !== document.body && frame !== originalParent) {
        // Dropping into a DIFFERENT frame — insert as absolute child at exact position
        const frameRect = frame.getBoundingClientRect();
        frame.style.position = frame.style.position || 'relative';
        selectedEl.style.position = 'absolute';
        selectedEl.style.left = (finalRect.left - frameRect.left) + 'px';
        selectedEl.style.top = (finalRect.top - frameRect.top) + 'px';
        selectedEl.style.width = savedWidth;
        selectedEl.style.margin = '0';
        selectedEl.style.zIndex = '99999';
        frame.appendChild(selectedEl);
      } else {
        // Same frame or outside — keep in place with relative offset
        const deltaX = finalRect.left - r.left;
        const deltaY = finalRect.top - r.top;
        selectedEl.style.position = 'relative';
        selectedEl.style.width = savedWidth;
        selectedEl.style.margin = savedMargin;
        selectedEl.style.zIndex = savedZIndex || '';
        selectedEl.style.left = ((parseFloat(savedLeft) || 0) + deltaX) + 'px';
        selectedEl.style.top = ((parseFloat(savedTop) || 0) + deltaY) + 'px';
      }

      positionToolbar(selectedEl);
      positionResizeBox(selectedEl);
      updateLastUndoState(selectedEl);
      notifyParent('changeStyle', selectedEl, 'left', selectedEl.style.left);
      notifyParent('changeStyle', selectedEl, 'top', selectedEl.style.top);
      notifyParent('info', null, '', '↕️ Elemento reubicado.');
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }

  if (action === 'copy') {
    localStorage.setItem('sb_clipboard', selectedEl.outerHTML);
    notifyParent('info', null, '', '📋 Elemento copiado. Usa Ctrl+V para pegar.');
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
  const elRect = selectedEl.getBoundingClientRect();
  resizeStart = { 
    x: e.clientX, y: e.clientY, 
    w: selectedEl.offsetWidth, h: selectedEl.offsetHeight,
    left: parseFloat(selectedEl.style.left) || 0,
    top: parseFloat(selectedEl.style.top) || 0
  };
});

document.addEventListener('mousemove', (e) => {
  if (!resizing || !selectedEl) return;
  const dx = e.clientX - resizeStart.x;
  const dy = e.clientY - resizeStart.y;

  // East: grow width to the right
  if (resizeDir.includes('e') && !resizeDir.includes('w')) {
    selectedEl.style.width = Math.max(20, resizeStart.w + dx) + 'px';
  }
  // West: grow width to the left (move left edge, keep right edge fixed)
  if (resizeDir.includes('w') && !resizeDir.includes('e')) {
    const newW = Math.max(20, resizeStart.w - dx);
    selectedEl.style.width = newW + 'px';
    selectedEl.style.position = selectedEl.style.position || 'relative';
    selectedEl.style.left = (resizeStart.left + (resizeStart.w - newW)) + 'px';
  }
  // South: grow height downward
  if (resizeDir.includes('s') && !resizeDir.includes('n')) {
    selectedEl.style.height = Math.max(20, resizeStart.h + dy) + 'px';
  }
  // North: grow height upward (move top edge, keep bottom edge fixed)
  if (resizeDir.includes('n') && !resizeDir.includes('s')) {
    const newH = Math.max(20, resizeStart.h - dy);
    selectedEl.style.height = newH + 'px';
    selectedEl.style.position = selectedEl.style.position || 'relative';
    selectedEl.style.top = (resizeStart.top + (resizeStart.h - newH)) + 'px';
  }

  positionResizeBox(selectedEl);
  positionToolbar(selectedEl);
});

document.addEventListener('mouseup', () => {
  if (resizing && selectedEl) {
    resizing = false;
    notifyParent('changeStyle', selectedEl, 'width', selectedEl.style.width);
    if (selectedEl.style.height) notifyParent('changeStyle', selectedEl, 'height', selectedEl.style.height);
    if (selectedEl.style.left) notifyParent('changeStyle', selectedEl, 'left', selectedEl.style.left);
    if (selectedEl.style.top) notifyParent('changeStyle', selectedEl, 'top', selectedEl.style.top);
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

    // Apply snap after nudge
    const currentRect = selectedEl.getBoundingClientRect();
    const snapped = snapPosition(selectedEl, currentRect.left, currentRect.top);
    if (snapped.snapped) {
      const snapDx = snapped.left - currentRect.left;
      const snapDy = snapped.top - currentRect.top;
      if (Math.abs(snapDx) < SNAP_THRESHOLD * 2) selectedEl.style.left = ((parseFloat(selectedEl.style.left) || 0) + snapDx) + 'px';
      if (Math.abs(snapDy) < SNAP_THRESHOLD * 2) selectedEl.style.top = ((parseFloat(selectedEl.style.top) || 0) + snapDy) + 'px';
    }

    positionToolbar(selectedEl);
    positionResizeBox(selectedEl);
    showAlignmentGuides(selectedEl.getBoundingClientRect());
    clearTimeout(window._guideTimer);
    window._guideTimer = setTimeout(clearGuides, 800);
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
  if (!el) { window.parent.postMessage({ type: 'ADMIN_INFO', message: '⚠️ No se pudo deshacer (elemento no encontrado).' }, '*'); return; }
  const currentVal = action.property === 'textContent' ? el.textContent : el.style[action.property];
  redoStack.push({ ...action, newValue: currentVal });
  if (action.property === 'textContent') el.textContent = action.oldValue;
  else if (action.property === '__fullStyle') el.style.cssText = action.oldValue;
  else el.style[action.property] = action.oldValue;
  if (selectedEl) { positionToolbar(selectedEl); positionResizeBox(selectedEl); }
  window.parent.postMessage({ type: 'ADMIN_INFO', message: '↩️ Deshecho.' }, '*');
}

function redo() {
  if (redoStack.length === 0) return;
  const action = redoStack.pop();
  const el = document.querySelector(action.selector);
  if (!el) { window.parent.postMessage({ type: 'ADMIN_INFO', message: '⚠️ No se pudo rehacer (elemento no encontrado).' }, '*'); return; }
  undoStack.push({ ...action });
  if (action.property === 'textContent') el.textContent = action.newValue;
  else if (action.property === '__fullStyle') el.style.cssText = action.newValue;
  else el.style[action.property] = action.newValue;
  if (selectedEl) { positionToolbar(selectedEl); positionResizeBox(selectedEl); }
  window.parent.postMessage({ type: 'ADMIN_INFO', message: '↪️ Rehecho.' }, '*');
}

// ===== MESSAGE HANDLER =====
window.addEventListener('message', (event) => {
  if (!event.data) return;
  if (event.data.type === 'ENABLE_EDIT_MODE') { editMode = true; }
  if (event.data.type === 'DISABLE_EDIT_MODE') { editMode = false; deselectAll(); }
  if (event.data.type === 'UNDO_ACTION') undo();
  if (event.data.type === 'REDO_ACTION') redo();

  // Drag from panel — element dropped at specific coordinates
  if (event.data.type === 'DROP_ELEMENT_AT') {
    editMode = true;
    const { html, x, y } = event.data;
    const temp = document.createElement('div');
    temp.innerHTML = html;
    const el = temp.firstElementChild;
    if (!el) return;
    el.style.position = 'absolute';
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.style.zIndex = '99999';
    el.style.cursor = 'move';
    el.classList.add('admin-inserted');

    // Find frame at drop position
    let frame = document.elementFromPoint(x, y);
    while (frame && frame !== document.body) {
      if (['DIV','SECTION','MAIN','ARTICLE','ASIDE','FORM','HEADER','FOOTER','NAV'].includes(frame.tagName) && frame.offsetWidth > 80 && frame.offsetHeight > 30) break;
      frame = frame.parentElement;
    }
    if (frame && frame !== document.body) {
      const frameRect = frame.getBoundingClientRect();
      frame.style.position = frame.style.position || 'relative';
      el.style.left = (x - frameRect.left) + 'px';
      el.style.top = (y - frameRect.top) + 'px';
      frame.appendChild(el);
    } else {
      document.body.appendChild(el);
    }
    selectElement(el);
    // Save to undo stack
    undoStack.push({ selector: getSelector(el), property: 'display', oldValue: 'none', newValue: '' });
    redoStack = [];
    notifyParent('info', null, '', '✅ Elemento insertado en el frame.');
  }

  // Paste from clipboard (Ctrl+V from admin)
  if (event.data.type === 'PASTE_CLIPBOARD') {
    const html = localStorage.getItem('sb_clipboard');
    if (!html) return;
    const temp = document.createElement('div');
    temp.innerHTML = html;
    const el = temp.firstElementChild;
    if (!el) return;
    el.classList.remove('editor-highlight');
    el.style.position = 'relative';
    el.style.top = '10px';
    el.style.left = '10px';
    el.style.zIndex = '99999';
    // Insert near selected element or at body
    if (selectedEl && selectedEl.parentElement) {
      selectedEl.parentElement.insertBefore(el, selectedEl.nextSibling);
    } else {
      const content = document.getElementById('app-content') || document.body;
      content.appendChild(el);
    }
    selectElement(el);
    undoStack.push({ selector: getSelector(el), property: 'display', oldValue: 'none', newValue: '' });
    redoStack = [];
    notifyParent('info', null, '', '📌 Elemento pegado.');
  }

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

// Ctrl+V paste shortcut
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'v' && editMode) {
    e.preventDefault();
    const html = localStorage.getItem('sb_clipboard');
    if (!html) return;
    const temp = document.createElement('div');
    temp.innerHTML = html;
    const el = temp.firstElementChild;
    if (!el) return;
    el.classList.remove('editor-highlight');
    el.style.position = 'relative';
    el.style.top = '10px';
    el.style.left = '10px';
    el.style.zIndex = '99999';
    if (selectedEl && selectedEl.parentElement) {
      selectedEl.parentElement.insertBefore(el, selectedEl.nextSibling);
    } else {
      const content = document.getElementById('app-content') || document.body;
      content.appendChild(el);
    }
    selectElement(el);
    undoStack.push({ selector: getSelector(el), property: 'display', oldValue: 'none', newValue: '' });
    redoStack = [];
    notifyParent('info', null, '', '📌 Pegado (Ctrl+V).');
  }
  // Ctrl+C copy shortcut
  if (e.ctrlKey && e.key === 'c' && editMode && selectedEl) {
    e.preventDefault();
    localStorage.setItem('sb_clipboard', selectedEl.outerHTML);
    notifyParent('info', null, '', '📋 Copiado (Ctrl+C).');
  }
});

} // end initEditor
