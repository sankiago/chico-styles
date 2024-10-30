import React, { useRef, useEffect } from "react";
import MapView from "@arcgis/core/views/MapView";
import esriConfig from "@arcgis/core/config.js";
import Map from "@arcgis/core/Map.js";
import "./App.css";

import "@esri/calcite-components/dist/components/calcite-combobox.js";
import "@esri/calcite-components/dist/components/calcite-combobox-item";
import "@esri/calcite-components/dist/components/calcite-label";
import { CalciteCombobox, CalciteComboboxItem, CalciteLabel} from "@esri/calcite-components-react";
import '@esri/calcite-components/dist/calcite/calcite.css'

const basemapStyles = [
  { value: "arcgis/navigation-night", label: "Navegación nocturna" },
  { value: "arcgis/streets-relief", label: "Calle y relieve" },
  { value: "arcgis/streets-night", label: "Calle nocturna" },
  { value: "arcgis/colored-pencil", label: "Coloreado a mano" },
  { value: "arcgis/nova", label: "Nova" },
  { value: "arcgis/modern-antique", label: "Antiguo" },
  { value: "arcgis/midcentury", label: "Mediados del sigo" },
  { value: "arcgis/newspaper", label: "Periódico" },
];

function App(){
  // Extrayendo la API KEY
  console.log(import.meta.env.VITE_TEST_VAR)
  esriConfig.apiKey = import.meta.env.VITE_API_KEY;

  // Referencias al DOM
  const mapDiv = useRef(null);
  const viewRef = useRef(null);
  
  useEffect(() => {
    if (mapDiv.current) {
      const map = new Map({
        basemap: "arcgis/nova"
      })

      const view = new MapView({
        container: mapDiv.current,
        map: map,
        center: [-74.04684, 4.681269], // Longitude, latitude
        zoom: 15, // Zoom level
      });
      viewRef.current = view;
    }
    
  }, [mapDiv]);

  const handleBasemapChange = (event) => {
    const selectedBasemap = event.target.value;
    if (selectedBasemap && viewRef.current) {
      viewRef.current.map.basemap = selectedBasemap;
    }
  }

  return <div className="mapDiv" ref={mapDiv}>
      <div className="basemapStyles">
        <CalciteLabel>Estilo del mapa de base</CalciteLabel>
        <CalciteCombobox id="styleCombobox"
          selection-mode="single"
          clear-disabled
          onCalciteComboboxChange={handleBasemapChange}
          value="arcgis/nova"
        >
          {
            basemapStyles.map(({value, label}) => 
              <CalciteComboboxItem value={value} text-label={label}></CalciteComboboxItem> 
            )
          }
        </CalciteCombobox>
      </div>
    </div>
}

export default App;
