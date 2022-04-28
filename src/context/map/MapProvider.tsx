import React from "react";
import { mapReducer } from "./MapReducer";

import { Map } from "mapbox-gl";

interface IMapBox {
  isMapLoaded: boolean;
  map?: Map;
}

const INITIAL_STATE: IMapBox = {
  isMapLoaded: false,
  map: undefined,
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

  const setMap = (map: Map) => {
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


