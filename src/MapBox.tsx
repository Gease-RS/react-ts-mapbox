import mapboxgl from 'mapbox-gl';
import { useEffect, useState } from "react";
import "./App.css";

mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_TOKEN}`;

interface MapProps {
  center: [number, number];
  zoom: number;
}

const MapBox = () => {
  const [map, setMap] = useState<mapboxgl.Map>();

  const mapProps: MapProps = {
    center: [-51.522351164338595, -29.1746500787817],
    zoom: 14,
  };

  const loadMap = () => {
    const map = new mapboxgl.Map({
      container: "mapbox",
      style: "mapbox://styles/mapbox/streets-v11",
      center: mapProps.center,
      zoom: mapProps.zoom,
    });

    map.on("load", () => {
      setMap(map);
    });
  };

  useEffect(() => {
    loadMap();
  }, []);

  return (
    <div>
      <div id="mapbox" style={{ height: "600px", width: "100%" }} />
    </div>
  );
}

export default MapBox