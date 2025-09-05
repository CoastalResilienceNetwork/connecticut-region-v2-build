<script setup>
import MapImageLayer from '@arcgis/core/layers/MapImageLayer'
import Map from '@arcgis/core/Map'
import { onMounted } from 'vue'

onMounted(() => {
  console.log('Map is ready')
  const arcgisMap = document.querySelector('arcgis-map')

  let projects = new MapImageLayer({
    url: 'https://services2.coastalresilience.org/arcgis/rest/services/Connecticut/Regional_Resilience_Projects/MapServer',
    title: 'Regional Resilience Projects',
    id: 'projects',
    sublayers: [{id: 0, visible: false}, {id: 1, visible: false}, {id: 2, visible: false}, {id: 3, visible: false}, {id: 4, visible: false}],
  })

  arcgisMap.map = new Map({
    basemap: 'topo',
    layers: [projects],
  })
})
</script>

<template>
  <arcgis-map
    id="my-map"
    :style="$q.screen.sm || $q.screen.xs ? 'min-height:50vh' : 'calc(100vh - 120px)'"
    center=" -72.53795820793547,  41.10615832681711"
    zoom="8"
  >
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
