import {
  BusinessException,
  ERROR_CODES,
} from '../exceptions/BusinessExceptions.js';
import { Utils } from '../utils/Utils.js';
import {
  validarTelefono,
  validarEmail,
  validarServicio,
  validarAnotaciones,
  validarFecha,
  validarHora,
} from '../utils/validaciones.js';

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
    nombre,
    apellidos,
    telefono,
    email,
    fecha,
    hora,
    servicio,
    anotaciones = '',
  ) {
    // Validaciones de los campos
    if (
      !nombre ||
      !apellidos ||
      !telefono ||
      !email ||
      !fecha ||
      !hora ||
      !servicio
    )
      throw new BusinessException(ERROR_CODES.CAMPO_VACIO);
    if (!validarTelefono(telefono))
      throw new BusinessException(ERROR_CODES.TELEFONO_INVALIDO);
    if (!validarEmail(email))
      throw new BusinessException(ERROR_CODES.EMAIL_INVALIDO);
    if (!validarFecha(fecha))
      throw new BusinessException(ERROR_CODES.FECHA_INVALIDA);
    if (!validarHora(hora))
      throw new BusinessException(ERROR_CODES.HORA_INVALIDA);
    if (!validarServicio(servicio))
      throw new BusinessException(ERROR_CODES.SERVICIO_INVALIDO);
    if (!validarAnotaciones(anotaciones))
      throw new BusinessException(ERROR_CODES.ANOTACIONES_LIMITE);
    ////////////////////////////////////////

    this.#id = Utils.generarId();
    this.#nombre = nombre;
    this.#apellidos = apellidos;
    this.#telefono = telefono;
    this.#email = email;
    this.#fecha = new Date(fecha); //Convierte string a Date
    this.#hora = hora;
    this.#servicio = servicio;
    this.#anotaciones = anotaciones;
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
  set nombre(value) {
    this.#nombre = value;
  }
  set apellidos(value) {
    this.#apellidos = value;
  }
  set telefono(value) {
    this.#telefono = value;
  }
  set email(value) {
    this.#email = value;
  }
  set fecha(value) {
    this.#fecha = value;
  }
  set hora(value) {
    this.#hora = value;
  }
  set servicio(value) {
    this.#servicio = value;
  }
  set anotaciones(value) {
    this.#anotaciones = value;
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
