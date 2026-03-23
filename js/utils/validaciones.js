/**
 * Módulo de validaciones.
 * Contiene funciones reutilizables para validar datos de entrada.
 * @module utils/validaciones
 */

/**
 * Objeto que contiene los servicios disponibles.
 */
export const SERVICIOS = {
  DESARROLLO_WEB: 'Desarrollo web',
  DESARROLLO_ECOMMERCE: 'Desarrollo Ecommerce',
  IMPLEMENTACION_TECNICA_DE_DISENOS: 'Implementación técnica de diseños',
  AUDITORIA_WEB: 'Auditoría web',
  OPTIMIZACION_Y_REPARACION_WEB: 'Optimización y reparación web',
  MANTENIMIENTO_WEB: 'Mantenimiento web',
  MIGRACION_WEB: 'Migración web',
  MIGRACION_CORREO: 'Migración correo',
  CONFIGURACION_DE_HOSTING: 'Configuración de hosting',
};

/**
 *  Objeto que contiene los tipos de usuario disponibles.
 */
export const USR_TYPES = {
  CLIENTE: 'Cliente',
  EMPLEADO: 'Empleado',
  ADMIN: 'Admin',
};
/*
(?=.*[0-9]) un dígito debe aparecer al menos una vez
(?=.*[a-z]) una letra minúscula debe aparecer al menos una vez
(?=.*[A-Z]) una letra mayúscula debe aparecer al menos una vez
(?=.*[!-_@#$%^&+=]) un carácter especial debe aparecer al menos una vez
(?=\\S+$) no se permiten espacios en blanco en toda la cadena
.{8,} Al menos 8 carácteres
*/
export class Validations {
  /**
   * Valida si la contraseña introducida cumple con el formato esperado.
   *
   * @param {*} pass : String introducido en el primer campo contraseña del formulario de registro
   * @param {*} passConf : String contraseña necesario para comprobar que el usuario a escrito correctamente la contraseña
   * @returns "PASSWORD_NO_COINCIDEN" si las contraseña no coinciden, "PASSWORD_LONGITUD_NO_VALIDA" si la contraseña es menor de 12 carácteres, "PASSWORD_INVALIDO" si la contraseña no cumple con los requisitos
   *
   */
  static validarPassword(pass, passConf) {
    const pattern =
      '(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!-_@#$%^&+=])(?=\\S+$).{12,}';

    if (pass.length < 12) {
      return 'PASSWORD_LONGITUD_NO_VALIDA';
    }
    if (!pass.match(pattern)) {
      return 'PASSWORD_INVALIDO';
    }
    if (pass !== passConf) {
      return 'PASSWORD_NO_COINCIDEN';
    }
  }

  /**
   * Valida si el teléfono introducido cumple con el formato esperado, especificado con la expresión regular.
   * La función devuelve true si el teléfono es válido y false en caso contrario.
   * La función devuelve false si el teléfono no es una cadena o si no cumple
   * con la expresión regular indicada.
   * @param {string} tel - Teléfono a validar.
   * @returns {boolean} - True si el teléfono es válido, false en caso contrario.
   *
   */
  static validarTelefono(tel) {
    // Comprueba que el teléfono sea una cadena
    if (typeof tel !== 'string' || !tel.trim()) {
      console.log('el telefono no es una cadena o esta vacio');
      return false;
    }
    // Expresión regular para validar el formato del teléfono
    const pattern = /^\d{3}[-.\s]?\d{3}[-.\s]?\d{3}$/;
    const result = pattern.test(tel);
    console.log('Regex test result:', result, 'para', tel.trim());
    return result;
  }

  /**
   * Valida si el email introducido cumple con el formato esperado, especificado con la expresión regular.
   * La función devuelve true si el email es válido y false en caso contrario.
   * La función también devuelve false si el email no es una cadena o si no cumple
   * con la expresión regular indicada.
   * @param {string} email - Email a validar.
   * @returns {boolean} - True si el email es válido, false en caso contrario.
   */
  static validarEmail(email) {
    // Comprueba que el email sea una cadena
    if (typeof email !== 'string' || !email.trim()) {
      console.log('el email no es una cadena o esta vacio');
      return false;
    }
    // Expresión regular para validar el formato del email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const result = regex.test(email);
    console.log('Regex test result:', result, 'para', email.trim());
    return result;
  }

