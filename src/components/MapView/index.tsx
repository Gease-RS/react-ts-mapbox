import mapboxgl from 'mapbox-gl'
import React, { useLayoutEffect } from 'react'
import { useMap } from '../../context/map/MapProvider'
import { usePlaces } from '../../context/places/PlacesProvider'

export default function MapView() {
    const { isLoading, userLocation } = usePlaces()
    const { setMap } = useMap()
    const mapRef = React.useRef<HTMLDivElement>(null)

    console.log("userLocation", userLocation)

    useLayoutEffect(() => {
        if (!isLoading) {
            const map = new mapboxgl.Map({
                container: mapRef.current!,
                style: "mapbox://styles/mapbox/streets-v11",
                center: userLocation,
                zoom: 14,
              });

              setMap(map)

        }
    }, [isLoading, userLocation])

    if ( isLoading ) {
        return <div>Loading...</div>
    }

  return (
    <div 
        ref={mapRef}
        style={{
            backgroundColor: '#e06',
            width: '100%',
            height: '500px'

        }}
    
    >
        { userLocation?.join(', ') }
    </div>
    
  )
}
