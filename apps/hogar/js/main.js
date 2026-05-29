import '@sb/sb-ui-seguros-bolivar-light.min.css';
import '@sb/sb-ui-components.min.js';
import '../css/hogar.css';
import './editor-overlay.js';

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
      content.querySelectorAll('.admin-inserted').forEach(el => { el.style.cursor = 'move'; });
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
        if (el) { el.classList.add('admin-inserted'); const content = document.getElementById('app-content') || document.body; content.appendChild(el); }
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

  if (event.data.type === 'NAVIGATE_TO_STEP') {
    const step = event.data.step;
    const url = new URL(window.location);
    if (step <= 1) { url.searchParams.delete('step'); } else { url.searchParams.set('step', String(step - 1)); }
    url.searchParams.delete('option'); url.searchParams.delete('owner');
    if (url.toString() === window.location.href) { window.location.reload(); }
    else { window.location.href = url.toString(); }
  }

  // Insert operations — delegate element creation, editor-overlay handles selection/drag
  if (event.data.type === 'INSERT_TEXT') {
    const { text, fontSize, fontWeight, color, backgroundColor } = event.data;
    const el = document.createElement('div');
    el.textContent = text || 'Nuevo texto';
    el.style.cssText = `position:relative;margin:12px auto;width:fit-content;font-family:'Roboto Condensed',sans-serif;font-size:${fontSize||'16px'};font-weight:${fontWeight||'400'};color:${color||'#1B1B1B'};background:${backgroundColor||'transparent'};padding:8px 12px;cursor:move;z-index:99999;line-height:140%;`;
    el.classList.add('admin-inserted');
    const content = document.getElementById('app-content') || document.body;
    content.appendChild(el);
    window.parent.postMessage({ type: 'ADMIN_CHANGE', action: 'insertText', selector: 'body', property: '__appendHTML', value: el.outerHTML, description: 'Texto insertado' }, '*');
  }

  if (event.data.type === 'INSERT_SHAPE') {
    const el = document.createElement('div'); el.classList.add('admin-inserted');
    const s = event.data.shape;
    if (s === 'rect') el.style.cssText = 'position:relative;margin:12px auto;width:200px;height:120px;background:#FFF;border:1px solid #CCC;border-radius:8px;cursor:move;z-index:99999;box-shadow:0 1px 3px rgba(0,0,0,.15);';
    else if (s === 'circle') el.style.cssText = 'position:relative;margin:12px auto;width:120px;height:120px;background:#FFF;border:1px solid #CCC;border-radius:50%;cursor:move;z-index:99999;';
    else el.style.cssText = 'position:relative;margin:12px auto;width:80%;max-width:600px;height:2px;background:#CCC;cursor:move;z-index:99999;';
    const content = document.getElementById('app-content') || document.body;
    content.appendChild(el);
    window.parent.postMessage({ type: 'ADMIN_CHANGE', action: 'insertShape', selector: 'body', property: '__appendHTML', value: el.outerHTML, description: 'Figura: ' + s }, '*');
  }

  if (event.data.type === 'INSERT_IMAGE') {
    const el = document.createElement('img'); el.src = event.data.src; el.alt = event.data.name || '';
    el.classList.add('admin-inserted');
    el.style.cssText = 'position:relative;display:block;margin:12px auto;max-width:200px;height:auto;cursor:move;z-index:99999;';
    const content = document.getElementById('app-content') || document.body;
    content.appendChild(el);
    window.parent.postMessage({ type: 'ADMIN_CHANGE', action: 'insertImage', selector: 'body', property: '__appendHTML', value: el.outerHTML, description: 'Imagen insertada' }, '*');
  }

  if (event.data.type === 'INSERT_FORM_FIELD') {
    const { title, fieldType, placeholder, options } = event.data;
    const ft = fieldType || 'text';
    const w = document.createElement('div'); w.classList.add('admin-inserted');
    w.style.cssText = 'position:relative;margin:12px auto;cursor:move;z-index:99999;width:311px;max-width:90%;';
    let h = '<div style="display:flex;flex-direction:column;gap:8px;">';
    h += `<label style="font-family:'Roboto Condensed',sans-serif;font-size:14px;color:#1B1B1B;">${title||'Campo'}</label>`;
    if (ft === 'select') h += `<div style="position:relative;"><select style="width:100%;height:40px;padding:8px 40px 8px 16px;font-family:'Roboto Condensed',sans-serif;font-size:14px;color:#333;background:#FFF;border:1px solid #999;border-radius:5px;appearance:none;">${(options||['Opción 1']).map(o=>`<option>${o}</option>`).join('')}</select></div>`;
    else if (ft === 'date') h += `<input type="date" style="width:100%;height:40px;padding:8px 16px;font-family:'Roboto Condensed',sans-serif;font-size:14px;color:#333;background:#FFF;border:1px solid #999;border-radius:5px;">`;
    else if (ft === 'toggle') h += `<div style="display:flex;align-items:center;gap:12px;"><div style="width:48px;height:26px;background:#016D38;border-radius:13px;position:relative;"><div style="width:20px;height:20px;background:#fff;border-radius:50%;position:absolute;top:3px;right:3px;box-shadow:0 1px 3px rgba(0,0,0,.2);"></div></div><span style="font-family:'Roboto Condensed',sans-serif;font-size:14px;">Sí</span></div>`;
    else if (ft === 'radio') { h += '<div style="display:flex;flex-direction:column;gap:12px;">'; (options||['Opción 1','Opción 2']).forEach((o,i)=>{ h += `<label style="display:flex;align-items:center;gap:8px;font-family:'Roboto Condensed',sans-serif;font-size:16px;color:#1B1B1B;cursor:pointer;"><div style="width:20px;height:20px;border-radius:50%;border:2px solid #016D38;${i===0?'background:#016D38;':''}"></div>${o}</label>`; }); h += '</div>'; }
    else h += `<input type="text" style="width:100%;height:40px;padding:8px 16px;font-family:'Roboto Condensed',sans-serif;font-size:14px;color:#333;background:#FFF;border:1px solid #999;border-radius:5px;" placeholder="${placeholder||'Ingrese aquí'}">`;
    h += '</div>';
    w.innerHTML = h;
    const content = document.getElementById('app-content') || document.body;
    content.appendChild(w);
    window.parent.postMessage({ type: 'ADMIN_CHANGE', action: 'insertFormField', selector: 'body', property: '__appendHTML', value: w.outerHTML, description: 'Campo: ' + (title||'') }, '*');
  }

  if (event.data.type === 'INSERT_MODAL') {
    const el = document.createElement('div'); el.classList.add('admin-inserted');
    el.style.cssText = 'position:relative;margin:24px auto;width:500px;max-width:90%;background:#fff;border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,.2);padding:32px;cursor:move;z-index:99999;';
    el.innerHTML = '<h3 style="font-family:Roboto Condensed,sans-serif;font-size:20px;color:#016D38;margin-bottom:16px;">Modal Stepper</h3><p style="font-size:14px;color:#666;">Contenido del modal.</p>';
    const content = document.getElementById('app-content') || document.body;
    content.appendChild(el);
    window.parent.postMessage({ type: 'ADMIN_CHANGE', action: 'insertModal', selector: 'body', property: '__appendHTML', value: el.outerHTML, description: 'Modal insertado' }, '*');
  }

  if (event.data.type === 'DELETE_SELECTED') { /* handled by editor-overlay */ }
  if (event.data.type === 'DUPLICATE_SELECTED') { /* handled by editor-overlay */ }
  if (event.data.type === 'APPLY_EFFECT') { /* handled by editor-overlay */ }
  if (event.data.type === 'LAYER_CHANGE') { /* handled by editor-overlay */ }
  if (event.data.type === 'UPDATE_PLACEHOLDER') { try { const w=document.querySelector(event.data.selector); if(w){const i=w.querySelector('input,textarea')||w; if(i.setAttribute) i.setAttribute('placeholder',event.data.value);} } catch{} }
  if (event.data.type === 'UPDATE_LABEL') { try { const w=document.querySelector(event.data.selector); if(w){const l=w.querySelector('label'); if(l) l.textContent=event.data.value;} } catch{} }
  if (event.data.type === 'UPDATE_SELECT_OPTIONS') { try { const w=document.querySelector(event.data.selector); if(w){const s=w.querySelector('select')||w; if(s.tagName==='SELECT') s.innerHTML=event.data.options.map(o=>`<option>${o}</option>`).join('');} } catch{} }
});

