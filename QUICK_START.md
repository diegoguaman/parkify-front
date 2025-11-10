# ⚡ QUICK START - PARKIFY MVP

## 🚀 Start en 3 minutos

### 1️⃣ Instalar dependencias (si aún no lo hiciste)
```bash
npm install
```

### 2️⃣ Configurar variables de entorno

Crear archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:3000/api
VITE_WEBSOCKET_URL=http://localhost:3000
VITE_ROUTER_MODE=hash
```

### 3️⃣ Ejecutar el proyecto
```bash
npm run dev
```

✅ **¡Listo!** El proyecto está corriendo en `http://localhost:5173`

---

## 🧪 Probar WebSockets en 1 minuto

### Setup:
1. **Ventana 1:** Login como dueño → Ir a "Disponibilidad"
2. **Ventana 2:** Abrir mapa público (`/#/mapa`)

### Test:
1. En **Ventana 1**: Cambiar disponibilidad → Guardar
2. En **Ventana 2**: Ver actualización automática ✨

**Logs esperados en consola:**
```
✅ WebSocket connected: abc123
📡 WebSocket: Availability update emitted
📡 Received availability update: { parkingId, availableSpots }
```

---

## 📁 Archivos Importantes

### **WebSockets:**
- `src/services/websocket.service.ts` - Servicio principal
- `src/hooks/useWebSocket.ts` - Hook
- `src/providers/WebSocketProvider.tsx` - Provider

### **Recomendaciones:**
- `src/features/maps/utils/recommendations.ts` - Algoritmo
- `src/features/maps/components/RecommendedZones.tsx` - Visualización
- `src/features/maps/components/RecommendationsPanel.tsx` - Panel

### **Modal + WhatsApp:**
- `src/features/maps/components/ParkingDetailModal.tsx`

### **Manejo de Errores:**
- `src/shared/ui/components/ConnectionStatus.tsx`
- `src/features/maps/components/LocationPermissionModal.tsx`

---

## 📚 Documentación Completa

| Documento | Descripción |
|-----------|-------------|
| `PLAN_IMPLEMENTACION_MVP.md` | Plan completo del MVP (7-10 días) |
| `README_WEBSOCKETS.md` | Guía completa de WebSockets |
| `RESUMEN_IMPLEMENTACION.md` | Checklist de testing y resumen |
| `COMANDOS_UTILES.md` | Comandos para desarrollo |
| `CONFIGURACION_ENV.md` | Configuración de variables de entorno |

---

## 🎯 Funcionalidades Clave

### ✅ **WebSockets (Tiempo Real)**
- Conexión automática al servidor
- Reconexión automática si se cae
- Actualización en vivo sin recargar
- Indicador de estado de conexión

### ✅ **Recomendaciones Visuales**
- Círculos de colores en el mapa
- Panel lateral con zonas
- Cálculo inteligente de mejores zonas
- Actualización en tiempo real

### ✅ **Modal de Detalles + WhatsApp**
- Click en marcador → modal
- Información completa del parking
- Botón de reserva por WhatsApp
- Mensaje prellenado automáticamente

### ✅ **Manejo de Errores**
- Banner cuando está offline
- Modal de permisos de ubicación
- Fallback a ubicación por defecto
- Feedback claro al usuario

---

## 🐛 Problemas Comunes

### **WebSocket no conecta**
```bash
# 1. Verificar backend está corriendo
# 2. Verificar .env
cat .env

# 3. Ver logs
# Abrir DevTools → Console
```

### **Mapa no se muestra**
```bash
# Limpiar caché y reinstalar
rm -rf node_modules dist
npm install
npm run dev
```

### **Puerto ocupado**
```bash
# Usar otro puerto
npm run dev -- --port 3001
```

---

## 💡 Tips Rápidos

### **Ver estado en consola:**
```javascript
// WebSocket conectado?
websocketService.isConnected()

// Ver parkings
useParkingStore.getState().nearbyParkings

// Ver disponibilidad
useParkingStore.getState().availability
```

### **Testing en mobile:**
```bash
# 1. Obtener IP local
ipconfig  # Windows
ifconfig  # Mac/Linux

# 2. Iniciar con host
npm run dev -- --host 0.0.0.0

# 3. Acceder desde mobile
# http://<TU_IP>:5173
```

---

## ✅ Checklist Rápido

- [ ] Dependencias instaladas (`npm install`)
- [ ] Archivo `.env` configurado
- [ ] Backend corriendo
- [ ] Proyecto ejecutándose (`npm run dev`)
- [ ] WebSocket conectado (ver consola)
- [ ] Mapa se muestra correctamente
- [ ] Marcadores aparecen en el mapa
- [ ] Modal abre al click en marcador
- [ ] Recomendaciones visibles (círculos + panel)
- [ ] WhatsApp funciona

---

## 🆘 Ayuda

Si tienes problemas:

1. **Revisar consola del navegador** → Buscar errores
2. **Leer `RESUMEN_IMPLEMENTACION.md`** → Sección troubleshooting
3. **Verificar .env** → Variables correctas
4. **Reiniciar todo:**
   ```bash
   npm run dev
   # Ctrl+C para detener
   # Ejecutar de nuevo
   ```

---

## 🎉 ¡Todo listo!

**El MVP de Parkify está completo.**

Para más detalles, consulta:
- 📄 `PLAN_IMPLEMENTACION_MVP.md` - Plan completo
- 📄 `README_WEBSOCKETS.md` - Guía de WebSockets
- 📄 `RESUMEN_IMPLEMENTACION.md` - Testing y checklist

**Happy coding! 🚀🅿️**

