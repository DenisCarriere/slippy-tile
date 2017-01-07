import { Provider } from '../index'

export const both: Provider = {
  name: 'Strava Cycling & Running',
  categories: [
    'strava',
    'cycling',
    'running',
    'world',
  ],
  url: 'https://globalheat.strava.com/tiles/both/color/{zoom}/{x}/{y}.png',
  description: 'Tiles from Strava',
  attribution: 'Map data © Strava',
  format: 'png',
  type: 'overlay',
}
