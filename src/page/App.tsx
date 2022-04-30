import React from "react";
import BtnCenterLocation from "../components/BtnCenterLocation";
import MapView from "../components/MapView";
import SearchBar from "../components/SearchBar";
import "./App.css";

export default function App() {
  return (
    <>
      <div className="App">
        <h1>Get Localização</h1>
      </div>
      <MapView />
      <BtnCenterLocation />
      <SearchBar />
    </>
  );
}
