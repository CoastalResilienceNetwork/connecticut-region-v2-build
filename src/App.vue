<script setup>
//import esri component libs globally so they are available in multiple components
import '@arcgis/map-components/components/arcgis-map'
import '@arcgis/map-components/components/arcgis-legend'
import '@arcgis/map-components/components/arcgis-basemap-toggle'
import '@arcgis/map-components/components/arcgis-layer-list'
import '@arcgis/map-components/components/arcgis-search'
import '@arcgis/map-components/components/arcgis-distance-measurement-2d'
import '@arcgis/map-components/components/arcgis-expand'
import { ref, computed, onMounted } from 'vue'
import TheMap from './components/TheMap.vue'
import { useMapStore } from './stores/map.js'
import { useRoute } from 'vue-router'
import { useShepherd } from 'vue-shepherd'
const tour = useShepherd({
  useModalOverlay: true,
})
const mapStore = useMapStore()
const route = useRoute()
const navState = ref(true)
const getNavWidth = computed(() => {
  return navState.value ? 'max-width: 180px' : 'max-width: 60px'
})
const getWidth = computed(() => {
  const pixelWidths = {
    start: 350,
    projects: 435,
    rPlanning: 300,
    cPlanning: 300,
    futurehab: 300,
    risk: 350,
    fslr: 350,
  }

  return 'max-width:' + pixelWidths[route.name] + 'px'
})
onMounted(async () => {
  tour.addStep({
    attachTo: { element: '#nav', on: 'right' },
    title: '1: Navigation Menu',
    text: "Each item listed in the sidebar is a mini Coastal Resilience app. These apps are intended to address a specific coastal issue for resilience, restoration and adaptation planning. You can have multiple apps running at the same time; Apps with a layer list will persist visibility of layers as you navigate other apps.  Use the clear map button to remove all layers from the map.",
    cancelIcon: {
      enabled: true,
      label: '✖',
      className: 'shepherd-cancel-icon',
    },
    buttons: [
      {
        text: 'Next',
        action: tour.next,
      },
    ],
  },
 )
 
 tour.addStep({
    attachTo: { element: '#clear', on: 'bottom' },
    title: '2: Map Tools',
    text: "The tools located around the periphery of the map, let you explore the map: measure distance, zoom in and out on the map, clear the map of additonal layers and graphics, change the basemap, and view the legend.",
    cancelIcon: {
      enabled: true,
      label: '✖',
      className: 'shepherd-cancel-icon',
    },
    buttons: [
      {
        text: 'Finish',
        action: tour.cancel
        ,
      },
    ],
  },
 )
})
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

        <p class="q-ma-none">Coastal Resilience</p>
        <q-separator vertical spaced inset color="white"></q-separator>
        <span class="text-white text-h6 text-weight-light">Connecticut</span>
        <q-space></q-space>
        <arcgis-search></arcgis-search>
      </q-toolbar>
    </q-header>

    <q-page-container class="row">
      <div class="col bg-blue-grey-3" :style="getNavWidth" id="nav">
        <q-tabs
          vertical
          class="text-primary text-left"
          indicator-color="primary"
          active-class="text-white bg-primary text-weight-bold"
          exact
        >
          <q-route-tab
            :ripple="false"
            class="border text-caption text-bold"
            name="start"
            to="/start"
            ><q-tooltip v-if="!navState">Get Started</q-tooltip>
            <q-item class="q-pa-none">
              <q-item-section class="" avatar>
                <q-icon name="home" size="40px"></q-icon>
              </q-item-section>

              <q-item-section v-if="navState">
                <q-item-label class="text-left"
                  >Get<br />
                  Started</q-item-label
                >
              </q-item-section>
            </q-item>
          </q-route-tab>
          <q-route-tab
            :ripple="false"
            class="border text-caption text-bold"
            name="fslr"
            to="/sea-level-rise"
            ><q-tooltip v-if="!navState">Flood & Sea Level Rise</q-tooltip>
            <q-item class="q-pa-none">
              <q-item-section class="" avatar>
                <q-img src="img/fslr_icon_sm.png"></q-img>
              </q-item-section>

              <q-item-section v-if="navState">
                <q-item-label class="text-left"
                  >Flood &<br />
                  Sea Level Rise</q-item-label
                >
              </q-item-section>
            </q-item>
          </q-route-tab>
          <q-route-tab
            :ripple="false"
            class="border text-caption text-bold"
            name="futureHab"
            to="/future-habitat"
            ><q-tooltip v-if="!navState">Future Habitat</q-tooltip>
            <q-item class="q-pa-none">
              <q-item-section class="" avatar>
                <q-img src="img/futhab_icon_sm.png"></q-img>
              </q-item-section>

              <q-item-section v-if="navState">
                <q-item-label class="text-left"
                  >Future<br />
                  Habitat</q-item-label
                >
              </q-item-section>
            </q-item>
          </q-route-tab>
          <q-route-tab
            :ripple="false"
            class="border text-caption text-bold"
            name="projects"
            to="/projects"
            ><q-tooltip v-if="!navState">Regional Resilience Projects</q-tooltip>

            <q-item class="q-pa-none">
              <q-item-section class="" avatar>
                <q-img class="bg-white" src="img/projects_icon_sm.png"></q-img>
              </q-item-section>

              <q-item-section v-if="navState">
                <q-item-label class="text-left"
                  >Resilience<br />
                  Projects</q-item-label
                >
              </q-item-section>
            </q-item>
          </q-route-tab>
          <q-route-tab
            :ripple="false"
            class="border text-caption text-bold"
            name="rPlanning"
            to="/regional-planning"
            ><q-tooltip v-if="!navState">Regional Planning</q-tooltip>
            <q-item class="q-pa-none">
              <q-item-section class="" avatar>
                <q-img class="" src="img/rPlanning_icon_sm.png"></q-img>
              </q-item-section>

              <q-item-section v-if="navState">
                <q-item-label class="text-left"
                  >Regional<br />
                  Planning</q-item-label
                >
              </q-item-section>
            </q-item>
          </q-route-tab>
          <q-route-tab
            :ripple="false"
            class="border text-caption text-bold"
            name="cPlanning"
            to="/community-planning"
            ><q-tooltip v-if="!navState">Community Planning</q-tooltip>
            <q-item class="q-pa-none">
              <q-item-section class="" avatar>
                <q-img src="img/cPlanning_icon_sm.png"></q-img>
              </q-item-section>

              <q-item-section v-if="navState">
                <q-item-label class="text-left"
                  >Community<br />
                  Planning</q-item-label
                >
              </q-item-section>
            </q-item>
          </q-route-tab>
          <q-route-tab
            :ripple="false"
            class="border text-caption text-bold"
            name="risk"
            to="/risk-explorer"
            ><q-tooltip v-if="!navState">Risk Explorer</q-tooltip>
            <q-item class="q-pa-none">
              <q-item-section class="" avatar>
                <q-img src="img/risk_icon_sm.png"></q-img>
              </q-item-section>

              <q-item-section v-if="navState">
                <q-item-label class="text-left">Risk<br />Explorer</q-item-label>
              </q-item-section>
            </q-item>
          </q-route-tab>
        </q-tabs>
        <q-btn 
        v-if="!navState"
        style="position: absolute; bottom: 80px; left: 2px;" padding="12px" size="sm" color="secondary" stack icon="tour"
        @click="tour.start()" square unelevated >start <br/> tour</q-btn>
        <q-btn 
        v-if="navState"
        style="position: absolute; bottom: 80px; left: 2px;" padding="12px" size="sm" color="secondary" icon="tour"
        @click="tour.start()" square unelevated label="Start tour"></q-btn>
        <div
          style="position: absolute; bottom: 5px; left: 130px"
          class="half-circle"
          v-if="navState"
        >
          <q-btn
            flat
            round
            padding="xs"
            size="xl"
            color="white"
            icon="chevron_left"
            @click="navState = false"
          ></q-btn>
        </div>
        <div
          style="position: absolute; bottom: 5px; left: 10px"
          class="half-circle"
          v-if="!navState"
        >
          <q-btn
            flat
            round
            padding="xs"
            size="xl"
            color="white"
            icon="chevron_right"
            @click="navState = true"
          ></q-btn>
        </div>
      </div>
      <div class="col" :style="getWidth">
        <router-view v-slot="{ Component }">
          <KeepAlive include="FloodSeaLevelRise">
            <component :is="Component" />
          </KeepAlive>
        </router-view>
      </div>
      <div class="col"><the-map></the-map></div>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.border {
  border: 1px solid lightgrey;
}
.q-tab {
  justify-content: flex-start !important;
  text-align: left !important;
}
.half-circle {
  width: 50px;
  height: 50px;
  background-color: #003646;
  border-radius: 100px 0 0 100px; /* Top-left, Top-right, Bottom-right, Bottom-left */
}
</style>
