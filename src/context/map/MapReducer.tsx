import { Map } from 'mapbox-gl';

interface IMapState {
    isMapLoaded: boolean;
    map?: Map;
  }

  type MapAction = {
    type: 'SET_MAP'
    payload: Map
  }

export const mapReducer = (state: IMapState, action: MapAction) => {
    switch (action.type) {
        case "SET_MAP":
        return {
            ...state,
            isMapLoaded: true,
            map: action.payload,
        };
        default:
        return state;
    }
}