import { useRef } from 'react';
import { usePlaces } from '../../context/places/PlacesProvider';
import SearchResults from './SearchResults';
import './styles.css'

export default function SearchBar() {
    const { searchPlaces } = usePlaces();
    const debounceRef = useRef<NodeJS.Timeout>();

    const onChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(debounceRef.current) {
            clearTimeout(debounceRef.current);
        }
        debounceRef.current = setTimeout(() => {
            searchPlaces(e.target.value);
        }, 1000);
    }
  return (
    <div className='container search-container'>
        <input 
            className='search-input' 
            type='text' 
            placeholder='Buscar...' 
            onChange={onChangeQuery}
        />

        <SearchResults />
    </div>
  )
}
