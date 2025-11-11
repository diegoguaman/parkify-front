# 🚗 Guía de Carga de Datos de Muestra - Estacionamientos en Madrid

Este documento explica cómo cargar los 5 estacionamientos de muestra en Madrid para demostración y networking.

## 📍 Ubicaciones de los Estacionamientos

Los estacionamientos están ubicados en zonas estratégicas de Madrid:

1. **Parking Plaza Mayor** - Centro histórico (Plaza Mayor)
2. **Parking Retiro** - Junto al Parque del Retiro
3. **Parking Puerta del Sol** - El punto más céntrico de Madrid
4. **Parking Gran Vía** - En la principal avenida comercial
5. **Parking Santiago Bernabéu** - Junto al estadio del Real Madrid

## 🎯 Opción 1: Carga Manual desde el Frontend (Recomendado)

### Pasos:

1. **Inicia sesión en la aplicación** como propietario de parking
2. **Ve a "Registrar Parking"**
3. **Completa el formulario** con los datos de cada parking (ver datos abajo)
4. **Sube una imagen** o usa las URLs proporcionadas

### 📋 Datos para cada parking:

#### 1. Parking Plaza Mayor
```
Nombre: Parking Plaza Mayor
Dirección: Plaza Mayor, 28, 28012 Madrid, España
Coordenadas: 40.4153, -3.7074
Capacidad: 120
Plazas disponibles: 35
Tarifa por hora: 3.50€
Horario: 00:00 - 23:59 (24h)
Teléfono: +34910001000
Imagen: https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800&q=80
```

#### 2. Parking Retiro
```
Nombre: Parking Retiro
Dirección: Calle de Alfonso XII, 28014 Madrid, España
Coordenadas: 40.4153, -3.6844
Capacidad: 80
Plazas disponibles: 22
Tarifa por hora: 2.80€
Horario: 07:00 - 22:00
Teléfono: +34910002000
Imagen: https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&q=80
```

#### 3. Parking Puerta del Sol
```
Nombre: Parking Puerta del Sol
Dirección: Calle Carmen, 1, 28013 Madrid, España
Coordenadas: 40.4169, -3.7035
Capacidad: 150
Plazas disponibles: 8
Tarifa por hora: 4.20€
Horario: 00:00 - 23:59 (24h)
Teléfono: +34910003000
Imagen: https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800&q=80
```

#### 4. Parking Gran Vía
```
Nombre: Parking Gran Vía
Dirección: Gran Vía, 45, 28013 Madrid, España
Coordenadas: 40.4206, -3.7063
Capacidad: 100
Plazas disponibles: 45
Tarifa por hora: 3.80€
Horario: 06:00 - 02:00
Teléfono: +34910004000
Imagen: https://images.unsplash.com/photo-1566933293069-b55c7f326dd4?w=800&q=80
```

#### 5. Parking Estadio Santiago Bernabéu
```
Nombre: Parking Estadio Santiago Bernabéu
Dirección: Avenida de Concha Espina, 1, 28036 Madrid, España
Coordenadas: 40.4530, -3.6883
Capacidad: 200
Plazas disponibles: 120
Tarifa por hora: 3.00€
Horario: 08:00 - 23:00
Teléfono: +34910005000
Imagen: https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&q=80
```

## 🔧 Opción 2: Carga mediante API (Avanzado)

### Requisitos previos:
1. Tener el backend corriendo en Render
2. Tener un usuario registrado con token de autenticación
3. Tener instalado `curl` o Postman

### Ejemplo con curl:

```bash
# 1. Login y obtener token
curl -X POST 'https://tu-backend.onrender.com/api/auth/login' \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "tu-email@example.com",
    "password": "tu-password"
  }'

# 2. Guardar el token que recibes y usarlo en las siguientes peticiones

# 3. Crear Parking Plaza Mayor
curl -X POST 'https://tu-backend.onrender.com/api/parkings/my' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer TU_TOKEN_AQUI' \
  -d '{
    "name": "Parking Plaza Mayor",
    "address": "Plaza Mayor, 28, 28012 Madrid, España",
    "latitude": 40.4153,
    "longitude": -3.7074,
    "capacity": 120,
    "hourlyRate": 3.50,
    "workingHours": "00:00/23:59",
    "parkingPhone": "+34910001000",
    "parkingImageUrl": "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800&q=80",
    "description": "Estacionamiento subterráneo de 3 plantas ubicado en pleno centro histórico de Madrid"
  }'

# 4. Repetir el paso 3 para cada parking cambiando los datos
```

## 🔧 Opción 3: Script Automatizado

### Script en Node.js:

Crea un archivo `load-sample-data.js`:

