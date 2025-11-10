# ⚙️ Configuración de Variables de Entorno

## 📝 Instrucciones

Para que la aplicación funcione correctamente con WebSockets, necesitas crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

## 🔧 Archivo `.env`

Crea un archivo llamado `.env` en la raíz del proyecto (`parkify-front/.env`) con el siguiente contenido:

```env
# API Configuration
VITE_API_URL=http://localhost:3000/api

# WebSocket Configuration (⚠️ IMPORTANTE para tiempo real)
VITE_WEBSOCKET_URL=http://localhost:3000

# Router Mode
VITE_ROUTER_MODE=hash
```

## 🌐 Configuración por Entorno

### **Desarrollo Local**
```env
VITE_API_URL=http://localhost:3000/api
VITE_WEBSOCKET_URL=http://localhost:3000
VITE_ROUTER_MODE=hash
```

### **Producción**
```env
VITE_API_URL=https://api.parkify.com/api
VITE_WEBSOCKET_URL=https://api.parkify.com
VITE_ROUTER_MODE=browser
```

### **Testing/Staging**
```env
VITE_API_URL=https://staging-api.parkify.com/api
VITE_WEBSOCKET_URL=https://staging-api.parkify.com
VITE_ROUTER_MODE=hash
```

## 📌 Notas Importantes

1. **VITE_WEBSOCKET_URL**: 
   - Debe apuntar al servidor backend que ejecuta Socket.IO
   - NO incluir `/socket.io` al final (se agrega automáticamente)
   - Debe usar el mismo protocolo que el servidor (http/https)

2. **VITE_API_URL**: 
   - URL base para las peticiones REST API
   - Incluir `/api` al final si tu backend lo usa

3. **VITE_ROUTER_MODE**: 
   - `hash`: Usa HashRouter (#/mapa)
   - `browser`: Usa BrowserRouter (/mapa) - requiere configuración del servidor

## ✅ Verificación

Después de crear el archivo `.env`:

1. Reinicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Abre la consola del navegador y busca:
   ```
   ✅ WebSocket connected: <socket_id>
   ```

3. Si ves este mensaje, ¡todo está configurado correctamente! 🎉

## ❌ Troubleshooting

### Error: "WebSocket connection failed"
- Verifica que `VITE_WEBSOCKET_URL` sea correcto
- Asegúrate de que el backend esté corriendo
- Revisa la configuración de CORS en el backend

### Error: "Failed to fetch parkings"
- Verifica que `VITE_API_URL` sea correcto
- Comprueba que el backend responda en esa URL

### Variables no se cargan
- Asegúrate de que el archivo se llame exactamente `.env`
- Las variables deben empezar con `VITE_`
- Reinicia el servidor después de crear/modificar el `.env`

## 🔒 Seguridad

⚠️ **IMPORTANTE**: 
- Nunca subas el archivo `.env` a Git
- El archivo `.gitignore` ya debe incluir `.env`
- Para compartir configuración, usa `.env.example`

