import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "mapbox-gl";
import React, { useEffect } from "react";
import { mapReducer } from "./MapReducer";
import { usePlaces } from "../places/PlacesProvider";
import { IMapBox } from "../../interfaces/map";
import directionsApi from "../../api/directionsApi";
import { DirectionsResponse } from "../../interfaces/directions";

const INITIAL_STATE: IMapBox = {
  isMapLoaded: false,
  map: undefined,
  markers: [],
};

interface IMapContext {
  isMapLoaded: boolean;
  map?: Map;
  setMap: (map: Map) => void;
  generateDirection: (
    start: [number, number],
    end: [number, number]
  ) => Promise<void>;
}

export const MapContext = React.createContext<IMapContext>({} as IMapContext);

interface IMapProps {
  children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({ children }: IMapProps) => {
  const [state, dispatch] = React.useReducer(mapReducer, INITIAL_STATE);
  const { places } = usePlaces();

  useEffect(() => {
    state.markers.forEach((marker) => marker.remove());
    const newMarkers: Marker[] = [];

    for (const place of places) {
      const [lng, lat] = place.center;
      const poup = new Popup().setHTML(`
          <h2>${place.text_ptBr}</h2>
          <p>${place.place_name_ptBr}</p>
        `);
      const newMarker = new Marker()
        .setPopup(poup)
        .setLngLat([lng, lat])
        .addTo(state.map!);

      newMarkers.push(newMarker);
    }

    dispatch({ type: "SET_MARKERS", payload: newMarkers });
  }, [places]);

  const setMap = (map: Map) => {
    new Marker().setLngLat(map.getCenter()).addTo(map);
    dispatch({
      type: "SET_MAP",
      payload: map,
    });
  };

  const generateDirection = async (
    start: [number, number],
    end: [number, number]
  ) => {
    const response = await directionsApi.get<DirectionsResponse>(
      `/${start[0]},${start[1]};${end[0]},${end[1]}`
    );
    const { distance, duration, geometry } = response.data.routes[0];
    const { coordinates: coords } = geometry;

    let kms = distance / 1000;
    kms = Math.round(kms * 100) / 100;
    kms /= 100;

    const minutes = duration / 60;

    const bounds = new LngLatBounds(start, start);

    for (const coord of coords) {
      const newCoord: [number, number] = [coord[0], coord[1]];
      bounds.extend(newCoord);
    }

     state.map?.fitBounds(bounds, {
      padding: 100,
    });

    const sourceData: AnySourceData = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: coords,
            }
          }
        ]
      }
    }

    if ( state.map?.getLayer('RouteString') ) {
      state.map.removeLayer('RouteString')
      state.map.removeSource('RouteString')
    }

    state.map?.addSource('RouteString', sourceData)

    state.map?.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': 'rgb(247, 17, 55)',
        'line-width': 4
      }
    })
   
  }

  return (
    <MapContext.Provider value={{ ...state, setMap, generateDirection }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => {
  const context = React.useContext(MapContext);

  if (context === undefined) {
    throw new Error("useMap must be used within a MapProvider");
  }

  return context;
};
