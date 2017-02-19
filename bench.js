const Benchmark = require('benchmark')
const sample = require('lodash').sample
const slippyTile = require('.')

const suite = new Benchmark.Suite('slippy-grid')
suite
  // .add('parse', () => { slippyTile.parse([10, 15, 8], 'https://{s}.tile.openstreetmap.org/{zoom}/{x}/{y}.png') })
  // .add('wms', () => { slippyTile.wms([10, 15, 8], 'https://<Tile Server>/?layers=imagery&SRS={proj}&WIDTH={width}&HEIGHT={height}&BBOX={bbox}') })
  // .add('wmts', () => { slippyTile.wmts('https://<Tile Server>/WMTS/tile/1.0.0/Imagery/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg') })
  // .add('parseSwitch', () => { slippyTile.parseSwitch('http://tile-{switch:a,b,c}.openstreetmap.fr/hot/{zoom}/{x}/{y}.png') })
  .add('sample', () => { slippyTile.sample(['a', 'b', 'c']) })
  .add('sample null', () => { slippyTile.sample(null) })
  .add('sample []', () => { slippyTile.sample([]) })
  .add('lodash.sample', () => { sample(['a', 'b', 'c']) })
  .add('lodash.sample null', () => { sample(null) })
  .add('lodash.sample []', () => { sample([]) })
  .on('cycle', (event) => { console.log(String(event.target)) })
  .on('complete', () => {})
  .run()
