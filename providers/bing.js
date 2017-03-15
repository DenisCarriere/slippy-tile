module.exports.imagery = {
  name: 'Bing Imagery',
  categories: [
    'bing',
    'imagery',
    'world'
  ],
  minZoom: 0,
  maxZoom: 20,
  url: 'https://ecn.t{switch:0,1,2,3}.tiles.virtualearth.net/tiles/a{quadkey}.jpeg?g=5250',
  description: 'Tiles from Bing',
  attribution: 'Map data © Bing',
  format: 'jpg',
  type: 'baselayer'
}
