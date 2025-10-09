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
  //const map = document.querySelector('arcgis-map')
  // A function that executes each time a ListItem is created for a layer.

  arcgisLayerList.listItemCreatedFunction = (event) => {
    const { item } = event
    // Add a calcite slider for updating opacity on group layers.
    /*item.actionsSections = [
        [
          {
            title: 'Go to full extent',
            icon: 'zoom-out-fixed',
            id: 'full-extent',
          },
          {
            title: 'Layer information',
            icon: 'information',
            id: 'information',
          },
        ],
        [
          {
            title: 'Increase opacity',
            icon: 'chevron-up',
            id: 'increase-opacity',
          },
          {
            title: 'Decrease opacity',
            icon: 'chevron-down',
            id: 'decrease-opacity',
          },
        ],
      ]*/
   
    //open the group if it is the active group
     if (item.title == 'Connecticut') {
      item.open = true
     }
  }
 /* arcgisLayerList.addEventListener('arcgisTriggerAction', (event) => {
    console.log(event)
    const id = event.detail.action.id
    if (id === 'full-extent') {
      map.goTo(event.detail.item.layer.fullExtent)
      if (event.detail.item.layer.type == 'sublayer') {
        map.goTo(event.detail.item.layer.parent.fullExtent)
      }
    } else if (id === 'increase-opacity') {
      // If the increase-opacity action is triggered, then
      // increase the opacity of the GroupLayer by 0.25

      if (event.detail.item.layer.opacity < 1) {
        event.detail.item.layer.opacity += 0.25
      }
    } else if (id === 'decrease-opacity') {
      // If the decrease-opacity action is triggered, then
      // decrease the opacity of the GroupLayer by 0.25

      if (event.detail.item.layer.opacity > 0) {
        event.detail.item.layer.opacity -= 0.25
      }
    } else if (id === 'information') {
      // If the information action is triggered, then
      // open the item details page in a new tab
      //window.open(event.detail.item.layer.url, '_blank')
      const url = event.detail.item.layer.url + '?f=json'
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
          }
          return response.json()
        })
        .then((json) => {
          console.log(json)
          $q.notify({
            html: true,
            message:
              json.description == ''
                ? '<p style="font-size:25px; text-decoration: bold">' +
                  event.detail.item.layer.title +
                  '</p>' +
                  json.serviceDescription
                : json.description
                  ? '<p style="font-size:25px; text-decoration: bold">' +
                    event.detail.item.layer.title +
                    '</p>' +
                    json.description
                  : 'No description available',
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
    }
  })*/
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
