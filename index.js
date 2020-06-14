const mapboxgl = require('mapbox-gl')
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = process.env.MAPBOX_KEY

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-116.77592011899117, 38.64954285997146],
  zoom: 6
})

// Add contours layer
map.on('load', () => {
  map.addSource('contours', {
    type: 'vector',
    url: 'mapbox://mapbox.mapbox-terrain-v2'
  })

  map.addLayer({
    'id': 'contours',
    'type': 'line',
    'source': 'contours',
    'source-layer': 'contour',
    'layout': {
      'visibility': 'visible',
      'line-join': 'round',
      'line-cap': 'round'
    },
    'paint': {
      'line-color': '#877b59',
      'line-width': 1
    }
  })
})

// toggle contour layer
const toggleableLayerIds = ['contours']

toggleableLayerIds.forEach(layer => {
  var link = document.createElement('a')
  link.href='#'
  link.className = 'active'
  link.textContent = layer

  link.onclick = function (e) {
    const clickedLayer = this.textContent
    e.preventDefault()
    e.stopPropagation()

    const visibility = map.getLayoutProperty(clickedLayer, 'visibility')

    if (visibility === 'visible') {
      map.setLayoutProperty(clickedLayer, 'visibility', 'none')
      this.className = ''
    } else {
      this.className = 'active'
      map.setLayoutProperty(clickedLayer, 'visibility', 'visible')
    }
  }

  const layers = document.getElementById('menu')
  layers.appendChild(link)
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

// get mouse coordinates
map.on('mousemove', (e) => {
  const {lng, lat} = e.lngLat

  document.getElementById('long').innerHTML = Math.round(lng * 10000) / 10000
  document.getElementById('lat').innerHTML = Math.round(lat * 10000) / 10000
})

module.exports = map