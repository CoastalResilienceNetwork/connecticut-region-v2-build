
import { defineStore } from 'pinia';
import * as identify from '@arcgis/core/rest/identify.js';
import IdentifyParameters from '@arcgis/core/rest/support/IdentifyParameters.js';
import { useProjectsStore } from './ResilienceProjects';
import { markRaw } from 'vue';

export const useMapStore = defineStore('mapStore', () => ({
  
  executeIdentify(mapPoint){
    const projectsStore = useProjectsStore()
    const arcgisMap = document.querySelector('arcgis-map') 
    const params = new IdentifyParameters();
    
    params.tolerance = 3;
    params.layerIds = [3];
    params.layerOption = 'top';
    params.geometry = mapPoint;
    params.returnGeometry = false;
    params.mapExtent = arcgisMap.view.extent
    const identifyURL =
      'https://services2.coastalresilience.org/arcgis/rest/services/Connecticut/Regional_Resilience_Projects/MapServer';
     
      identify.identify(identifyURL, params).then(function (response) {
        console.log(response.results[0].feature.attributes)
        projectsStore.infoData = response.results[0].feature.attributes
        //look for attachments
        let map = document.querySelector("arcgis-map").map;
        let layer = map.findLayerById('attachments');
        let objectId = response.results[0].feature.attributes.OBJECTID
        layer.queryAttachments({objectIds: [objectId]}).then((attachments) => {
          
        if (attachments[objectId] && attachments[objectId].length > 0) {
          markRaw(projectsStore.infoData.attachments = attachments[objectId])
          console.log(`Feature ${objectId} has attachments:`, attachments[objectId]);
        } else {
          console.log(`Feature ${objectId} has no attachments.`);
        }
        });
      })
  }

}
));
