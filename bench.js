const Benchmark = require('benchmark')
const slippyTile = require('.')

const minZoom = 0
const maxZoom = 5
const bbox = [-180.0, -90.0, 180, 90]
const bulk = 5
const suite = new Benchmark.Suite('slippy-grid')
suite
  .add('parse', () => { slippyTile.parse([10, 15, 8], 'https://{s}.tile.openstreetmap.org/{zoom}/{x}/{y}.png') })
  .on('cycle', (event) => { console.log(String(event.target)) })
  .on('complete', () => {})
  .run()
