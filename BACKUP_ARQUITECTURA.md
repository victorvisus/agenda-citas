# BACKUP - Arquitectura completa de Agenda de Citas

## ⚠️ Este archivo documenta el estado de la aplicación antes de la reversión

**Fecha**: 5 de marzo de 2026  
**Estado**: Versión inicial completamente funcional

---

## 📦 Estado actual de archivos

### `js/app.js` - Lógica de negocio y modelo

```javascript
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
    // ID: YYMMDDHHM (ej: 2603050900)
    const [year, month, day] = fecha.split("-");
    const [hour] = hora.split(":");
    this.id = `${year.slice(-2)}${month}${day}${hour}00`;
    // ... otros atributos
  }
}

const HORARIO_INICIO = 8;
const HORARIO_FIN = 15; // 08:00 - 14:00

const SERVICIOS = [
  "Desarrollo web",
  "Desarrollo Ecommerce (WooCommerce / PrestaShop)",
  "Implementación técnica de diseños",
  "Auditoría web",
  "Optimización y reparación web",
  "Mantenimiento web",
  "Migración web",
  "Configuración de hosting",
];

// Funciones principales:
-guardarCitas() / cargarCitas() - // localStorage
  obtenerHorasDelDia(fecha) -
  obtenerCitasDelDia(fecha) -
  estaHoraOcupada(fecha, hora, (ignoreId = null)) - // Permite ignorar cita durante edición
  agregarCita(cita) -
  editarCita(id, nuevaCita) -
  eliminarCita(id);
```

### `js/dom_constructor.js` - UI e interacciones

- `init()` → `DOMContentLoaded`
- `apointmentCardConstructor()` → Renderiza tarjetas (locked/available)
- `createLockedAppointmentCard(appointment)` → Cita con ID
- `createAvailableAppointmentCard(hora)` → Sin ID
- Modales: `toggleAppointmentDetailsModal()`, `agregarNuevaCita(hora)`, `cerrarModal()`
- Formulario inteligente: Pre-selecciona hora, resetea entre usos
- Eventos: navegación días, edición, eliminación

### `agenda-diaria.html`

- Header con fecha actualizable (`id="fecha-display"`)
- Navegación día a día
- Contenedor de citas dinámico (`id="appointments-day-container-id"`)
- Modal detalles (`id="modal-detalles"`)
- Modal formulario nueva cita (`id="modal-nueva-cita"`)
- Función de inicialización: `<script>window.addEventListener('DOMContentLoaded', init);</script>`

### `css/style.css` - Estilos personalizados

```css
:root {
  --color-negro-carbon: #0e0e11;
  --color-gris-antracita: #1c1e22;
  --color-verde-criptico: #3aff7a;
  --color-blanco-tecnico: #f2f3f5;
  --text-secondary: #94a3b8;
  --surface-hover: #25282e;
  --border-dark: #2d3139;
}

.locked { /* Cita ocupada */
  - Fondo antracita + borde 4px verde
  - Icono verde, texto blanco
  - Botones edit/delete visibles
}

.available { /* Hora libre */
  - Sin fondo, texto gris
  - Botón + visible
}
```

---

## 🎯 Funcionalidades implementadas

✅ CRUD completo de citas  
✅ Validación sin solapamientos (ignorar propia al editar)  
✅ Persistencia localStorage  
✅ Pre-selección de horas en formulario  
✅ Navegación diaria  
✅ Estilos locked/available diferenciados  
✅ ID compacto YYMMDDHHM listo para MongoDB  
✅ Reseteo seguro de formatos

---

## 🔮 Roadmap futuro (mentoría)

**Fase 2: Backend & Database**

- Express/Node.js + MongoDB
- API REST para CRUD
- Autenticación JWT

**Fase 3: Roles & Permisos**

- Profesional (admin): gestión completa
- Artista/Manager: solicitar citas
- Público: ver disponibilidad

**Fase 4: UX mejorada**

- Calendario mensual clickeable
- Notificaciones por email
- Exportación PDF/ICS
- Comisiones automáticas

---

## 💡 Notas de arquitectura

1. **Separación de responsabilidades**:
   - `app.js` = Lógica pura (sin DOM)
   - `dom_constructor.js` = Presentación + eventos

2. **FormData + name attributes**:
   - Cada input tiene `name` para capturar correctamente

3. **ID Strategy**:
   - Generado en constructor (YYMMDDHHM)
   - Solo en `.locked` en DOM
   - Preparado para migrar a MongoDB

4. **Estado global**:
   - Variable `citas[]` en memoria
   - `localStorage` como persistencia
   - `fechaActual` para navegación

---

**Este documento es tu referencia para recuperar la app en cualquier momento.**
