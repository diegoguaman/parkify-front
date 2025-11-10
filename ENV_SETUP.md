# 🌍 Variables de Entorno - Parkify Frontend

## ✅ Configuración Requerida

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Backend API URL
VITE_API_URL=http://localhost:3000/api

# Cloudinary Configuration (for image uploads)
VITE_CLOUDINARY_URL=https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload
VITE_CLOUDINARY_UPLOAD_PRESET=YOUR_UPLOAD_PRESET
```

## 🎉 ¡Google Maps API ya NO es necesario!

Este proyecto ahora usa **Leaflet + OpenStreetMap**, que es:
- ✅ **100% Gratuito** sin límites
- ✅ **No requiere tarjeta de crédito**
- ✅ **No requiere API keys**
- ✅ **Open source y sin restricciones**

## 📦 Servicios Gratuitos Utilizados

### 🗺️ Mapas
- **Leaflet + OpenStreetMap**: Para visualización de mapas
- **Nominatim**: Para búsqueda de direcciones (autocompletado)

### ☁️ Cloudinary
Para subir imágenes de los parkings. Puedes obtener una cuenta gratuita en:
https://cloudinary.com/

**Plan gratuito incluye:**
- 25 GB de almacenamiento
- 25 GB de ancho de banda
- Suficiente para un MVP/portfolio

## 🚀 Cómo empezar

1. Copia este contenido en tu archivo `.env`
2. Reemplaza `YOUR_CLOUD_NAME` y `YOUR_UPLOAD_PRESET` con tus credenciales de Cloudinary
3. Si estás probando localmente sin backend, puedes usar la API de producción o crear mocks

---

**Nota:** Si encuentras errores al correr el proyecto, verifica que todas las variables estén correctamente configuradas.

