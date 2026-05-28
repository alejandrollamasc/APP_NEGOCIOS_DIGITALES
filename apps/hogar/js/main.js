import '@sb/sb-ui-seguros-bolivar-light.min.css';
import '@sb/sb-ui-components.min.js';
import '../css/hogar.css';

import { renderHome } from './views/home.js';
import { renderStep1 } from './views/step1-info.js';
import { renderStep2Property } from './views/step2-property.js';
import { renderStep2House } from './views/step2-house.js';
import { renderStep2Belongings } from './views/step2-belongings.js';
import { renderStep2NotViveHouse } from './views/step2-notvive-house.js';
import { renderStep2Tenant } from './views/step2-tenant.js';
import { renderStep3Plan } from './views/step3-plan.js';
import { renderStep4Summary } from './views/step4-summary.js';
import { renderStep5Identity } from './views/step5-identity.js';
import { renderStep5Success } from './views/step5-success.js';

function initApp() {
  const app = document.getElementById('app');
  const params = new URLSearchParams(window.location.search);
  const step = params.get('step');
  const option = params.get('option');
  const owner = params.get('owner');

  app.innerHTML = `<main id="app-content" class="app-main app-main--home"></main>`;
  const content = document.getElementById('app-content');

  if (step === '6') { renderStep5Success(content); }
  else if (step === '5') { renderStep5Identity(content); }
  else if (step === '4') { renderStep4Summary(content); }
  else if (step === '3') { renderStep3Plan(content); }
  else if (step === '2' && owner === 'arrendatario' && option === 'casa') { renderStep2Tenant(content); }
  else if (step === '2' && owner === 'novive' && option === 'casa') { renderStep2NotViveHouse(content); }
  else if (step === '2' && option === 'casa') { renderStep2House(content); }
  else if (step === '2' && option === 'pertenencias') { renderStep2Belongings(content); }
  else if (step === '2') { renderStep2Property(content); }
  else if (step === '1') { renderStep1(content); }
  else { renderHome(content); }
}

// ===== MESSAGE HANDLER =====
function camelToKebab(str) { return str.replace(/([A-Z])/g, '-$1').toLowerCase(); }

