export var outdoors = {
  name: 'Mapbox Outdoors',
  categories: [
    'mapbox',
    'classic',
    'outdoors',
    'topo',
    'world'
  ],
  url: 'https://{s}.tiles.mapbox.com/v4/aj.um7z9lus/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpbG10dnA3NzY3OTZ0dmtwejN2ZnUycjYifQ.1W5oTOnWXQ9R1w8u3Oo1yA',
  description: 'Tiles from Mapbox',
  attribution: '© Mapbox, OpenStreetMap',
  format: 'png',
  type: 'overlay'
}

export var imagery = {
  name: 'Mapbox Imagery',
  categories: [
    'mapbox',
    'imagery',
    'world'
  ],
  url: 'https://{s}.tiles.mapbox.com/v4/openstreetmap.map-inh7ifmo/{z}/{x}/{y}.jpg?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpbG10dnA3NzY3OTZ0dmtwejN2ZnUycjYifQ.1W5oTOnWXQ9R1w8u3Oo1yA',
  description: 'Tiles from Mapbox',
  attribution: '© Mapbox, OpenStreetMap',
  format: 'jpg',
  type: 'baselayer'
}
