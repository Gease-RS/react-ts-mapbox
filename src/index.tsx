import mapboxgl from 'mapbox-gl';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { PlacesProvider } from './context/places/PlacesProvider';
import './index.css';
import App from './page/App';

mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_TOKEN}`;

if (!navigator.geolocation) {
  alert('Seu navegador não tem opção de geolocalização!');
  throw new Error('Geolocation is not supported by your browser');
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <PlacesProvider>
      <App />
    </PlacesProvider>
  </React.StrictMode>
);