window.addEventListener('message', (event) => {
  if (!event.data) return;

  if (event.data.type === 'SAVE_SNAPSHOT') {
    const html = document.getElementById('app-content')?.innerHTML || document.body.innerHTML;
    window.parent.postMessage({ type: 'SNAPSHOT_DATA', html: html, page: event.data.page, projectId: event.data.projectId }, '*');
  }

  if (event.data.type === 'SET_FLOW_CONFIG') {
    // Store flow config and override button clicks
    window._flowConfig = event.data.config;
    applyFlowConfig();
  }

  if (event.data.type === 'CLEAR_ADMIN_ELEMENTS') {
    document.querySelectorAll('.admin-inserted').forEach(el => el.remove());
  }

  if (event.data.type === 'RESTORE_SNAPSHOT') {
    const content = document.getElementById('app-content');
    if (content && event.data.html) {
      content.innerHTML = event.data.html;
      // Re-enable draggable on admin-inserted elements
      content.querySelectorAll('.admin-inserted').forEach(el => { el.style.cursor = 'move'; });
      // Re-apply flow config if it was set
      if (window._flowConfig) { setTimeout(applyFlowConfig, 100); }
    }
  }

  if (event.data.type === 'ADMIN_OVERRIDE') {
    const { selector, property, value } = event.data;
    try {
      if (property === '__appendHTML') {
        const temp = document.createElement('div');
        temp.innerHTML = value;
        const el = temp.firstElementChild;
        if (el) { el.classList.add('admin-inserted'); const content = document.getElementById('app-content') || document.body; content.appendChild(el); makeDraggable(el); }
      } else if (property === '__placeholder') {
        const w = document.querySelector(selector); if (w) { const input = w.querySelector('input,textarea') || w; if (input.setAttribute) input.setAttribute('placeholder', value); }
      } else if (property === '__label') {
        const w = document.querySelector(selector); if (w) { const label = w.querySelector('label'); if (label) label.textContent = value; }
      } else if (property === '__multiStyle') {
        const el = document.querySelector(selector);
        if (el) { try { const styles = JSON.parse(value); Object.entries(styles).forEach(([prop, val]) => { el.style.setProperty(prop, val, 'important'); }); } catch {} }
      } else if (property === 'style') {
        const el = document.querySelector(selector); if (el) el.style.cssText = value;
      } else {
        const el = document.querySelector(selector);
        if (el) { if (property === 'textContent') el.textContent = value; else if (property === 'src') el.src = value; else el.style.setProperty(camelToKebab(property), value, 'important'); }
      }
    } catch {}
  }

  if (event.data.type === 'ENABLE_EDIT_MODE') { enableEditMode(); }
  if (event.data.type === 'DISABLE_EDIT_MODE') { disableEditMode(); }

  if (event.data.type === 'NAVIGATE_TO_STEP') {
    const step = event.data.step;
    const url = new URL(window.location);
    if (step <= 1) { url.searchParams.delete('step'); } else { url.searchParams.set('step', String(step - 1)); }
    url.searchParams.delete('option'); url.searchParams.delete('owner');
    // Force reload even if URL is the same
    if (url.toString() === window.location.href) {
      window.location.reload();
    } else {
      window.location.href = url.toString();
    }
  }

  if (event.data.type === 'INSERT_TEXT') {
    const { text, fontSize, fontWeight, color, backgroundColor } = event.data;
    const el = document.createElement('div');
    el.textContent = text || 'Nuevo texto';
    el.style.cssText = `position:relative;margin:12px auto;width:fit-content;font-family:'Roboto Condensed',sans-serif;font-size:${fontSize||'16px'};font-weight:${fontWeight||'400'};color:${color||'#1B1B1B'};background:${backgroundColor||'transparent'};padding:8px 12px;cursor:move;z-index:99999;line-height:140%;`;
    el.classList.add('admin-inserted');
    insertIntoContext(el); makeDraggable(el); selectElement(el);
    notifyChange('insertText', el, 'Texto insertado');
  }

  if (event.data.type === 'INSERT_SHAPE') {
    const el = document.createElement('div'); el.classList.add('admin-inserted');
    const s = event.data.shape;
    if (s === 'rect') el.style.cssText = 'position:relative;margin:12px auto;width:200px;height:120px;background:#FFF;border:1px solid #CCC;border-radius:8px;cursor:move;z-index:99999;box-shadow:0 1px 3px rgba(0,0,0,.15);';
    else if (s === 'circle') el.style.cssText = 'position:relative;margin:12px auto;width:120px;height:120px;background:#FFF;border:1px solid #CCC;border-radius:50%;cursor:move;z-index:99999;';
    else el.style.cssText = 'position:relative;margin:12px auto;width:80%;max-width:600px;height:2px;background:#CCC;cursor:move;z-index:99999;';
    insertIntoContext(el); makeDraggable(el); selectElement(el);
    notifyChange('insertShape', el, 'Figura: ' + s);
  }

  if (event.data.type === 'INSERT_IMAGE') {
    const el = document.createElement('img'); el.src = event.data.src; el.alt = event.data.name || '';
    el.classList.add('admin-inserted');
    el.style.cssText = 'position:relative;display:block;margin:12px auto;max-width:200px;height:auto;cursor:move;z-index:99999;';
    insertIntoContext(el); makeDraggable(el); selectElement(el);
    notifyChange('insertImage', el, 'Imagen: ' + (event.data.name||''));
  }

  if (event.data.type === 'INSERT_FORM_FIELD') {
    const { title, fieldType, placeholder, options } = event.data;
    const ft = fieldType || 'text';
    const w = document.createElement('div'); w.classList.add('admin-inserted');
    w.style.cssText = 'position:relative;margin:12px auto;cursor:move;z-index:99999;width:311px;max-width:90%;';
    let h = '<div style="display:flex;flex-direction:column;gap:8px;">';
    h += `<label style="font-family:'Roboto Condensed',sans-serif;font-size:14px;color:#1B1B1B;">${title||'Campo'}</label>`;
    if (ft === 'select') h += `<div style="position:relative;"><select style="width:100%;height:40px;padding:8px 40px 8px 16px;font-family:'Roboto Condensed',sans-serif;font-size:14px;color:#333;background:#FFF;border:1px solid #999;border-radius:5px;appearance:none;">${(options||['Opción 1']).map(o=>`<option>${o}</option>`).join('')}</select><svg style="position:absolute;right:12px;top:50%;transform:translateY(-50%);pointer-events:none;" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 7l5 5 5-5" stroke="#016D38" stroke-width="2" stroke-linecap="round"/></svg></div>`;
    else if (ft === 'date') h += `<input type="date" style="width:100%;height:40px;padding:8px 16px;font-family:'Roboto Condensed',sans-serif;font-size:14px;color:#333;background:#FFF;border:1px solid #999;border-radius:5px;">`;
    else if (ft === 'toggle') h += `<div style="display:flex;align-items:center;gap:12px;"><div style="width:48px;height:26px;background:#016D38;border-radius:13px;position:relative;"><div style="width:20px;height:20px;background:#fff;border-radius:50%;position:absolute;top:3px;right:3px;box-shadow:0 1px 3px rgba(0,0,0,.2);"></div></div><span style="font-family:'Roboto Condensed',sans-serif;font-size:14px;">Sí</span></div>`;
    else if (ft === 'radio') { h += '<div style="display:flex;flex-direction:column;gap:12px;">'; (options||['Opción 1','Opción 2']).forEach((o,i)=>{ h += `<label style="display:flex;align-items:center;gap:8px;font-family:'Roboto Condensed',sans-serif;font-size:16px;color:#1B1B1B;cursor:pointer;"><div style="width:20px;height:20px;border-radius:50%;border:2px solid #016D38;${i===0?'background:#016D38;':''}"></div>${o}</label>`; }); h += '</div>'; }
    else h += `<input type="text" style="width:100%;height:40px;padding:8px 16px;font-family:'Roboto Condensed',sans-serif;font-size:14px;color:#333;background:#FFF;border:1px solid #999;border-radius:5px;" placeholder="${placeholder||'Ingrese aquí'}">`;
    h += '</div>';
    w.innerHTML = h;
    insertIntoContext(w); makeDraggable(w); selectElement(w);
    notifyChange('insertFormField', w, 'Campo: ' + (title||''));
  }

  if (event.data.type === 'INSERT_MODAL') {
    const el = document.createElement('div'); el.classList.add('admin-inserted');
    el.style.cssText = 'position:relative;margin:24px auto;width:500px;max-width:90%;background:#fff;border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,.2);padding:32px;cursor:move;z-index:99999;';
    el.innerHTML = '<h3 style="font-family:Roboto Condensed,sans-serif;font-size:20px;color:#016D38;margin-bottom:16px;">Modal Stepper</h3><p style="font-size:14px;color:#666;">Contenido del modal.</p>';
    insertIntoContext(el); makeDraggable(el); selectElement(el);
    notifyChange('insertModal', el, 'Modal insertado');
  }

  if (event.data.type === 'DELETE_SELECTED') { const t = selectedElement; if (t) { t.style.display = 'none'; deselectElement(); notifyChange('delete', t, 'Eliminado'); } }
  if (event.data.type === 'DUPLICATE_SELECTED') { const t = selectedElement; if (t) { const c = t.cloneNode(true); c.classList.add('admin-inserted'); c.style.outline=''; t.parentElement.appendChild(c); makeDraggable(c); selectElement(c); notifyChange('duplicate', c, 'Duplicado'); } }
  if (event.data.type === 'APPLY_EFFECT') { const t = selectedElement; if (t) { const {effect,value}=event.data; if (!t.style.position||t.style.position==='static') t.style.position='relative'; t.style[effect]=value; notifyChange('effect', t, 'Efecto'); } }
  if (event.data.type === 'LAYER_CHANGE') { const t = selectedElement; if (t) { const {direction}=event.data; if (!t.style.position||t.style.position==='static') t.style.position='relative'; const cur=parseInt(t.style.zIndex)||1000; let nz; if (direction==='front') nz=99999; else if (direction==='back') nz=-1; else if (direction==='up') nz=cur+10; else nz=Math.max(-1,cur-10); t.style.zIndex=String(nz); notifyChange('effect',t,'Capa: '+nz); } }
  if (event.data.type === 'ENABLE_RESIZE_MODE') { if (selectedElement) enableResize(selectedElement); }
  if (event.data.type === 'UPDATE_PLACEHOLDER') { try { const w=document.querySelector(event.data.selector); if(w){const i=w.querySelector('input,textarea')||w; if(i.setAttribute) i.setAttribute('placeholder',event.data.value);} } catch{} }
  if (event.data.type === 'UPDATE_LABEL') { try { const w=document.querySelector(event.data.selector); if(w){const l=w.querySelector('label'); if(l) l.textContent=event.data.value;} } catch{} }
  if (event.data.type === 'UPDATE_SELECT_OPTIONS') { try { const w=document.querySelector(event.data.selector); if(w){const s=w.querySelector('select')||w; if(s.tagName==='SELECT') s.innerHTML=event.data.options.map(o=>`<option>${o}</option>`).join('');} } catch{} }
  if (event.data.type === 'UNDO') { if (undoHistory.length>0){const a=undoHistory.pop(); redoHistory.push(a); if(a.el&&a.prev) a.el.style.cssText=a.prev;} }
  if (event.data.type === 'REDO') { if (redoHistory.length>0){const a=redoHistory.pop(); undoHistory.push(a); if(a.el&&a.next) a.el.style.cssText=a.next;} }

  if (event.data.type === 'COPY_SELECTED') {
    if (selectedElement) {
      const html = selectedElement.outerHTML;
      window.parent.postMessage({ type: 'COPIED_ELEMENT', html }, '*');
    }
  }

  if (event.data.type === 'PASTE_ELEMENT') {
    const temp = document.createElement('div');
    temp.innerHTML = event.data.html;
    const el = temp.firstElementChild;
    if (el) {
      el.classList.add('admin-inserted');
      el.style.position = 'relative';
      el.style.zIndex = '99999';
      el.style.cursor = 'move';
      el.style.margin = '12px auto';
      const content = document.getElementById('app-content') || document.body;
      content.appendChild(el);
      makeDraggable(el);
      selectElement(el);
      notifyChange('insertText', el, 'Elemento pegado');
    }
  }
});

