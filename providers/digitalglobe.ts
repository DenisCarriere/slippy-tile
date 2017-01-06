import { Provider } from '../index'

export const hybrid: Provider = {
  attribution: '© DigitalGlobe, © OpenStreetMap, © Mapbox',
  categories: [
    'digitalglobe',
    'dg',
    'imagery',
    'street',
    'hybrid',
    'world',
  ],
  description: 'Tiles from DigitalGlobe',
  name: 'DigitalGlobe Hybrid',
  format: 'png',
  url: 'https://{s}.tiles.mapbox.com/v4/digitalglobe.nal0mpda/{z}/{x}/{y}.png',
}

export const imagery: Provider = {
  name: 'DigitalGlobe Imagery',
  categories: [
    'digitalgloble',
    'dg',
    'imagery',
    'world',
  ],
  url: 'https://{s}.tiles.mapbox.com/v4/digitalglobe.nal0g75k/{z}/{x}/{y}.png',
  description: 'Tiles from DigitalGlobe',
  attribution: '© DigitalGlobe',
  format: 'png',
}