  /**
   * Valida si la fecha introducida es posterior o igual a la fecha actual.
   * La función devuelve true si la fecha es posterior o igual a la fecha actual, false en caso contrario.
   * @param {string} fecha - Fecha a validar.
   * @returns {boolean} - True si la fecha es posterior o igual a la fecha actual, false en caso contrario.
   */
  static validarFecha(fecha) {
    const hoy = new Date(); // Obtiene la fecha actual
    hoy.setHours(0, 0, 0, 0); // Establece la hora a 00:00:00
    const fechaSeleccionada = new Date(fecha); // Crea un objeto Date con la fecha seleccionada
    const result = fechaSeleccionada >= hoy; // Comprueba si la fecha seleccionada es posterior o igual a la fecha actual
    console.log('Regex test result:', result, 'para', fechaSeleccionada);
    return result;
  }

  /**
   * Valida si la hora introducida es válida.
   * La función devuelve true si la hora cumple con el formato esperado y false en caso contrario.
   * El formato esperado es HH:MM, donde HH es el número de horas con un rango de 8 a 18 y MM es el número de minutos.
   * @param {string} hora - Hora a validar.
   * @returns {boolean} - True si la hora es válida, false en caso contrario.
   */
  static validarHora(hora) {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/; // Expresión regular para validar el formato de la hora, ejemplo: 12:00
    if (!regex.test(hora)) return false; // Comprueba que la hora cumpla con el formato
    const [horas] = hora.split(':').map(Number); // Obtiene las horas de la hora
    return horas >= 8 && horas <= 15; // Ejemplo: horario de 8 AM a 3 PM
  }

  /**
   * Valida si el servicio introducido es un servicio válido.
   * La función devuelve true si el servicio es válido y false en caso contrario.
   * Los requisitos para que el servicio sea válido son:
   *   - Debe ser una cadena.
   *   - Debe ser uno de los servicios definidos en SERVICIOS.
   * @param {string} servicio - Servicio a validar.
   * @returns {boolean} - True si el servicio es válido, false en caso contrario.
   */
  static validarServicio(servicio) {
    // Comprueba que el servicio sea una cadena no vacía
    if (typeof servicio !== 'string' || !servicio.trim()) {
      console.log('el email no es una cadena o esta vacio');
      return false;
    }
    // Comprueba que el servicio sea uno de los definidos
    const result = Object.values(SERVICIOS).includes(servicio);
    console.log('Regex test result:', result, 'para', servicio.trim());
    return result;
  }

  /**
   * Valida si las anotaciones introducidas cumplen con los requisitos esperados.
   * La función devuelve true si las anotaciones son válidas y false en caso contrario.
   * Los requisitos para que las anotaciones sean válidas son:
   *   - Debe ser una cadena.
   *   - No debe superar los 200 caracteres.
   * @param {string} anotaciones - Anotaciones a validar.
   * @returns {boolean} - True si las anotaciones son válidas, false en caso contrario.
   */
  static validarAnotaciones(anotaciones) {
    return typeof anotaciones === 'string' && anotaciones.length <= 200;
  }

  static validarUserType(usr_type) {
    // Comprueba que el usr_type sea una cadena no vacía
    if (typeof usr_type !== 'string' || !usr_type.trim()) {
      console.log('el usr_type no es una cadena o esta vacio');
      return false;
    }
    // Comprueba que el usr_type sea uno de los definidos
    const result = Object.values(USR_TYPES).includes(usr_type);
    console.log('test result:', result, 'para', usr_type.trim());
    return result;
  }
}
// TODO: Crear la clase Validations "static" que se puedan usar sus metodos sin instanciar la clase
