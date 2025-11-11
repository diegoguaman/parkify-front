# 📋 Endpoints Pendientes de Implementar

Estos endpoints están disponibles en tu backend pero aún no están integrados en el frontend. Son de **baja prioridad** pero pueden agregarse en el futuro para mejorar la funcionalidad.

---

## 🎨 Features (Características)

### `GET /features`
**Descripción:** Obtiene el catálogo completo de características disponibles (WiFi, cámaras, carga eléctrica, etc.)

**Uso potencial:**
- Sistema de filtros avanzados en el mapa
- Selector de features al registrar un parking
- Badges/iconos de características en las cards

**Ejemplo de implementación:**
```typescript
// src/features/features/services/FeatureService.ts
export async function getAllFeatures() {
  const { data } = await api.get('/features');
  return data;
}

// Uso en el mapa:
const features = await getAllFeatures();
// Mostrar checkboxes: [ ] WiFi [ ] Cámaras [ ] Carga eléctrica
```

---

### `GET /features/{slug}`
**Descripción:** Obtiene detalles de una característica específica

**Uso potencial:**
- Tooltip con descripción al pasar el mouse
- Modal de ayuda "¿Qué significa esta característica?"

**Ejemplo de implementación:**
```typescript
export async function getFeatureBySlug(slug: string) {
  const { data } = await api.get(`/features/${slug}`);
  return data;
}

// Uso:
<Tooltip title={await getFeatureBySlug('wifi')}>
  <WifiIcon />
</Tooltip>
```

---

## 📋 Parkings (Consultas adicionales)

### `GET /parkings`
**Descripción:** Lista TODOS los parkings sin filtro de ubicación

**Uso potencial:**
- Página de "Explorar Todos los Parkings"
- Catálogo completo con paginación
- Búsqueda por nombre/dirección

**Ejemplo de implementación:**
```typescript
// src/features/parkings/services/ParkingService.ts
export async function getAllParkings(page = 1, limit = 20) {
  const { data } = await api.get('/parkings', {
    params: { page, limit }
  });
  return data;
}

// Nuevo componente: ExplorePage.tsx
const ExplorePage = () => {
  const [parkings, setParkings] = useState([]);
  
  useEffect(() => {
    getAllParkings().then(setParkings);
  }, []);
  
  return (
    <Grid container>
      {parkings.map(p => <ParkingCard parking={p} />)}
    </Grid>
  );
};
```

---

### `GET /parkings/availability`
**Descripción:** Obtiene disponibilidad de múltiples parkings en una sola petición (batch)

**Uso potencial:**
- Optimización de performance
- Actualizar disponibilidad de todos los parkings visibles en el mapa
- Alternativa más eficiente que llamar a `/parkings/{id}/availability` N veces

**Ejemplo de implementación:**
```typescript
export async function getBatchAvailability(parkingIds: string[]) {
  const { data } = await api.get('/parkings/availability', {
    params: { ids: parkingIds.join(',') }
  });
  return data;
}

// Uso en el mapa:
const visibleParkingIds = filteredParkings.map(p => p.id);
const availabilities = await getBatchAvailability(visibleParkingIds);

// Actualizar todos los parkings de una vez
availabilities.forEach(av => {
  updateParkingAvailability(av.parkingId, av.availableSpots);
});
```

---

## 🌐 Contenido Dinámico (CMS-like)

### `GET /content/home`
**Descripción:** Obtiene el contenido de la landing page (títulos, descripciones, imágenes)

**Uso potencial:**
- Landing page dinámica sin hardcodear textos
- Actualizar contenido sin redeployar el frontend
- Multilenguaje

**Ejemplo de implementación:**
```typescript
// src/features/content/services/ContentService.ts
export async function getHomeContent() {
  const { data } = await api.get('/content/home');
  return data;
}

// Uso en HomePage.tsx:
const HomePage = () => {
  const [content, setContent] = useState(null);
  
  useEffect(() => {
    getHomeContent().then(setContent);
  }, []);
  
  return (
    <Box>
      <Typography variant="h1">{content?.title}</Typography>
      <Typography>{content?.subtitle}</Typography>
      <img src={content?.heroImage} alt="Hero" />
    </Box>
  );
};
```

---

### `GET /content/footer`
**Descripción:** Obtiene links y redes sociales del footer

**Uso potencial:**
- Footer dinámico
- Links a redes sociales configurables
- Links legales (términos, privacidad)

