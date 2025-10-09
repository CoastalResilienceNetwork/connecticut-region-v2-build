<script setup>
import { useQuasar } from 'quasar'
import { computed,onMounted  } from 'vue'
const $q = useQuasar()
const mobile = computed(() => {
  return $q.screen.lt.sm || $q.screen.lt.xs ? true : false
})

onMounted(() => {
  //turn off all layers
  let map = document.querySelector('arcgis-map').map
  map.layers.forEach(function (layer) {
    layer.visible = false
    layer.listMode = 'hide' //hide from layer list
  })
  let layer = map.findLayerById('connecticut')
  layer.visible = true
  layer.listMode = 'show' //show in layer list

  layer.when(() => {
    layer.sublayers.forEach((sublayer) => {
      sublayer.listMode = 'show'
      if (sublayer.id > 47) {
        sublayer.listMode = 'hide' // 👈 hides from LayerList
      }
    })
  })
})

function expandItemGroup() {
  // Get a reference to the arcgis-layer-list component.
  const arcgisLayerList = document.querySelector('arcgis-layer-list')

  // A function that executes each time a ListItem is created for a layer.

  arcgisLayerList.listItemCreatedFunction = (event) => {
    const { item } = event
    if (item.title == 'Connecticut') {
      item.open = true
    }
    // Add a calcite slider for updating opacity on group layers.
    if (item.layer.layer) {
      if (item.layer.layer.type === 'map-image' || item.layer.layer.type === 'feature') {
        const div = document.createElement('div')
        div.id = 'opacity-slider'
        div.innerHTML = 'Opacity'
        const slider = document.createElement('calcite-slider')
        slider.labelHandles = true
        slider.labelTicks = true
        slider.min = 0
        slider.minLabel = '0'
        slider.max = 1
        slider.maxLabel = '1'
        slider.scale = 's'
        slider.step = 0.01
        slider.value = 1
        slider.ticks = 0.5

        slider.addEventListener('calciteSliderChange', () => {
          item.layer.layer.opacity = slider.value
        })

        
        const infoButton = document.createElement('calcite-button');
        infoButton.innerText = 'Layer Info';
        infoButton.scale = 's';
        infoButton.width = 'full';
        infoButton.style.marginTop = '0.5rem';
        infoButton.id = 'information'

        infoButton.addEventListener('click', () => {
            const url = item.layer.url + '?f=json'
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
          }
          return response.json()
        })
        .then((json) => {
          $q.notify({
            html: true,
            message:
             json.description == ''
                ? '<p style="font-size:25px; text-decoration: bold">' +
                  item.layer.title +
                  '</p>' +
                  'No description available'
                : '<p style="font-size:25px; text-decoration: bold">' +
                   item.layer.title +
                    '</p>' +
                    json.description
                 ,
            color: 'blue-grey-9',
            textColor: 'white',
            multiLine: true,
            icon: 'info',
            timeout: 0,
            actions: [
              {
                icon: 'close',
                color: 'white',
                round: true,
                handler: () => {

                },
              },
            ],
          })
        })
        .catch((error) => {
          console.error('Error fetching layer information:', error)
        })
    

        })


        div.appendChild(slider)
        div.appendChild(infoButton);

        item.panel = {
          content: div,
          icon: 'ellipsis',
          title: 'Change layer opacity',
        }
      }
    }
  }

}
</script>
<template>
  <q-bar class="bg-white" style="border-bottom: 1px solid lightgray">
    <div class="text-caption text-bold">Regional Planning</div>
  </q-bar>
  <q-scroll-area :style="mobile ? 'height: calc(100vh - 390px)' : 'height: calc(100vh - 138px)'">
    <arcgis-layer-list
      visibilityAppearance="checkbox"
      reference-element="my-map"
      @arcgisReady="expandItemGroup()"
      class="q-pr-sm"
    ></arcgis-layer-list>
  </q-scroll-area>
</template>
<style>
#opacity-slider {
  padding-left: 30px;
  padding-right: 30px;
}



</style>
