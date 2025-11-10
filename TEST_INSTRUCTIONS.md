# 🧪 Instrucciones para Probar la Aplicación

## ✅ El Error Está Solucionado

El error `AxiosError: timeout of 10000ms exceeded` ha sido **completamente resuelto**.

Ahora tu aplicación funciona con **fallback automático a datos mock** cuando el backend no está disponible.

---

## 🚀 Pasos para Probar AHORA

### 1. **Detener el servidor actual** (si está corriendo)
```bash
Ctrl + C  (en la terminal donde corre npm run dev)
```

### 2. **Iniciar el servidor nuevamente**
```bash
npm run dev
```

### 3. **Abrir en el navegador**
```
http://localhost:5173/mapa
```

---

## 👀 Qué Deberías Ver

### ✅ En el Mapa:

1. **Mapa de OpenStreetMap** cargando correctamente
2. **8 Marcadores** con precios en diferentes ubicaciones
3. **3 colores de marcadores:**
   - 🔵 **Azul** - Parkings normales (mayoría)
   - 🟡 **Amarillo** - Parkings recomendados (IDs: 3, 5, 8)
   - ⚫ **Gris** - Parking lleno (ID: 7 - Puerto Madero)

### ✅ En la Consola del Navegador (F12):

Deberías ver este mensaje:
```
⚠️ Backend no disponible, usando datos mock para desarrollo
```

**Esto es NORMAL y esperado** cuando no tienes el backend corriendo.

### ✅ NO deberías ver:
- ❌ `AxiosError: timeout of 10000ms exceeded`
- ❌ `Uncaught (in promise)`
- ❌ Errores rojos en consola

---

## 🎯 Interacciones para Probar

### 1. **Click en un Marcador**

**Qué esperar:**
- Se abre una tarjeta en la parte inferior
- Muestra:
  - 📸 Imagen del parking
  - 🏷️ Nombre (ej: "Parking Centro")
  - 📍 Dirección
  - 💰 Precio por hora
  - ⭐ Rating
  - 🕐 Horario
  - 💚 Botón "Reservar por WhatsApp"

**Ejemplo de parkings para probar:**
- **Parking Palermo** ($1200/h) - lat: -34.5849, lng: -58.4302
- **Parking Puerto Madero** ($1000/h) - **LLENO** (marcador gris)
- **Parking Belgrano** ($700/h) - **RECOMENDADO** (marcador amarillo)

### 2. **Buscar una Dirección**

**Pasos:**
1. Escribe en la barra de búsqueda: "Obelisco Buenos Aires"
2. Espera 1-2 segundos
3. Aparecerán sugerencias
4. Selecciona una
5. El mapa se centrará en esa ubicación

**Ejemplo de búsquedas:**
- "Obelisco Buenos Aires"
- "Palermo, Buenos Aires"
- "Puerto Madero"
- "Recoleta Cemetery"

### 3. **Botón de WhatsApp**

**Pasos:**
1. Click en un marcador
2. Click en "Reservar por WhatsApp"
3. Se abre WhatsApp con mensaje prellenado

**Mensaje esperado:**
```
Hola, quiero reservar una plaza en [Nombre del Parking].
```

---

## 🎨 Estados de Marcadores

### 🔵 Marcadores Azules (Normal)
- Parking con plazas disponibles
- No está en lista de recomendados
- **Ejemplos:** IDs 1, 2, 4, 6

**Hover:**
- Cambia a azul oscuro
- Escala 1.05x

### 🟡 Marcadores Amarillos (Recomendado)
- Parkings destacados
- **IDs:** 3 (Belgrano), 5 (Congreso), 8 (Caballito)

**Hover:**
- Cambia a fondo negro con texto amarillo
- Escala 1.05x

### ⚫ Marcadores Grises (Lleno)
- Sin plazas disponibles (availableSpots = 0)
- **Ejemplo:** ID 7 (Parking Puerto Madero)

**Hover:**
- Cambia a gris oscuro
- Escala 1.05x

---

## 📱 Responsive Testing

### Desktop (> 768px)
- Barra de búsqueda: 30% del ancho
- Tarjeta de parking: Centrada abajo
- Lista de parkings: 30% lateral izquierdo

