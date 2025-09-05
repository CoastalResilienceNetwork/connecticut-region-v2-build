<script setup>
import { useProjectsStore } from '@/stores/ResilienceProjects'
import { onMounted } from 'vue'
const projectStore = useProjectsStore()


onMounted(() => {
    let map = document.querySelector("arcgis-map").map;
    let layer = map.findLayerById('projects');
    let sub = layer.findSublayerById(0);
    sub.visible = true
})

function setVisibleLayer(){
    let vals = {all: 0, type: 1, objective: 2, strategy:3, town: 4}
    let id = vals[projectStore.symbolizeBy]

    let map = document.querySelector("arcgis-map").map;
    let layer = map.findLayerById('projects');
    layer.sublayers.forEach(sl => sl.visible = false)
    let sub = layer.findSublayerById(id);
    sub.visible = true
}
</script>

<template>
  <q-bar class="bg-white" style="border-bottom: 1px solid lightgray">
    <div class="text-caption text-bold">Regional Resilience Projects</div>
  </q-bar>
  <q-scroll-area style="height: calc(100vh - 100px)" class="q-pa-md q-mt-md">
    <div>
      <p class="text-body2 text-bold q-mb-xs">Symbolize projects by:</p>
      <q-btn-toggle
      no-caps=""
        v-model="projectStore.symbolizeBy"
        size="14px"
        toggle-color="secondary"
        map-options
        @update:model-value="setVisibleLayer()"
        :options="[
          { label: 'All', value: 'all', id: 0 },
          { label: 'Type', value: 'type', id: 1 },
          { label: 'Objective', value: 'objective', id: 2 },
          { label: 'Strategy', value: 'strategy', id: 3},
          { label: 'Town', value: 'town', id: 4 },
        ]"
      />
    </div>
    <div class="q-mt-lg">
      <p class="text-body2 text-bold q-mb-xs">Show projects where:</p>
      <div class="row items-center" v-for="(exp,i) in projectStore.defExp" :key="i">
        <div class="col" style="max-width: 190px">
          <q-select
            clearable
            outlined
            dense
            options-dense
            :label="exp.whereAttribute ? null : 'Pick a field'"
            v-model="exp.whereAttribute"
            :options="[
              { label: 'Type', value: 'type' },
              { label: 'Objective', value: 'objective' },
              { label: 'Strategy', value: 'strategy' },
              { label: 'Town', value: 'town' },
            ]"
          ></q-select>
        </div>
        <div  v-if="exp.whereAttribute" class="col-1 self-center">
          <div class="text-h6 text-center">=</div>
        </div>
        <div class="col-6">
          <q-select
            v-if="exp.whereAttribute"
            :label="exp.whereValue ? '' : 'Select an option'"
            outlined
            dense
            options-dense
            v-model="exp.whereValue"
            :options="projectStore.whereValueOptions(exp.whereAttribute)"
            clearable
          ></q-select>
        </div>
        <div class="col-12 q-mt-sm" v-if="exp.whereValue">
            <q-btn v-if="!exp.operation" outline square color="primary" icon="add" padding="2px" @click="exp.operation = 'and';projectStore.defExp.push({whereAttribute: '', whereValue: '', operation: ''})" ></q-btn>
            <div v-if="exp.operation">
                <q-radio size="sm" v-model="exp.operation" label="And" val="and"></q-radio> <q-radio size="sm" v-model="exp.operation" label="Or" val="or"></q-radio>
            </div>
        </div>
      </div>
      
    </div>
    <div style="border-top: 1px solid lightgray; border-bottom: 1px solid lightgray" class="q-pa-xs q-mt-lg">
      <p v-if="!projectStore.infoData" class="text-body2 text-bold q-pt-md">Click a project for more information</p>
      <p v-if="projectStore.infoData" class="text-body2 text-bold q-pt-md">Selected project attributes</p>
    </div>
    <div v-if="projectStore.infoData">
        <q-tabs v-model="projectStore.infoTab" style="font-size: 9px" class="text-caption no-caps" active-class="text-bold text-caption bg-secondary text-white" indicator-color="white" >
            <q-tab class="no-caps" name="overview">Over-<br/>view</q-tab>
            <q-tab name="scope">Project<br/>Scope</q-tab>
            <q-tab name="site">Site<br/> Characteristics</q-tab>
            <q-tab name="info">Supplementary<br/> Info</q-tab>
        </q-tabs>
        <q-tab-panels v-model="projectStore.infoTab" animated style="border-radius: 0 0 20px 20px; border: 1px solid lightgray">
            <q-tab-panel name="overview">
                <div class="q-pa-sm">
                    <p class="text-blue-grey-9 text-bold q-mb-none">Project Name: <span class="text-secondary text-weight-regular"></span></p> 
                    <p class="text-blue-grey-9 text-bold q-mb-none">Project Type: <span class="text-secondary text-weight-regular"></span></p>
                    <p class="text-blue-grey-9 text-bold q-mb-none">Project Objective: <span class="text-secondary text-weight-regular"></span></p>
                    <p class="text-blue-grey-9 text-bold q-mb-none">Strategy: <span class="text-secondary text-weight-regular"></span></p>
                    <p class="text-blue-grey-9 text-bold q-mb-none">Town: <span class="text-secondary text-weight-regular"></span></p>
                    <p class="text-blue-grey-9 text-bold q-mb-none">Geo-location: <span class="text-secondary text-weight-regular"></span></p>
                </div>
            </q-tab-panel>
            <q-tab-panel name="scope">
                 <div class="q-pa-sm">
                    <p class="text-blue-grey-9 text-bold q-mb-none">Project Name: <span class="text-secondary text-weight-regular"></span></p> 
                    <p class="text-blue-grey-9 text-bold q-mb-none">Address: <span class="text-secondary text-weight-regular"></span></p>
                    <p class="text-blue-grey-9 text-bold q-mb-none">Description: <span class="text-secondary text-weight-regular"></span></p>
                    <p class="text-blue-grey-9 text-bold q-mb-none">Funding: <span class="text-secondary text-weight-regular"></span></p>
                    <p class="text-blue-grey-9 text-bold q-mb-none">Town: <span class="text-secondary text-weight-regular"></span></p>
                    <p class="text-blue-grey-9 text-bold q-mb-none">Green Infrastructure: <span class="text-secondary text-weight-regular"></span></p>
                </div>
            </q-tab-panel>
            <q-tab-panel name="site">
                 <div class="q-pa-sm">
                    <p class="text-blue-grey-9 text-bold q-mb-none">Project Name: <span class="text-secondary text-weight-regular"></span></p> 
                    <p class="text-blue-grey-9 text-bold q-mb-none">Primary Asset Exposed: <span class="text-secondary text-weight-regular"></span></p>
                    <p class="text-blue-grey-9 text-bold q-mb-none">Secondary Asset Exposed: <span class="text-secondary text-weight-regular"></span></p>
                    <p class="text-blue-grey-9 text-bold q-mb-none">FEMA Flood Zones (ft.) ref. NAVD88:  <span class="text-secondary text-weight-regular"></span></p>
                    <p class="text-blue-grey-9 text-bold q-mb-none">Base Flood Elevation (ft.) ref. NAVD88: <span class="text-secondary text-weight-regular"></span></p>
                    <p class="text-blue-grey-9 text-bold q-mb-none">Low to Moderate Income Percentage (within block group): <span class="text-secondary text-weight-regular"></span></p>
                    <p class="text-blue-grey-9 text-bold q-mb-none">Coastal Jurisdiction Line: (ft.) ref. NAVD88: <span class="text-secondary text-weight-regular"></span></p>
                    <p class="text-blue-grey-9 text-bold q-mb-none">Watershed (HUC-12):  <span class="text-secondary text-weight-regular"></span></p>
                    <p class="text-blue-grey-9 text-bold q-mb-none">County: <span class="text-secondary text-weight-regular"></span></p>
                </div>
            </q-tab-panel>
            <q-tab-panel name="info">
                 <div class="q-pa-sm">
                    <p class="text-blue-grey-9 text-bold q-mb-none">Project Name: <span class="text-secondary text-weight-regular"></span></p> 
                    <p class="text-blue-grey-9 text-bold q-mb-none">Sources - References: <span class="text-secondary text-weight-regular"></span></p>
                    <p class="text-blue-grey-9 text-bold q-mb-none">Photos: <span class="text-secondary text-weight-regular"></span></p>
                 </div>
            </q-tab-panel>
        </q-tab-panels>
    </div>
    <div class="row items-center q-mt-lg">
      <q-btn outline size="12px" icon="img:/img/pdf.svg" label="Strategy Definitions" color="secondary" stack class="q-mr-xs"></q-btn>
      <q-btn outline size="12px" icon="img:/img/pdf.svg" label="Project Type Definitions" color="secondary" stack></q-btn>
    </div>
  </q-scroll-area>
</template>
<style>
.q-field__control-container{
    padding-top: 0 !important;
}
</style>