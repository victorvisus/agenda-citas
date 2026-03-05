# Agenda de Citas - Cypherstudios

Este proyecto es una agenda de citas sencilla implementada con HTML, CSS y JavaScript puro. Está orientada para un estudio de desarrollo que trabaja en un horario de 08:00 a 14:00 y permite gestionar visitas, servicios y anotaciones con almacenamiento en `localStorage`.

---

## 💡 Objetivo

Crear una aplicación SPA ligera donde un profesional (o su asistente) pueda:

- Ver las horas del día y su estado (disponible/ocupado).
- Añadir, editar y eliminar citas.
- Validar solapamientos en tiempo real.
- Persistir datos localmente en el navegador.

La interfaz se adapta a futuro para ser pública/semiprivada y migrar a un backend (MongoDB o similar).

---

## 📋 Modelo de datos

```js
class Cita {
  constructor(
    nombre_apellidos,
    telefono,
    email,
    fecha,
    hora,
    servicio,
    anotaciones = "",
  ) {
    // Formato ID: YYMMDDHHM (ej: 2603050900 para 2026-03-05 09:00)
    const [year, month, day] = fecha.split("-");
    const [hour] = hora.split(":");
    this.id = `${year.slice(-2)}${month}${day}${hour}00`;
    this.nombre_apellidos = nombre_apellidos;
    this.telefono = telefono;
    this.email = email;
    this.fecha = fecha; // YYYY-MM-DD
    this.hora = hora; // HH:MM (solo horas enteras)
    this.servicio = servicio;
    this.anotaciones = anotaciones;
  }
}
```

**ID:** Formato compacto `YYMMDDHHM` sin caracteres especiales (ej: `2603050900`).

- Solo se asigna a citas creadas (`.locked`).
- Las horas disponibles (`.available`) no tienen ID en el DOM.
- Ideal para migración futura a MongoDB.

Campos obligatorios: `nombre_apellidos`, `email`, `fecha`, `hora`, `servicio`.

Los servicios son un array constante (`SERVICIOS`) que incluye:

- Desarrollo web
- Desarrollo Ecommerce (WooCommerce / PrestaShop)
- Implementación técnica de diseños
- Auditoría web
- Optimización y reparación web
- Mantenimiento web
- Migración web
- Configuración de hosting

---

## 🛠 Lógica de negocio

- Horario fijo: 08:00–14:00 (valores en constantes `HORARIO_INICIO`/`HORARIO_FIN`).
- Citas de 1 hora, sin solapamientos.
- Generación dinámica de horas y estados mediante funciones reusables.
- Identificación única de cada cita mediante `fecha-hora`.
- Validación de solapamientos en momento de guardar (`agregarCita`/`editarCita`), permitiendo además ignorar la propia cita cuando se edita para que no bloquee su hora actual.

Funciones clave:

```js
obtenerHorasDelDia(fecha);
obtenerCitasDelDia(fecha);
estaHoraOcupada(fecha, hora, ignoreId);
agregarCita(cita);
editarCita(id, nuevaCita);
eliminarCita(id);
```

PERSISTENCIA: utiliza `localStorage` (carga/guardado automático). Se soporta migración desde formato anterior.

---

## 🎨 Sistema de estilos

Los estilos utilizan **Tailwind CSS** como base y variables CSS personalizadas definidas en `:root`:

```css
--color-negro-carbon: #0e0e11;
--color-gris-antracita: #1c1e22;
--color-verde-criptico: #3aff7a;
--color-blanco-tecnico: #f2f3f5;
--text-secondary: #94a3b8;
--surface-hover: #25282e;
--border-dark: #2d3139;
```

**Clases de tarjetas de citas:**

- `.locked`: cita confirmada con diseño destacado (fondo, borde verde, iconos verdes).
- `.available`: hora libre con diseño sutil (sin fondo, texto gris).

Todos los colores son editables a través de las variables CSS, lo que permite cambios globales sin modificar selectores.

---

## 🧩 Estructura de archivos

```
agenda-diaria.html   # Página principal de la agenda
css/
  style.css          # Estilos con Tailwind y personalizados
js/
  app.js             # Modelo, estado y lógica de negocio
  dom_constructor.js # Interacción DOM y UI
```

---

## ⚙️ Comportamiento de la UI

1. **Carga inicial**: `init()` se lanza en el evento `DOMContentLoaded`.
2. **Vista diaria**: muestra tarjetas hora a hora. Cada tarjeta recibe una clase CSS según su estado:
   - **`.locked`** (Cita ocupada):
     - Fondo gris antracita con borde izquierdo verde de 4px.
     - Icono de hora en verde brillante.
     - Nombre del cliente en blanco.
     - **Tiene atributo `id`** con el valor compacto (ej: `2603050900`).
     - Botones de **editar** y **eliminar** visibles.
   - **`.available`** (Hora disponible):
     - Sin fondo destacado, texto gris.
     - Icono de hora en gris.
     - Texto "Espacio disponible".
     - **Sin atributo `id`**.
     - Botón de **añadir** (`+`) visible.
