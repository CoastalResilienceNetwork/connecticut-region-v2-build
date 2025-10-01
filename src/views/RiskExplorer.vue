<script setup>
import { ref, onMounted } from 'vue'
const expSelection = ref('withSLR')
const vulnSelection = ref(['totalPop','olderPop','famPoverty'])
const layerSelection = ref('riskScore')

onMounted(() => {
  //turn off all layers
    let map = document.querySelector("arcgis-map").map;
    map.layers.forEach(function(layer) {
      layer.visible = false;
    });   
  let layer = map.findLayerById('riskExplorer');
  layer.visible = true
})
</script>

<template>
  <q-bar class="bg-white" style="border-bottom: 1px solid lightgray">
    <div class="text-caption text-bold">Risk Explorer</div>
  </q-bar>
  <div class="text-h6 text-weight-medium q-pa-sm">Risk = Exposure x Vulnerability</div>
  <div class="q-pa-sm q-mb-md">
    <p class="text-bold q-mb-sm">Exposure is scored using seven bio-geophysical variables</p>
    <q-radio
      v-model="expSelection"
      val="withSLR"
      color="secondary"
      size="xs"
      dense
      class="q-pl-sm"
      label="With Sea Level Rise"
    ></q-radio>
    <q-radio
    v-model="expSelection"
      val="withoutSLR"
      color="secondary"
      size="xs"
      dense
      class="q-pl-sm"
      label="Without Sea Level Rise"
    ></q-radio>
  </div>
  <div class="q-pa-sm q-mb-md">
    <p class="text-bold q-mb-sm">
      Vulnerability is scored using your choice of social vulnerability variabless
    </p>
    <q-checkbox
      v-model="vulnSelection"
      val="totalPop"
      color="secondary"
      size="xs"
      dense
      class="q-pl-sm"
      label="Total Population"
    ></q-checkbox
    ><br />
    <q-checkbox
     v-model="vulnSelection"
      val="olderPop"
      color="secondary"
      size="xs"
      dense
      class="q-pl-sm"
      label="Older Population"
    ></q-checkbox
    ><br />
    <q-checkbox
     v-model="vulnSelection"
      val="famPoverty"
      color="secondary"
      size="xs"
      dense
      class="q-pl-sm"
      label="Families in Poverty"
    ></q-checkbox>
  </div>
  <div class="row items-center">
    <div class="q-pa-sm col-8">
      <p class="text-bold q-mb-sm">Layer Visibility</p>
      <q-radio
        v-model="layerSelection"
        val="riskScore"
        color="secondary"
        size="xs"
        dense
        class="q-pl-sm q-pb-sm"
        label="Risk Score = Exposure x Vulnerability"
      ></q-radio>
      <q-radio
        v-model="layerSelection"
        val="priorityAreas"
        color="secondary"
        size="xs"
        dense
        class="q-pl-sm"
        label="Priority conservation areas where habitats likely reduce risk now"
      ></q-radio>
    </div>
    <div class="col-4">
      <q-img class="q-mr-sm" v-if="layerSelection == 'riskScore'" src="/img/legend.png"></q-img>
      <q-img class="q-mr-sm" v-if="layerSelection == 'priorityAreas'" src="/img/legend2.png"></q-img>
    </div>
  </div>
</template>
