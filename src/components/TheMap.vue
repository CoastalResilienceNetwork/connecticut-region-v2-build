<script setup>
import MapImageLayer from '@arcgis/core/layers/MapImageLayer'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import TileLayer from '@arcgis/core/layers/TileLayer'
import Map from '@arcgis/core/Map'
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import { useMapStore } from '@/stores/map'
import { onMounted } from 'vue'


onMounted(() => {

  console.log('Map is ready')
  const arcgisMap = document.querySelector('arcgis-map')
  //Resilient Projects tab
  const graphicsLayer = new GraphicsLayer({
   id: 'graphicsLayer'
  });
  let projects = new MapImageLayer({
    url: 'https://services2.coastalresilience.org/arcgis/rest/services/Connecticut/Regional_Resilience_Projects/MapServer',
    title: '',
    id: 'projects',
    sublayers: [{id: 0, visible: false, definitionExpression: '1=1'}, {id: 1, visible: false, definitionExpression: '1=1'}, {id: 2, visible: false, definitionExpression: '1=1'}, {id: 3, visible: false, definitionExpression: '1=1'}, {id: 4, visible: false, definitionExpression: '1=1'}],
  })
  let attachments = new FeatureLayer({
    url: 'https://services2.coastalresilience.org/arcgis/rest/services/Connecticut/Regional_Resilience_Projects/MapServer',
    id: 'attachments',
    visible: false
  })
  //Regional Planning, Community Planning & Future Habitat tabs
  let connecticut = new MapImageLayer({
    url: 'https://services2.coastalresilience.org/arcgis/rest/services/Connecticut/Connecticut/MapServer',
    title: 'Connecticut',
    id: 'connecticut',
  })
  //Risk explorer tab
  let riskExplorer = new MapImageLayer({
    url: 'https://services2.coastalresilience.org/arcgis/rest/services/Connecticut/Risk_Explorer_CT/MapServer',
    title: 'Risk Explorer',
    id: 'riskExplorer',
    sublayers: [
     { id: 0, visible: false, opacity: 1.0},
    ],
  })  
  //Flood and Sea Level Rise tab
  let floodSeaLevelRise = new MapImageLayer({
    url: 'https://services2.coastalresilience.org/arcgis/rest/services/Connecticut/Flood_SLR/MapServer',
    title: 'Flood and Sea Level Rise',
    id: 'floodSeaLevelRise',
    sublayers: [
     { id: 0, visible: false, opacity: 1.0}, { id: 1, visible: false, title: 'Connecticut - 2080 - Med - Category 2' }, { id: 2, visible: false, opacity: 1.0},
      { id: 3, visible: false, opacity: 1.0}, { id: 4, visible: false, title: 'Connecticut - 2050 - Med - Category 2' }, { id: 5, visible: false, opacity: 1.0},
      { id: 6, visible: false, opacity: 1.0}, { id: 7, visible: false, title:'Connecticut - 2020 - Med - Category 2 ' }, { id: 8, visible: false, opacity: 1.0},
      { id: 9, visible: false, opacity: 1.0}, { id: 10, visible: false, title: 'Connecticut - 2080 - Med - Category 3' }, { id: 11, visible: false, opacity: 1.0},
      { id: 12, visible: false, opacity: 1.0}, { id: 13, visible: false, title: 'Connecticut - 2050 - Med - Category 3' }, { id: 14, visible: false, opacity: 1.0},
      { id: 15, visible: false, opacity: 1.0}, { id: 16, visible: false, title: 'Connecticut - 2020 - Med - Category 3' }, { id: 17, visible: false, opacity: 1.0},
      { id: 18, visible: false, opacity: 1.0}, { id: 19, visible: false, title: 'Connecticut - 2080 - Med - No Storm' }, { id: 20, visible: false, opacity: 1.0},
      { id: 21, visible: false, opacity: 1.0}, { id: 22, visible: false, title: 'Connecticut - 2050 - Med - No Storm' }, { id: 23, visible: false, opacity: 1.0},
      { id: 24, visible: false, opacity: 1.0}, { id: 25, visible: false, title: 'Connecticut - 2020 - Med - No Storm' }, { id: 26, visible: false, opacity: 1.0},
      { id: 27, visible: false, opacity: 1.0}, { id: 28, visible: false, opacity: 1.0}
    ],
  })  
  let noaa0 = new TileLayer({
    url: 'https://maps1.coast.noaa.gov/arcgis/rest/services/dc_slr/slr_0ft/MapServer',
    visible: false,
    id: 'noaa0'
  })
  let noaa1 = new TileLayer({
    url: 'https://maps1.coast.noaa.gov/arcgis/rest/services/dc_slr/slr_1ft/MapServer',
    visible: false,
    id: 'noaa1'
  })
  let noaa2 = new TileLayer({
    url: 'https://maps1.coast.noaa.gov/arcgis/rest/services/dc_slr/slr_2ft/MapServer',
    visible: false,
    id: 'noaa2'
  })
  let noaa3 = new TileLayer({
    url: 'https://maps1.coast.noaa.gov/arcgis/rest/services/dc_slr/slr_3ft/MapServer',
    visible: false,
    id: 'noaa3'
  })
  let noaa4 = new TileLayer({
    url: 'https://maps1.coast.noaa.gov/arcgis/rest/services/dc_slr/slr_4ft/MapServer',
    visible: false,
    id: 'noaa4'
  })
  let noaa5 = new TileLayer({
    url: 'https://maps1.coast.noaa.gov/arcgis/rest/services/dc_slr/slr_5ft/MapServer',
    visible: false,
    id: 'noaa5'
  })
  let noaa6 = new TileLayer({
    url: 'https://maps1.coast.noaa.gov/arcgis/rest/services/dc_slr/slr_6ft/MapServer',
    visible: false,
    id: 'noaa6'
  })

  
  arcgisMap.map = new Map({
    basemap: 'topo',
    layers: [projects, attachments, graphicsLayer, floodSeaLevelRise, noaa0, noaa1, noaa2, noaa3, noaa4, noaa5, noaa6, connecticut, riskExplorer],
  })

  arcgisMap.addEventListener("arcgisViewReadyChange", (event) => {
    const { view } = event.target;
    const mapStore = useMapStore()
    view.on("click", (event) => {
      mapStore.executeIdentify(event.mapPoint)
      });
  });
})
</script>

<template>
  <arcgis-map
    id="my-map"
    :style="$q.screen.sm || $q.screen.xs ? 'min-height:50vh' : 'calc(100vh - 120px)'"
    center=" -72.53795820793547,  41.10615832681711"
    zoom="8"
  >
   <arcgis-legend position="bottom-right" legend-style="classic" ></arcgis-legend>
   <arcgis-basemap-toggle position="top-right" :next-basemap="'satellite'"></arcgis-basemap-toggle>
   <div style="position: absolute; top: 100px; right: 15px; z-index: 10;">
    <q-btn icon="layers" square :ripple="false" class="bg-white text-primary" label="clear all" size="12px" />
   </div>
   
  </arcgis-map>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import 'https://js.arcgis.com/4.32/esri/themes/light/main.css';

#my-map {
  flex: 1;
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
}

.esri-view .esri-view-surface--touch-none:focus::after {
  outline: none !important;
}

.esri-popup .sizer { width: 500px !important; }



</style>
