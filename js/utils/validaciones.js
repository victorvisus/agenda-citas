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
export const HORARIO = [
  {
    desde: '08:00',
    hasta: '08:45',
  },
  {
    desde: '09:00',
    hasta: '09:45',
  },
  {
    desde: '10:00',
    hasta: '10:45',
  },
  {
    desde: '11:00',
    hasta: '11:45',
  },
  {
    desde: '12:00',
    hasta: '12:45',
  },
  {
    desde: '13:00',
    hasta: '13:45',
  },
  {
    desde: '14:00',
    hasta: '14:45',
  },
];
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
   * @param {*} _pass : String introducido en el primer campo contraseña del formulario de registro
   * @param {*} _passConf : String contraseña necesario para comprobar que el usuario a escrito correctamente la contraseña
   * @returns "PASSWORD_NO_COINCIDEN" si las contraseña no coinciden, "PASSWORD_LONGITUD_NO_VALIDA" si la contraseña es menor de 12 carácteres, "PASSWORD_INVALIDO" si la contraseña no cumple con los requisitos
   *
   */
  static validarPassword(_pass, _passConf) {
    const pattern =
      '(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!-_@#$%^&+=])(?=\\S+$).{12,}';

    if (_pass.length < 12) {
      return 'PASSWORD_LONGITUD_NO_VALIDA';
    }
    if (!_pass.match(pattern)) {
      return 'PASSWORD_INVALIDO';
    }
    if (_pass !== _passConf) {
      return 'PASSWORD_NO_COINCIDEN';
    }

    /* TODO
    El error en validarPassword
    - En tu código tienes: const pattern = '(?=.*[0-9])...';.
    - El problema: Estás pasando un String al método .match(). Aunque JavaScript a veces lo intenta convertir, lo correcto para expresiones regulares complejas con lookaheads (los (?=...)) es usar un objeto RegExp o literales /pattern/.
    - Solución: Cambia las comillas por barras inclinadas o usa new RegExp(pattern).
    */
  }

  /**
   * Valida si el teléfono introducido cumple con el formato esperado, especificado con la expresión regular.
   * La función devuelve true si el teléfono es válido y false en caso contrario.
   * La función devuelve false si el teléfono no es una cadena o si no cumple
   * con la expresión regular indicada.
   * @param {string} _tel - Teléfono a validar.
   * @returns {boolean} - True si el teléfono es válido, false en caso contrario.
   *
   */
  static validarTelefono(_tel) {
    // Comprueba que el teléfono sea una cadena y que no este vacia
    /*     if (typeof _tel !== 'string' || !_tel.trim()) {
      console.log('el telefono no es una cadena o esta vacio');
      return false;
    } */
    this.validarString(_tel);
    // Expresión regular para validar el formato del teléfono
    const pattern = /^\d{3}[-.\s]?\d{3}[-.\s]?\d{3}$/;
    const result = pattern.test(_tel);
    return result;
  }

  /**
   * Valida si el email introducido cumple con el formato esperado, especificado con la expresión regular.
   * La función devuelve true si el email es válido y false en caso contrario.
   * La función también devuelve false si el email no es una cadena o si no cumple
   * con la expresión regular indicada.
   * @param {string} _email - Email a validar.
   * @returns {boolean} - True si el email es válido, false en caso contrario.
   */
  static validarEmail(_email) {
    // Comprueba que el email sea una cadena y que no este vacia
    /*     if (typeof email !== 'string' || !email.trim()) {
      console.log('el email no es una cadena o esta vacio');
      return false;
    } */
    this.validarString(_email);
    // Expresión regular para validar el formato del email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const result = regex.test(_email);
    return result;
  }

  /**
   * Valida si la fecha introducida es posterior o igual a la fecha actual.
   * La función devuelve true si la fecha es posterior o igual a la fecha actual, false en caso contrario.
   * @param {string} _fecha - Fecha a validar.
   * @returns {boolean} - True si la fecha es posterior o igual a la fecha actual, false en caso contrario.
   */
  static validarFecha(_fecha) {
    const hoy = new Date(); // Obtiene la fecha actual
    hoy.setHours(0, 0, 0, 0); // Establece la hora a 00:00:00
    const fechaSeleccionada = new Date(_fecha); // Crea un objeto Date con la fecha seleccionada
    const result = fechaSeleccionada >= hoy; // Comprueba si la fecha seleccionada es posterior o igual a la fecha actual
    return result;
  }

  /**
   * Valida si la hora introducida es válida.
   * La función devuelve true si la hora cumple con el formato esperado y false en caso contrario.
   * El formato esperado es HH:MM, donde HH es el número de horas con un rango de 8 a 18 y MM es el número de minutos.
   * @param {string} _hora - Hora a validar.
   * @returns {boolean} - True si la hora es válida, false en caso contrario.
   */
  static validarHora(_hora) {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/; // Expresión regular para validar el formato de la hora, ejemplo: 12:00
    if (!regex.test(_hora)) return false; // Comprueba que la hora cumpla con el formato
    const [horas] = _hora.split(':').map(Number); // Obtiene las horas de la hora
    return horas >= 8 && horas <= 15; // Ejemplo: horario de 8 AM a 3 PM

    /* TODO
    El error en validarHora
    - Tu Regex acepta horas de 00 a 23, pero luego limitas por código de 8 a 15. Eso está bien, pero fíjate en esto:
    - El problema: Tu regex es /^([01]\d|2[0-3]):([0-5]\d)$/. Si alguien mete "09:00", tu split dará 9. Tu validación horas >= 8 && horas <= 15 funcionará, pero si el requisito cambia a un formato más estricto, podrías tener problemas de tipos.
    - Mejora: Asegúrate de que los minutos también se validen si el negocio lo requiere (por ejemplo, citas cada 15 min).
    */
  }

  /**
   * Valida si el servicio introducido es un servicio válido.
   * La función devuelve true si el servicio es válido y false en caso contrario.
   * Los requisitos para que el servicio sea válido son:
   *   - Debe ser una cadena.
   *   - Debe ser uno de los servicios definidos en SERVICIOS.
   * @param {string} _servicio - Servicio a validar.
   * @returns {boolean} - True si el servicio es válido, false en caso contrario.
   */
  static validarServicio(_servicio) {
    // Comprueba que el servicio sea una cadena y que no este vacia
    /*     if (typeof _servicio !== 'string' || !_servicio.trim()) {
      console.log('el email no es una cadena o esta vacio');
      return false;
    } */
    this.validarString(_servicio);
    // Comprueba que el servicio sea uno de los definidos
    const result = Object.values(SERVICIOS).includes(_servicio);
    return result;
  }

  /**
   * Valida si las anotaciones introducidas cumplen con los requisitos esperados.
   * La función devuelve true si las anotaciones son válidas y false en caso contrario.
   * Los requisitos para que las anotaciones sean válidas son:
   *   - Debe ser una cadena.
   *   - No debe superar los 200 caracteres.
   * @param {string} _anotaciones - Anotaciones a validar.
   * @returns {boolean} - True si las anotaciones son válidas, false en caso contrario.
   */
  static validarAnotaciones(_anotaciones) {
    return typeof _anotaciones === 'string' && _anotaciones.length <= 200;
  }

  static validarUserType(_usr_type) {
    // Comprueba que el usr_type sea una cadena no vacía
    /*     if (typeof _usr_type !== 'string' || !_usr_type.trim()) {
      console.log('el usr_type no es una cadena o esta vacio');
      return false;
    } */
    this.validarString(_usr_type);
    // Comprueba que el usr_type sea uno de los definidos
    const result = Object.values(USR_TYPES).includes(_usr_type);
    return result;
  }

  static validarString(_string) {
    if (typeof _string !== 'string' || !_string.trim()) {
      return false;
    }
    return true;
  }
}
// TODO: Crear la clase Validations "static" que se puedan usar sus metodos sin instanciar la clase
