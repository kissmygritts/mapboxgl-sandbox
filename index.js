const mapboxgl = require('mapbox-gl')
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = process.env.MAPBOX_KEY

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-116.77592011899117, 38.64954285997146],
  zoom: 6
})

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