import React from "react";
import { useMap } from "../../context/map/MapProvider";
import { usePlaces } from "../../context/places/PlacesProvider";
import { Feature } from "../../interfaces/places";
import "./styles.css";

export default function SearchResults() {
  const  [ placeActive, setPlaceActive ] = React.useState<Feature | null>(null);
  const { places, isLoadingPlaces } = usePlaces();
  const { map } = useMap()

  console.log(places, "Pagina RESULTADOS");

  const onPlaceClick = (place: Feature) => {
    const [lng, lat] = place.center;
    map?.flyTo({
      center: [lng, lat],
      zoom: 15,
    });
  }

  if (isLoadingPlaces) {
    return <div>Loading...</div>;
  }

  if ( places.length === 0 ) {
    return <></>
  }

  return (
    <>
      <ul className="search-result-list">
        {isLoadingPlaces && <li className="search-result-item">Carregando...</li>}
        {places.map((place) => (
          <li 
            key={place.id} 
            className="search-result-item"
            onClick={() => onPlaceClick(place)}
            >
            {place.place_name}
            <button className="btn-direcoes">Direções</button>
          </li>
        ))}
      </ul>
    </>
  );
}
