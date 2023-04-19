import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect, useState } from "react";

import Map, { Layer, MapLayerMouseEvent, Source } from "react-map-gl";
import "./App.css";
import { geoLayer, overlayData, geoLayerLine } from "./overlays";

// You need to make this private file api.ts yourself!
import { ACCESS_TOKEN } from "./private/api";
import BoundsInputBox from "./components/BoundsInputBox";
import QueryInputBox from "./components/QueryInputBox";

interface LatLong {
  lat: number;
  long: number;
}

function onMapClick(e: MapLayerMouseEvent) {
  console.log(e.lngLat.lat);
  console.log(e.lngLat.lng);
}


function App() {
  const ProvidenceLatLong: LatLong = { lat: 41.824, long: -71.4128 };
  const initialZoom = 5;
// initial state of the map
  const [viewState, setViewState] = useState({
    longitude: ProvidenceLatLong.long,
    latitude: ProvidenceLatLong.lat,
    zoom: initialZoom,
  });

  const [searchOverlay, setSearchOverlay] = useState<GeoJSON.FeatureCollection | undefined>(undefined);
  const [showSearchOverlay, setSearchShowOverlay] = useState(true); 
  const [showBoundsOverlay, setBoundsShowOverlay] = useState(true); 

  /**
 * shourtcuts for keyword highlighting
 * @param event 
 */
// ctrl + o then ctrl + p to toggle the search keyword overlay
// ctrl + x to toggle the bounds overlay
  function handleKeyDown(event: KeyboardEvent) {
    if (event.ctrlKey) {   
      if (event.key === 'o') {
        console.log("o pressed");
        setSearchShowOverlay(!showSearchOverlay);
        setSearchOverlay(undefined);
      
        console.log(searchOverlay);
      }
      if (event.key === 'p') {
        console.log("p pressed");
        setSearchShowOverlay(!showSearchOverlay);
        console.log(searchOverlay);
      }
      if (event.key === 'x') {
        console.log("x pressed");
        setBoundsShowOverlay(!showBoundsOverlay);
      }
  }
}
window.addEventListener('keydown', handleKeyDown);

  const [overlay, setOverlay] = useState<GeoJSON.FeatureCollection | undefined>(
    undefined
  );

/**
 * sets the overlay based on data from the backend
 */
  useEffect(() => {
    overlayData().then((response) => {
      setOverlay(response);
    });
  }, []);

  const handleSetOverlay = (mapData: GeoJSON.FeatureCollection | undefined) => {
    setOverlay(mapData);
  };



  const handleSetSearchOverlay = (
    mapData: GeoJSON.FeatureCollection | undefined
  ) => {
    setSearchOverlay(mapData);
  };



  return (
    <div className="App" id="appID">
      <Map
        mapboxAccessToken={ACCESS_TOKEN}
        {...viewState}
        onMove={(ev) => setViewState(ev.viewState)}
        style={{ width: window.innerWidth, height: window.innerHeight }}
        mapStyle={"mapbox://styles/mapbox/dark-v10"}
        onClick={(ev: MapLayerMouseEvent) => onMapClick(ev)}
      >
       {showBoundsOverlay && (<Source id="geo_data" type="geojson" data={overlay}>
          <Layer {...geoLayer} />
        </Source>)}

        {showSearchOverlay && (<Source id="geo_data_line" type="geojson" data={searchOverlay}>
              <Layer {...geoLayerLine} />
        </Source>)}
      </Map>
    <div>
      <BoundsInputBox setState={handleSetOverlay} />
      <QueryInputBox setState={handleSetSearchOverlay} />
    </div>
    </div>
      
    
  );}

export default App;
