const Benchmark = require('benchmark')
const slippyTile = require('./')

/**
 * Benchmark Results
 *
 * simple x 362,158 ops/sec ±2.94% (83 runs sampled)
 */
const suite = new Benchmark.Suite('slippy-tile')
suite
  .add('simple', () => slippyTile([10, 15, 8], 'https://{s}.tile.openstreetmap.org/{zoom}/{x}/{y}.png'))
  .on('cycle', e => { console.log(String(e.target)) })
  .on('complete', () => {})
  .run()
