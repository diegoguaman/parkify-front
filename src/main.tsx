import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { MapWrapper } from './features/maps/components/MapWrapper.tsx'
// Leaflet CSS - Required for maps to work properly
import 'leaflet/dist/leaflet.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MapWrapper>
      <App />
    </MapWrapper>    
  </React.StrictMode>,
)
