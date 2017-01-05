import { Provider } from '../index'

export const imagery: Provider = {
  name: 'Bing Imagery',
  categories: [
    'bing',
    'imagery',
    'world',
  ],
  url: 'https://ecn.t{switch:0,1,2,3}.tiles.virtualearth.net/tiles/a{quadkey}.jpeg?g=5250',
  description: 'Tiles from Bing',
  attribution: 'Map data © Bing',
  format: 'jpg',
}
