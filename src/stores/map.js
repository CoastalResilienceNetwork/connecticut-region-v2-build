
import { defineStore } from 'pinia';
import * as identify from '@arcgis/core/rest/identify.js';
import IdentifyParameters from '@arcgis/core/rest/support/IdentifyParameters.js';
import { useProjectsStore } from './ResilienceProjects';
import { markRaw } from 'vue';
import Graphic from "@arcgis/core/Graphic.js";


export const useMapStore = defineStore('mapStore', () => ({
  executeIdentify(mapPoint){
    const projectsStore = useProjectsStore()
    const arcgisMap = document.querySelector('arcgis-map') 
    const params = new IdentifyParameters();
    
    params.tolerance = 3;
    params.layerIds = [3];
    params.layerOption = 'top';
    params.geometry = mapPoint;
    params.returnGeometry = true;
    params.mapExtent = arcgisMap.view.extent
    const identifyURL =
      'https://services2.coastalresilience.org/arcgis/rest/services/Connecticut/Regional_Resilience_Projects/MapServer';
     
    identify.identify(identifyURL, params).then(function (response) {
        let map = document.querySelector("arcgis-map").map;
        if(response.results.length == 0){
          projectsStore.infoData = ''
          map.findLayerById("graphicsLayer").removeAll()  
          return
        }
        projectsStore.infoData = response.results[0].feature.attributes
        let geom = response.results[0].feature.geometry
        // Add the graphic to the view's default GraphicsLayer
        // Create a point graphic
        const pointSymbol = new SimpleMarkerSymbol({
          outline: {
            color: 'blue',
            width: 2,
          },
        });

        const pointGraphic = new Graphic({
          geometry: geom,
          symbol: pointSymbol,
        });

        map.findLayerById("graphicsLayer").removeAll()
        map.findLayerById("graphicsLayer").add(pointGraphic);

        //look for attachments
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
  },
  clearAppLayers(){
      let map = document.querySelector("arcgis-map").map;
      map.findLayerById('graphicsLayer').visible = false
      map.findLayerById('riskExplorerGraphics').visible = false
      map.findLayerById('projects').visible = false
      map.findLayerById('riskExplorer').visible = false
      map.findLayerById('riskExplorerFeatures').visible = false
      map.findLayerById('floodSeaLevelRise').visible = false
      map.findLayerById('noaa0').visible = false
      map.findLayerById('noaa1').visible = false
      map.findLayerById('noaa2').visible = false
      map.findLayerById('noaa3').visible = false
      map.findLayerById('noaa4').visible = false
      map.findLayerById('noaa5').visible = false
      map.findLayerById('noaa6').visible = false
  },
  clearOtherLayers(){
    let map = document.querySelector("arcgis-map").map;
    let mapservice = map.findLayerById('connecticut')
    mapservice.sublayers.forEach((layer) => {
      layer.visible = false;
    });
  }
  
}
));