// ===== EDIT MODE =====
let editModeActive = false;
let selectedElement = null;
let isDragging = false;
let dragOffset = { x: 0, y: 0 };
let undoHistory = [];
let redoHistory = [];

function insertIntoContext(el) {
  if (selectedElement && selectedElement !== document.body && selectedElement !== document.documentElement && !selectedElement.classList.contains('admin-inserted')) {
    selectedElement.style.position = selectedElement.style.position || 'relative';
    selectedElement.appendChild(el);
  } else {
    el.style.position = 'fixed'; el.style.top = '50%'; el.style.left = '50%'; el.style.transform = 'translate(-50%,-50%)'; el.style.opacity = '0.8'; el.style.pointerEvents = 'none';
    document.body.appendChild(el);
    const hint = document.createElement('div'); hint.className = 'admin-placement-hint';
    hint.textContent = 'Haga clic donde desea colocar el elemento'; hint.style.cssText = 'position:fixed;top:12px;left:50%;transform:translateX(-50%);background:#016D38;color:#fff;padding:8px 20px;border-radius:20px;font-family:Roboto Condensed,sans-serif;font-size:13px;z-index:999999;pointer-events:none;';
    document.body.appendChild(hint);
    const onM = (ev) => { el.style.top = ev.clientY + 'px'; el.style.left = ev.clientX + 'px'; };
    document.addEventListener('mousemove', onM);
    const onC = (ev) => { ev.preventDefault(); ev.stopPropagation(); document.removeEventListener('mousemove', onM); document.removeEventListener('click', onC, true); hint.remove();
      el.style.position = 'relative'; el.style.top = ''; el.style.left = ''; el.style.transform = ''; el.style.opacity = ''; el.style.pointerEvents = '';
      el.style.display = 'none'; const target = document.elementFromPoint(ev.clientX, ev.clientY); el.style.display = '';
      let container = target;
      while (container && container !== document.body) { const tag = container.tagName; if (['DIV','SECTION','MAIN','ARTICLE','ASIDE','FORM','HEADER','FOOTER','NAV'].includes(tag) && container.offsetWidth > 100 && container.offsetHeight > 50 && !container.classList.contains('admin-inserted')) break; container = container.parentElement; }
      if (container && container !== document.body) { container.appendChild(el); } else { (document.getElementById('app-content')||document.body).appendChild(el); }
      makeDraggable(el); selectElement(el);
    };
    setTimeout(() => document.addEventListener('click', onC, true), 50);
  }
}

