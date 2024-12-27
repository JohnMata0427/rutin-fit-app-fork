export const capitalize = string =>
  string?.charAt(0).toUpperCase() + string?.slice(1);

export const formatDateToEC = date =>
  new Intl.DateTimeFormat('es-EC', { dateStyle: 'long' }).format(date);

export const orderOfDays = [
  'lunes',
  'martes',
  'miercoles',
  'jueves',
  'viernes',
  'sabado',
  'domingo',
];