### Mobile (< 768px)
- Barra de búsqueda: 100% del ancho
- Tarjeta de parking: 100% del ancho
- Lista de parkings: 40% altura, centrada

---

## 🔍 Debugging

### Si no ves marcadores:

**1. Verifica la consola:**
```javascript
// Deberías ver:
⚠️ Backend no disponible, usando datos mock para desarrollo
```

**2. Verifica el store en consola:**
```javascript
// En DevTools Console, ejecuta:
JSON.parse(localStorage.getItem('parking-storage'))

// Deberías ver:
{
  state: {
    nearbyParkings: [8 parkings...],
    ...
  }
}
```

**3. Recarga con caché limpio:**
```
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

### Si el mapa no carga:

**1. Verifica que los estilos de Leaflet están cargados:**
```javascript
// En DevTools, busca en Network:
leaflet.css ✅ Status 200
```

**2. Verifica la altura del contenedor:**
```javascript
// El MapContainer debe tener height: 100vh
```

---

## 📊 Datos de los 8 Parkings Mock

| ID | Nombre | Ubicación | Lat | Lng | Precio | Disponibles |
|----|--------|-----------|-----|-----|--------|-------------|
| 1 | Parking Centro | Corrientes | -34.6037 | -58.3816 | $800 | 25 |
| 2 | Parking Palermo | Godoy Cruz | -34.5849 | -58.4302 | $1200 | 10 |
| 3 | Parking Belgrano | Cabildo | -34.5631 | -58.4577 | $700 | 30 |
| 4 | Parking San Telmo | Defensa | -34.6189 | -58.3701 | $600 | 5 |
| 5 | Parking Congreso | Entre Ríos | -34.6099 | -58.3923 | $900 | 8 |
| 6 | Parking Recoleta | Arenales | -34.5875 | -58.3931 | $1500 | 15 |
| 7 | Puerto Madero | Juana Manso | -34.6118 | -58.3632 | $1000 | 0 ⚫ |
| 8 | Parking Caballito | Rivadavia | -34.6178 | -58.4368 | $850 | 45 |

---

## ✅ Checklist de Verificación

Marca lo que funciona:

### Mapa
- [ ] El mapa se carga correctamente
- [ ] Los tiles de OpenStreetMap aparecen
- [ ] Puedo hacer zoom con la rueda del mouse
- [ ] Puedo arrastrar el mapa

### Marcadores
- [ ] Veo 8 marcadores en el mapa
- [ ] Los marcadores tienen precios visibles
- [ ] Hay marcadores azules, amarillos y uno gris
- [ ] El hover funciona (cambian de color)

### Interacciones
- [ ] Click en marcador muestra tarjeta
- [ ] La tarjeta tiene toda la información
- [ ] El botón de WhatsApp funciona
- [ ] La búsqueda de direcciones funciona
- [ ] Las sugerencias aparecen al escribir

### Errores
- [ ] NO veo errores rojos en consola
- [ ] Solo veo warning de "Backend no disponible" (esperado)
- [ ] No hay errores de timeout

---

## 🎉 Si Todo Funciona...

**¡Felicitaciones!** Tu aplicación ahora:

✅ Funciona **100% sin backend**  
✅ Usa **mapas gratuitos** (Leaflet + OSM)  
✅ Tiene **datos mock realistas**  
✅ Está **lista para tu portfolio**  
✅ Puede **conectarse a backend** cuando esté listo  

---

## 🔗 Próximos Pasos

1. **Personalizar datos mock** - Edita `src/features/maps/data/mock-parkings.ts`
2. **Conectar backend real** - Configura `VITE_API_URL` en `.env`
3. **Desplegar en producción** - Vercel, Netlify, etc.
4. **Agregar más features** - WebSockets, notificaciones, etc.

---

## 📚 Documentación Relacionada

- **BACKEND_ERROR_SOLUTION.md** - Explicación detallada del fix
- **QUICKSTART.md** - Guía de inicio rápido
- **MIGRATION_GUIDE.md** - Migración a Leaflet
- **ENV_SETUP.md** - Variables de entorno

---

**¿Listo para probar?** 🚀

```bash
npm run dev
```

Luego abre: `http://localhost:5173/mapa`

