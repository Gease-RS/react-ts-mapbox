import { useMap } from '../../context/map/MapProvider';
import { usePlaces } from '../../context/places/PlacesProvider';
import './styles.css';

export default function BtnCenterLocation() {
    const { map, isMapLoaded } = useMap();
    const { userLocation } = usePlaces();

    const handleCenter = () => {
        if (isMapLoaded) {
            map?.flyTo({
                center: userLocation,
                zoom: 14,
            });
        } else {
            console.log('Map not loaded yet');
        }
    }

    return (
      <button
          className='btn-center-location'
            onClick={handleCenter}
          style={{
              position: 'fixed',
              top: '120px',
              right: '30px',
              zIndex: '100'
          }}
      >
          Centralizar
      </button>
    )
  }
  