import {
  BusinessException,
  ERROR_CODES,
} from '../exceptions/BusinessExceptions.js';
import Utils from '../utils/Utils.js';
/* import {
  validarTelefono,
  validarEmail,
  validarServicio,
  validarAnotaciones,
  validarFecha,
  validarHora,
} from '../utils/validaciones.js'; */
import { Validations } from '../utils/Validaciones.js';
/**
 * Clase que representa una cita en la agenda.
 *
 * @description La clase Cita encapsula toda la información relacionada con una cita, incluyendo el nombre, apellidos, teléfono, email, fecha, hora, servicio y anotaciones. Además, genera un identificador único para cada cita basado en la fecha y hora de creación.
 */
export class Cita {
  #id;
  #nombre;
  #apellidos;
  #telefono;
  #email;
  #fecha;
  #hora;
  #servicio;
  #anotaciones;

  constructor(
    _nombre,
    _apellidos,
    _telefono,
    _email,
    _fecha,
    _hora,
    _servicio,
    _anotaciones = '',
  ) {
    // Validaciones de los campos
    if (
      !_nombre ||
      !_apellidos ||
      !_telefono ||
      !_email ||
      !_fecha ||
      !_hora ||
      !_servicio
    )
      throw new BusinessException(ERROR_CODES.CAMPO_VACIO);
    if (!Validations.validarTelefono(_telefono))
      throw new BusinessException(ERROR_CODES.TELEFONO_INVALIDO);
    if (!Validations.validarEmail(_email))
      throw new BusinessException(ERROR_CODES.EMAIL_INVALIDO);
    if (!Validations.validarFecha(_fecha))
      throw new BusinessException(ERROR_CODES.FECHA_INVALIDA);
    if (!Validations.validarHora(_hora))
      throw new BusinessException(ERROR_CODES.HORA_INVALIDA);
    if (!Validations.validarServicio(_servicio))
      throw new BusinessException(ERROR_CODES.SERVICIO_INVALIDO);
    if (!Validations.validarAnotaciones(_anotaciones))
      throw new BusinessException(ERROR_CODES.ANOTACIONES_LIMITE);
    ////////////////////////////////////////

    this.#id = Utils.generarId();
    this.nombre = _nombre;
    this.apellidos = _apellidos;
    this.telefono = _telefono;
    this.email = _email;
    this.fecha = new Date(_fecha); //Convierte string a Date
    this.hora = _hora;
    this.servicio = _servicio;
    this.anotaciones = _anotaciones;
  }

  // Métodos getters para acceder a las propiedades privadas
  get id() {
    return this.#id;
  }
  get nombre() {
    return this.#nombre;
  }
  get apellidos() {
    return this.#apellidos;
  }
  get telefono() {
    return this.#telefono;
  }
  get email() {
    return this.#email;
  }
  get fecha() {
    return this.#fecha;
  }
  get hora() {
    return this.#hora;
  }
  get servicio() {
    return this.#servicio;
  }
  get anotaciones() {
    return this.#anotaciones;
  }

  //Métodos setters para modificar las propiedades privadas
  set nombre(_value) {
    this.#nombre = _value;
  }
  set apellidos(_value) {
    this.#apellidos = _value;
  }
  set telefono(_value) {
    this.#telefono = _value;
  }
  set email(_value) {
    this.#email = _value;
  }
  set fecha(_value) {
    this.#fecha = _value;
  }
  set hora(_value) {
    this.#hora = _value;
  }
  set servicio(_value) {
    this.#servicio = _value;
  }
  set anotaciones(_value) {
    this.#anotaciones = _value;
  }

  /**
   * Devuelve un objeto JSON con todos los datos de la cita.
   * @returns {Object} Un objeto JSON con todos los datos de la cita.
   */
  toJSON() {
    return {
      id: this.#id,
      nombre: this.#nombre,
      apellidos: this.#apellidos,
      telefono: this.#telefono,
      email: this.#email,
      fecha: this.#fecha,
      hora: this.#hora,
      servicio: this.#servicio,
      anotaciones: this.#anotaciones,
    };
  }
  toString() {
    return JSON.stringify(this);
  }
}

/*
Este archivo contendrá solo la clase, nada más.

Instrucciones:
-Archivo nuevo: js/models/Cita.js
-Escribe la clase con:
---- Constructor: recibe nombre_apellidos, email, fecha, hora, servicio, anotaciones (opcional)
---- Propiedades privadas con #: #id, #nombre_apellidos, etc.
---- Getters públicos: para leer (get nombre_apellidos() { return this.#nombre_apellidos; })
---- Método generarId(): que devuelva el formato YYMMDDHHM (como en el backup)
---- Método toJSON(): que devuelva un objeto plano (útil para guardar en localStorage)
---- Export: export class Cita { ... }
*/
