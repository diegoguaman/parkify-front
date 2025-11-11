# 🧪 Guía de Pruebas - Nuevas Funcionalidades

## 📦 Archivos Creados/Modificados

### ✨ Nuevos Archivos

1. **`src/features/recommendations/services/RecommendationService.ts`**
   - Servicio para recomendaciones inteligentes del backend
   - Endpoints: `/recommendations/zones`, `/recommendations/parkings`

2. **`src/features/bookings/services/BookingService.ts`**
   - Servicio completo para gestión de reservas
   - Endpoints: `POST /bookings`, `GET /bookings/my`, etc.

3. **`ANALISIS_ENDPOINTS.md`**
   - Análisis completo de endpoints disponibles vs. usados
   - Plan de acción para implementación

4. **`MEJORAS_IMPLEMENTADAS.md`**
   - Resumen detallado de todas las mejoras
   - Comparación antes/después
   - Métricas de mejora

5. **`ENDPOINTS_PENDIENTES.md`**
   - Lista de endpoints disponibles pero no implementados
   - Priorización sugerida
   - Templates de implementación

### 🔧 Archivos Modificados

1. **`src/features/parkings/services/ParkingService.ts`**
   - ➕ `getParkingById(id)` - Obtener detalles de un parking
   - ➕ `getParkingAvailability(id)` - Obtener solo disponibilidad

2. **`src/features/maps/pages/RecommendedPage.tsx`**
   - 🔄 Ahora usa `/recommendations/parkings` para usuarios autenticados
   - 🔄 Fallback a parkings cercanos para usuarios no autenticados
   - 🔄 Loading states y manejo de errores mejorado
   - 🔄 Alert informativo para recomendaciones personalizadas

3. **`src/features/maps/components/ParkingDetailModal.tsx`**
   - ➕ Botón "Reservar Ahora" (formal booking)
   - 🔄 Botón WhatsApp renombrado a "Consultar por WhatsApp"
   - ➕ Mensaje informativo para usuarios no autenticados
   - ➕ Manejo de errores de permisos (rol DRIVER)

---

## 🎯 Escenarios de Prueba

### 1️⃣ Recomendaciones Inteligentes

#### Usuario NO autenticado
```bash
1. Abre la app en modo incógnito (o cierra sesión)
2. Navega a la página principal del mapa
3. Haz click en el botón "Recomendados"
4. Deberías ver:
   - ❌ NO hay banner "Recomendaciones personalizadas"
   - ✅ Muestra parkings cercanos normales
   - ✅ Los datos vienen de nearbyParkings
```

**✅ Resultado esperado:**
```
📍 Estacionamientos Recomendados
[ParkingCard 1]
[ParkingCard 2]
[ParkingCard 3]
```

---

#### Usuario autenticado
```bash
1. Inicia sesión (usuario con cualquier rol)
2. Navega a la página principal del mapa
3. Haz click en el botón "Recomendados"
4. Espera 1-2 segundos (loading)
5. Deberías ver:
   - ✅ Banner azul: "✨ Recomendaciones personalizadas basadas en tu ubicación"
   - ✅ Parkings con mejor score del backend
   - ✅ Ordenados por relevancia
```

**✅ Resultado esperado:**
```
[Alert Info] ✨ Recomendaciones personalizadas basadas en tu ubicación

[ParkingCard 1 - Score alto]
[ParkingCard 2 - Score alto]
[ParkingCard 3 - Score medio]
```

---

#### Error en backend (usuario autenticado)
```bash
1. Inicia sesión
2. Desconecta tu internet o apaga el backend
3. Ve a "Recomendados"
4. Deberías ver:
   - ⚠️ Alert amarillo: "No se pudieron cargar las recomendaciones..."
   - ✅ Fallback a parkings cercanos
   - ✅ La app sigue funcionando
```

**✅ Resultado esperado:**
```
[Alert Warning] No se pudieron cargar las recomendaciones. Mostrando parkings cercanos.

[ParkingCard 1 - nearby]
[ParkingCard 2 - nearby]
```

---

### 2️⃣ Sistema de Reservas Formales

