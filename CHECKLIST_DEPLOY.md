# ✅ Checklist de Deploy y Demo - ParkiFy Frontend

## 📋 Pre-requisitos (Antes de Todo)

### Backend en Render
- [ ] Backend desplegado y funcionando en Render
- [ ] URL del backend anotada (ej: `https://parkify-backend.onrender.com`)
- [ ] Endpoints funcionando:
  - [ ] `GET /api/health` o similar
  - [ ] `POST /api/auth/register`
  - [ ] `POST /api/auth/login`
  - [ ] `POST /api/parkings/my`
  - [ ] `GET /api/parkings/nearby`
- [ ] WebSocket activo y funcionando
- [ ] CORS configurado para permitir tu frontend

### Cuentas y Servicios
- [ ] Cuenta de Cloudinary creada (opcional, para imágenes)
- [ ] Upload preset de Cloudinary configurado
- [ ] 5 usuarios de prueba creados (o 1 usuario para demo)

---

## 🔧 Configuración Inicial (Primera vez)

### 1. Variables de Entorno
```bash
# Windows
copy env.template .env

# Linux/Mac
cp env.template .env
```

- [ ] Archivo `.env` creado
- [ ] `VITE_API_URL` configurado con URL de Render + `/api`
- [ ] `VITE_WEBSOCKET_URL` configurado con URL de Render (sin `/api`)
- [ ] `VITE_ROUTER_MODE` configurado (hash o browser)
- [ ] `VITE_CLOUDINARY_URL` configurado (opcional)
- [ ] `VITE_CLOUDINARY_UPLOAD_PRESET` configurado (opcional)

**Ejemplo:**
```env
VITE_API_URL=https://parkify-backend.onrender.com/api
VITE_WEBSOCKET_URL=https://parkify-backend.onrender.com
VITE_ROUTER_MODE=hash
```

### 2. Instalación
```bash
npm install
```

- [ ] Dependencias instaladas sin errores
- [ ] No hay vulnerabilidades críticas

### 3. Prueba Local
```bash
npm run dev
```

- [ ] Aplicación carga en `http://localhost:5173`
- [ ] No hay errores en consola
- [ ] El backend responde (verificar Network tab)

---

## 📊 Carga de Datos de Muestra

### Opción A: Desde la interfaz (Recomendado)

#### Parking 1: Plaza Mayor
- [ ] Login/registro completado
- [ ] Ir a "Registrar Parking"
- [ ] Completar formulario:
  ```
  Nombre: Parking Plaza Mayor
  Dirección: Plaza Mayor, 28, 28012 Madrid, España
  Lat/Lng: 40.4153, -3.7074
  Capacidad: 120
  Tarifa: 3.50
  Horario: 00:00 - 23:59
  Teléfono: +34910001000
  ```
- [ ] Parking creado exitosamente

#### Parking 2: Retiro
- [ ] Usar otra cuenta o cambiar backend para permitir múltiples parkings
- [ ] Completar formulario:
  ```
  Nombre: Parking Retiro
  Dirección: Calle de Alfonso XII, 28014 Madrid, España
  Lat/Lng: 40.4153, -3.6844
  Capacidad: 80
  Tarifa: 2.80
  Horario: 07:00 - 22:00
  Teléfono: +34910002000
  ```
- [ ] Parking creado exitosamente

#### Parking 3: Puerta del Sol
- [ ] Completar formulario:
  ```
  Nombre: Parking Puerta del Sol
  Dirección: Calle Carmen, 1, 28013 Madrid, España
  Lat/Lng: 40.4169, -3.7035
  Capacidad: 150
  Tarifa: 4.20
  Horario: 00:00 - 23:59
  Teléfono: +34910003000
  ```
- [ ] Parking creado exitosamente

#### Parking 4: Gran Vía
- [ ] Completar formulario:
  ```
  Nombre: Parking Gran Vía
  Dirección: Gran Vía, 45, 28013 Madrid, España
  Lat/Lng: 40.4206, -3.7063
  Capacidad: 100
  Tarifa: 3.80
  Horario: 06:00 - 02:00
  Teléfono: +34910004000
  ```
- [ ] Parking creado exitosamente

