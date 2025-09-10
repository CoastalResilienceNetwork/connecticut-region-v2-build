<script setup>
import MapImageLayer from '@arcgis/core/layers/MapImageLayer'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import Map from '@arcgis/core/Map'
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import { useMapStore } from '@/stores/map'
import { onMounted } from 'vue'


onMounted(() => {
  console.log('Map is ready')
  const arcgisMap = document.querySelector('arcgis-map')
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
  arcgisMap.map = new Map({
    basemap: 'topo',
    layers: [projects, attachments, graphicsLayer],
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
   <arcgis-legend position="bottom-right" legend-style="card"></arcgis-legend>
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

.esri-legend--card__layer-caption{
  margin-bottom: 0px !important;
  padding: 0px !important;
}
</style>
