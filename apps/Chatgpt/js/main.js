import '@sb/sb-ui-seguros-bolivar-light.min.css';
import '@sb/sb-ui-components.min.js';
import '../css/chatgpt.css';
import './editor-overlay.js';

// ===== PAGES =====
import { renderHome } from './views/home.js';
import { renderCoberturas } from './views/coberturas.js';
import { renderDatosTitular } from './views/datos-titular.js';
import { renderDatosHogar } from './views/datos-hogar.js';
import { renderConfirmar } from './views/confirmar.js';
import { renderFrecuenciaPago } from './views/frecuencia-pago.js';
import { renderBienvenida } from './views/bienvenida.js';

function initApp() {
  const app = document.getElementById('app');
  const params = new URLSearchParams(window.location.search);
  const step = params.get('step');

  app.innerHTML = `<main id="app-content" class="app-main"></main>`;
  const content = document.getElementById('app-content');

  // Route based on step param
  if (step === '6') { renderBienvenida(content); }
  else if (step === '5') { renderFrecuenciaPago(content); }
  else if (step === '4') { renderConfirmar(content); }
  else if (step === '3') { renderDatosHogar(content); }
  else if (step === '2') { renderDatosTitular(content); }
  else if (step === '1') { renderCoberturas(content); }
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

  if (event.data.type === 'RESTORE_SNAPSHOT') {
    const content = document.getElementById('app-content');
    if (content && event.data.html) {
      content.innerHTML = event.data.html;
      content.querySelectorAll('.admin-inserted').forEach(el => { el.style.cursor = 'move'; });
    }
  }

  if (event.data.type === 'ADMIN_OVERRIDE') {
    const { selector, property, value } = event.data;
    try {
      if (property === '__appendHTML') {
        const temp = document.createElement('div');
        temp.innerHTML = value;
        const el = temp.firstElementChild;
        if (el) { el.classList.add('admin-inserted'); (document.getElementById('app-content') || document.body).appendChild(el); }
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
    if (url.toString() === window.location.href) { window.location.reload(); }
    else { window.location.href = url.toString(); }
  }

  if (event.data.type === 'INSERT_TEXT') {
    const { text, fontSize, fontWeight, color, backgroundColor } = event.data;
    const el = document.createElement('div');
    el.textContent = text || 'Nuevo texto';
    el.style.cssText = `position:relative;margin:12px auto;width:fit-content;font-family:'Roboto Condensed',sans-serif;font-size:${fontSize||'16px'};font-weight:${fontWeight||'400'};color:${color||'#1B1B1B'};background:${backgroundColor||'transparent'};padding:8px 12px;cursor:move;z-index:99999;`;
    el.classList.add('admin-inserted');
    (document.getElementById('app-content') || document.body).appendChild(el);
    window.parent.postMessage({ type: 'ADMIN_CHANGE', action: 'insertText', selector: 'body', property: '__appendHTML', value: el.outerHTML, description: 'Texto insertado' }, '*');
  }

  if (event.data.type === 'INSERT_SHAPE') {
    const el = document.createElement('div'); el.classList.add('admin-inserted');
    const s = event.data.shape;
    if (s === 'rect') el.style.cssText = 'position:relative;margin:12px auto;width:200px;height:120px;background:#FFF;border:1px solid #CCC;border-radius:8px;cursor:move;z-index:99999;';
    else if (s === 'circle') el.style.cssText = 'position:relative;margin:12px auto;width:120px;height:120px;background:#FFF;border:1px solid #CCC;border-radius:50%;cursor:move;z-index:99999;';
    else el.style.cssText = 'position:relative;margin:12px auto;width:80%;max-width:600px;height:2px;background:#CCC;cursor:move;z-index:99999;';
    (document.getElementById('app-content') || document.body).appendChild(el);
    window.parent.postMessage({ type: 'ADMIN_CHANGE', action: 'insertShape', selector: 'body', property: '__appendHTML', value: el.outerHTML, description: 'Figura: ' + s }, '*');
  }

  if (event.data.type === 'INSERT_IMAGE') {
    const el = document.createElement('img'); el.src = event.data.src; el.alt = event.data.name || '';
    el.classList.add('admin-inserted');
    el.style.cssText = 'position:relative;display:block;margin:12px auto;max-width:200px;height:auto;cursor:move;z-index:99999;';
    (document.getElementById('app-content') || document.body).appendChild(el);
    window.parent.postMessage({ type: 'ADMIN_CHANGE', action: 'insertImage', selector: 'body', property: '__appendHTML', value: el.outerHTML, description: 'Imagen insertada' }, '*');
  }

  if (event.data.type === 'INSERT_MODAL') {
    const el = document.createElement('div'); el.classList.add('admin-inserted');
    el.style.cssText = 'position:relative;margin:24px auto;width:500px;max-width:90%;background:#fff;border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,.2);padding:32px;cursor:move;z-index:99999;';
    el.innerHTML = '<h3 style="font-size:20px;color:#016D38;margin-bottom:16px;">Modal</h3><p style="font-size:14px;color:#666;">Contenido del modal.</p>';
    (document.getElementById('app-content') || document.body).appendChild(el);
    window.parent.postMessage({ type: 'ADMIN_CHANGE', action: 'insertModal', selector: 'body', property: '__appendHTML', value: el.outerHTML, description: 'Modal insertado' }, '*');
  }
});

// ===== LOAD OVERRIDES =====
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
          else if (c.property === '__multiStyle') { const el = document.querySelector(c.selector); if (el) { try { const styles = JSON.parse(c.value); Object.entries(styles).forEach(([p, v]) => { el.style.setProperty(p, v, 'important'); }); } catch {} } }
          else { const el = document.querySelector(c.selector); if (el) { if (c.property === 'textContent') el.textContent = c.value; else if (c.property === 'src') el.src = c.value; else el.style.setProperty(camelToKebab(c.property), c.value, 'important'); } }
        } catch {}
      });
    }, 500);
  } catch {}
}

// ===== BOOT =====
function boot() { initApp(); const isInAdmin = window.parent !== window; if (!isInAdmin) loadProjectOverrides(); }
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
