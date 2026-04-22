import { store } from '../store.js';
import { navigate } from '../router.js';
import { DOCUMENT_TYPES } from '../data/plans.js';

export function renderStep3(container) {
  const holder = store.get('holder');

  container.innerHTML = `
    <div class="step-page">
      <h1 class="step-title">👤 Datos del titular <span class="info-icon">ℹ️</span></h1>

      <div class="accordion-section">
        <div class="accordion-header active" id="acc-basic-header">
          <span class="accordion-title">Datos básicos</span>
          <span class="accordion-arrow">&#8963;</span>
        </div>
        <div class="accordion-body show" id="acc-basic-body">
          <form id="holder-form" novalidate>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="doc-type">Tipo de documento</label>
                <select id="doc-type" class="sb-ui-input sb-ui-select">
                  <option value="">Seleccione una opción</option>
                  ${DOCUMENT_TYPES.map(d => `<option value="${d}" ${holder.documentType === d ? 'selected' : ''}>${d}</option>`).join('')}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" for="doc-number">Número de documento</label>
                <input type="text" id="doc-number" class="sb-ui-input" placeholder="Ej: 1111111111" value="${holder.documentNumber}">
              </div>
            </div>
            <div class="form-group">
              <label class="form-label" for="doc-expedition">Fecha de expedición del documento</label>
              <input type="date" id="doc-expedition" class="sb-ui-input" placeholder="DD/MM/AAAA" value="${holder.expeditionDate}">
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="first-name">Primer Nombre</label>
                <input type="text" id="first-name" class="sb-ui-input" placeholder="Ej: Simón" value="${holder.firstName}">
              </div>
              <div class="form-group">
                <label class="form-label" for="second-name">Segundo Nombre</label>
                <input type="text" id="second-name" class="sb-ui-input" placeholder="Ej: Andrés" value="${holder.secondName}">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="first-lastname">Primer Apellido</label>
                <input type="text" id="first-lastname" class="sb-ui-input" placeholder="Ej: Bolívar" value="${holder.firstLastName}">
              </div>
              <div class="form-group">
                <label class="form-label" for="second-lastname">Segundo Apellido</label>
                <input type="text" id="second-lastname" class="sb-ui-input" placeholder="Ej: Libertad" value="${holder.secondLastName}">
              </div>
            </div>
            <div class="form-group">
              <label class="form-label" for="holder-phone">Número de celular</label>
              <input type="tel" id="holder-phone" class="sb-ui-input" placeholder="3006315439" value="${holder.phone}" maxlength="10">
            </div>

            <div class="identity-alert">
              <span>🔒 Validaremos su identidad para continuar de forma segura. Así garantizamos que su información esté protegida en todo momento.</span>
            </div>
          </form>
        </div>
      </div>

      <div class="bottom-bar">
        <button class="bottom-bar__btn" id="btn-holder-continue">Continuar</button>
      </div>
    </div>
  `;

  // Accordion toggle
  document.getElementById('acc-basic-header').addEventListener('click', () => {
    const header = document.getElementById('acc-basic-header');
    const body = document.getElementById('acc-basic-body');
    header.classList.toggle('active');
    body.classList.toggle('show');
  });

  // Form submit via bottom bar
  document.getElementById('btn-holder-continue').addEventListener('click', () => {
    const form = document.getElementById('holder-form');
    form.requestSubmit();
  });

  document.getElementById('holder-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
      documentType: document.getElementById('doc-type').value,
      documentNumber: document.getElementById('doc-number').value.trim(),
      expeditionDate: document.getElementById('doc-expedition').value,
      firstName: document.getElementById('first-name').value.trim(),
      secondName: document.getElementById('second-name').value.trim(),
      firstLastName: document.getElementById('first-lastname').value.trim(),
      secondLastName: document.getElementById('second-lastname').value.trim(),
      phone: document.getElementById('holder-phone').value.trim()
    };

    let valid = true;
    document.querySelectorAll('.field-error').forEach(el => el.remove());
    document.querySelectorAll('.sb-ui-input--error').forEach(el => el.classList.remove('sb-ui-input--error'));

    if (!data.documentType) { markError('doc-type', 'Seleccione tipo de documento'); valid = false; }
    if (!data.documentNumber) { markError('doc-number', 'Ingrese número de documento'); valid = false; }
    if (!data.firstName) { markError('first-name', 'Ingrese su primer nombre'); valid = false; }
    if (!data.firstLastName) { markError('first-lastname', 'Ingrese su primer apellido'); valid = false; }
    if (!data.phone) { markError('holder-phone', 'Ingrese su número de celular'); valid = false; }

    if (!valid) return;

    store.update('holder', data);
    store.completeStep(3);
    navigate(4);
  });
}

function markError(id, msg) {
  const el = document.getElementById(id);
  el.classList.add('sb-ui-input--error');
  const err = document.createElement('span');
  err.className = 'field-error';
  err.textContent = msg;
  el.parentNode.appendChild(err);
}
