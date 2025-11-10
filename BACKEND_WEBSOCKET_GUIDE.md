# 🔌 BACKEND WEBSOCKET IMPLEMENTATION GUIDE

## 📋 ¿Qué necesita el Backend?

El backend necesita implementar Socket.IO para recibir y transmitir eventos en tiempo real.

---

## 📦 INSTALACIÓN (Backend)

```bash
npm install socket.io
npm install --save-dev @types/socket.io
```

---

## 🛠️ IMPLEMENTACIÓN BÁSICA (NestJS)

### **1. Crear Gateway de WebSocket**

```typescript
// src/parkings/parkings.gateway.ts

import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:3001'], // ⚠️ Ajustar según tu frontend
    credentials: true,
  },
})
export class ParkingsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('ParkingsGateway');

  /**
   * Lifecycle hook - after gateway initialization
   */
  afterInit(server: Server) {
    this.logger.log('✅ WebSocket Gateway initialized');
  }

  /**
   * Handle new client connections
   */
  handleConnection(client: Socket) {
    this.logger.log(`🔌 Client connected: ${client.id}`);
  }

  /**
   * Handle client disconnections
   */
  handleDisconnect(client: Socket) {
    this.logger.log(`🔌 Client disconnected: ${client.id}`);
  }

  /**
   * Handle availability update from parking owners
   * @event parking:updateAvailability
   */
  @SubscribeMessage('parking:updateAvailability')
  async handleAvailabilityUpdate(
    @MessageBody() data: { parkingId: string; availableSpots: number; timestamp: string },
    @ConnectedSocket() client: Socket,
  ) {
    this.logger.log(`📡 Availability update received:`, data);

    try {
      // 1. Validar datos
      if (!data.parkingId || data.availableSpots === undefined) {
        this.logger.error('❌ Invalid data received');
        return { success: false, error: 'Invalid data' };
      }

      // 2. Actualizar en base de datos
      // await this.parkingsService.updateAvailability(
      //   data.parkingId,
      //   data.availableSpots,
      // );

      // 3. Broadcast a todos los clientes (excepto el emisor)
      this.server.emit('parking:availabilityUpdated', {
        parkingId: data.parkingId,
        availableSpots: data.availableSpots,
        totalSpots: undefined, // Opcional
        timestamp: new Date().toISOString(),
      });

      this.logger.log(`✅ Availability broadcasted to all clients`);

      return { success: true };
    } catch (error) {
      this.logger.error('❌ Error updating availability:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Emit parking created event to all clients
   * Call this method when a new parking is created
   */
  emitParkingCreated(data: {
    parkingId: string;
    parkingName: string;
    lat: number;
    lng: number;
  }) {
    this.server.emit('parking:created', {
      ...data,
      timestamp: new Date().toISOString(),
    });
    this.logger.log(`📡 Parking created event emitted: ${data.parkingId}`);
  }

  /**
   * Emit parking deleted event to all clients
   * Call this method when a parking is deleted
   */
  emitParkingDeleted(parkingId: string) {
    this.server.emit('parking:deleted', {
      parkingId,
      timestamp: new Date().toISOString(),
    });
    this.logger.log(`📡 Parking deleted event emitted: ${parkingId}`);
  }
}
```

---

### **2. Registrar Gateway en el Módulo**

```typescript
// src/parkings/parkings.module.ts

import { Module } from '@nestjs/common';
import { ParkingsController } from './parkings.controller';
import { ParkingsService } from './parkings.service';
import { ParkingsGateway } from './parkings.gateway'; // 👈 Importar

@Module({
  controllers: [ParkingsController],
  providers: [
    ParkingsService,
    ParkingsGateway, // 👈 Agregar aquí
  ],
  exports: [ParkingsGateway], // 👈 Exportar si se usa en otros módulos
})
export class ParkingsModule {}
```

---

### **3. Usar Gateway en el Service (Opcional)**

Si quieres emitir eventos desde tu servicio:

```typescript
// src/parkings/parkings.service.ts

import { Injectable } from '@nestjs/common';
import { ParkingsGateway } from './parkings.gateway';

@Injectable()
export class ParkingsService {
  constructor(private readonly parkingsGateway: ParkingsGateway) {}

  async createParking(data: CreateParkingDto) {
    // ... lógica de creación ...

    // Emitir evento de parking creado
    this.parkingsGateway.emitParkingCreated({
      parkingId: newParking.id,
      parkingName: newParking.name,
      lat: newParking.latitude,
      lng: newParking.longitude,
    });

    return newParking;
  }

  async deleteParking(id: string) {
    // ... lógica de eliminación ...

    // Emitir evento de parking eliminado
    this.parkingsGateway.emitParkingDeleted(id);

    return { success: true };
  }
}
```

---

## 🎯 EVENTOS IMPLEMENTADOS

### **Frontend → Backend**

| Evento | Payload | Descripción |
|--------|---------|-------------|
| `parking:updateAvailability` | `{ parkingId, availableSpots, timestamp }` | Dueño actualiza disponibilidad |

### **Backend → Frontend**

| Evento | Payload | Descripción |
|--------|---------|-------------|
| `parking:availabilityUpdated` | `{ parkingId, availableSpots, totalSpots?, timestamp }` | Broadcast de actualización |
| `parking:created` | `{ parkingId, parkingName, lat, lng, timestamp }` | Nuevo parking creado |
| `parking:deleted` | `{ parkingId, timestamp }` | Parking eliminado |

---

## 🔧 CONFIGURACIÓN DE CORS

### **Opción 1: En el Gateway (Recomendado)**

