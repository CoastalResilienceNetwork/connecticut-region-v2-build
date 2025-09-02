<script setup>
import { useMapStore } from '@/stores/map'
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'

const mapStore = useMapStore()
const showMore = ref(false)
const showMore1 = ref(false)

function goToLayers(tab, layerGroup) {
  mapStore.tab = tab
  mapStore.activeGroup = layerGroup
}

const $q = useQuasar()
const mobile = computed(() => {
  return $q.screen.lt.sm || $q.screen.lt.xs ? true : false
})

function expandItemGroup() {
  // Get a reference to the arcgis-layer-list component.
  const arcgisLayerList = document.querySelector('arcgis-layer-list')

  // A function that executes each time a ListItem is created for a layer.
  arcgisLayerList.listItemCreatedFunction = (event) => {
    const { item } = event
    //console.log('item', item.layer.layer)
    // Add a calcite slider for updating opacity on group layers.
    if (item.layer.layer) {
      if (item.layer.layer.type === 'map-image' || item.layer.layer.type === 'feature') {
        const div = document.createElement('div')
        div.id = 'opacity-slider'
        div.innerHTML = 'Opacity'
        const slider = document.createElement('calcite-slider')
        slider.labelHandles = true
        slider.labelTicks = true
        slider.min = 0
        slider.minLabel = '0'
        slider.max = 1
        slider.maxLabel = '1'
        slider.scale = 's'
        slider.step = 0.01
        slider.value = 1
        slider.ticks = 0.5

        slider.addEventListener('calciteSliderChange', () => {
          item.layer.opacity = slider.value
        })

        div.appendChild(slider)

        item.panel = {
          content: div,
          icon: 'chevron-down',
          title: 'Change layer opacity',
        }
      }

      //list.item.hidden = true; // Hide the Local Landscapes laye
    }
    if (item.layer.title === 'Storm Surge Category 5') {
      console.log(item.layer.hidden)
      item.layer.hidden = true
    }
    //open the group if it is the active group
    if (item.title == mapStore.activeGroup) {
      item.open = true
    }
    if (item.title == 'DUMMY') {
      item.layer.layer.listmode = 'none'
    }
  }
}
</script>
<template>
  <div class="bg-blue-grey-1 q-pt-sm" >
    <div class="">
      <q-tabs
        v-model="mapStore.tab"
        dense
        class="text-primary bg-white q-mx-sm bg-white"
        active-color="white"
        active-bg-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab name="about" label="About" icon="home" />
        <q-tab name="layers" label="View Layers" icon="layers" />
      </q-tabs>
    </div>
    <q-tab-panels v-model="mapStore.tab" animated class="bg-blue-grey-1 q-px-sm">

      <q-tab-panel name="about" class="q-mt-sm q-pt-none q-px-none" style="background: #F4F2E6;
      background: linear-gradient(180deg,rgba(244, 242, 230, 1) 0%, rgba(243, 242, 230, 1) 24%, rgba(230, 235, 226, 1) 45%, rgba(210, 225, 220, 1) 67%, rgba(212, 218, 202, 1) 100%);">
        <q-scroll-area
          class="q-px-md"
          :style="mobile ? 'height: calc(100vh - 390px); background-color: rgba(255, 255, 255, 0.89);' : 'height: calc(100vh - 124px);background-color: rgba(252, 253, 254, 0.5);'"

        >
          <!-- top level menu bar -->
          <div>
            <p class="text-h5 q-mt-md q-mb-none text-primary text-bold">
              Explore Georgia Coastal Resilience
            </p>
            <q-separator inset spaced color="primary"></q-separator>
          </div>

          <p class="text-body1">
            The Coastal Resilience decision-support tool provides communities access to the best
            available science and local data on coastal hazards to visualize their risks and examine
            where nature can increase resilience and reduce risk through conservation and
            restoration activities. For additional project information, visit the
            <a href="http://coastalresilience.org/project/georgia">Georgia</a> home page.
          </p>
         

          <div class="row q-mt-md flex-center q-pa-sm">
            <div class="col-9">
              <p class="text-h5 q-mb-none text-primary">CRS Explorer</p>
            </div>
            <div class="col-3">
              <q-btn
                @click="goToLayers('layers', 'CRS Explorer')"
                text-color="white"
                unelevated
                square
                size="sm"
                color="primary"
                >GO to</q-btn
              >
            </div>
          </div>

          <p class="" v-if="showMore == false">
            Identifies open space to reduce flood risk and insurance premiums using Community Rating
            System (CRS) Open Space Preservation (OSP) credits.
            <!--span
              ><q-btn
                id="morebtn"
                flat
                no-caps
                size="sm"
                class="q-pa-xs q-ma-none"
                dense
                color="primary"
                @click="showMore = true"
                >More</q-btn
              ></span
          --></p>
          <!--p class="" v-if="showMore == true">
            The Yellow River is one of 3 large rivers that flow into Pensacola Bay. An assessment of
            the Yellow River watershed identified 140 impaired river corridor sites and identified
            moderate or high degrees of sedimentation risk at 339 unpaved road crossings. Use this
            app to examine the assessment data. Read a
            <a
              color=""
              href="https://maps.freshwaternetwork.org/florida/docs/YR%20Summary%20formatted%2014Dec2018.pdf"
              target="_blank"
              >short summary</a
            >
            of the project or the
            <a
              color=""
              href="https://maps.freshwaternetwork.org/florida/docs/PS_FINAL_REPORT.pdf"
              target="_blank"
              >full report</a
            >

            <q-img src="img/GS_sediment.png"></q-img>
            <span
              ><q-btn
                id="morebtn"
                flat
                no-caps
                size="sm"
                class="q-pa-xs q-ma-none"
                dense
                color="primary"
                @click="showMore = false"
                >show less</q-btn
              ></span
            >
          </p-->

          <div class="row q-mt-lg flex-center q-pa-sm">
            <div class="col-9">
              <p class="text-h5 text-primary q-mb-none">Flood and Sea Level Rise</p>
            </div>
            <div class="col-3">
              <q-btn
                @click="goToLayers('layers', 'Flood and Sea Level Rise')"
                text-color="white"
                unelevated
                square
                size="sm"
                color="primary"
                >GO to</q-btn
              >
            </div>
          </div>
          <p class="" v-if="showMore1 == false">
            View potential inundation effects of storm surge and future sea-level rise and combine
            with community data.
            <!--span
              ><q-btn
                id="morebtn"
                flat
                no-caps
                size="sm"
                class="q-pa-xs q-ma-none"
                dense
                color="primary"
                @click="showMore1 = true"
                >More</q-btn
              ></span
            >
          </p>
          <p class="" v-if="showMore1 == true">
            The Floridan aquifer is the major source of drinking water for Florida. The Howard T.
            Odum Florida Springs Institute completed a study for The Nature Conservancy that looked
            at the Florida Springs region and developed a map of how water use and nitrogen loads
            vary across it. Use this app to examine the results of the analysis. Read a
            <a
              color=""
              href="https://maps.freshwaternetwork.org/florida/docs/AFA%20Summary%20formatted%2014Dec2018.pdf"
              target="_blank"
              >short summary</a
            >
            of the project or the
            <a
              color=""
              href="https://maps.freshwaternetwork.org/florida/docs/AFA%20Final%20Report%20web.pdf"
              target="_blank"
              >full report</a
            >
            <q-img src="img/GS_aquifer_resize.png"></q-img>
            <span
              ><q-btn
                id="morebtn"
                flat
                no-caps
                size="sm"
                class="q-pa-xs q-ma-none"
                dense
                color="primary"
                @click="showMore1 = false"
                >show less</q-btn
              ></span
            !-->
          </p>
          <div class="row q-mt-lg flex-center q-pa-sm">
            <div class="col-9">
              <p class="text-h5 text-primary q-mb-none">Community Planning</p>
            </div>
            <div class="col-3">
              <q-btn
                @click="goToLayers('layers', 'Community Planning')"
                text-color="white"
                unelevated
                square
                size="sm"
                color="primary"
                >GO to</q-btn
              >
            </div>
          </div>
          <p class="" v-if="showMore1 == false">
            Locally specific information to help support community-level engagement processes,
            inform decisions, and track successes.
          </p>
           <p class="text-caption text-grey-7 q-mt-lg">
            This site was prepared by Camden County staff under grant award #NA18NOS4190146 to the
            Georgia Department of Natural Resources from the Office for Coastal Management, National
            Oceanic and Atmospheric Administration. The statements, findings, conclusions, and
            recommendations are those of the author(s) and do not necessarily reflect the views of
            DNR, OCM or NOAA.
          </p>
        </q-scroll-area>
      </q-tab-panel>
      <q-tab-panel name="layers" class="q-mt-sm q-pa-none">
        <q-scroll-area style="height: calc(100vh - 123px)" class="">
          <arcgis-layer-list
            class="q-pa-sm"
            visibilityAppearance="checkbox"
            reference-element="my-map"
            @arcgisReady="expandItemGroup()"
          ></arcgis-layer-list>
        </q-scroll-area>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>
<style>
#opacity-slider {
  padding-left: 30px;
  padding-right: 30px;
}
.button {
  margin-top: 35px;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}
</style>
