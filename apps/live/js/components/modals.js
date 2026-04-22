// ===== CONFIRM RESTART MODAL =====
export function showRestartModal() {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal-card">
        <div class="modal-icon">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <path d="M32 4C16.5 4 4 16.5 4 32s12.5 28 28 28 28-12.5 28-28S47.5 4 32 4z" stroke="#E8C916" stroke-width="3" fill="none"/>
            <path d="M32 18v18" stroke="#E8C916" stroke-width="3" stroke-linecap="round"/>
            <circle cx="32" cy="44" r="2.5" fill="#E8C916"/>
          </svg>
        </div>
        <h2 class="modal-title">¿Está seguro que desea regresar al inicio?</h2>
        <p class="modal-text">Perderá toda la información guardada hasta el momento.</p>
        <div class="modal-actions">
          <button class="modal-btn modal-btn--primary" id="modal-yes">Sí</button>
          <button class="modal-btn modal-btn--secondary" id="modal-no">No, retomar</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    // Trigger animation
    requestAnimationFrame(() => overlay.classList.add('show'));

    document.getElementById('modal-yes').addEventListener('click', () => {
      overlay.classList.remove('show');
      setTimeout(() => { overlay.remove(); resolve(true); }, 200);
    });
    document.getElementById('modal-no').addEventListener('click', () => {
      overlay.classList.remove('show');
      setTimeout(() => { overlay.remove(); resolve(false); }, 200);
    });
  });
}

// ===== LOADING MODAL =====
export function showLoadingModal(title = 'Estamos validando su información...', subtitle = 'Ya casi está listo') {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'loading-modal';
    overlay.innerHTML = `
      <div class="modal-card modal-card--loading">
        <div class="loading-shield">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <path d="M28 4C14 4 6 10 6 14v14c0 14 10 20 22 24 12-4 22-10 22-24V14c0-4-8-10-22-10z" stroke="#0a6741" stroke-width="2.5" fill="none"/>
            <path d="M20 28c2 2 4 4 6 6l10-12" stroke="#0a6741" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            <path d="M38 18c2 2 4 2 6 0" stroke="#E8C916" stroke-width="2.5" stroke-linecap="round" fill="none"/>
          </svg>
        </div>
        <h2 class="loading-title">${title}</h2>
        <p class="loading-subtitle">${subtitle}</p>
        <div class="loading-spinner">
          <svg width="40" height="40" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="16" stroke="#e0e0e0" stroke-width="3" fill="none"/>
            <circle cx="20" cy="20" r="16" stroke="#0a6741" stroke-width="3" fill="none" 
                    stroke-dasharray="80" stroke-dashoffset="60" stroke-linecap="round"
                    class="spinner-arc"/>
          </svg>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('show'));

    setTimeout(() => {
      overlay.classList.remove('show');
      setTimeout(() => { overlay.remove(); resolve(); }, 200);
    }, 3000);
  });
}
