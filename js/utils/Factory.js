import { Cita } from '../models/Cita.js';
import { User } from '../models/User.js';

export class factory {
  static crearCita(
    nombre,
    apellidos,
    telefono,
    email,
    fecha,
    hora,
    servicio,
    anotaciones = '',
  ) {
    return new Cita(id, hora, paciente, telefono, sintomas);
  }
}
