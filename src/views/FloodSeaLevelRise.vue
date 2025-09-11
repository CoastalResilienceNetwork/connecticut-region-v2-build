<script setup>
import { ref, onMounted } from 'vue'

const hazard = ref({
  label: 'Sea Level Rise (Coastal Resilience)',
  value: 'cr',
})
const stormType = ref('none')
const climateYear = ref('current')
const seaLevel = ref('low')
const seaLevelFt = ref('0')
const opacity = ref(1.0)
const opacityVisible = ref(false)

onMounted(() => {
  //turn off all layers
    let map = document.querySelector("arcgis-map").map;
    map.layers.forEach(function(layer) {
      layer.visible = false;
    });   
  let layer = map.findLayerById('floodSeaLevelRise');
  layer.visible = true
})

function setVisibleLayer() {
  let map = document.querySelector('arcgis-map').map
  let layer = map.findLayerById('floodSeaLevelRise')
  //turn off all layers
  layer.sublayers.forEach((s) => (s.visible = false))
  let slrLayers = ['noaa0', 'noaa1', 'noaa2', 'noaa3', 'noaa4', 'noaa5', 'noaa6']
  slrLayers.forEach((id) => {
    let l = map.findLayerById(id)
    l.visible = false
  })
  console.log('hazard', hazard.value)
  if (hazard.value.value == 'noaa') {
    map.findLayerById('noaa' + seaLevelFt.value).visible = true
    return
  } else if (hazard.value.value == 'cr') {
    let lookup = {
      '2080-high-cat2': 0,
      '2080-med-cat2': 1,
      '2080-low-cat2': 2,
      '2050-high-cat2': 3,
      '2050-med-cat2': 4,
      '2050-low-cat2': 5,
      '2020-high-cat2': 6,
      '2020-med-cat2': 7,
      '2020-low-cat2': 8,
      '2080-high-cat3': 9,
      '2080-med-cat3': 10,
      '2080-low-cat3': 11,
      '2050-high-cat3': 12,
      '2050-med-cat3': 13,
      '2050-low-cat3': 14,
      '2020-high-cat3': 15,
      '2020-med-cat3': 16,
      '2020-low-cat3': 17,
      '2080-high-none': 18,
      '2080-med-none': 19,
      '2080-low-none': 20,
      '2050-high-none': 21,
      '2050-med-none': 22,
      '2050-low-none': 23,
      '2020-high-none': 24,
      '2020-med-none': 25,
      '2020-low-none': 26,
      'current-low-cat3': 27,
      'current-med-cat3': 27,
      'current-high-cat3': 27,
      'current-low-cat2': 28,
      'current-med-cat2': 28,
      'current-high-cat2': 28,
    }
    let id = lookup[climateYear.value + '-' + seaLevel.value + '-' + stormType.value]
    let sublayer = layer.sublayers.find((s) => s.id === id)
    sublayer.visible = true
  }
}
function setOpacity() {
  let map = document.querySelector('arcgis-map').map
  let layer = map.findLayerById('floodSeaLevelRise')
  layer.opacity = opacity.value
    let slrLayers = ['noaa0', 'noaa1', 'noaa2', 'noaa3', 'noaa4', 'noaa5', 'noaa6']
  slrLayers.forEach((id) => {
    let l = map.findLayerById(id)
    l.opacity = opacity.value
  })
}
</script>

