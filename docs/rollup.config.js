const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const builtins = require('rollup-plugin-node-builtins')
const globals = require('rollup-plugin-node-globals')
const json = require('rollup-plugin-json')

module.exports = {
  entry: 'index.js',
  dest: 'docs/slippy-tile.min.js',
  format: 'umd',
  plugins: [
    json(),
    resolve(),
    commonjs(),
    globals(),
    builtins()
  ],
  useStrict: false,
  moduleName: 'slippyTile'
}