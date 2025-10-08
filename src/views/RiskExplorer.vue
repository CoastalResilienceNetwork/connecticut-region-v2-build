<script setup>
import { ref, onMounted } from 'vue'
import { useMapStore } from '../stores/map'
import { useRiskStore } from '@/stores/RiskExplorer'

const mapStore = useMapStore()
const riskStore = useRiskStore()

onMounted(() => {
  //turn off all layers
  let map = document.querySelector('arcgis-map').map
  map.layers.forEach(function (layer) {
    layer.visible = false
  })
  let layer = map.findLayerById('riskExplorerGraphics')
  layer.visible = true
  //mapStore.drawRiskExplorerFeatures()
})
function changeRiskLayer(){
  let selected = riskStore.layerSelection;
  let map = document.querySelector('arcgis-map').map
  let riskScore = map.findLayerById('riskExplorerGraphics')
  let priorityAreas = map.findLayerById('riskExplorer')
  riskScore.visible = false;
  priorityAreas.visible = false;
  selected == 'riskScore'? riskScore.visible = true : priorityAreas.visible = true
  
}
</script>

<template>
  <q-bar class="bg-white" style="border-bottom: 1px solid lightgray">
    <div class="text-caption text-bold">Risk Explorer</div>
  </q-bar>
  <div class="text-h6 text-weight-medium q-pa-sm">Risk = Exposure x Vulnerability</div>
  <div class="q-pa-sm q-mb-md">
    <p class="text-bold q-mb-sm">Exposure is scored using seven bio-geophysical variables</p>
    <q-radio
      v-model="riskStore.expSelection"
      val="vi_m_h"
      color="secondary"
      size="xs"
      dense
      class="q-pl-sm"
      label="With Sea Level Rise"
      @update:model-value="riskStore.updateSymbology()"
    ></q-radio>
    <q-radio
      v-model="riskStore.expSelection"
      val="vi_c_h"
      color="secondary"
      size="xs"
      dense
      class="q-pl-sm"
      label="Without Sea Level Rise"
      @update:model-value="riskStore.updateSymbology()"
    ></q-radio>
  </div>
  <div class="q-pa-sm q-mb-md">
    <p class="text-bold q-mb-sm">
      Vulnerability is scored using your choice of social vulnerability variabless
    </p>
    <q-checkbox
      v-model="riskStore.vulnSelection"
      val="pop_score"
      color="secondary"
      size="xs"
      dense
      class="q-pl-sm"
      label="Total Population"
      @update:model-value="riskStore.updateSymbology()"
    ></q-checkbox
    ><br />
    <q-checkbox
      v-model="riskStore.vulnSelection"
      val="older_scor"
      color="secondary"
      size="xs"
      dense
      class="q-pl-sm"
      label="Older Population"
      @update:model-value="riskStore.updateSymbology()"
    ></q-checkbox
    ><br />
    <q-checkbox
      v-model="riskStore.vulnSelection"
      val="pov_score"
      color="secondary"
      size="xs"
      dense
      class="q-pl-sm"
      label="Families in Poverty"
      @update:model-value="riskStore.updateSymbology()"
    ></q-checkbox>
  </div>
  <div class="row items-center">
    <div class="q-pa-sm col-8">
      <p class="text-bold q-mb-sm">Layer Visibility</p>
      <q-radio
        v-model="riskStore.layerSelection"
        val="riskScore"
        color="secondary"
        size="xs"
        dense
        class="q-pl-sm q-pb-sm"
        label="Risk Score = Exposure x Vulnerability"
        @update:model-value="changeRiskLayer()"
      ></q-radio>
      <q-radio
        v-model="riskStore.layerSelection"
        val="priorityAreas"
        color="secondary"
        size="xs"
        dense
        class="q-pl-sm"
        label="Priority conservation areas where habitats likely reduce risk now"
        @update:model-value="changeRiskLayer()"
      ></q-radio>
    </div>
    <div class="col-4">
      <q-img
        class="q-mr-sm"
        v-if="riskStore.layerSelection == 'riskScore'"
        src="/img/legend.png"
      ></q-img>
      <q-img
        class="q-mr-sm"
        v-if="riskStore.layerSelection == 'priorityAreas'"
        src="/img/legend2.png"
      ></q-img>
    </div>
  </div>
</template>