<template>
  <q-bar class="bg-white" style="border-bottom: 1px solid lightgray">
    <div class="text-caption text-bold">Flood and Sea Level Rise</div>
  </q-bar>
  <q-scroll-area style="height: calc(100vh - 100px)" class="q-pa-md q-mt-md">
    <div>
      <p class="text-body2 text-bold q-mb-none q-pb-sm q-pt-sm">
        Region:
        <span class="text-bold bg-blue-grey-1 q-mb-none q-pa-sm"
          >Connecticut &nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
        >
      </p>
      <p class="text-body2 text-bold q-mb-none q-pb-sm q-pt-sm q-mt-md">Select a hazard:</p>
      <q-select
        outlined
        dense
        options-dense=""
        v-model="hazard"
        @update:model-value="setVisibleLayer()"
        :label="hazard ? null : '--'"
        :options="[
          {
            label: 'Sea Level Rise (Coastal Resilience)',
            value: 'cr',
          },
          {
            label: 'Sea Level Rise (NOAA)',
            value: 'noaa',
          },
        ]"
      ></q-select>
      <div v-if="hazard.value == 'cr'">
        <p class="text-body2 text-bold q-mb-none q-pb-sm q-pt-sm q-mt-md">Select Storm Type:</p>
        <q-btn-toggle
          class="q-mr-xs"
          spread
          dense
          no-caps=""
          v-model="stormType"
          size="14px"
          toggle-color="secondary"
          map-options
          @update:model-value="setVisibleLayer()"
          :options="[
            { label: 'None', value: 'none', id: 0 },
            { label: 'Category 2', value: 'cat2', id: 1 },
            { label: 'Category 3', value: 'cat3', id: 2 },
          ]"
        />

        <p class="text-body2 text-bold q-mb-none q-pb-sm q-pt-sm q-mt-md">Climate Year:</p>
        <q-btn-toggle
          class="q-mr-xs"
          spread
          dense
          no-caps=""
          v-model="climateYear"
          size="14px"
          toggle-color="secondary"
          map-options
          @update:model-value="setVisibleLayer()"
          :options="[
            { label: 'Current', value: 'current', id: 0 },
            { label: '2020', value: '2020', id: 1 },
            { label: '2050', value: '2050', id: 2 },
            { label: '2080', value: '2080', id: 3 },
          ]"
        />

        <p class="text-body2 text-bold q-mb-none q-pb-sm q-pt-sm q-mt-md">Sea Level Rise:</p>
        <q-btn-toggle
          class="q-mr-xs"
          spread
          dense
          no-caps=""
          v-model="seaLevel"
          size="14px"
          toggle-color="secondary"
          map-options
          @update:model-value="setVisibleLayer()"
          :options="[
            { label: 'Low', value: 'low' },
            { label: 'Medium', value: 'med' },
            { label: 'High', value: 'high' },
          ]"
        />
      </div>
      <div v-else-if="hazard.value == 'noaa'">
        <p class="text-body2 text-bold q-mb-none q-pb-sm q-pt-sm q-mt-md">Sea Level Rise (ft):</p>
        <q-btn-toggle
          class="q-mr-xs"
          spread
          dense
          no-caps=""
          v-model="seaLevelFt"
          size="14px"
          toggle-color="secondary"
          map-options
          @update:model-value="setVisibleLayer()"
          :options="[
            { label: '0', value: '0', id: 0 },
            { label: '1', value: '1', id: 1 },
            { label: '2', value: '2', id: 2 },
            { label: '3', value: '3', id: 3 },
            { label: '4', value: '4', id: 4 },
            { label: '5', value: '5', id: 5 },
            { label: '6', value: '6', id: 6 },
          ]"
        />
      </div>
      <div class="row q-mt-md">
        <div class="col-5"></div>
        <div class="col-4">
          <q-slider
            v-show="opacityVisible"
            v-model="opacity"
            label="Opacity"
            :min="0"
            :max="1.0"
            :step="0.1"
            snap
            thumb-size="12px"
            @update:model-value="setOpacity()"
          >
          </q-slider>
        </div>

        <div class="col-3 text-right">
          <q-btn
            dense
            flat
            class="q-mt-xs"
            size="sm"
            icon="opacity"
            @click="opacityVisible = !opacityVisible"
            label="opacity"
          ></q-btn>
        </div>
      </div>
    </div>
  </q-scroll-area>
</template>

<style>
.q-field__control-container {
  padding-top: 0 !important;
}
</style>
