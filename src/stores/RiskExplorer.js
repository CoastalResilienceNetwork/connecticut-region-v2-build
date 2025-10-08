import { defineStore } from 'pinia';
import Graphic from '@arcgis/core/Graphic'
import { ref } from 'vue';



  
export const useRiskStore = defineStore('riskStore', () => ({
expSelection: 'vi_m_h',
vulnSelection: ['pop_score','older_scor','pov_score'],
layerSelection: 'riskScore',
mapView: '',
updateSymbology(){
      let map = document.querySelector("arcgis-map").map;
      let layer =  map.findLayerById("riskExplorerFeatures")
      let _this = this;
      layer.queryFeatures({
            where: '1=1',
            outFields: '*', // Replace with your actual field names
            returnGeometry: true,
          })
          .then(function (results) {
            const graphics = results.features.map((feature) => {
            const attributes = feature.attributes

              // Custom risk calculation
              const arr = _this.vulnSelection
              let vul = 5
              if (arr.length > 0) {
                var sm = 0
                for (var i = 0; i < arr.length; i++) {
                  sm = sm + attributes[arr[i]]
                }
                vul = sm / arr.length
              }

              let exp = feature.attributes[_this.expSelection]
              console.log(exp)
              let score = vul * exp
              // Create a new graphic with custom symbology
              let sym = ''
              const sym1 = {
                type: 'simple-marker',
                style: 'circle',
                color: [44, 123, 182],
                size: 9,
                outline: {
                  color: [44, 123, 182],
                  width: 1,
                },
              }

              const sym2 = {
                type: 'simple-marker',
                style: 'circle',
                color: [171, 217, 233],
                size: 9,
                outline: {
                  color: [171, 217, 233],
                  width: 1,
                },
              }

              const sym3 = {
                type: 'simple-marker',
                style: 'circle',
                color: [255, 255, 191],
                size: 9,
                outline: {
                  color: [255, 255, 191],
                  width: 1,
                },
              }

              const sym4 = {
                type: 'simple-marker',
                style: 'circle',
                color: [253, 174, 97],
                size: 9,
                outline: {
                  color: [253, 174, 97],
                  width: 1,
                },
              }

              const sym5 = {
                type: 'simple-marker',
                style: 'circle',
                color: [215, 25, 28],
                size: 9,
                outline: {
                  color: [215, 25, 28],
                  width: 1,
                },
              }
              if (score < 5) {
                sym = sym1
              }
              if (score >= 5 && score < 10) {
                sym = sym2
              }
              if (score >= 10 && score < 15) {
                sym = sym3
              }
              if (score >= 15 && score < 20) {
                sym = sym4
              }
              if (score >= 20 && score <= 25) {
                sym = sym5
              }
              return new Graphic({
                geometry: feature.geometry,
                attributes: {
                  ...attributes,
                  riskScore: score,
                },
                symbol: sym,
              })
            })
            
            // Add graphics to a GraphicsLayer
             map.findLayerById('riskExplorerGraphics').removeAll()
            map.findLayerById('riskExplorerGraphics').addMany(graphics)
          })
}
}))
