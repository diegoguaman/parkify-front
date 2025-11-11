# ⚡ Inicio Rápido - ParkiFy Frontend

## 🎯 Objetivo
Tener el proyecto funcionando con datos de Madrid en **menos de 30 minutos**.

---

## ⏱️ Paso 1: Configurar Variables de Entorno (2 minutos)

### Windows
```bash
copy env.template .env
```

### Linux/Mac
```bash
cp env.template .env
```

### Editar `.env`

Abre el archivo `.env` y reemplaza con tu información:

```env
VITE_API_URL=https://TU-BACKEND.onrender.com/api
VITE_WEBSOCKET_URL=https://TU-BACKEND.onrender.com
VITE_ROUTER_MODE=hash
```

**⚠️ IMPORTANTE:** Reemplaza `TU-BACKEND` con tu URL real de Render.

---

## ⏱️ Paso 2: Instalar y Ejecutar (3 minutos)

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

Abre: `http://localhost:5173`

---

## ⏱️ Paso 3: Verificar Backend (1 minuto)

Abre una nueva terminal y ejecuta:

```bash
curl https://TU-BACKEND.onrender.com/api/health
```

✅ Si responde, el backend está activo.
❌ Si no responde, espera 30-60 segundos (Render está despertando).

---

## ⏱️ Paso 4: Cargar Datos de Madrid (15-30 minutos)

### Opción A: Manual desde la Web (Recomendado)

#### 1. Registrarse
- Ir a: `http://localhost:5173/#/register`
- Crear cuenta (usa email real o fake)

#### 2. Crear 5 Parkings

##### Parking 1: Plaza Mayor
```
Nombre: Parking Plaza Mayor
Dirección: Plaza Mayor, 28, 28012 Madrid, España
Latitud: 40.4153
Longitud: -3.7074
Capacidad: 120
Tarifa por hora: 3.50
Horario apertura: 00:00
Horario cierre: 23:59
Teléfono: +34910001000
Imagen: https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800&q=80
```

##### Parking 2: Retiro
```
Nombre: Parking Retiro
Dirección: Calle de Alfonso XII, 28014 Madrid, España
Latitud: 40.4153
Longitud: -3.6844
Capacidad: 80
Tarifa por hora: 2.80
Horario apertura: 07:00
Horario cierre: 22:00
Teléfono: +34910002000
Imagen: https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&q=80
```

##### Parking 3: Puerta del Sol
```
Nombre: Parking Puerta del Sol
Dirección: Calle Carmen, 1, 28013 Madrid, España
Latitud: 40.4169
Longitud: -3.7035
Capacidad: 150
Tarifa por hora: 4.20
Horario apertura: 00:00
Horario cierre: 23:59
Teléfono: +34910003000
Imagen: https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800&q=80
```

##### Parking 4: Gran Vía
```
Nombre: Parking Gran Vía
Dirección: Gran Vía, 45, 28013 Madrid, España
Latitud: 40.4206
Longitud: -3.7063
Capacidad: 100
Tarifa por hora: 3.80
Horario apertura: 06:00
Horario cierre: 02:00
Teléfono: +34910004000
Imagen: https://images.unsplash.com/photo-1566933293069-b55c7f326dd4?w=800&q=80
```

##### Parking 5: Santiago Bernabéu
```
Nombre: Parking Estadio Santiago Bernabéu
Dirección: Avenida de Concha Espina, 1, 28036 Madrid, España
Latitud: 40.4530
Longitud: -3.6883
Capacidad: 200
Tarifa por hora: 3.00
Horario apertura: 08:00
Horario cierre: 23:00
Teléfono: +34910005000
Imagen: https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&q=80
```

**⚠️ NOTA:** Si tu backend solo permite 1 parking por usuario, necesitarás crear 5 usuarios diferentes o modificar el backend.

---

## ⏱️ Paso 5: Verificar en el Mapa (2 minutos)

1. Ir a: `http://localhost:5173/#/mapa`
2. El mapa debería cargar centrado en Madrid
3. Deberías ver marcadores de los parkings
4. Click en un marcador para ver detalles

### Si no ves los parkings:

#### Búsqueda Manual
- Click en el botón de búsqueda
- Ingresa: `Madrid, España`
- Radio: `10 km`
- Click en "Buscar"

