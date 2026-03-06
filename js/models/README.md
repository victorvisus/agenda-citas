# Carpeta Models

Contiene las clases que representan los datos del dominio (modelos de negocio).

## Archivos

- `Cita.js` - Clase para representar una cita, con validaciones y métodos.

## Uso

```js
import { Cita } from "./models/Cita.js";
const cita = new Cita(
  "Juan Pérez",
  "666123456",
  "juan@mail.com",
  "2026-03-06",
  "09:00",
  "Desarrollo web",
  "Nota",
);
```
