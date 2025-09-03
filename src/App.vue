<script setup>
//import esri component libs globally so they are available in multiple components
import '@arcgis/map-components/components/arcgis-map'
import '@arcgis/map-components/components/arcgis-legend'
import '@arcgis/map-components/components/arcgis-basemap-gallery'
import '@arcgis/map-components/components/arcgis-layer-list'
import '@arcgis/map-components/components/arcgis-search'

import TheMap from './components/TheMap.vue'
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
      <div class="col bg-blue-grey-3" style="height: 100vh">
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
 
          >
          <q-item>
            <q-item-section class="" avatar>
              <q-icon name="home" size="40px"></q-icon>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-left">Get<br/> Started</q-item-label>
            </q-item-section>
          </q-item>
          </q-route-tab>
          <q-route-tab
            :ripple="false"
            class="border text-caption text-bold"
            name="projects"
            to="/projects"
          
          >
          <q-item>
            <q-item-section class="" avatar>
              <q-img class="bg-white" src="img/projects_icon_sm.png"></q-img>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-left">Resilience<br/> Projects</q-item-label>
            </q-item-section>
          </q-item>
        </q-route-tab>
         <q-route-tab
            :ripple="false"
            class="border text-caption text-bold"
            name="rPlanning"
            to="/regional-planning"
          >
          <q-item>
            <q-item-section class="" avatar>
              <q-img class="" src="img/rPlanning_icon_sm.png"></q-img>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-left">Regional<br/> Planning</q-item-label>
            </q-item-section>
          </q-item>
          </q-route-tab>
          <q-route-tab
            :ripple="false"
            class="border text-caption text-bold"
            name="cPlanning"
            to="/community-planning"
          >
           <q-item>
            <q-item-section class="" avatar>
              <q-img class="" src="img/cPlanning_icon_sm.png"></q-img>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-left">Community<br/> Planning</q-item-label>
            </q-item-section>
          </q-item>
          </q-route-tab>
          <q-route-tab
            :ripple="false"
            class="border text-caption text-bold"
            name="futureHab"
            to="/future-habitat"
          >
           <q-item>
            <q-item-section class="" avatar>
              <q-img class="" src="img/futhab_icon_sm.png"></q-img>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-left">Future<br/> Habitat</q-item-label>
            </q-item-section>
          </q-item>
           </q-route-tab>
          <q-route-tab
            :ripple="false"
            class="border text-caption text-bold"
            name="fslr"
            to="/sea-level-rise"
          >
            <q-item>
              <q-item-section class="" avatar>
                <q-img class="" src="img/fslr_icon_sm.png"></q-img>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-left">Flood &<br/> Sea Level Rise</q-item-label>
              </q-item-section>
            </q-item>
          </q-route-tab>
          <q-route-tab
            :ripple="false"
            class="border text-caption text-bold"
            name="risk"
            to="/risk-explorer"
          >
            <q-item>
              <q-item-section class="" avatar>
                <q-img class="" src="img/risk_icon_sm.png"></q-img>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-left">Risk<br/>Explorer</q-item-label>
              </q-item-section>
            </q-item>
           </q-route-tab>
        </q-tabs>
      </div>
      <div class="col-3"><RouterView /></div>
      <div class="col-7"><the-map></the-map></div>
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
</style>
