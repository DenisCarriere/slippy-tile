import { Provider } from '../index'

export const labels: Provider = {
  name: 'Mapbox Labels',
  categories: [
    'mapbox',
    'labels',
    'world',
  ],
  url: 'http://{s}.tiles.mapbox.com/v4/openstreetmap.map-inh7ifmo/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoib3BlbnN0cmVldG1hcCIsImEiOiJncjlmd0t3In0.DmZsIeOW-3x-C5eX-wAqTw',
  description: 'Tiles from Mapbox',
  attribution: '© Mapbox',
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
  url: 'http://{s}.tiles.mapbox.com/v4/openstreetmap.map-inh7ifmo/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoib3BlbnN0cmVldG1hcCIsImEiOiJncjlmd0t3In0.DmZsIeOW-3x-C5eX-wAqTw',
  description: 'Tiles from Mapbox',
  attribution: '© Mapbox',
  format: 'png',
  type: 'baselayer',
}