#### Parking 5: Santiago Bernabéu
- [ ] Completar formulario:
  ```
  Nombre: Parking Estadio Santiago Bernabéu
  Dirección: Avenida de Concha Espina, 1, 28036 Madrid
  Lat/Lng: 40.4530, -3.6883
  Capacidad: 200
  Tarifa: 3.00
  Horario: 08:00 - 23:00
  Teléfono: +34910005000
  ```
- [ ] Parking creado exitosamente

### Verificación de Datos
- [ ] Ir a `/mapa`
- [ ] Centrar en Madrid (lat: 40.4168, lng: -3.7038)
- [ ] Radio de búsqueda: 10km
- [ ] Todos los 5 parkings aparecen en el mapa
- [ ] Al hacer click, se muestra información correcta

---

## 🧪 Pruebas Funcionales

### Autenticación
- [ ] Registro de nuevo usuario funciona
- [ ] Login funciona
- [ ] Cierre de sesión funciona
- [ ] Token se guarda correctamente
- [ ] Rutas protegidas redirigen correctamente

### Mapa
- [ ] Mapa carga correctamente
- [ ] Marcadores aparecen
- [ ] Click en marcador muestra detalles
- [ ] Filtros funcionan
- [ ] Búsqueda por ubicación funciona
- [ ] Zoom in/out funciona

### Parkings
- [ ] Crear parking funciona
- [ ] Ver detalle de parking funciona
- [ ] Actualizar disponibilidad funciona
- [ ] Editar parking funciona (si está implementado)
- [ ] Eliminar parking funciona (si está implementado)

### WebSocket (Tiempo Real)
- [ ] Abrir dos ventanas del navegador
- [ ] En una, cambiar disponibilidad
- [ ] En otra, verificar actualización automática
- [ ] Consola muestra: `✅ WebSocket connected`

### Responsive
- [ ] Probar en móvil (DevTools)
- [ ] Probar en tablet
- [ ] Probar en desktop
- [ ] Menú hamburguesa funciona (móvil)

---

## 🚀 Deploy a Producción

### Opción 1: Netlify

#### Configuración Inicial
- [ ] Cuenta de Netlify creada
- [ ] Repositorio conectado
- [ ] Build settings configurados:
  ```
  Build command: npm run build
  Publish directory: dist
  ```

#### Variables de Entorno en Netlify
- [ ] Ir a: Site settings → Build & deploy → Environment
- [ ] Agregar variables:
  - [ ] `VITE_API_URL`
  - [ ] `VITE_WEBSOCKET_URL`
  - [ ] `VITE_ROUTER_MODE`
  - [ ] `VITE_CLOUDINARY_URL` (opcional)
  - [ ] `VITE_CLOUDINARY_UPLOAD_PRESET` (opcional)

#### Deploy
- [ ] Trigger deploy manual o push a main
- [ ] Build exitoso (sin errores)
- [ ] Site preview funciona
- [ ] Producción actualizada

### Opción 2: Vercel

#### Configuración Inicial
- [ ] Cuenta de Vercel creada
- [ ] Repositorio importado
- [ ] Framework preset: Vite

#### Variables de Entorno en Vercel
- [ ] Ir a: Project Settings → Environment Variables
- [ ] Agregar las mismas variables que Netlify

#### Deploy
- [ ] Deploy automático en push
- [ ] Build exitoso
- [ ] Preview URL funciona

### Opción 3: GitHub Pages

#### Configuración
- [ ] `VITE_ROUTER_MODE=hash` en `.env`
- [ ] En `vite.config.ts`, actualizar:
  ```ts
  base: '/parkify-front/'
  ```
- [ ] Build local:
  ```bash
  npm run build
  ```
- [ ] Subir carpeta `dist` a rama `gh-pages`

---

## 🎯 Pre-Demo (1 hora antes)

### Verificación del Sistema
- [ ] Backend de Render está activo (puede tardar en despertar)
  ```bash
  curl https://tu-backend.onrender.com/api/health
  ```
- [ ] Frontend desplegado y accesible
- [ ] Certificado SSL activo (HTTPS)
- [ ] No hay errores en consola del navegador

### Datos de Demo
- [ ] 5 parkings de Madrid cargados
- [ ] Imágenes cargando correctamente
- [ ] Disponibilidad de plazas actualizada
- [ ] Cuenta de demo lista y probada