// ===== LOAD PROJECT OVERRIDES =====
async function loadProjectOverrides() {
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get('project'); if (!projectId) return;
  try {
    const r = await fetch(`http://localhost:4001/api/projects/${projectId}/overrides`);
    if (!r.ok) return;
    const changes = await r.json();
    if (!Array.isArray(changes) || changes.length === 0) return;
    setTimeout(() => {
      changes.forEach(c => {
        try {
          if (c.property === '__appendHTML') { const t = document.createElement('div'); t.innerHTML = c.value; const el = t.firstElementChild; if (el) { el.classList.add('admin-inserted'); (document.getElementById('app-content') || document.body).appendChild(el); } }
          else if (c.property === '__placeholder') { const w = document.querySelector(c.selector); if (w) { const i = w.querySelector('input,textarea') || w; if (i.setAttribute) i.setAttribute('placeholder', c.value); } }
          else if (c.property === '__label') { const w = document.querySelector(c.selector); if (w) { const l = w.querySelector('label'); if (l) l.textContent = c.value; } }
          else if (c.property === '__multiStyle') { const el = document.querySelector(c.selector); if (el) { try { const styles = JSON.parse(c.value); Object.entries(styles).forEach(([p, v]) => { el.style.setProperty(p, v, 'important'); }); } catch {} } }
          else if (c.property === 'style') { const el = document.querySelector(c.selector); if (el) el.style.cssText = c.value; }
          else { const el = document.querySelector(c.selector); if (el) { if (c.property === 'textContent') el.textContent = c.value; else if (c.property === 'src') el.src = c.value; else el.style.setProperty(camelToKebab(c.property), c.value, 'important'); } }
        } catch {}
      });
    }, 500);
  } catch {}
}

// ===== FLOW CONFIG =====
function applyFlowConfig() {
  if (!window._flowConfig) return;
  const pageStepMap = { home: '0', step1: '1', step2: '2', step3: '3', step4: '4', step5: '5', step6: '6' };
  const params = new URLSearchParams(window.location.search);
  const currentStep = params.get('step') || '0';
  const currentPageId = currentStep === '0' ? 'home' : `step${currentStep}`;
  const targetPageId = window._flowConfig[currentPageId];

  if (targetPageId && targetPageId !== 'none') {
    const targetStep = pageStepMap[targetPageId] || '0';
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
        e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
        window.parent.postMessage({ type: 'FLOW_NAVIGATE', targetPage: targetPageId, targetStep: parseInt(targetStep) + 1 }, '*');
      }
    }, true);
  }
}

// ===== BOOT =====
function boot() { initApp(); const isInAdmin = window.parent !== window; if (!isInAdmin) loadProjectOverrides(); }
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
