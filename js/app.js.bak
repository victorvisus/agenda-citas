//Poner la fecha del dia en el header de la agenda diaria
let fechaActual = new Date(); //Objeto Date para obtener la fecha actual

/**
 * Muestra la fecha actual en el header de la agenda diaria
 *
 * @description La funcion muestra la fecha actual en el header de la agenda diaria
 * @param {void} sin parametros
 * @returns {void} no devuelve nada
 */
function mostrarFecha() {
  //Opciones para formatear la fecha
  const opciones = {
    weekday: "long", //Día de la semana en formato largo (ejemplo: "Lunes")
    year: "numeric", //Año en formato numérico (ejemplo: "2024")
    month: "long", //Mes en formato largo (ejemplo: "Enero")
    day: "numeric", //Día del mes en formato numérico (ejemplo: "15")
  };
  const texto = fechaActual.toLocaleDateString("es-ES", opciones); //Formatear la fecha según las opciones y el idioma español
  document.getElementById("fecha-display").textContent = texto; //Actualizar el contenido del elemento con id "fecha-display" con la fecha formateada
}

//Agrego funcionalidad a los botones de navegación para cambiar la fecha
document.getElementById("btn-prev-day").addEventListener("click", () => {
  fechaActual.setDate(fechaActual.getDate() - 1); //Restar un día a la fecha actual
  mostrarFecha(); //Actualizar la fecha mostrada en el header
});
document.getElementById("btn-next-day").addEventListener("click", () => {
  fechaActual.setDate(fechaActual.getDate() + 1); //Sumar un día a la fecha actual
  mostrarFecha(); //Actualizar la fecha mostrada en el header
});
