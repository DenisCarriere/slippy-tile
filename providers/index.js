const bing = require('./bing')
const esri = require('./esri')
const osm = require('./openstreetmap')
const strava = require('./strava')
const digitalglobe = require('./digitalglobe')
const mapbox = require('./mapbox')

module.exports = {
  digitalglobe,
  mapbox,
  esri,
  bing,
  osm,
  strava
}
