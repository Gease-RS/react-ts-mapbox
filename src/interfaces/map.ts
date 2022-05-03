import { Map, Marker } from "mapbox-gl";

export interface IMapBox {
    isMapLoaded: boolean;
    map?: Map;
    markers: Marker[];
  }