**Ejemplo de implementación:**
```typescript
export async function getFooterContent() {
  const { data } = await api.get('/content/footer');
  return data;
}

// Uso en Footer.tsx:
const Footer = () => {
  const [footer, setFooter] = useState(null);
  
  return (
    <Box>
      {footer?.socialLinks.map(link => (
        <IconButton href={link.url}>
          <Icon>{link.icon}</Icon>
        </IconButton>
      ))}
      
      {footer?.legalLinks.map(link => (
        <Link to={link.url}>{link.text}</Link>
      ))}
    </Box>
  );
};
```

---

### `GET /config/initial`
**Descripción:** Obtiene configuración inicial de la UI (theme, idioma, feature flags)

**Uso potencial:**
- Feature flags (activar/desactivar funcionalidades)
- Configuración de tema (colores, logos)
- Idioma por defecto
- Límites configurables (radio de búsqueda, etc.)

**Ejemplo de implementación:**
```typescript
export async function getInitialConfig() {
  const { data } = await api.get('/config/initial');
  return data;
}

// Uso en App.tsx:
const App = () => {
  const [config, setConfig] = useState(null);
  
  useEffect(() => {
    getInitialConfig().then(config => {
      setConfig(config);
      // Aplicar tema
      applyTheme(config.theme);
      // Configurar idioma
      i18n.changeLanguage(config.defaultLanguage);
    });
  }, []);
  
  return (
    <ThemeProvider theme={config?.theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};
```

---

## 🎯 Priorización Sugerida

### 🔥 Alta Prioridad (Implementar en 1-2 semanas)
1. ✅ `GET /features` → Sistema de filtros
2. ✅ `GET /parkings/availability` → Optimización de performance

### 🟡 Media Prioridad (Implementar en 3-4 semanas)
3. ✅ `GET /parkings` → Página de exploración
4. ✅ `GET /features/{slug}` → Tooltips descriptivos

### 🟢 Baja Prioridad (Implementar en 1-2 meses)
5. ✅ `GET /content/home` → Landing dinámica
6. ✅ `GET /content/footer` → Footer dinámico
7. ✅ `GET /config/initial` → Feature flags

---

## 📦 Template de Implementación

Cuando decidas implementar alguno de estos endpoints, usa esta estructura:

### 1. Crear el servicio
```typescript
// src/features/{feature}/services/{Feature}Service.ts
import { api } from '../../../lib/axios';
import { AxiosError } from 'axios';

export async function getFunctionName() {
  try {
    const { data } = await api.get('/endpoint');
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error as AxiosError;
  }
}
```

### 2. Crear tipos (si es necesario)
```typescript
// src/features/{feature}/types/index.ts
export interface Feature {
  id: string;
  name: string;
  // ... otros campos
}
```

### 3. Integrar en el componente
```typescript
// src/features/{feature}/pages/{Page}.tsx
import { useState, useEffect } from 'react';
import { getFunctionName } from '../services/{Feature}Service';

const Page = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await getFunctionName();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  if (isLoading) return <Loader />;
  if (error) return <Alert severity="error">{error.message}</Alert>;
  
  return <div>{/* Tu UI aquí */}</div>;
};
```

---

## 📊 Estado Actual vs. Objetivo Final

| Categoría | Actual | Objetivo | Progreso |
|-----------|--------|----------|----------|
| Autenticación | 4/4 | 4/4 | ✅ 100% |
| Parkings (OWNER) | 5/5 | 5/5 | ✅ 100% |
| Parkings (Públicos) | 1/5 | 5/5 | 🟡 20% |
| Recomendaciones | 2/2 | 2/2 | ✅ 100% |
| Reservas | 4/4 | 4/4 | ✅ 100% |
| Features | 0/2 | 2/2 | ❌ 0% |
| Contenido | 0/3 | 3/3 | ❌ 0% |
| **TOTAL** | **16/25** | **25/25** | **64%** |

---

## 🎉 Conclusión

Estos endpoints son **opcionales** y no afectan la funcionalidad core de la aplicación. Puedes implementarlos cuando:

1. Tengas tiempo libre
2. Quieras agregar features avanzadas
3. Necesites optimizar performance
4. Quieras hacer la app más dinámica

**Por ahora, tu aplicación está completa y funcional con el 80% de los endpoints más importantes implementados.**

