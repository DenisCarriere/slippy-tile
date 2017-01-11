import { Provider } from '../index'

export const standard: Provider = {
  name: 'OSM Standard',
  categories: [
    'osm',
    'standard',
    'world',
  ],
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  description: 'Tiles from OSM',
  attribution: 'Map data © OSM',
  format: 'png',
  type: 'baselayer',
}
export const cycle: Provider = {
  name: 'OSM Cycle Map',
  categories: [
    'osm',
    'cycle',
    'world',
  ],
  url: 'https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png',
  description: 'Tiles from OSM',
  attribution: 'Map data © OSM',
  format: 'png',
  type: 'baselayer',
}

export const hot: Provider = {
  name: 'OSM Humanitarian',
  categories: [
    'osm',
    'hot',
    'humanitarian',
    'world',
  ],
  url: 'https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png',
  description: 'Tiles from OSM',
  attribution: 'Map data © OSM',
  format: 'png',
  type: 'baselayer',
}

export const transport: Provider = {
  name: 'OSM Transport Map',
  categories: [
    'osm',
    'transport',
    'world',
  ],
  url: 'https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png',
  description: 'Tiles from OSM',
  attribution: 'Map data © OSM',
  format: 'png',
  type: 'baselayer',
}

export const wikimedia = {
  name: 'OSM Wikimedia',
  categories: [
    'osm',
    'wikimedia',
    'world',
  ],
  url: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png',
  description: 'Tiles from OSM',
  attribution: 'Map data © OSM',
  format: 'png',
  type: 'baselayer',
}

export const lyrk = {
  name: 'OSM Lyrk',
  categories: [
    'osm',
    'lyrk',
    'world',
  ],
  url: 'https://tiles.lyrk.org/ls/{z}/{x}/{y}?apikey=6e8cfef737a140e2a58c8122aaa26077',
  description: 'Tiles from OSM',
  attribution: 'Map data © OSM',
  format: 'png',
  type: 'baselayer',
}

export const mapbox = {
  name: 'OSM Mapbox',
  categories: [
    'osm',
    'mapbox',
    'world',
  ],
  url: 'https://{s}.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png',
  description: 'Tiles from OSM',
  attribution: 'Map data © OSM',
  format: 'png',
  type: 'baselayer',
}
