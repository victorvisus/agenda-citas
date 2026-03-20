import Utils from '../utils/Utils.js';
import {
  validarPassword,
  validarEmail,
  validarUserType,
} from '../utils/validaciones.js';
import {
  BusinessException,
  ERROR_CODES,
} from '../exceptions/BusinessExceptions.js';

export class User {
  #id;
  #username;
  #password;
  #passwordConf;
  #email;
  #usr_type; //falta por implementar

  /**
   * Constructor de la clase User.
   * @param {string} username - Nombre de usuario.
   * @param {string} password - Contraseña del usuario.
   * @param {string} passwordConf - Confirmaci n de la contrase a.
   * @param {string} email - Correo electr nico del usuario.
   * @param {string} usr_type - Tipo de usuario.
   * @throws {BusinessException} - Si el nombre de usuario, la contrase a o el tipo de usuario est n vacios.
   * @throws {BusinessException} - Si la contrase a no coincide con su confirmaci n.
   * @throws {BusinessException} - Si la contrase a no cumple con los requisitos de longitud y contenido.
   * @throws {BusinessException} - Si el correo electr nico no es v lido.
   * @throws {BusinessException} - Si el tipo de usuario no es v lido.
   */
  constructor(username, password, passwordConf, email, usr_type) {
    // Validaciones de los campos
    if (!username || !password || !email || !usr_type) {
      throw new BusinessException(ERROR_CODES.CAMPO_VACIO);
    }
    if (validarPassword(password, passwordConf) === 'PASSWORD_NO_COINCIDEN') {
      throw new BusinessException(ERROR_CODES.PASSWORD_NO_COINCIDEN);
    } else if (
      validarPassword(password, passwordConf) === 'PASSWORD_LONGITUD_NO_VALIDA'
    ) {
      throw new BusinessException(ERROR_CODES.PASSWORD_LONGITUD_INSUFICIENTE);
    } else if (
      validarPassword(password, passwordConf) === 'PASSWORD_INVALIDO'
    ) {
      throw new BusinessException(ERROR_CODES.PASSWORD_INVALIDO);
    }
    if (!validarEmail(email))
      throw new BusinessException(ERROR_CODES.EMAIL_INVALIDO);
    if (!validarUserType(usr_type))
      throw new BusinessException(ERROR_CODES.USR_TYPE_INVALIDO);

    this.#id = Utils.generarId();
    this.username = username;
    this.password = password;
    this.email = email;
    this.usr_type = usr_type;
  }

  // /////////////////////////////////////////////////////// //
  // getters & setters ///////////////////////////////////// //
  // /////////////////////////////////////////////////////// //
  get id() {
    return this.#id;
  }
  get username() {
    return this.#username;
  }
  set username(username) {
    this.#username = username;
  }
  get password() {
    return this.#password;
  }
  set password(password) {
    if (validarPassword(password) === 'PASSWORD_LONGITUD_NO_VALIDA') {
      throw new BusinessException(ERROR_CODES.PASSWORD_LONGITUD_INSUFICIENTE);
    } else if (validarPassword(password) === 'PASSWORD_INVALIDO') {
      throw new BusinessException(ERROR_CODES.PASSWORD_INVALIDO);
    }
    this.#password = password;
  }
  get email() {
    return this.#email;
  }
  set email(email) {
    this.#email = email;
  }
  get usr_type() {
    return this.#usr_type;
  }
  set usr_type(usr_type) {
    this.#usr_type = usr_type;
  }

  toJSON() {
    return {
      id: this.#id,
      username: this.#username,
      password: this.#password,
      email: this.#email,
      usr_type: this.#usr_type,
    };
  }
}
