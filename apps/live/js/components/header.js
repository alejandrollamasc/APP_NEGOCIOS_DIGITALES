export function renderHeader(showBack = false) {
  return `
    <header class="app-header">
      <div class="header-inner">
        ${showBack ? '<a href="#" class="header-back" id="btn-back"><span>&#8249;</span> Volver</a>' : '<div></div>'}
        <div class="header-logo">
          <img src="/images/logo-seguros-bolivar.png" alt="Seguros Bolívar" class="header-logo-img">
        </div>
      </div>
    </header>
  `;
}
