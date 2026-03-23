import Utils from '../utils/Utils.js';
/* import {
  validarPassword,
  validarEmail,
  validarUserType,
} from '../utils/validaciones.js'; */
import { Validations } from '../utils/validaciones.js';
import {
  BusinessException,
  ERROR_CODES,
} from '../exceptions/BusinessExceptions.js';

export class User {
  #id;
  #username;
  #password;
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
  constructor(_username, _password, _passwordConf, _email, _usr_type) {
    // Validaciones de los campos
    // Si alguno de los campos está vacío
    if (!_username || !_password || !_email || !_usr_type) {
      throw new BusinessException(ERROR_CODES.CAMPO_VACIO);
    }
    // Si la contraseña coincide con su confirmación
    if (
      Validations.validarPassword(_password, _passwordConf) ===
      'PASSWORD_NO_COINCIDEN'
    )
      throw new BusinessException(ERROR_CODES.PASSWORD_NO_COINCIDEN);

    //Genera un id unico y aleatorio
    this.#id = Utils.generarId();
    this.username = _username;
    this.password = _password; //en el set realiza otras validaciones
    this.email = _email;
    this.usr_type = _usr_type;
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
  set username(_username) {
    this.#username = _username;
  }
  get password() {
    return this.#password;
  }
  set password(_password) {
    if (
      Validations.validarPassword(_password) === 'PASSWORD_LONGITUD_NO_VALIDA'
    ) {
      throw new BusinessException(ERROR_CODES.PASSWORD_LONGITUD_INSUFICIENTE);
    } else if (Validations.validarPassword(_password) === 'PASSWORD_INVALIDO') {
      throw new BusinessException(ERROR_CODES.PASSWORD_INVALIDO);
    }
    this.#password = _password;
  }
  get email() {
    return this.#email;
  }
  set email(_email) {
    // valida que el mail cumpla con el estandar
    if (!Validations.validarEmail(_email))
      throw new BusinessException(ERROR_CODES.EMAIL_INVALIDO);
    this.#email = _email;
  }
  get usr_type() {
    return this.#usr_type;
  }
  set usr_type(_usr_type) {
    //valida que el tipo de usuario coincida con los del sistema
    if (!Validations.validarUserType(_usr_type))
      throw new BusinessException(ERROR_CODES.USR_TYPE_INVALIDO);
    this.#usr_type = _usr_type;
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
