import { getLayers } from './api'

export async function createLayerToggles (map) {
  const layers = await getLayers()
  const parent = document.getElementById('layer-toggles')

  // loop over each layer and create inputs
  layers.forEach(layer => {
    const layerName = layer.f_table_name

    // create child elements
    const toggle = document.createElement('li')
    
    // create label
    const label = document.createElement('label')
    label.setAttribute('for', layerName)
    label.innerHTML = layerName.split('_').join(' ')
    label.style = 'text-transform: capitalize;'

    // create input
    const input = document.createElement('input')
    input.setAttribute('id', layerName)
    input.setAttribute('type', 'checkbox')
    input.setAttribute('name', 'layertoggle')
    input.setAttribute('value', layerName)

    // add event
    input.onclick = function (e) {
      const checked = this.checked

      if (checked) {
        map.setLayoutProperty(layerName, 'visibility', 'visible')
      } else {
        map.setLayoutProperty(layerName, 'visibility', 'none')
      }
    }

    toggle.append(input)
    toggle.append(label)
    parent.append(toggle)
  })
}