function enableEditMode() { editModeActive = true; document.body.classList.add('admin-edit-mode'); }
function disableEditMode() { editModeActive = false; document.body.classList.remove('admin-edit-mode'); deselectElement(); }

function selectElement(el) { deselectElement(); selectedElement = el; el.style.outline = '2px solid #0a6741'; el.style.outlineOffset = '2px'; showResizeHandles(el); }
function deselectElement() { if (selectedElement) { selectedElement.style.outline = ''; selectedElement.style.outlineOffset = ''; removeResizeHandles(); selectedElement = null; } }

function notifyChange(action, el, description) {
  const data = { type: 'ADMIN_CHANGE', action, selector: getUniqueSelector(el), description };
  if (action.startsWith('insert') || action === 'duplicate') {
    data.selector = 'body'; data.property = '__appendHTML'; data.value = el.outerHTML;
  } else if (action === 'delete') {
    data.property = 'display'; data.value = 'none';
  } else if (el.classList.contains('admin-inserted')) {
    // For inserted elements, store full outerHTML (they'll be re-created from scratch)
    data.selector = 'body'; data.property = '__appendHTML'; data.value = el.outerHTML;
  } else {
    // For base design elements, store only the changed inline styles as individual properties
    data.property = '__multiStyle';
    const styles = {};
    for (let i = 0; i < el.style.length; i++) {
      const prop = el.style[i];
      styles[prop] = el.style.getPropertyValue(prop);
    }
    data.value = JSON.stringify(styles);
  }
  window.parent.postMessage(data, '*');
}