#### Usuario NO autenticado
```bash
1. Abre la app sin iniciar sesión
2. Haz click en cualquier marcador del mapa
3. Se abre el modal de detalles
4. Deberías ver:
   - ❌ NO aparece botón "Reservar Ahora"
   - ✅ Aparece "Consultar por WhatsApp" (verde)
   - ✅ Aparece "Cómo llegar" (outline)
   - ✅ Mensaje: "💡 Inicia sesión para hacer reservas formales..."
```

**✅ Resultado esperado:**
```
[Modal: Parking Centro]

📍 Disponibilidad: 25 plazas disponibles

[Consultar por WhatsApp] (verde)
[Cómo llegar] (outline)

💡 Inicia sesión para hacer reservas formales y gestionar tus bookings
```

---

#### Usuario autenticado SIN rol DRIVER
```bash
1. Inicia sesión con cuenta OWNER (o sin rol DRIVER)
2. Haz click en un parking
3. Haz click en "Reservar Ahora"
4. Deberías ver:
   - ❌ Error Toast: "No tienes permisos para crear reservas..."
   - ✅ Modal se cierra
```

**✅ Resultado esperado:**
```
[Toast Error] No tienes permisos para crear reservas. 
              Verifica que tu cuenta tenga el rol DRIVER.
```

**🔧 Cómo solucionarlo:**
En tu backend, asegúrate de que al registrar usuarios:
- Les asignes el rol DRIVER por defecto, O
- Permitas seleccionar el rol durante el registro

---

#### Usuario autenticado CON rol DRIVER ✅
```bash
1. Inicia sesión con cuenta DRIVER
2. Haz click en un parking con plazas disponibles
3. Se abre el modal
4. Deberías ver:
   - ✅ Botón "Reservar Ahora" (azul, primario)
   - ✅ Botón "Consultar por WhatsApp" (verde)
   - ✅ Botón "Cómo llegar" (outline)
5. Haz click en "Reservar Ahora"
6. Deberías ver:
   - ⏳ Botón cambia a "Reservando..."
   - ⏳ Botón se deshabilita
   - ✅ Toast: "¡Reserva creada exitosamente!"
   - ✅ Modal se cierra
```

**✅ Resultado esperado:**
```
[Modal: Parking Palermo]

📍 Disponibilidad: 10 plazas disponibles

[Reservar Ahora] (azul) ← Click aquí

↓ (cambio visual)

[Reservando...] (azul, disabled)

↓ (después de 1-2 segundos)

[Toast Success] ¡Reserva creada exitosamente!
[Modal se cierra]
```

---

#### Parking SIN plazas disponibles
```bash
1. Inicia sesión (cualquier rol)
2. Haz click en un parking con 0 plazas
3. Deberías ver:
   - ❌ Chip rojo: "Completo"
   - ❌ Botones deshabilitados (gris)
   - ❌ Texto: "No disponible"
```

**✅ Resultado esperado:**
```
[Modal: Parking Puerto Madero]

❌ Completo

[No disponible] (disabled)
[No disponible] (disabled)
[Cómo llegar] (enabled)
```

---

### 3️⃣ Verificar Llamadas a la API

Abre DevTools (F12) → Network → XHR:

#### Sin autenticación
```
✅ GET /parkings/nearby?lat=...&lon=...&radius=5
   Response 200 OK
   
❌ No debería haber llamadas a /recommendations/*
```

#### Con autenticación
```
✅ GET /parkings/nearby?lat=...&lon=...&radius=5
   Response 200 OK
   
✅ GET /recommendations/parkings?lat=...&lon=...&radius=5
   Response 200 OK
   Headers: Authorization: Bearer [token]
```

#### Al crear reserva
```
✅ POST /bookings
   Request body: {
     "parkingId": "...",
     "startTime": "2025-11-11T10:00:00.000Z",
     "endTime": "2025-11-11T12:00:00.000Z"
   }
   Response 201 Created
   Headers: Authorization: Bearer [token]
```

---

## 🐛 Problemas Comunes y Soluciones

### Problema 1: "403 Forbidden" en recomendaciones

**Síntoma:**
```
Error fetching recommendations: 403 Forbidden
```

**Causa:** El token no se está enviando correctamente

**Solución:**
1. Verifica que el token esté en el localStorage:
```javascript
localStorage.getItem('parkify-auth-storage')
```

