const mapboxgl = require('mapbox-gl')
import 'mapbox-gl/dist/mapbox-gl.css'
import layerStyles from '../layer-styles.json'
import { createLayerToggles } from './layer-toggles.js'

mapboxgl.accessToken = process.env.MAPBOX_KEY

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-116.77592011899117, 38.64954285997146],
  zoom: 6
})

// add map UI controls
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
createLayerToggles(map)