// Resize handles
let resizeHandles = [];
function showResizeHandles(el) { removeResizeHandles(); const r = el.getBoundingClientRect(); const sx = window.scrollX, sy = window.scrollY;
  [{ c:'nwse-resize',t:r.top+sy-5,l:r.left+sx-5,dx:-1,dy:-1 },{ c:'nwse-resize',t:r.bottom+sy-5,l:r.right+sx-5,dx:1,dy:1 },{ c:'nesw-resize',t:r.top+sy-5,l:r.right+sx-5,dx:1,dy:-1 },{ c:'nesw-resize',t:r.bottom+sy-5,l:r.left+sx-5,dx:-1,dy:1 },{ c:'ns-resize',t:r.top+sy-5,l:r.left+sx+r.width/2-5,dx:0,dy:-1 },{ c:'ns-resize',t:r.bottom+sy-5,l:r.left+sx+r.width/2-5,dx:0,dy:1 },{ c:'ew-resize',t:r.top+sy+r.height/2-5,l:r.left+sx-5,dx:-1,dy:0 },{ c:'ew-resize',t:r.top+sy+r.height/2-5,l:r.right+sx-5,dx:1,dy:0 }].forEach(p => {
    const h = document.createElement('div'); h.className = 'admin-resize-handle';
    h.style.cssText = `position:absolute;top:${p.t}px;left:${p.l}px;width:10px;height:10px;background:#fff;border:2px solid #0a6741;border-radius:2px;cursor:${p.c};z-index:999999;`;
    h.addEventListener('mousedown', (e) => { e.preventDefault(); e.stopPropagation(); startResize(el, p.dx, p.dy, e); });
    document.body.appendChild(h); resizeHandles.push(h);
  });
}
function removeResizeHandles() { resizeHandles.forEach(h => h.remove()); resizeHandles = []; }
function startResize(el, dx, dy, se) { const sw=el.offsetWidth, sh=el.offsetHeight, sx=se.clientX, sy=se.clientY, prev=el.style.cssText; removeResizeHandles();
  const onM=(e)=>{ if(dx!==0) el.style.width=Math.max(20,sw+(e.clientX-sx)*dx)+'px'; if(dy!==0) el.style.height=Math.max(20,sh+(e.clientY-sy)*dy)+'px'; };
  const onU=()=>{ document.removeEventListener('mousemove',onM); document.removeEventListener('mouseup',onU); showResizeHandles(el); undoHistory.push({el,prev,next:el.style.cssText}); notifyChange('resize',el,'Tamaño ajustado'); };
  document.addEventListener('mousemove',onM); document.addEventListener('mouseup',onU);
}
function enableResize(el) { startResize(el, 1, 1, { clientX: el.getBoundingClientRect().right, clientY: el.getBoundingClientRect().bottom }); }

