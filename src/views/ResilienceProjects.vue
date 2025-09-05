<script setup>
import { useProjectsStore } from '@/stores/ResilienceProjects'

const projectStore = useProjectsStore()
</script>

<template>
  <q-bar class="bg-white" style="border-bottom: 1px solid lightgray">
    <div class="text-caption text-bold">Regional Resilience Projects</div>
  </q-bar>
  <div class="q-pa-md">
    <div>
      <p class="text-body2 text-bold">Symbolize projects by:</p>
      <q-btn-toggle
        v-model="projectStore.symbolizeBy"
        size="12px"
        toggle-color="primary"
        :options="[
          { label: 'All', value: 'all' },
          { label: 'Type', value: 'type' },
          { label: 'Objective', value: 'objective' },
          { label: 'Strategy', value: 'strategy' },
          { label: 'Town', value: 'town' },
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
    <div style="border: 1px solid lightgray" class="q-pa-xs q-mt-xl">
      <p class="text-body2 text-bold">Click a project for more information</p>
    </div>
    <div class="row items-center q-mt-xl">
      <q-btn outline size="12px" icon="img:/img/pdf.svg" label="Strategy Definitions" color="secondary" stack class="q-mr-xs"></q-btn>
      <q-btn outline size="12px" icon="img:/img/pdf.svg" label="Project Type Definitions" color="secondary" stack></q-btn>
    </div>
  </div>
</template>
<style>
.q-field__control-container{
    padding-top: 0 !important;
}
</style>