// /////////////////////////////////////////////////////// //
// Poner la fecha del dia en el header de la agenda diaria //
// /////////////////////////////////////////////////////// //
let fechaActual = new Date(); //Objeto Date para obtener la fecha actual

/**
 * Devuelve la fecha actual en formato "dd-mm-yy".
 * @returns {string} La fecha actual en formato "dd-mm-yy".
 * @example "05-03-22" para la fecha actual del 5 de marzo de 2022.
 */
export function getFechaActual() {
  const dia = String(fechaActual.getDate()).padStart(2, '0');
  const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
  const anio = String(fechaActual.getFullYear()).slice(-2);
  return `${dia}-${mes}-${anio}`;
}

/**
 * Muestra la fecha actual en el header de la agenda diaria
 *
 * @description La funcion muestra la fecha actual en el header de la agenda diaria
 * @param {void} sin parametros
 * @returns {void} no devuelve nada
 */
export function mostrarFecha() {
  //Opciones para formatear la fecha
  const opciones = {
    weekday: 'long', //Día de la semana en formato largo (ejemplo: "Lunes")
    year: 'numeric', //Año en formato numérico (ejemplo: "2024")
    month: 'long', //Mes en formato largo (ejemplo: "Enero")
    day: 'numeric', //Día del mes en formato numérico (ejemplo: "15")
  };
  const texto = fechaActual.toLocaleDateString('es-ES', opciones); //Formatear la fecha según las opciones y el idioma español
  const elemento = document.getElementById('fecha-display');
  if (elemento) {
    elemento.textContent = texto; //Actualizar el contenido del elemento con id "fecha-display" con la fecha formateada
  }
}
export function formatFecha(_fecha) {
  //Opciones para formatear la fecha
  const opciones = {
    weekday: 'long', //Día de la semana en formato largo (ejemplo: "Lunes")
    year: 'numeric', //Año en formato numérico (ejemplo: "2024")
    month: 'long', //Mes en formato largo (ejemplo: "Enero")
    day: 'numeric', //Día del mes en formato numérico (ejemplo: "15")
  };
  const fechaFormateada = _fecha.toLocaleDateString('es-ES', opciones); //Formatear la fecha según las opciones y el idioma español
  return fechaFormateada;
}
/**
 * Resta un día a la fecha actual y muestra la nueva fecha en el header de la agenda diaria.
 *
 * @description La función resta un día a la fecha actual y muestra la nueva fecha en el header de la agenda diaria.
 * @example La fecha actual es el 5 de marzo de 2022, y al ejecutar prevDay(), la fecha actual se establecerá en el 4 de marzo de 2022.
 * @returns {void} no devuelve nada
 */
export function prevDay() {
  fechaActual.setDate(fechaActual.getDate() - 1);
  mostrarFecha();
  //getFechaActual();
}

/**
 * Suma un día a la fecha actual y muestra la nueva fecha en el header de la agenda diaria.
 *
 * @description La función suma un día a la fecha actual y muestra la nueva fecha en el header de la agenda diaria.
 * @example La fecha actual es el 5 de marzo de 2022, y al ejecutar nextDay(), la fecha actual se establecerá en el 6 de marzo de 2022.
 * @returns {void} no devuelve nada
 */
export function nextDay() {
  fechaActual.setDate(fechaActual.getDate() + 1);
  mostrarFecha();
  //getFechaActual();
}

export function initManejoFechas() {
  mostrarFecha(); //Poner la fecha del dia en el header de la agenda diaria
  const btnPrev = document.getElementById('btn-prev-day'); //Botones de navegación
  const btnNext = document.getElementById('btn-next-day');
  //Si existen los botones agrega la funcionalidad
  if (btnPrev) btnPrev.addEventListener('click', prevDay);
  if (btnNext) btnNext.addEventListener('click', nextDay);
}