// Hover
document.addEventListener('mouseover', (e) => { if (!editModeActive || isDragging) return; const el = e.target; if (el === selectedElement || el === document.body || el.classList.contains('admin-resize-handle')) return; el.style.outline = '1px dashed rgba(10,103,65,0.4)'; });
document.addEventListener('mouseout', (e) => { if (!editModeActive || isDragging) return; const el = e.target; if (el === selectedElement || el.classList.contains('admin-resize-handle')) return; el.style.outline = ''; });

// Drag (mousedown)
document.addEventListener('mousedown', (e) => {
  if (!editModeActive) return;
  const el = e.target;
  if (el === document.body || el === document.documentElement) { deselectElement(); return; }
  if (el.classList.contains('admin-resize-handle')) return;
  e.preventDefault(); e.stopPropagation();
  selectElement(el);
  const rect = el.getBoundingClientRect();
  dragOffset.x = e.clientX - rect.left; dragOffset.y = e.clientY - rect.top;
  isDragging = false;
  const prevStyle = el.style.cssText;
  let highlightedFrame = null;

  const onMove = (ev) => {
    if (!isDragging) { if (Math.abs(ev.clientX-e.clientX)>3||Math.abs(ev.clientY-e.clientY)>3) { isDragging = true; removeResizeHandles(); el._savedWidth=el.style.width; el._savedHeight=el.style.height; el._savedMargin=el.style.margin; el.style.position='fixed'; el.style.zIndex='999999'; el.style.opacity='0.85'; el.style.pointerEvents='none'; el.style.width=rect.width+'px'; el.style.margin='0'; } }
    if (isDragging) {
      const snap = getSnapGuides(el, ev.clientX-dragOffset.x, ev.clientY-dragOffset.y);
      el.style.left = snap.left+'px'; el.style.top = snap.top+'px';
      showAlignGuides(snap.guides);
      // Highlight frame
      el.style.display='none'; const tgt=document.elementFromPoint(ev.clientX,ev.clientY); el.style.display='';
      let frame=tgt; while(frame&&frame!==document.body){if(['DIV','SECTION','MAIN','ARTICLE','ASIDE','FORM'].includes(frame.tagName)&&frame.offsetWidth>80&&frame.offsetHeight>30&&!frame.classList.contains('admin-inserted')&&frame!==el) break; frame=frame.parentElement;}
      if(highlightedFrame&&highlightedFrame!==frame){highlightedFrame.style.outline='';highlightedFrame.style.outlineOffset='';}
      if(frame&&frame!==document.body&&frame!==el){frame.style.outline='2px dashed #016D38';frame.style.outlineOffset='4px';highlightedFrame=frame;}
    }
  };
  const onUp = (ev) => {
    document.removeEventListener('mousemove',onMove); document.removeEventListener('mouseup',onUp);
    hideAlignGuides();
    if(highlightedFrame){highlightedFrame.style.outline='';highlightedFrame.style.outlineOffset='';highlightedFrame=null;}
    if (isDragging) { isDragging = false;
      // Restore saved dimensions
      const savedW = el._savedWidth || ''; const savedH = el._savedHeight || ''; const savedM = el._savedMargin || '';
      // Find frame and place element inside it at drop position
      el.style.display='none'; const tgt=document.elementFromPoint(ev.clientX,ev.clientY); el.style.display='';
      let frame=tgt; while(frame&&frame!==document.body){if(['DIV','SECTION','MAIN','ARTICLE','ASIDE','FORM'].includes(frame.tagName)&&frame.offsetWidth>80&&frame.offsetHeight>30&&!frame.classList.contains('admin-inserted')&&frame!==el) break; frame=frame.parentElement;}
      if(frame&&frame!==document.body){
        const fr=frame.getBoundingClientRect();
        frame.style.position=frame.style.position||'relative';
        el.style.position='absolute'; el.style.left=Math.max(0,ev.clientX-fr.left-dragOffset.x)+'px'; el.style.top=Math.max(0,ev.clientY-fr.top-dragOffset.y)+'px';
        el.style.opacity=''; el.style.pointerEvents=''; el.style.width=savedW; el.style.height=savedH; el.style.margin=savedM; el.style.zIndex='99999';
        if(el.parentElement!==frame) frame.appendChild(el);
      } else { el.style.position='relative'; el.style.top=''; el.style.left=''; el.style.opacity=''; el.style.pointerEvents=''; el.style.width=savedW; el.style.height=savedH; el.style.margin=savedM; el.style.zIndex='99999'; }
      showResizeHandles(el); undoHistory.push({el,prev:prevStyle,next:el.style.cssText}); notifyChange('move',el,'Elemento movido');
    }
  };
  document.addEventListener('mousemove',onMove); document.addEventListener('mouseup',onUp);
}, true);