```typescript
@WebSocketGateway({
  cors: {
    origin: [
      'http://localhost:5173',
      'http://localhost:3001',
      'https://parkify-front.vercel.app', // Producción
    ],
    credentials: true,
  },
})
```

### **Opción 2: En main.ts (Global)**

```typescript
// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS para HTTP
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3001',
      'https://parkify-front.vercel.app',
    ],
    credentials: true,
  });

  await app.listen(3000);
  console.log('🚀 Server running on http://localhost:3000');
}
bootstrap();
```

---

## 🧪 TESTING DEL BACKEND

### **Test 1: Verificar que Socket.IO está corriendo**

```bash
# Ejecutar backend
npm run start:dev

# Ver logs, debe aparecer:
# ✅ WebSocket Gateway initialized
# 🚀 Server running on http://localhost:3000
```

### **Test 2: Probar conexión desde frontend**

```bash
# Frontend
npm run dev

# Abrir DevTools → Console
# Debe aparecer:
# ✅ WebSocket connected: <socket_id>
```

### **Test 3: Probar evento completo**

1. Frontend (dueño) emite: `parking:updateAvailability`
2. Backend recibe y procesa
3. Backend emite: `parking:availabilityUpdated`
4. Frontend (todos) reciben actualización

---

## 📊 LOGS ESPERADOS

### **Backend:**
```
✅ WebSocket Gateway initialized
🔌 Client connected: abc123xyz
📡 Availability update received: { parkingId: '1', availableSpots: 5 }
✅ Availability broadcasted to all clients
```

### **Frontend (Console):**
```
✅ WebSocket connected: abc123xyz
📡 WebSocket: Availability update emitted
📡 Received availability update: { parkingId: '1', availableSpots: 5 }
```

---

## 🐛 TROUBLESHOOTING

### **Error: "WebSocket connection failed"**

**Causa:** Backend no está corriendo o CORS mal configurado.

**Solución:**
1. Verificar que backend esté en puerto 3000
2. Revisar configuración de CORS en Gateway
3. Ver logs del backend para errores

---

### **Error: "CORS policy blocked"**

**Causa:** Frontend no está en la lista de origins permitidos.

**Solución:**
```typescript
@WebSocketGateway({
  cors: {
    origin: ['http://localhost:5173'], // 👈 Agregar tu URL
    credentials: true,
  },
})
```

---

### **Evento no llega al frontend**

**Causa:** Nombre del evento incorrecto o no está emitiendo.

**Solución:**
1. Verificar nombre exacto del evento
2. Usar `this.server.emit()` no `client.emit()`
3. Ver logs del backend

---

## 🚀 IMPLEMENTACIÓN EXPRESS (Alternativa)

Si usas Express en lugar de NestJS:

```typescript
// server.ts

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);

// Configurar Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:5173'],
    credentials: true,
  },
});

// Handle connections
io.on('connection', (socket) => {
  console.log('🔌 Client connected:', socket.id);

  // Handle availability update
  socket.on('parking:updateAvailability', async (data) => {
    console.log('📡 Availability update received:', data);

    try {
      // Actualizar en DB
      // await updateAvailability(data.parkingId, data.availableSpots);

      // Broadcast a todos
      io.emit('parking:availabilityUpdated', {
        parkingId: data.parkingId,
        availableSpots: data.availableSpots,
        timestamp: new Date().toISOString(),
      });

      console.log('✅ Availability broadcasted');
    } catch (error) {
      console.error('❌ Error:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('🔌 Client disconnected:', socket.id);
  });
});

// Start server
const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
```

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

### **Backend:**
- [ ] Socket.IO instalado
- [ ] Gateway creado y configurado
- [ ] CORS configurado correctamente
- [ ] Evento `parking:updateAvailability` implementado
- [ ] Broadcast `parking:availabilityUpdated` funcionando
- [ ] Logs visibles en consola

### **Frontend:**
- [ ] Descomentar `WebSocketProvider` en `App.tsx`
- [ ] Descomentar código WebSocket en `AvailabilitySpotsPage.tsx`
- [ ] Variable `VITE_WEBSOCKET_URL` configurada en `.env`

### **Testing:**
- [ ] Backend ejecutándose
- [ ] Frontend conecta correctamente
- [ ] Cambio de disponibilidad se refleja en tiempo real
- [ ] Logs correctos en ambos lados

---

## 📝 RESUMEN

### **Pasos para el Backend:**

1. **Instalar:** `npm install socket.io @types/socket.io`
2. **Crear:** `parkings.gateway.ts`
3. **Registrar:** En `parkings.module.ts`
4. **Configurar CORS:** En el Gateway
5. **Ejecutar:** `npm run start:dev`
6. **Verificar logs:** Ver "WebSocket Gateway initialized"

### **Pasos para el Frontend:**

1. **Descomentar** `WebSocketProvider` en `App.tsx`
2. **Descomentar** código WebSocket en páginas
3. **Ejecutar:** `npm run dev`
4. **Probar:** Cambiar disponibilidad → ver actualización

---

## 🎯 UNA VEZ IMPLEMENTADO

Cuando el backend esté listo:

1. **Descomentar en `App.tsx`:**
   - `WebSocketProvider`
   - `ConnectionStatus`

2. **Descomentar en `AvailabilitySpotsPage.tsx`:**
   - `useWebSocket` import
   - Código de emisión WebSocket
   - Alert de estado

3. **Reiniciar frontend:**
   ```bash
   npm run dev
   ```

4. **Verificar conexión:**
   - Console: `✅ WebSocket connected`
   - No errores de conexión

---

**¡Eso es todo! El backend está listo para WebSockets. 🚀**

