import * as slippyTile from './'

const options = {
  layer: 'bar',
  version: '1.3.0'
}
const scheme = 'https://{switch:a,b,c}.tile.openstreetmap.org/{zoom}/{x}/{y}.png'
const url = slippyTile([10, 15, 8], scheme, options)
//= https://b.tile.openstreetmap.org/8/10/15.png