#### O centrar manualmente:
- Latitud: `40.4168`
- Longitud: `-3.7038`
- Zoom: `13`

---

## ✅ Verificación Final

### Checklist Rápido

- [ ] Frontend corre en `http://localhost:5173`
- [ ] Backend responde (curl funciona)
- [ ] Puedes hacer login
- [ ] Los 5 parkings están creados
- [ ] Los parkings aparecen en el mapa
- [ ] Puedes ver detalles de un parking
- [ ] WebSocket conectado (ver consola: `✅ WebSocket connected`)

### Comandos de Verificación

```bash
# 1. Backend activo
curl https://TU-BACKEND.onrender.com/api/health

# 2. Obtener parkings cercanos
curl "https://TU-BACKEND.onrender.com/api/parkings/nearby?lat=40.4168&lon=-3.7038&radius=5000"

# 3. Verificar frontend
# Abrir: http://localhost:5173
# No debería haber errores en la consola
```

---

## 🎉 ¡Listo para la Demo!

Si todos los checks están ✅, tu proyecto está funcionando correctamente.

### Próximos Pasos

#### Para Demo/Networking:
1. Leer: [SETUP_COMPLETO.md](./SETUP_COMPLETO.md) - Guía de demo
2. Seguir: [CHECKLIST_DEPLOY.md](./CHECKLIST_DEPLOY.md) - Checklist pre-demo

#### Para Deploy a Producción:
1. Leer sección "Deploy" en [CHECKLIST_DEPLOY.md](./CHECKLIST_DEPLOY.md)
2. Configurar Netlify o Vercel
3. Agregar variables de entorno

---

## 🐛 Solución Rápida de Problemas

### Backend no responde
```bash
# Despertar Render (plan gratuito)
curl https://TU-BACKEND.onrender.com/api/health
# Esperar 30-60 segundos y reintentar
```

### Error al crear parking
- Verificar que todos los campos estén completos
- Verificar coordenadas (formato decimal)
- Verificar horarios (formato HH:MM)

### Parkings no aparecen en mapa
- Verificar que los parkings estén creados (ver en perfil)
- Aumentar radio de búsqueda a 10-20 km
- Centrar mapa en Madrid: 40.4168, -3.7038

### Error de CORS
- Verificar URL en `.env` coincida exactamente con Render
- No debe haber espacios ni barras extra
- Verificar backend tiene CORS configurado

### WebSocket no conecta
- Verificar `VITE_WEBSOCKET_URL` en `.env`
- NO debe tener `/api` al final
- Debe ser la misma URL que el backend

---

## 📞 ¿Necesitas más ayuda?

### Documentación Completa
- [README.md](./README.md) - Guía general
- [SETUP_COMPLETO.md](./SETUP_COMPLETO.md) - Setup detallado
- [CARGA_DATOS_MADRID.md](./CARGA_DATOS_MADRID.md) - Detalles de datos
- [CHECKLIST_DEPLOY.md](./CHECKLIST_DEPLOY.md) - Deploy y demo

### Datos de Referencia
- [sample-data-madrid.json](./sample-data-madrid.json) - JSON con los 5 parkings
- [env.template](./env.template) - Variables de entorno

---

## ⏰ Tiempo Total Estimado

| Paso | Tiempo | 
|------|---------|
| Configurar .env | 2 min |
| Instalar dependencias | 3 min |
| Verificar backend | 1 min |
| Crear 5 parkings | 15-30 min |
| Verificar en mapa | 2 min |
| **TOTAL** | **23-38 min** |

---

## 🚀 Script Todo-en-Uno (Avanzado)

Si prefieres automatizar todo:

```bash
# 1. Configurar (manual)
copy env.template .env
# Editar .env con tu URL

# 2. Instalar y ejecutar
npm install && npm run dev

# 3. Mientras se ejecuta, en otra terminal:
# Cargar datos con script (ver CARGA_DATOS_MADRID.md)
node load-sample-data.js
```

---

**¡Éxito! 🎯 Tu proyecto ParkiFy está funcionando con datos de Madrid.**

**Siguiente paso:** Leer [SETUP_COMPLETO.md](./SETUP_COMPLETO.md) para preparar la demo.