// Double click = editor
document.addEventListener('dblclick', (e) => {
  if (!editModeActive) return; e.preventDefault(); e.stopPropagation();
  let el = e.target; if (el===document.body||el===document.documentElement) return;
  const innerInput = el.querySelector && el.querySelector('input,select,textarea');
  const isWrapper = el.classList.contains('admin-inserted') && innerInput;
  const formEl = innerInput || (['INPUT','SELECT','TEXTAREA'].includes(el.tagName) ? el : null);
  selectElement(el);
  const computed = window.getComputedStyle(el);
  let placeholderValue = '', labelValue = '';
  if (formEl) placeholderValue = formEl.placeholder || '';
  if (isWrapper) { const lbl = el.querySelector('label'); if (lbl) labelValue = lbl.textContent || ''; }
  window.parent.postMessage({ type:'ELEMENT_SELECTED', tagName: formEl?formEl.tagName.toLowerCase():el.tagName.toLowerCase(), selector:getUniqueSelector(el), textContent:(el.textContent||'').substring(0,200), className:el.className||'', id:el.id||'', options:(formEl&&formEl.tagName==='SELECT')?Array.from(formEl.options).map(o=>o.textContent):[], styles:{color:computed.color,backgroundColor:computed.backgroundColor,fontSize:computed.fontSize,fontWeight:computed.fontWeight,fontFamily:computed.fontFamily,width:el.style.width||computed.width,height:el.style.height||computed.height}, src:el.src||'', placeholder:placeholderValue, label:labelValue, isFormField:!!formEl, isImage:el.tagName==='IMG'||el.tagName==='SVG', isText:!formEl&&!['IMG','SVG'].includes(el.tagName)&&el.children.length===0 }, '*');
}, true);

// Prevent clicks in edit mode
document.addEventListener('click', (e) => { if (!editModeActive) return; if (['INPUT','SELECT','TEXTAREA'].includes(e.target.tagName)) return; e.preventDefault(); e.stopPropagation(); }, true);

// Draggable helper for inserted elements
function makeDraggable(el) { /* handled by global mousedown */ }

// Alignment guides
let guideElements = [];
function getSnapGuides(el, left, top) {
  const T=6, pw=document.documentElement.clientWidth||1440, cx=pw/2, ew=el.offsetWidth||0;
  let sl=left, st=top; const guides=[];
  if(Math.abs(left+ew/2-cx)<T){sl=cx-ew/2;guides.push({type:'v',pos:cx});}
  [0,16,24,32,120].forEach(m=>{if(Math.abs(left-m)<T){sl=m;guides.push({type:'v',pos:m});}if(Math.abs(left+ew-(pw-m))<T){sl=pw-m-ew;guides.push({type:'v',pos:pw-m});}});
  return {left:sl,top:st,guides};
}
function showAlignGuides(guides) { hideAlignGuides(); guides.forEach(g=>{const l=document.createElement('div');l.className='admin-align-guide';l.style.cssText=g.type==='v'?`position:fixed;top:0;left:${g.pos}px;width:1px;height:100vh;background:#ff4081;z-index:999999;pointer-events:none;opacity:0.7;`:`position:absolute;top:${g.pos}px;left:0;width:100vw;height:1px;background:#ff4081;z-index:999999;pointer-events:none;opacity:0.7;`;document.body.appendChild(l);guideElements.push(l);}); }
function hideAlignGuides() { guideElements.forEach(el=>el.remove()); guideElements=[]; }

