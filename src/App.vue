<script setup>

//import esri component libs globally so they are available in multiple components
import '@arcgis/map-components/components/arcgis-map'
import '@arcgis/map-components/components/arcgis-legend'
import '@arcgis/map-components/components/arcgis-basemap-gallery'
import '@arcgis/map-components/components/arcgis-layer-list'
import '@arcgis/map-components/components/arcgis-search'

import TheMap from './components/TheMap.vue'

import { useAppStore } from './stores/app'
const appStore = useAppStore()

</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary text-white text-h5 shadow-1">
      <q-toolbar>
          <q-btn flat icon="menu" color="white" padding="none" class="q-mr-md">
      <q-menu>
        <q-list style="min-width: 100px">
          <q-item
            clickable
            v-close-popup
            tag="a"
            target="_blank"
            href="https://www.nature.org/en-us/what-we-do/our-priorities/protect-water-and-land/land-and-water-stories/protecting-our-ocean/?vu=r.v_marine"
          >
            <q-item-section>The Nature Conservancy</q-item-section>
            <q-item-section thumbnail
              ><q-icon class="q-mr-sm" color="grey-4" name="open_in_new"
            /></q-item-section>
          </q-item>
          <q-separator inset />
          <q-item
            clickable
            v-close-popup
            tag="a"
            target="_blank"
            href="https://coastalresilience.org/terms-of-use/"
          >
            <q-item-section>Legal Disclosure</q-item-section>
            <q-item-section thumbnail
              ><q-icon class="q-mr-sm" color="grey-4" name="open_in_new"
            /></q-item-section>
          </q-item>
          <q-separator inset />
          <q-item
            clickable
            v-close-popup
            tag="a"
            target="_blank"
            href="https://maps.coastalresilience.org/"
          >
            <q-item-section>Other Regions</q-item-section>
            <q-item-section thumbnail
              ><q-icon class="q-mr-sm" color="grey-4" name="open_in_new"
            /></q-item-section>
          </q-item>
        </q-list>
      </q-menu>
      <q-space></q-space>
    </q-btn>
    
    
      <p class="q-ma-none"> Coastal Resilience </p>
      <q-separator vertical spaced inset color="white"></q-separator>
      <span class="text-white text-h6 text-weight-light"
        >Connecticut</span
      >
      <q-space></q-space>
      <arcgis-search></arcgis-search>
      </q-toolbar>
    </q-header>

    <q-page-container class="row">
      <div class="col-1 bg-blue-grey-3" style="height: 100vh">
          <q-tabs
          vertical
          class="text-primary"
          indicator-color="primary"
          active-class="text-white bg-primary"
          exact
          >
          <q-route-tab class="border text-caption text-bold" name="start" icon="home" to="/start"> Get <br/> Started </q-route-tab>
          <q-route-tab class="border text-caption text-bold" name="projects" icon="alarm" to="/projects">Resilience <br/> Projects</q-route-tab>
          <q-route-tab class="border text-caption text-bold" name="rPlanning" icon="movie">Regional <br/> Planning</q-route-tab>
          <q-route-tab class="border text-caption text-bold" name="cPlanning" icon="alarm">Community <br/> Planning</q-route-tab>
          <q-route-tab class="border text-caption text-bold" name="futureHab" icon="movie">Future <br/> Habitat</q-route-tab>
          <q-route-tab class="border text-caption text-bold" name="fslr" icon="movie">Flood & <br/> Sea Level Rise</q-route-tab>
          <q-route-tab class="border text-caption text-bold" name="risk" icon="movie">Risk <br/> Explorer</q-route-tab>
        </q-tabs>
      </div>
      <div class="col-3"><RouterView/></div>
      <div class="col-8"><the-map></the-map></div>

    </q-page-container>
  </q-layout>
</template>

<style scoped>
.border{
  border-top: 1px solid lightgrey;
}

</style>
