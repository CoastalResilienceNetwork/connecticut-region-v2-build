import { defineStore } from 'pinia';
import { ref } from 'vue'
export const useProjectsStore = defineStore('projectsStore', () => {
  const symbolizeBy = ref('all');
  const whereAttribute = ref('');
  const whereValue = ref('');
  function whereValueOptions(whereAttribute) {
    console.log(whereAttribute)
    const optionsLookup = {
      type: [
        { label: "Coastal Natural Infrastructure", value: "Coastal Natural Infrastructure" },
        { label: "Hard Infrastructure", value: "Hard Infrastructure" },
        { label: "Inland Natural Infrastructure", value: "Inland Natural Infrastructure" },
        { label: "Other", value: "Other" },
        { label: "Shoreline Infrastructure", value: "Shoreline Infrastructure" },
        { label: "Stormwater Management", value: "Stormwater Management" }
      ],
      objective: [
        {value:"Bank Protection", label: "Bank Protection"},
        {value:"Beach", label: "Beach"},
        {value:"Building", label: "Building"},
        {value:"Bulkhead", label: "Bulkhead"},
        {value:"Dune", label: "Dune"},
        {value:"Flood Protection System", label: "Flood Protection System"},
        {value:"Groin", label: "Groin"},
        {value:"Infiltration Galleries", label: "Infiltration Galleries"},
        {value:"Living Shoreline", label: "Living Shoreline"},
        {value:"Rain Garden/Bioswale", label: "Rain Garden/Bioswale"},
        {value:"Raise Ground Surface", label: "Raise Ground Surface"},
        {value:"Revetment", label: "Revetment"},
        {value:"Road", label: "Road"},
        {value:"Seawall", label: "Seawall"},
        {value:"Sediment Removal", label: "Sediment Removal"},
        {value:"Sewer Infrastructure", label: "Sewer Infrastructure"},
        {value:"Stormwater Infrastructure", label: "Stormwater Infrastructure"},
        {value:"Stream Channel", label: "Stream Channel"},
        {value:"Tidal Marsh", label: "Tidal Marsh"},
        {value:"Tide Gate", label: "Tide Gate"},
        {value:"Undetermined", label: "Undetermined"},
        {value:"null", label: "null"}],
      strategy: [{value: "Abandon", label: "Abandon"},{value: "Acquire/Demolish", label: "Acquire/Demolish"},{value: "Create", label: "Create"},{value: "Create Floodplain", label: "Create Floodplain"},{value: "Create Floodplain Bench", label: "Create Floodplain Bench"},{value: "Elevate", label: "Elevate"},{value: "Enhance", label: "Enhance"},{value: "Enhance/Modify", label: "Enhance/Modify"},{value: "Increase Capacity", label: "Increase Capacity"},{value: "Modify", label: "Modify"},{value: "New Area", label: "New Area"},{value: "Nourish (Managed)", label: "Nourish (Managed)"},{value: "Nourish (New)", label: "Nourish (New)"},{value: "Nourish(Managed)", label: "Nourish(Managed)"},{value: "Other", label: "Other"},{value: "Re-align", label: "Re-align"},{value: "Remove Obstruction", label: "Remove Obstruction"},{value: "Replace in Kind", label: "Replace in Kind"},{value: "Replace with Other", label: "Replace with Other"},{value: "Restore", label: "Restore"},{value: "Restore (Direct Repair)", label: "Restore (Direct Repair)"},{value: "Restore (Tidal Flow)", label: "Restore (Tidal Flow)"},{value: "Restore(Direct Repair)", label: "Restore(Direct Repair)"},{value: "Undetermined", label: "Undetermined"}],
      town: [{value: "Bedford", label: "Bedford"},{value: "Branford", label: "Branford"},{value: "Bridgeport", label: "Bridgeport"},{value: "Darien", label: "Darien"},{value: "East Haven", label: "East Haven"},{value: "East Lyme", label: "East Lyme"},{value: "Easton", label: "Easton"},{value: "Fairfield", label: "Fairfield"},{value: "Greenwich", label: "Greenwich"},{value: "Groton (City)", label: "Groton (City)"},{value: "Groton (Town)", label: "Groton (Town)"},{value: "Guilford", label: "Guilford"},{value: "Ledyard", label: "Ledyard"},{value: "Madison", label: "Madison"},{value: "Milford", label: "Milford"},{value: "Montville", label: "Montville"},{value: "New Canaan", label: "New Canaan"},{value: "New Haven", label: "New Haven"},{value: "New London", label: "New London"},{value: "North Castle", label: "North Castle"},{value: "Norwalk", label: "Norwalk"},{value: "Norwich", label: "Norwich"},{value: "Redding", label: "Redding"},{value: "Ridgefield", label: "Ridgefield"},{value: "Salem", label: "Salem"},{value: "Stamford", label: "Stamford"},{value: "Stonington", label: "Stonington"},{value: "Stratford", label: "Stratford"},{value: "Waterford", label: "Waterford"},{value: "West Haven", label: "West Haven"},{value: "Weston", label: "Weston"},{value: "Westport", label: "Westport"},{value: "Wilton", label: "Wilton"}]
    };
    return whereAttribute.value === '' ? [] : optionsLookup[whereAttribute.value];
  };
  const defExp = [{whereAttribute: '', whereValue: '', operation: ''}]
  return {
    symbolizeBy,
    whereAttribute,
    whereValue,
    whereValueOptions,
    defExp
  };
});
