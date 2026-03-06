import { Cita } from "./models/Cita.js";
import { User } from "./models/User.js";

const cita = new Cita(
  "Juan",
  "Pérez",
  "123 456 789",
  "victorvxg@gmail.com",
  "2026-04-01",
  "09:00",
  "Desarrollo web",
);
console.log(cita.nombre); // Juan
console.log(cita.toJSON());

const user = new User(
  "victorvxg",
  "CP558929v!ch0-X",
  "CP558929v!ch0-X",
  "victorvxg@gmail.com",
  "Admin",
);
console.log(user.toJSON());
