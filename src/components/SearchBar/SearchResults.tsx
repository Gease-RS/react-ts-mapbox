import { usePlaces } from "../../context/places/PlacesProvider";
import "./styles.css";

export default function SearchResults() {
  const { places, isLoadingPlaces } = usePlaces();
  return (
    <>
      <ul className="search-result-list">
        {isLoadingPlaces && <li className="search-result-item">Carregando...</li>}
        {places.map((place) => (
          <li key={place.id} className="search-result-item">
            {place.place_name}
          </li>
        ))}
        <button className="btn-direcoes">Direções</button>
      </ul>
    </>
  );
}
