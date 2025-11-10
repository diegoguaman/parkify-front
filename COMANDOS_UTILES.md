# 🛠️ COMANDOS ÚTILES - PARKIFY

## 📦 Instalación y Setup

```bash
# Clonar el proyecto
git clone <repository-url>
cd parkify-front

# Instalar dependencias
npm install

# Crear archivo .env
# Copiar y editar con tus valores
cp .env.example .env

# Ejecutar en desarrollo
npm run dev
```

---

## 🚀 Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Compilar TypeScript (sin ejecutar)
npm run build

# Preview de producción local
npm run preview

# Linter (verificar código)
npm run lint
```

---

## 🧪 Testing y Debug

```bash
# Abrir DevTools de React
# En el navegador: Instalar "React Developer Tools"

# Ver logs de WebSocket
# En la consola del navegador:
websocketService.isConnected()

# Ver estado de Zustand
# Instalar: "Redux DevTools" (funciona con Zustand también)

# Limpiar caché
rm -rf node_modules
rm -rf dist
npm install
```

---

## 🔍 Debugging WebSocket

```javascript
// En la consola del navegador:

// 1. Verificar conexión
websocketService.isConnected()

// 2. Ver parkings en store
useParkingStore.getState().nearbyParkings

// 3. Ver disponibilidad
useParkingStore.getState().availability

// 4. Emitir evento manualmente (solo para testing)
websocketService.updateAvailability('parking-id-123', 5)

// 5. Escuchar eventos manualmente
websocketService.getSocket()?.on('parking:availabilityUpdated', console.log)
```

---

## 📱 Testing en Mobile

```bash
# 1. Obtener tu IP local
# Windows:
ipconfig

# Mac/Linux:
ifconfig

# 2. Iniciar servidor con host 0.0.0.0
npm run dev -- --host 0.0.0.0

# 3. Acceder desde mobile
# http://<TU_IP_LOCAL>:5173

# Ejemplo:
# http://192.168.1.100:5173
```

---

## 🌐 Variables de Entorno

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

---

## 🐳 Docker (Opcional)

Si usas Docker para desarrollo:

```bash
# Construir imagen
docker build -t parkify-front .

# Ejecutar contenedor
docker run -p 5173:5173 parkify-front

# Docker Compose
docker-compose up
```

---

## 🔧 Solución de Problemas Comunes

### **Puerto 5173 ocupado**
```bash
# Ver qué proceso usa el puerto
# Windows:
netstat -ano | findstr :5173

# Mac/Linux:
lsof -i :5173

# Matar proceso
# Windows:
taskkill /PID <PID> /F

# Mac/Linux:
kill -9 <PID>

# O usar otro puerto
npm run dev -- --port 3001
```

### **Problemas con node_modules**
```bash
# Limpiar y reinstalar
rm -rf node_modules
rm package-lock.json
npm install
```

### **TypeScript errors persistentes**
```bash
# Reiniciar TS Server
# En VSCode: Ctrl+Shift+P → "TypeScript: Restart TS Server"

# O limpiar cache
rm -rf node_modules/.cache
```

### **Hot Reload no funciona**
```bash
# Incrementar watchers (Linux/Mac)
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

# Windows: Reiniciar VSCode
```

---

## 📊 Análisis de Bundle

```bash
# Analizar tamaño del bundle
npm run build
npx vite-bundle-visualizer

# Ver dependencias grandes
npm run build -- --mode analyze
```

---

## 🔐 Seguridad

```bash
# Auditar dependencias
npm audit

# Fix vulnerabilidades automáticamente
npm audit fix

# Fix forzado (con precaución)
npm audit fix --force

# Actualizar dependencias
npm update
```

---

## 🚢 Deployment

### **Vercel** (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Production deploy
vercel --prod
```

### **Netlify**
```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Production
netlify deploy --prod
```

### **Build Manual**
```bash
# Generar build de producción
npm run build

# Carpeta dist/ contiene los archivos estáticos
# Subir a cualquier hosting (Vercel, Netlify, S3, etc.)
```

---

## 🔄 Git Workflow

```bash
# Feature branch
git checkout -b feature/nueva-funcionalidad

# Commits
git add .
git commit -m "feat: descripción del cambio"

# Push
git push origin feature/nueva-funcionalidad

# Merge a main
git checkout main
git merge feature/nueva-funcionalidad
git push origin main
```

---

## 📝 Convenciones de Commits

```bash
# feat: Nueva funcionalidad
git commit -m "feat: agregar filtro por precio"

# fix: Corrección de bug
git commit -m "fix: corregir cálculo de distancia"

# docs: Documentación
git commit -m "docs: actualizar README"

# style: Formato, sin cambio de lógica
git commit -m "style: formatear código con prettier"

# refactor: Refactorización
git commit -m "refactor: simplificar lógica de WebSocket"

# test: Tests
git commit -m "test: agregar tests para recommendations"

# chore: Tareas de mantenimiento
git commit -m "chore: actualizar dependencias"
```

---

## 🎨 Herramientas Útiles

### **VSCode Extensions**
- ESLint
- Prettier
- TypeScript Vue Plugin (Volar)
- React Developer Tools
- GitLens
- Error Lens

### **Chrome Extensions**
- React Developer Tools
- Redux DevTools
- JSON Formatter
- Wappalyzer

---

## 🔍 Logs y Monitoreo

```bash
# Ver logs en tiempo real
npm run dev 2>&1 | tee logs.txt

# Filtrar errores
npm run dev 2>&1 | grep -i error

# Ver logs de WebSocket
# En consola del navegador activar:
# Settings → Console → Preserve log
```

---

## 🧹 Limpieza

```bash
# Limpiar archivos de build
rm -rf dist

# Limpiar node_modules
rm -rf node_modules

# Limpiar caché de npm
npm cache clean --force

# Limpiar todo y reinstalar
rm -rf node_modules dist package-lock.json
npm install
```

---

## 💡 Tips de Desarrollo

### **1. Auto-import en VSCode**
```json
// settings.json
{
  "typescript.suggest.autoImports": true,
  "javascript.suggest.autoImports": true
}
```

### **2. Snippets útiles**
```typescript
// Crear componente rápido: tsrfc
import { FC } from 'react';

type Props = {};

const ComponentName: FC<Props> = () => {
  return <div>ComponentName</div>;
};

export default ComponentName;
```

### **3. Hot keys útiles**
- `Ctrl + Shift + P`: Command Palette
- `Ctrl + P`: Quick file open
- `F12`: Go to definition
- `Shift + F12`: Find all references
- `Ctrl + .`: Quick fix

---

## 🚨 En caso de emergencia

```bash
# Resetear todo a un commit específico
git reset --hard <commit-hash>

# Descartar todos los cambios locales
git reset --hard HEAD
git clean -fd

# Volver a la última versión que funcionaba
git checkout main
git pull
rm -rf node_modules
npm install
npm run dev
```

---

**¡Desarrollo feliz! 🚀**

