import { defineStore } from 'pinia';
import { computed, ref } from 'vue'
export const useProjectsStore = defineStore('projectsStore', () => {
  const symbolizeBy = ref('all');
  const whereAttribute = ref('');
  const whereValue = ref('');
  const whereValueOptions = computed(() => {
    console.log(whereAttribute.value);
    const optionsLookup = {
      type: [
        { label: "Coastal Natural Infrastructure", value: "Coastal Natural Infrastructure" },
        { label: "Hard Infrastructure", value: "Hard Infrastructure" },
        { label: "Inland Natural Infrastructure", value: "Inland Natural Infrastructure" },
        { label: "Other", value: "Other" },
        { label: "Shoreline Infrastructure", value: "Shoreline Infrastructure" },
        { label: "Stormwater Management", value: "Stormwater Management" }
      ],
      objective: [],
      strategy: [],
      town: []
    };
    return whereAttribute.value === '' ? [] : optionsLookup[whereAttribute.value];
  });
  return {
    symbolizeBy,
    whereAttribute,
    whereValue,
    whereValueOptions
  };
});
