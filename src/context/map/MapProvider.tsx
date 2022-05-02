import React, { useEffect } from "react";
import { mapReducer } from "./MapReducer";

import { Map, Marker, Popup } from "mapbox-gl";
import { usePlaces } from "../places/PlacesProvider";

interface IMapBox {
  isMapLoaded: boolean;
  map?: Map;
  markers: Marker[];
}

const INITIAL_STATE: IMapBox = {
  isMapLoaded: false,
  map: undefined,
  markers: []
}

interface IMapContext {
  isMapLoaded: boolean;
  map?: Map;
  setMap: ((map: Map) => void) 
}

export const MapContext = React.createContext<IMapContext>({} as IMapContext);

interface IMapProps {
  children: JSX.Element | JSX.Element[]
}

export const MapProvider = ({ children }: IMapProps) => {
  const [state, dispatch] = React.useReducer(mapReducer, INITIAL_STATE);
  const { places } = usePlaces()

  useEffect(() => {
    state.markers.forEach(marker => marker.remove())
    const newMarkers: Marker[] = []

    for (const place of places) {
      const [ lng, lat] = place.center
      const poup = new Popup()
        .setHTML(`
          <h2>${place.text_ptBr}</h2>
          <p>${place.place_name_ptBr}</p>
        `)
      const newMarker = new Marker()
        .setPopup(poup)
        .setLngLat([lng, lat])
        .addTo(state.map!);

      newMarkers.push(newMarker)
    }

    dispatch({ type: "SET_MARKERS", payload: newMarkers })
  } , [places])

  const setMap = (map: Map) => {
    new Marker()
      .setLngLat(map.getCenter())
      .addTo(map);
    dispatch({
      type: "SET_MAP",
      payload: map,
    });
  }
  
  return (
    <MapContext.Provider value={{...state, setMap}}>
      {children}
    </MapContext.Provider>
  )
}

export const useMap = () => {
  const context = React.useContext(MapContext);
  
  if (context === undefined) {
    throw new Error("useMap must be used within a MapProvider");
  }
  
  return context;
}


