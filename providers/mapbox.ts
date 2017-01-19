import { Provider } from '../index'

export const outdoors: Provider = {
  name: 'Mapbox Outdoors',
  categories: [
    'mapbox',
    'classic',
    'outdoors',
    'topo',
    'world',
  ],
  url: 'https://{s}.tiles.mapbox.com/v4/aj.um7z9lus/{z}/{x}/{y}.png',
  description: 'Tiles from Mapbox',
  attribution: '© Mapbox, OpenStreetMap',
  format: 'png',
  type: 'overlay',
}

export const labels: Provider = {
  name: 'Mapbox Labels',
  categories: [
    'mapbox',
    'labels',
    'world',
  ],
  url: 'https://{s}.tiles.mapbox.com/v4/openstreetmap.map-inh7ifmo/{z}/{x}/{y}.png',
  description: 'Tiles from Mapbox',
  attribution: '© Mapbox, OpenStreetMap',
  format: 'png',
  type: 'overlay',
}

export const imagery: Provider = {
  name: 'Mapbox Imagery',
  categories: [
    'mapbox',
    'imagery',
    'world',
  ],
  url: 'https://{s}.tiles.mapbox.com/v4/openstreetmap.map-inh7ifmo/{z}/{x}/{y}.png',
  description: 'Tiles from Mapbox',
  attribution: '© Mapbox, OpenStreetMap',
  format: 'png',
  type: 'baselayer',
}
