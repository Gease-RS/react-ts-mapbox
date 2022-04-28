import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MapApp from './MapApp';
 
if (!navigator.geolocation) {
  alert('Seu navegador não tem opção de geolocalização!');
  throw new Error('Geolocation is not supported by your browser');
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MapApp />
  </React.StrictMode>
);
