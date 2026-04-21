export function renderHeader(showBack = false) {
  return `
    <header class="app-header">
      <div class="header-inner">
        ${showBack ? '<a href="#" class="header-back" id="btn-back"><span>&#8249;</span> Volver</a>' : '<div></div>'}
        <div class="header-logo">
          <span class="logo-text">SEGUROS</span>
          <span class="logo-brand">BOLÍVAR</span>
          <span class="logo-icon">🛡️</span>
        </div>
      </div>
    </header>
  `;
}