3. **Calendario simple**: navegación día a día con botones `Anterior` y `Siguiente`.
4. **Formularios**:
   - Añadir/editar comparten el mismo modal.
   - **Pre-selección de hora**: Al hacer clic en `+` o en el botón "Añadir Cita" del modal, la hora de esa tarjeta se pre-rellena automáticamente en el formulario.
   - El selector de horas se regenera y muestra solo las horas libres (excepto la actual si se está editando).
   - Al editar una cita, el formulario se inicializa con los datos actuales y **permite mantener la hora original o cambiarla**.
   - El formulario se resetea entre usos para evitar conflictos de datos.
5. **Modales**: destapados/ocultados con funciones `toggleAppointmentDetailsModal`, `agregarNuevaCita`, `cerrarModal()`.
6. **Validación**: bloquea solapamientos al crear; al editar, ignora la propia cita para no bloquear su hora actual.

---

## 🚀 Uso

1. Abrir `agenda-diaria.html` en un navegador moderno.
2. Añadir una cita pulsando una hora libre o el botón "Nueva Cita".
3. Navegar entre días con los iconos.
4. Editar o eliminar citas desde sus tarjetas.
5. Los datos se guardan automáticamente en `localStorage`.

> Si realizas cambios en la estructura de datos o necesitas limpiar el estado, abre la consola y ejecuta: `localStorage.removeItem('citas');`.

---

## 📌 Consideraciones futuras

- Migrar almacenamiento a servidor (MongoDB, Firebase, etc.).
- Añadir autenticación para usuarios público/semi‑privado.
- Calendaario mensual con eventos clicables.
- Gestión de roles: profesional, artista, promotor.
- Cálculos de comisiones e ingresos.
- Exportar/impresión de agenda diaria.

---

## 📝 Notas de desarrollo

- El código JS está en módulos lógicos: `app.js` contiene el modelo y lógica de negocio, `dom_constructor.js` maneja la UI y eventos.
- Se pueden extraer a ES modules cuando se agregue un bundler.
- No se usa framework; la simplicidad facilita portabilidad a otros contextos.
- Tailwind gestiona estilos, las variables CSS permiten personalización sin tocar selectores.
- **Formularios**: usan `FormData` con atributos `name` en cada control para captura correcta de datos. Se resetean entre usos (`form.reset()`).
- **IDs de citas**: formato compacto `YYMMDDHHM` generado en el constructor de `Cita`. Solo asignados a elementos `.locked` en el DOM.
- **Pre-selección de horas**: `agregarNuevaCita(hora)` recibe la hora como parámetro, genera opciones y pre-selecciona. Se llama desde botones `+` o desde el modal de detalles.
- **Edición mejorada**: `openEditCitaUI()` marca el formulario como en edición **antes** de generar opciones, permitiendo que `generarOpcionesHora()` use `ignoreId` correctamente.
- La función `estaHoraOcupada()` soporta un parámetro opcional `ignoreId` para permitir editar citas sin bloquear su hora actual.
- Los datos se cargan desde `localStorage` con soporte al formato anterior de citas.

---

## 🛠️ Para desarrolladores

1. **Clonar o abrir** el repositorio en VS Code.
2. **Sin dependencias npm**: basta con abrir `agenda-diaria.html` en el navegador.
3. **Depuración**: usar la consola del navegador; las funciones están en ámbito global.
4. **Limpiar datos**: ejecutar en consola `localStorage.removeItem('citas');` para resetear el almacenamiento.
5. **Personalizar colores**: modificar las variables CSS en `style.css` sección `:root`.
6. **Agregar cambios**: todos los archivos están en la estructura, si añades nuevos actualiza este `README.md`.

**Archivos principales:**

- `agenda-diaria.html`: estructura HTML y modales.
- `js/app.js`: clase `Cita`, funciones de lógica de negocio, persistencia.
- `js/dom_constructor.js`: renderizado de tarjetas, manejadores de eventos, UI.
- `css/style.css`: estilos personalizados, clases `.locked` y `.available`, variables CSS.

**Flujo de una cita:**

1. Usuario interactúa (clic en hora, botón Nueva, etc.).
2. `dom_constructor.js` captura el evento y abre modales.
3. Formulario recoge datos con `FormData` (requiere `name` en controles).
4. `app.js` valida e inserta/edita/elimina en `citas[]`.
5. `guardarCitas()` persiste en `localStorage`.
6. `apointmentCardConstructor()` redibuja la UI con los cambios.

---

¡Listo! La agenda está lista para produção. Se puede ampliar con backend, autenticación y roles en fases futuras. Para dudas o mejoras, revisa las secciones de "Consideraciones futuras" y "Para desarrolladores". 🚀
