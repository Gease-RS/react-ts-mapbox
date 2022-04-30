import { Map, Marker } from "mapbox-gl";

interface IMapState {
  isMapLoaded: boolean;
  map?: Map;
  markers: Marker[];
}

type MapAction = 
  | { type: "SET_MAP"; payload: Map }
  | { type: "SET_MARKERS"; payload: Marker[] }

export const mapReducer = (state: IMapState, action: MapAction) => {
  switch (action.type) {
    case "SET_MAP":
      return {
        ...state,
        isMapLoaded: true,
        map: action.payload,
      }

      case "SET_MARKERS":
        return {
          ...state,
          markers: action.payload
        }
    default:
      return state;
  }
};
