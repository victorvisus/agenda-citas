import Cita from './models/Cita.js';
import User from './models/User.js';
import { initManejoFechas } from './ui/manejo-fechas.js';

initManejoFechas();

console.log('creo dos objetos Cita y User para probar');
const cita = new Cita(
  'Juan',
  'Pérez',
  '123 456 789',
  'victorvxg@gmail.com',
  '2026-04-01',
  '09:00',
  'Desarrollo web',
);
if (cita) console.log(cita.toString());

const user = new User(
  'victorvxg',
  'CP558929v!cho-X',
  'CP558929v!cho-X',
  'victorvxg@gmail.com',
  'Admin',
);
if (user) console.log(user.toString());
