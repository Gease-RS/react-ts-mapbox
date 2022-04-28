import React from 'react'
import { PlacesProvider } from './context/places/PlacesProvider'

export default function MapApp() {
  return (
    <PlacesProvider>
        <div className="App">
            <header className="App-header">
                <h1>MapApp</h1>
            </header>
        </div>

    </PlacesProvider>
  )
}
