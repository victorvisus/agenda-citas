/**
 * Módulo para manejar excepciones de negocio en la aplicación de agenda de citas.
 * Define una clase BusinessException que extiende Error, con códigos y mensajes personalizados.
 */

/**
 * Códigos de error para validaciones.
 */
export const ERROR_CODES = {
  EMAIL_INVALIDO: "EMAIL_INVALIDO",
  TELEFONO_INVALIDO: "TELEFONO_INVALIDO",
  SERVICIO_INVALIDO: "SERVICIO_INVALIDO",
  ANOTACIONES_LIMITE: "ANOTACIONES_LIMITE",
  FECHA_INVALIDA: "FECHA_INVALIDA",
  HORA_INVALIDA: "HORA_INVALIDA",
  CLIENTE_NOMBRE_VACIO: "CLIENTE_NOMBRE_VACIO",
  CLIENTE_APELLIDOS_VACIOS: "CLIENTE_APELLIDOS_VACIOS",
  PASSWORD_LONGITUD_INSUFICIENTE: "PASSWORD_LONGITUD_INSUFICIENTE",
  PASSWORD_INVALIDO: "PASSWORD_INVALIDO",
  PASSWORD_NO_COINCIDEN: "PASSWORD_NO_COINCIDEN",
  CAMPO_VACIO: "CAMPO_VACIO",
  USR_TYPE_INVALIDO: "USR_TYPE_INVALIDO",
};

/**
 * Clase para excepciones de negocio.
 * Extiende Error y añade un código para identificar el tipo de error.
 */
export class BusinessException extends Error {
  constructor(code, message = null) {
    const defaultMessage = BusinessException.getMessageByCode(code);
    super(message || defaultMessage);
    this.name = "BusinessException";
    this.code = code;
  }

  /**
   * Devuelve un mensaje de error personalizado para el codigo de error proporcionado. Si el código de error no se encuentra en la lista de código de error
   * provisto.
   *
   * @param {string} code - Código de error.
   * @returns {string} - Mensaje de error personalizado.
   */
  static getMessageByCode(code) {
    switch (code) {
      case ERROR_CODES.EMAIL_INVALIDO:
        return "El e-mail no es correcto.";
      case ERROR_CODES.TELEFONO_INVALIDO:
        return "El teléfono no es válido.";
      case ERROR_CODES.SERVICIO_INVALIDO:
        return "El servicio no es válido.";
      case ERROR_CODES.ANOTACIONES_LIMITE:
        return "Las anotaciones no pueden tener más de 200 caracteres.";
      case ERROR_CODES.FECHA_INVALIDA:
        return "La fecha no es válida.";
      case ERROR_CODES.HORA_INVALIDA:
        return "La hora no es válida.";
      case ERROR_CODES.CLIENTE_NOMBRE_VACIO:
        return "El nombre del cliente no puede estar vacío.";
      case ERROR_CODES.CLIENTE_APELLIDOS_VACIOS:
        return "Los apellidos del cliente no pueden estar vacíos.";
      case ERROR_CODES.PASSWORD_LONGITUD_INSUFICIENTE:
        return "La contraseña debe tener al menos 12 caracteres.";
      case ERROR_CODES.PASSWORD_INVALIDO:
        return "La contraseña no es válida.";
      case ERROR_CODES.PASSWORD_NO_COINCIDEN:
        return "Las contraseñas no coinciden.";
      case ERROR_CODES.CAMPO_VACIO:
        return "El campo no puede estar vacío.";
      case ERROR_CODES.USR_TYPE_INVALIDO:
        return "El tipo de usuario no es valido.";
      default:
        return "Error desconocido.";
    }
  }
}
