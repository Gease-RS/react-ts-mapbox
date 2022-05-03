import React from "react";
import { useMap } from "../../context/map/MapProvider";
import { usePlaces } from "../../context/places/PlacesProvider";
import { Feature } from "../../interfaces/places";
import "./styles.css";

export default function SearchResults() {
  const [placeActive, setPlaceActive] = React.useState<Feature | null>(null);
  const { places, isLoadingPlaces, userLocation } = usePlaces();
  const { map, generateDirection } = useMap();

  const onPlaceClick = (place: Feature) => {
    const [lng, lat] = place.center;
    setPlaceActive(place);
    map?.flyTo({
      center: [lng, lat],
      zoom: 15,
    });
  };

  const handleDirections = ( place: Feature ) => {
    if( !userLocation ) return

    const [lng, lat] = place.center;

    generateDirection( userLocation, [lng, lat])
  }

  if (isLoadingPlaces) {
    return <div>Loading...</div>;
  }

  if (places.length === 0) {
    return <></>;
  }

  return (
    <>
      <ul className="search-result-list">
        {isLoadingPlaces && (
          <li className="search-result-item">Carregando...</li>
        )}
        {places.map((place) => (
          <li
            key={place.id}
            className={`search-result-item 
              ${placeActive && placeActive.id === place.id ? "active" : ""}`}
            onClick={() => onPlaceClick(place)}
          >
            {place.place_name}
            <div className="container btn">

            <button
              onClick={() => handleDirections(place)}
              className={`btn-direcoes 
              ${
                placeActive && placeActive.id === place.id
                ? "btn-direcoes-outline"
                : "btn-direcoes"
              }`}
            >
              Direções
            </button>
            </div>
              <hr />
          </li>
        ))}
      </ul>
    </>
  );
}
