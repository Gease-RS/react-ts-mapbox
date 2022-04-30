import { usePlaces } from "../../context/places/PlacesProvider";
import "./styles.css";

export default function SearchResults() {
  const { places, isLoadingPlaces } = usePlaces();

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
          <li key={place.id} className="search-result-item">
            {place.place_name}
            <button className="btn-direcoes">Direções</button>
          </li>
        ))}
      </ul>
    </>
  );
}
