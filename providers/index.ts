import * as bing from './bing'
import * as esri from './esri'
import * as osm from './osm'
import * as strava from './strava'
import * as digitalglobe from './digitalglobe'
import * as mapbox from './mapbox'

// Alternate names
const openstreetmap = osm
const arcgis = esri
const dg = digitalglobe
const microsoft = bing

export {
  dg,
  digitalglobe,
  mapbox,
  esri,
  arcgis,
  bing,
  microsoft,
  osm,
  openstreetmap,
  strava,
}
