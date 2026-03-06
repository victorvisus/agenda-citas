# Carpeta Exceptions

Excepciones personalizadas para manejar errores de negocio de forma estructurada.

## Archivos

- `BusinessExceptions.js` - Clase BusinessException con códigos y mensajes.

## Uso

```js
import {
  BusinessException,
  ERROR_CODES,
} from "./exceptions/BusinessExceptions.js";
throw new BusinessException(ERROR_CODES.EMAIL_INVALIDO);
```
