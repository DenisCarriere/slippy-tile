const bing = require('./bing')
const esri = require('./esri')
const openstreetmap = require('./openstreetmap')
const strava = require('./strava')
const digitalglobe = require('./digitalglobe')
const mapbox = require('./mapbox')

module.exports = {
  digitalglobe,
  mapbox,
  esri,
  bing,
  openstreetmap,
  strava
}
