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
      <div class="row items-center">
        <div class="col" style="max-width: 190px">
          <q-select
            outlined
            dense
            options-dense
            label="Pick a field"
            v-model="projectStore.whereAttribute"
            :options="[
              { label: 'Type', value: 'type' },
              { label: 'Objective', value: 'objective' },
              { label: 'Strategy', value: 'town' },
              { label: 'Town', value: 'town' },
            ]"
          ></q-select>
        </div>
        <div class="col-1 text-center">
          <p class="q-mt-md text-h5">=</p>
        </div>
        <div class="col-6">
          <q-select
            outlined
            dense
            v-model="projectStore.whereValue"
            :options="projectStore.whereValueOptions"
          ></q-select>
        </div>
      </div>
    </div>
    <div style="border: 1px solid lightgray" class="q-pa-xs">
      <p class="text-body2 text-bold">Click a project for more information</p>
    </div>
  </div>
</template>
