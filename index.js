const mapboxgl = require('mapbox-gl')
import 'mapbox-gl/dist/mapbox-gl.css'
import layerStyles from './layer-styles.json'

mapboxgl.accessToken = process.env.MAPBOX_KEY

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-116.77592011899117, 38.64954285997146],
  zoom: 6
})

// add UI controls
const nav = new mapboxgl.NavigationControl()
const scale = new mapboxgl.ScaleControl({
  unit: 'imperial'
})
const fullscreen = new mapboxgl.FullscreenControl()

map.addControl(nav, 'top-left')
map.addControl(scale, 'bottom-left')
map.addControl(fullscreen, 'top-left')

// add map sources
map.on('load', () => {
  // loop over layer-styles to add layers iteratively
  Object.keys(layerStyles).forEach(layer => {
    map.addSource(layer, layerStyles[layer].source)
    map.addLayer(layerStyles[layer].layer)
  })
})

// layer toggles
const layerNames = ['nv_counties', 'hunt_units', 'nv_roads', 'nv_features']

// loop over layers to attach event to each checkbox
layerNames.forEach(layer => {
  const toggle = document.getElementById(layer)
  toggle.onclick = function (e) {
    const checked = this.checked

    if (checked) {
      map.setLayoutProperty(layer, 'visibility', 'visible')
    } else {
      map.setLayoutProperty(layer, 'visibility', 'none')
    }
  }
})

function getLayerToggle (el) {
  let out = {}

  el.forEach(toggle => {
    const { id, value, checked } = toggle
    out[id] = { value, checked }
  })

  return out 
}

const y = getLayerToggle(document.getElementsByName('layertoggle'))
console.log(JSON.stringify(y))