import { Provider } from '../index'

export const standard: Provider = {
  name: 'OSM Standard',
  categories: [
    'osm',
    'standard',
    'world',
  ],
  url: 'https://{s}.tile.openstreetmap.org/{zoom}/{x}/{y}.png',
  description: 'Tiles from OSM',
  attribution: 'Map data © OSM',
  format: 'png',
}
export const cycle: Provider = {
  name: 'OSM Cycle Map',
  categories: [
    'osm',
    'cycle',
    'world',
  ],
  url: 'https://{s}.tile.thunderforest.com/cycle/{zoom}/{x}/{y}.png',
  description: 'Tiles from OSM',
  attribution: 'Map data © OSM',
  format: 'png',
}

export const hot: Provider = {
  name: 'OSM Humanitarian',
  categories: [
    'osm',
    'hot',
    'humanitarian',
    'world',
  ],
  url: 'https://tile-{s}.openstreetmap.fr/hot/{zoom}/{x}/{y}.png',
  description: 'Tiles from OSM',
  attribution: 'Map data © OSM',
  format: 'png',
}

export const transport: Provider = {
  name: 'OSM Transport Map',
  categories: [
    'osm',
    'transport',
    'world',
  ],
  url: 'https://{s}.tile.thunderforest.com/transport/{zoom}/{x}/{y}.png',
  description: 'Tiles from OSM',
  attribution: 'Map data © OSM',
  format: 'png',
}

export const wikimedia = {
  name: 'OSM Wikimedia',
  categories: [
    'osm',
    'wikimedia',
    'world',
  ],
  url: 'https://maps.wikimedia.org/osm-intl/{zoom}/{x}/{y}.png',
  description: 'Tiles from OSM',
  attribution: 'Map data © OSM',
  format: 'png',
}

export const lyrk = {
  name: 'OSM Lyrk',
  categories: [
    'osm',
    'lyrk',
    'world',
  ],
  url: 'https://tiles.lyrk.org/ls/{zoom}/{x}/{y}?apikey=6e8cfef737a140e2a58c8122aaa26077',
  description: 'Tiles from OSM',
  attribution: 'Map data © OSM',
  format: 'png',
}

export const mapbox = {
  name: 'OSM Mapbox',
  categories: [
    'osm',
    'mapbox',
    'world',
  ],
  url: 'https://{s}.tiles.mapbox.com/v4/mapbox.streets/{zoom}/{x}/{y}.png',
  description: 'Tiles from OSM',
  attribution: 'Map data © OSM',
  format: 'png',
}
