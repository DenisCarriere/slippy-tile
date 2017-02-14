module.exports.hybrid = {
  attribution: '© DigitalGlobe, © OpenStreetMap, © Mapbox',
  categories: [
    'digitalglobe',
    'dg',
    'imagery',
    'street',
    'hybrid',
    'world'
  ],
  description: 'Tiles from DigitalGlobe',
  name: 'DigitalGlobe Hybrid',
  format: 'jpg',
  url: 'https://{s}.tiles.mapbox.com/v4/digitalglobe.nal0mpda/{z}/{x}/{y}',
  type: 'baselayer'
}

module.exports.imagery = {
  name: 'DigitalGlobe Imagery',
  categories: [
    'digitalgloble',
    'dg',
    'imagery',
    'world'
  ],
  url: 'https://{s}.tiles.mapbox.com/v4/digitalglobe.nal0g75k/{z}/{x}/{y}',
  description: 'Tiles from DigitalGlobe',
  attribution: '© DigitalGlobe',
  format: 'jpg',
  type: 'baselayer'
}
