const pesos = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
const fechaCorta = new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium', timeStyle: 'short' });

export const formatearPesos = (valor) => pesos.format(valor);
export const formatearFecha = (iso) => fechaCorta.format(new Date(iso));