function getUniqueSelector(el) {
  if (el.id) return `#${el.id}`;
  if (el.className && typeof el.className === 'string') { const cls = el.className.trim().split(/\s+/).filter(c=>!c.startsWith('hover')&&!c.startsWith('admin-')); if (cls.length>0) { const sel='.'+cls.join('.'); if (document.querySelectorAll(sel).length===1) return sel; } }
  const path=[]; let cur=el;
  while(cur&&cur!==document.body){let seg=cur.tagName.toLowerCase();if(cur.id){path.unshift(`#${cur.id}`);break;}const p=cur.parentElement;if(p){const sibs=Array.from(p.children).filter(c=>c.tagName===cur.tagName);if(sibs.length>1)seg+=`:nth-of-type(${sibs.indexOf(cur)+1})`;}path.unshift(seg);cur=cur.parentElement;}
  return path.join(' > ');
}

// Load project overrides (only when NOT in admin iframe)
async function loadProjectOverrides() {
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get('project'); if (!projectId) return;
  try { const r = await fetch(`http://localhost:4001/api/projects/${projectId}/overrides`); if (!r.ok) return; const changes = await r.json(); if (!Array.isArray(changes)||changes.length===0) return;
    setTimeout(()=>{changes.forEach(c=>{try{if(c.property==='__appendHTML'){const t=document.createElement('div');t.innerHTML=c.value;const el=t.firstElementChild;if(el){el.classList.add('admin-inserted');(document.getElementById('app-content')||document.body).appendChild(el);}}else if(c.property==='__placeholder'){const w=document.querySelector(c.selector);if(w){const i=w.querySelector('input,textarea')||w;if(i.setAttribute)i.setAttribute('placeholder',c.value);}}else if(c.property==='__label'){const w=document.querySelector(c.selector);if(w){const l=w.querySelector('label');if(l)l.textContent=c.value;}}else if(c.property==='__multiStyle'){const el=document.querySelector(c.selector);if(el){try{const styles=JSON.parse(c.value);Object.entries(styles).forEach(([p,v])=>{el.style.setProperty(p,v,'important');});}catch{}}}else if(c.property==='style'){const el=document.querySelector(c.selector);if(el)el.style.cssText=c.value;}else{const el=document.querySelector(c.selector);if(el){if(c.property==='textContent')el.textContent=c.value;else if(c.property==='src')el.src=c.value;else el.style.setProperty(camelToKebab(c.property),c.value,'important');}}}catch{}});},500);
  } catch {}
}

// ===== FLOW CONFIG =====
function applyFlowConfig() {
  if (!window._flowConfig) return;
  const pageStepMap = { home: '0', step1: '1', step2: '2', step3: '3', step4: '4', step5: '5', step6: '6' };

  // Determine current page from URL
  const params = new URLSearchParams(window.location.search);
  const currentStep = params.get('step') || '0';
  const currentPageId = currentStep === '0' ? 'home' : `step${currentStep}`;
  const targetPageId = window._flowConfig[currentPageId];

  if (targetPageId && targetPageId !== 'none') {
    const targetStep = pageStepMap[targetPageId] || '0';

    // Use document-level capture to intercept ALL clicks on action buttons
    document.addEventListener('click', function flowHandler(e) {
      const btn = e.target.closest('button, a');
      if (!btn) return;

      const id = (btn.id || '').toLowerCase();
      const cls = (btn.className || '').toLowerCase();
      const text = (btn.textContent || '').toLowerCase().trim();
      const isMainAction = id.includes('btn-continue') || id.includes('btn-pay') || id.includes('btn-next') || id.includes('btn-cotizar') || id.includes('personalizar') ||
        cls.includes('cta') || cls.includes('bottom__btn') || cls.includes('btn-primary') ||
        text === 'continuar' || text === 'cotizar mi seguro' || text === 'siguiente' || text === 'comprar' || text === 'pagar' || text === 'personalizar' || text === 'validar' ||
        text.includes('continuar') || text.includes('personalizar') || text.includes('cotizar');

      if (isMainAction) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        window.parent.postMessage({ type: 'FLOW_NAVIGATE', targetPage: targetPageId, targetStep: parseInt(targetStep) + 1 }, '*');
      }
    }, true);
  }
}

function boot() { initApp(); const isInAdmin = window.parent !== window; if (!isInAdmin) loadProjectOverrides(); }
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
