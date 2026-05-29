export function formatCurrency(value) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value).replace('COP', '$').trim();
}

export function formatDate(dateStr) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  return `${parseInt(d)} de ${months[parseInt(m)-1]} de ${y}`;
}

export function addOneYear(dateStr) {
  if (!dateStr) {
    const now = new Date();
    const future = new Date(now);
    future.setFullYear(future.getFullYear() + 1);
    return future.toISOString().split('T')[0];
  }
  const [y, m, d] = dateStr.split('-');
  return `${parseInt(y)+1}-${m}-${d}`;
}

export function getTodayISO() {
  return new Date().toISOString().split('T')[0];
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePhone(phone) {
  return /^3\d{9}$/.test(phone.replace(/\s/g, ''));
}
