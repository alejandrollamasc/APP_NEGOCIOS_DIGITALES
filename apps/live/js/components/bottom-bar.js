export function renderBottomBar(buttonText = 'Continuar', buttonId = 'btn-bottom-continue', disabled = false) {
  return `
    <div class="bottom-bar">
      <button class="bottom-bar__btn" id="${buttonId}" ${disabled ? 'disabled' : ''}>${buttonText}</button>
    </div>
  `;
}