2. Verifica que el interceptor de Axios esté funcionando:
```typescript
// En axios.ts, debería estar:
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

### Problema 2: "No tienes permisos para crear reservas"

**Síntoma:**
```
Toast: No tienes permisos para crear reservas. 
       Verifica que tu cuenta tenga el rol DRIVER.
```

**Causa:** Tu usuario no tiene el rol DRIVER en el backend

**Solución en el backend (NestJS):**

```typescript
// En tu AuthService o RegistrationService
async register(data: RegisterDto) {
  const user = await this.userRepository.create({
    ...data,
    roles: ['DRIVER'], // ← Asignar rol DRIVER por defecto
  });
  
  return user;
}
```

O permitir selección de rol en el formulario de registro.

---

### Problema 3: Recomendaciones no se actualizan

**Síntoma:** Siempre muestra los mismos parkings

**Causa:** `useEffect` con dependencias incorrectas

**Solución:** Ya está implementada, pero verifica:
```typescript
useEffect(() => {
  fetchRecommendations();
}, [isAuthenticated, location, nearbyParkings]); // ← Dependencias correctas
```

---

### Problema 4: Modal de reserva se queda en "Reservando..."

**Síntoma:** Botón nunca vuelve a "Reservar Ahora"

**Causa:** Error en la petición que no se maneja correctamente

**Solución:** Ya está implementada con `finally`:
```typescript
try {
  await createBooking(...);
  toast.success('¡Reserva creada exitosamente!');
  onClose();
} catch (error) {
  toast.error('Error al crear la reserva');
} finally {
  setIsBooking(false); // ← Siempre se ejecuta
}
```

---

## 📊 Checklist de Pruebas Completo

### Funcionalidad de Recomendaciones
- [ ] Usuario no autenticado ve parkings cercanos
- [ ] Usuario autenticado ve recomendaciones del backend
- [ ] Banner "Recomendaciones personalizadas" aparece solo para autenticados
- [ ] Loading spinner aparece durante la carga
- [ ] Fallback a parkings cercanos si hay error
- [ ] Alert de error aparece si falla el backend

### Funcionalidad de Reservas
- [ ] Botón "Reservar Ahora" aparece solo para autenticados
- [ ] Botón "Consultar por WhatsApp" aparece para todos
- [ ] Mensaje "Inicia sesión" aparece para no autenticados
- [ ] Click en "Reservar Ahora" crea la reserva
- [ ] Toast de éxito aparece
- [ ] Modal se cierra después de reservar
- [ ] Error de permisos se maneja correctamente
- [ ] Parkings sin plazas muestran botones deshabilitados

### Integración Backend
- [ ] Token se envía en todas las peticiones protegidas
- [ ] `/recommendations/parkings` se llama solo si estás autenticado
- [ ] `POST /bookings` crea la reserva correctamente
- [ ] Errores 403 se manejan gracefully
- [ ] Errores de red se manejan con fallbacks

---

## 🎉 Resultado Final Esperado

Si todo funciona correctamente, deberías poder:

1. ✅ Ver parkings cercanos sin iniciar sesión
2. ✅ Iniciar sesión y ver recomendaciones personalizadas
3. ✅ Hacer click en un parking y ver detalles completos
4. ✅ Reservar un parking formalmente (si tienes rol DRIVER)
5. ✅ Consultar por WhatsApp (siempre disponible)
6. ✅ Obtener direcciones en Google Maps
7. ✅ Ver fallbacks si el backend no está disponible
8. ✅ Recibir mensajes claros de error

---

## 📝 Próximos Pasos Sugeridos

1. **Implementar página "Mis Reservas"**
   - Usar `getMyBookings()` del BookingService
   - Mostrar historial de reservas
   - Permitir cancelar con `cancelBooking()`

2. **Agregar filtros por características**
   - Implementar `GET /features`
   - Checkboxes: WiFi, Cámaras, Carga eléctrica
   - Filtrar parkings en el mapa

3. **Mejorar rol management**
   - Permitir seleccionar rol en registro
   - Mostrar rol actual en el perfil
   - Ocultar features según rol

---

## 📞 Soporte

Si encuentras algún problema durante las pruebas:

1. Verifica la consola del navegador (F12)
2. Verifica las llamadas en Network → XHR
3. Verifica los logs del backend
4. Revisa `ANALISIS_ENDPOINTS.md` para más detalles

