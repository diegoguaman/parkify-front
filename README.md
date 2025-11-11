# 🚗 ParkiFy – Frontend

Aplicación web para encontrar y reservar plazas de estacionamiento en tiempo real.

## 🎉 ¡Migración Completada a Stack 100% Gratuito!

Este proyecto ahora usa **Leaflet + OpenStreetMap** en lugar de Google Maps, lo que significa:
- ✅ **100% Gratuito** - Sin costos ni límites
- ✅ **Sin API Keys** - No requiere configuración de servicios de pago
- ✅ **Sin tarjeta de crédito** - Nunca te pedirá una
- ✅ **Open Source** - Total libertad de uso

📖 **Ver [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)** para detalles técnicos de la migración.

## 🛠️ Tecnologías Principales

- **React** + **Vite** - Framework frontend moderno y rápido
- **TypeScript** - Tipado estático para código más seguro
- **Leaflet** + **OpenStreetMap** - Mapas interactivos gratuitos
- **Nominatim** - Autocompletado de direcciones sin API key
- **Zustand** - Gestión de estado global simple y eficiente
- **Material UI** - Componentes de interfaz modernos
- **React Hook Form** - Formularios con validación
- **Axios** - Cliente HTTP para comunicación con el backend
- **Socket.IO** - Comunicación en tiempo real (WebSockets)

---

## 🚀 Inicio Rápido

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/parkify-front.git
cd parkify-front
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

**⚠️ IMPORTANTE:** El proyecto requiere variables de entorno para funcionar.

```bash
# En Windows:
copy env.template .env

# En Linux/Mac:
cp env.template .env
```

Luego edita el archivo `.env` y configura:

```env
# URL de tu backend en Render (o localhost para desarrollo)
VITE_API_URL=https://tu-backend.onrender.com/api

# URL de WebSocket (misma URL pero sin /api)
VITE_WEBSOCKET_URL=https://tu-backend.onrender.com

# Modo de router (hash o browser)
VITE_ROUTER_MODE=hash

# Cloudinary (opcional, solo si vas a subir imágenes)
VITE_CLOUDINARY_URL=https://api.cloudinary.com/v1_1/TU_CLOUD_NAME/image/upload
VITE_CLOUDINARY_UPLOAD_PRESET=tu_upload_preset
```

📖 **Ver [env.template](./env.template)** para más detalles sobre cada variable.

### 4. Ejecutar el proyecto

```bash
npm run dev
```

Abre `http://localhost:5173` en el navegador para ver la app en desarrollo.

## 📦 Scripts Disponibles

```bash
npm run dev      # Inicia servidor de desarrollo
npm run build    # Construye para producción
npm run preview  # Previsualiza build de producción
npm run lint     # Ejecuta linter
```

---

## 🗺️ Datos de Muestra - Madrid

El proyecto incluye datos de **5 estacionamientos en Madrid** listos para cargar:

- **Parking Plaza Mayor** - Centro histórico
- **Parking Retiro** - Junto al Parque del Retiro
- **Parking Puerta del Sol** - El punto más céntrico
- **Parking Gran Vía** - Zona comercial
- **Parking Santiago Bernabéu** - Junto al estadio

### 📋 Cómo cargar los datos

Ver la guía completa: **[CARGA_DATOS_MADRID.md](./CARGA_DATOS_MADRID.md)**

**Opción rápida:** Usa la interfaz web después de iniciar sesión para crear cada parking manualmente.

---

## 🛠️ Cómo empezar a trabajar (Desarrollo en equipo)

### 1. Crear tu rama desde una issue

1. Ve a la pestaña **Projects** en GitHub.
2. Busca tu **issue asignada**.
3. Crea tu rama a partir del nombre de la issue:
   ```bash
   git checkout -b feature/nombre-de-la-tarea
   ```

---

## 📁 Estructura del proyecto

```bash
src/
├── app/              # Configuración de rutas y estado global (router.tsx, store.ts)
├── features/         # Módulos principales (auth, parkings, bookings, map)
│   └── [modulo]/     
│       ├── pages/        # Vistas completas que se mapean con rutas
│       ├── components/   # Componentes reutilizables solo dentro del módulo
│       └── services/     # Llamadas a API, React Query hooks
├── layouts/          # Layouts generales como PublicLayout (Header/Footer persistentes)
├── shared/           
│   ├── ui/           # Componentes reutilizables globales (Botón, Input, Header, Footer)
│   ├── hooks/        # Custom hooks genéricos (useToggle, useDebounce...)
│   ├── types/        # Tipos TypeScript globales (User, Parking, etc.)
│   └── utils/        # Funciones auxiliares (validaciones, formateo de fechas...)
```

---

## ✅ Recuerda

- Cada funcionalidad va dentro de su carpeta en `features/`
- Usa los archivos de ejemplo ya creados para `HomePage`
- Los componentes comunes van en `shared/ui/`
- Si creas lógica compartida, usa `shared/hooks` o `shared/utils`

🚀 Notificaciones con Toast
El proyecto utiliza react-toastify para mostrar notificaciones visuales al usuario. Ya está configurado globalmente y listo para usarse desde cualquier parte de la aplicación.

✅ Cómo usar los toast
Importa los helpers desde shared/ui/toast.ts:

```bash
import { showSuccess, showError, showInfo, showWarning } from '@/shared/ui/toast';
```
```bash
import { showSuccess, showError } from '@/shared/ui/toast';

const handleSubmit = async () => {
  try {
    await registerUser();
    showSuccess('Registro completado');
  } catch (err) {
    showError('Hubo un error al registrar el usuario');
  }
};
```

📦 Modal Global con Zustand + MUI
Este proyecto incluye un modal global reutilizable utilizando Zustand para manejar el estado y Material UI (@mui/material) para el diseño.
✅ ¿Cómo funciona?
El componente GlobalModal se monta una sola vez en el App.tsx.

Desde cualquier parte de la app se puede abrir el modal usando el hook useModalStore.

El modal se cierra al hacer clic fuera del contenido o al presionar Escape.
💡 Ejemplo de uso
```
import { useModalStore } from '../../store/modal.store';

const { openModal } = useModalStore();

<Button onClick={() => openModal(<div>¿Estás segura de eliminar?</div>)}>
  Eliminar
</Button>
```
✨ Comportamiento
✅ Se cierra tocando fuera o presionando Esc.

❌ No tiene botón "X" para cerrar.

🔄 El contenido del modal es dinámico: podés pasarle cualquier JSX.

---

## 🌐 Despliegue (Deployment)

### Netlify / Vercel (Recomendado)

1. **Conecta tu repositorio** a Netlify o Vercel
2. **Configura las variables de entorno** en el panel de configuración:
   - `VITE_API_URL`
   - `VITE_WEBSOCKET_URL`
   - `VITE_ROUTER_MODE`
   - `VITE_CLOUDINARY_URL` (opcional)
   - `VITE_CLOUDINARY_UPLOAD_PRESET` (opcional)

3. **Configuración de build:**
   ```
   Build Command: npm run build
   Publish Directory: dist
   ```

### GitHub Pages

1. Asegúrate de que `VITE_ROUTER_MODE=hash` en tu `.env`
2. Actualiza `vite.config.ts` con tu base path:
   ```ts
   base: '/nombre-de-tu-repo/'
   ```
3. Ejecuta:
   ```bash
   npm run build
   ```
4. Sube la carpeta `dist` a GitHub Pages

### Variables de Entorno en Producción

⚠️ **IMPORTANTE:** Nunca expongas tokens o claves secretas. Las variables `VITE_*` son públicas en el bundle.

---

## 🧪 Testing

```bash
# Ejecutar tests (cuando estén configurados)
npm run test

# Ejecutar tests en modo watch
npm run test:watch
```

---

## 📋 Instrucciones para implementar el Control de Plazas Disponibles

### 🚀 Pasos a seguir
🧩 1. Importar el hook de Zustand
Al principio de tu componente (donde estás desarrollando el panel de control), importa el hook useParkingStore:


import { useParkingStore } from '@/features/parking/store/useParkingStore'
🧩 2. Acceder a la función setAvailability
Dentro de tu componente (fuera del return), crea esta constante:


const setAvailability = useParkingStore((state) => state.setAvailability)
Esto te permitirá actualizar el número de plazas en toda la app.

🧩 3. Llamar a setAvailability al guardar cambios
Cuando el usuario haga clic en "Guardar cambios", llama a esta función pasando:

el id del parking

la cantidad de plazas disponibles que haya elegido

Así:

setAvailability(parkingId, newAvailableSlots)
Ejemplo real en tu botón:

<Button onClick={() => setAvailability(parking.id, slots)}>
  Guardar cambios
</Button>
✅ parking.id: es el identificador del parking actual (deberías tenerlo en el componente).
✅ slots: es el número actualizado (lo que ve en el input o el contador).

🧩 4. Cómo probar que funciona
El proyecto tiene activo un mock (useMockAvailabilityUpdates) que actualiza automáticamente un parking cada 5 segundos.

Mientras tanto, tu cambio manual usando setAvailability debe actualizar inmediatamente el número de plazas en:

Tu panel de control (contador)

El perfil del parking (ParkingProfile) donde se usa AvailabilityStatus.

✅ No hace falta recargar la página.
✅ No hace falta tocar ParkingProfile.
✅ Todo se actualiza solo.

🧪 ¿Cómo saber si todo funciona bien?
Cambia el número de plazas disponibles en el control.

Haz clic en "Guardar cambios".

Ve al perfil del parking → Deberías ver que el número de plazas cambia en vivo.

⚙️ Info extra
Mientras desarrollamos, dejamos el mock activo para facilitar las pruebas (useMockAvailabilityUpdates() está activado en App.tsx).

Cuando conectemos el WebSocket real del backend, no tendrás que cambiar nada en tu componente.

### 📌 Ejemplo mínimo de integración

import { useParkingStore } from '@/features/parking/store/useParkingStore'

const ParkingAvailabilityControl = ({ parkingId }: { parkingId: string }) => {
  const [slots, setSlots] = useState(0)
  const setAvailability = useParkingStore((state) => state.setAvailability)

  const handleSave = () => {
    setAvailability(parkingId, slots)
  }

  return (
    <div>
      <input
        type="number"
        value={slots}
        onChange={(e) => setSlots(Number(e.target.value))}
      />
      <button onClick={handleSave}>Guardar cambios</button>
    </div>
  )
}