```javascript
const axios = require('axios');

const API_URL = 'https://tu-backend.onrender.com/api';
const USER_EMAIL = 'tu-email@example.com';
const USER_PASSWORD = 'tu-password';

const parkings = [
  {
    name: "Parking Plaza Mayor",
    address: "Plaza Mayor, 28, 28012 Madrid, España",
    latitude: 40.4153,
    longitude: -3.7074,
    capacity: 120,
    hourlyRate: 3.50,
    workingHours: "00:00/23:59",
    parkingPhone: "+34910001000",
    parkingImageUrl: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800&q=80",
    description: "Estacionamiento subterráneo de 3 plantas ubicado en pleno centro histórico de Madrid"
  },
  {
    name: "Parking Retiro",
    address: "Calle de Alfonso XII, 28014 Madrid, España",
    latitude: 40.4153,
    longitude: -3.6844,
    capacity: 80,
    hourlyRate: 2.80,
    workingHours: "07:00/22:00",
    parkingPhone: "+34910002000",
    parkingImageUrl: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&q=80",
    description: "Parking próximo al Parque del Retiro"
  },
  {
    name: "Parking Puerta del Sol",
    address: "Calle Carmen, 1, 28013 Madrid, España",
    latitude: 40.4169,
    longitude: -3.7035,
    capacity: 150,
    hourlyRate: 4.20,
    workingHours: "00:00/23:59",
    parkingPhone: "+34910003000",
    parkingImageUrl: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800&q=80",
    description: "El parking más céntrico de Madrid"
  },
  {
    name: "Parking Gran Vía",
    address: "Gran Vía, 45, 28013 Madrid, España",
    latitude: 40.4206,
    longitude: -3.7063,
    capacity: 100,
    hourlyRate: 3.80,
    workingHours: "06:00/02:00",
    parkingPhone: "+34910004000",
    parkingImageUrl: "https://images.unsplash.com/photo-1566933293069-b55c7f326dd4?w=800&q=80",
    description: "Parking en plena Gran Vía"
  },
  {
    name: "Parking Estadio Santiago Bernabéu",
    address: "Avenida de Concha Espina, 1, 28036 Madrid, España",
    latitude: 40.4530,
    longitude: -3.6883,
    capacity: 200,
    hourlyRate: 3.00,
    workingHours: "08:00/23:00",
    parkingPhone: "+34910005000",
    parkingImageUrl: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&q=80",
    description: "Gran parking junto al estadio Santiago Bernabéu"
  }
];

async function loadSampleData() {
  try {
    // 1. Login
    console.log('🔐 Iniciando sesión...');
    const loginResponse = await axios.post(`${API_URL}/auth/login`, {
      email: USER_EMAIL,
      password: USER_PASSWORD
    });
    
    const token = loginResponse.data.token;
    console.log('✅ Sesión iniciada correctamente');

    // 2. Crear parkings
    for (const parking of parkings) {
      console.log(`\n📍 Creando: ${parking.name}...`);
      
      try {
        await axios.post(`${API_URL}/parkings/my`, parking, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        console.log(`✅ ${parking.name} creado exitosamente`);
      } catch (error) {
        console.error(`❌ Error al crear ${parking.name}:`, error.response?.data || error.message);
      }
      
      // Esperar 1 segundo entre cada creación
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('\n🎉 ¡Proceso completado!');
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

loadSampleData();
```

### Ejecutar el script:

```bash
# 1. Instalar axios si no lo tienes
npm install axios

# 2. Editar el script con tus credenciales

# 3. Ejecutar
node load-sample-data.js
```

## 📊 Verificar los datos cargados

Una vez cargados los datos, puedes verificarlos de varias formas:

### Desde el Frontend:
1. Ve a la página del mapa (`/mapa`)
2. Centra el mapa en Madrid (coordenadas: 40.4168, -3.7038)
3. Ajusta el radio de búsqueda a 5-10km
4. Deberías ver los 5 marcadores de los parkings

### Desde la API:
```bash
curl 'https://tu-backend.onrender.com/api/parkings/nearby?lat=40.4168&lon=-3.7038&radius=5000'
```

## 🗺️ Visualización en el Mapa

Para centrar el mapa en Madrid automáticamente al cargar la aplicación, puedes usar estas coordenadas:

- **Latitud:** 40.4168
- **Longitud:** -3.7038
- **Zoom recomendado:** 13-14

Esto mostrará todos los parkings en un área visible del centro de Madrid.

## 💡 Consejos para la Demostración

1. **Orden de presentación sugerido:**
   - Parking Puerta del Sol (más céntrico y conocido)
   - Parking Plaza Mayor (histórico)
   - Parking Gran Vía (comercial)
   - Parking Retiro (turístico)
   - Parking Bernabéu (eventos)

2. **Puntos destacados para cada parking:**
   - **Plaza Mayor:** Acceso 24h, ideal para residentes del centro
   - **Retiro:** Tarifa económica, perfecto para visitantes del parque
   - **Puerta del Sol:** El más céntrico pero también el más demandado (pocas plazas)
   - **Gran Vía:** Zona comercial y de ocio, horario extendido
   - **Bernabéu:** Gran capacidad, ideal para eventos masivos

3. **Funcionalidades a demostrar:**
   - Búsqueda de parkings cercanos
   - Filtrado por disponibilidad
   - Ordenamiento por distancia/precio
   - Actualización en tiempo real de disponibilidad
   - Detalles de cada parking con imágenes

## 🆘 Solución de Problemas

### Error: "Parking already exists"
- Cada usuario solo puede tener un parking
- Usa diferentes usuarios para crear múltiples parkings
- O modifica el backend para permitir múltiples parkings por usuario

### Los parkings no aparecen en el mapa
- Verifica que las coordenadas estén correctas
- Asegúrate de que el radio de búsqueda sea suficiente (mínimo 5km)
- Comprueba que el backend esté respondiendo correctamente

### Error de autenticación
- Verifica que el token no haya expirado
- Asegúrate de incluir "Bearer " antes del token
- Comprueba que el usuario tenga permisos de propietario

## 📞 Contacto

Si tienes problemas al cargar los datos, revisa:
1. La documentación del backend
2. Los logs del servidor en Render
3. La consola del navegador para errores de CORS

---

**¡Buena suerte con tu demostración! 🚀**

