# 🚀 Inicio Rápido - Parkify con Leaflet

## ✅ La migración está completa, ahora puedes arrancar tu aplicación!

---

## 📋 Pasos para Probar la Aplicación

### 1. **Verificar que las dependencias estén instaladas**
```bash
npm install
```

### 2. **Configurar variables de entorno**
Crea un archivo `.env` en la raíz del proyecto:

```env
# Backend API URL
VITE_API_URL=http://localhost:3000/api

# Cloudinary (opcional por ahora si solo quieres probar el mapa)
VITE_CLOUDINARY_URL=https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload
VITE_CLOUDINARY_UPLOAD_PRESET=YOUR_UPLOAD_PRESET
```

**Nota:** Si no tienes backend corriendo, el mapa igual funcionará, solo que sin datos de parkings reales.

### 3. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```

El servidor debería iniciar en: `http://localhost:5173`

---

## 🗺️ Qué Esperar Ver

### **Página del Mapa** (`/mapa`)
1. ✅ Mapa interactivo de OpenStreetMap
2. ✅ Geolocalización automática (te pedirá permisos)
3. ✅ Marcadores de parkings con precios
4. ✅ Búsqueda de direcciones sin API key
5. ✅ Filtros de parkings
6. ✅ Lista de parkings disponibles

### **Funcionalidades Principales**
- 📍 **Geolocalización:** El mapa se centra en tu ubicación
- 🔍 **Búsqueda:** Escribe una dirección y selecciona de la lista
- 🏷️ **Marcadores:** Clic en un precio para ver detalles del parking
- 📱 **WhatsApp:** Botón de reserva que abre WhatsApp
- 🎨 **Marcadores coloreados:**
  - Azul: Parking normal
  - Amarillo: Parking recomendado
  - Gris: Parking lleno (sin plazas)

---

## 🧪 Testing Manual

### **Test 1: Mapa se carga correctamente**
- [ ] El mapa se muestra sin errores
- [ ] Los tiles de OpenStreetMap cargan
- [ ] No hay errores en la consola

### **Test 2: Geolocalización**
- [ ] El navegador pide permisos de ubicación
- [ ] El mapa se centra en tu ubicación (o en fallback de Buenos Aires)

### **Test 3: Búsqueda de direcciones**
- [ ] Al escribir en el buscador aparecen sugerencias
- [ ] Al seleccionar una dirección, el mapa se actualiza
- [ ] La búsqueda funciona sin API key

### **Test 4: Marcadores de Parking**
Si tienes backend conectado:
- [ ] Los marcadores aparecen en el mapa
- [ ] Al hacer clic, se muestra la tarjeta del parking
- [ ] El botón de WhatsApp funciona

---

## 🐛 Problemas Comunes

### **El mapa no se muestra**
**Posibles causas:**
1. Los estilos de Leaflet no están cargados
2. Problema de altura del contenedor

**Solución:**
- Verifica que `import 'leaflet/dist/leaflet.css'` esté en `main.tsx`
- Abre la consola del navegador y busca errores

### **Los marcadores no tienen estilos**
**Causa:** Los estilos personalizados no están cargados

**Solución:**
- Verifica que `index.css` tenga los estilos de `.price-marker`
- Recarga la página con Ctrl+F5 (hard refresh)

### **La búsqueda de direcciones no funciona**
**Causa:** Posible problema de rate limiting de Nominatim

**Solución:**
- Espera 1-2 segundos entre búsquedas
- Verifica tu conexión a internet
- Revisa la consola para errores de red

### **No veo parkings en el mapa**
**Causa:** El backend no está conectado o no hay parkings en tu área

**Solución:**
- Verifica que `VITE_API_URL` esté configurada en `.env`
- Verifica que el backend esté corriendo
- Prueba con una ubicación conocida donde haya parkings

---

## 📸 Capturas Esperadas

### Vista del Mapa Principal
- Mapa de OpenStreetMap centrado en una ubicación
- Barra de búsqueda en la parte superior
- Botón "Recomendados" amarillo
- Marcadores azules con precios

### Tarjeta de Parking
Al hacer clic en un marcador:
- Imagen del parking
- Nombre y dirección
- Precio por hora
- Horario de apertura
- Botón "Reservar por WhatsApp"
- Rating con estrellas

---

## 🎯 Próximos Pasos

Una vez que el mapa funcione:

1. **Conectar con el Backend**
   - Configurar CORS en el backend
   - Verificar endpoints de parkings cercanos
   - Probar la carga de parkings reales

2. **Mejorar la UI/UX**
   - Ajustar colores y estilos
   - Agregar animaciones
   - Mejorar responsive design

3. **Optimizaciones**
   - Clustering de marcadores si hay muchos parkings
   - Lazy loading de imágenes
   - Caché de búsquedas

4. **Features Adicionales**
   - Filtros avanzados
   - Guardar parkings favoritos
   - Historial de búsquedas

---

## 📚 Recursos Útiles

- [Leaflet Docs](https://leafletjs.com/)
- [React-Leaflet Docs](https://react-leaflet.js.org/)
- [OpenStreetMap](https://www.openstreetmap.org/)
- [Nominatim API](https://nominatim.org/)

---

## 🆘 ¿Necesitas Ayuda?

Si encuentras algún problema:

1. Revisa la consola del navegador (F12)
2. Verifica el archivo `MIGRATION_GUIDE.md` para detalles técnicos
3. Revisa el archivo `ENV_SETUP.md` para configuración de variables

---

**¡Todo listo para probar! 🎉**

El mapa debería funcionar sin necesidad de API keys de Google Maps.