### Presentación
- [ ] Laptop cargada
- [ ] Internet estable (prueba de velocidad)
- [ ] Navegador actualizado
- [ ] Tabs preparadas:
  - [ ] Tab 1: Landing page
  - [ ] Tab 2: Login
  - [ ] Tab 3: Mapa con parkings
  - [ ] Tab 4: Panel de propietario
- [ ] Zoom del navegador al 100%
- [ ] Modo oscuro/claro según preferencia

### Plan B
- [ ] Build local funcionando (`npm run dev`)
- [ ] Capturas de pantalla de respaldo
- [ ] Video de demo pregrabado (opcional)

---

## 🎤 Durante la Demo

### Script de Demo (5 minutos)

#### Minuto 1: Introducción
- [ ] Mostrar landing page
- [ ] Explicar el problema que resuelve
- [ ] Mencionar stack tecnológico

#### Minuto 2: Búsqueda de Parkings
- [ ] Ir al mapa
- [ ] Mostrar los 5 parkings en Madrid
- [ ] Filtrar por disponibilidad
- [ ] Ordenar por precio

#### Minuto 3: Detalle de Parking
- [ ] Click en un parking
- [ ] Mostrar información completa
- [ ] Mencionar tiempo real

#### Minuto 4: Panel de Propietario
- [ ] Mostrar perfil
- [ ] Cambiar disponibilidad
- [ ] Explicar actualización automática

#### Minuto 5: Funcionalidades Destacadas
- [ ] Mencionar WebSocket
- [ ] Responsive design
- [ ] Código limpio y documentado

### Puntos Clave a Mencionar
- [ ] "100% gratuito - sin Google Maps"
- [ ] "Actualización en tiempo real con WebSocket"
- [ ] "React + TypeScript para código robusto"
- [ ] "UI moderna con Material UI"
- [ ] "Arquitectura escalable y modular"

---

## 📊 Post-Demo

### Análisis
- [ ] ¿Funcionó todo correctamente?
- [ ] ¿Hubo errores o problemas?
- [ ] ¿Preguntas frecuentes recibidas?
- [ ] Feedback recibido

### Mejoras Identificadas
- [ ] Listar mejoras sugeridas
- [ ] Crear issues en GitHub
- [ ] Priorizar por impacto

### Seguimiento
- [ ] Compartir links con contactos
- [ ] Enviar documentación adicional
- [ ] Agradecer feedback

---

## 🐛 Troubleshooting Rápido

### Backend no responde
```bash
# Despertar backend de Render (puede tomar 30-60s)
curl https://tu-backend.onrender.com/api/health
```

### WebSocket no conecta
- Verificar `VITE_WEBSOCKET_URL` sin `/api`
- Verificar que backend soporte WebSocket
- Revisar configuración de CORS

### Parkings no aparecen
- Verificar coordenadas de Madrid
- Aumentar radio de búsqueda a 10km
- Verificar que hay parkings en la BD

### Build falla
```bash
# Limpiar y rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Errores de CORS
- Verificar whitelist en backend
- Verificar que URL coincida exactamente
- Verificar protocolo (http vs https)

---

## 📞 Contactos de Emergencia

### Enlaces Importantes
- Frontend (producción): `_________________`
- Backend (Render): `_________________`
- Repositorio GitHub: `_________________`
- Documentación: Este repo

### Comandos Útiles de Emergencia

```bash
# Despertar backend
curl https://tu-backend.onrender.com/api/health

# Build local rápido
npm run build

# Deploy manual Netlify (si CLI instalado)
netlify deploy --prod

# Ver logs en tiempo real
npm run dev

# Verificar variables de entorno
echo $VITE_API_URL
```

---

## ✅ Checklist Final

### Antes de la Demo
- [ ] ✅ Todos los checks de "Pre-Demo" completados
- [ ] ✅ Backend activo y respondiendo
- [ ] ✅ Frontend desplegado
- [ ] ✅ Datos de muestra cargados
- [ ] ✅ WebSocket funcionando
- [ ] ✅ Plan B preparado

### Durante la Demo
- [ ] ✅ Script seguido
- [ ] ✅ Funcionalidades demostradas
- [ ] ✅ Puntos clave mencionados
- [ ] ✅ Preguntas respondidas

### Después de la Demo
- [ ] ✅ Feedback recopilado
- [ ] ✅ Contactos compartidos
- [ ] ✅ Seguimiento planificado

---

**¡Tu proyecto está listo para brillar! 🌟**

**¡Mucha suerte! 🚀**

