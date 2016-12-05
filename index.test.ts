import * as slippyTile from './index'
import {Tile} from './index'

const TILE: Tile = [10, 15, 8]

test('parse.tile', () => {
  expect(slippyTile.parse([10, 15, 8], 'https://tile.openstreetmap.org/{zoom}/{x}/{y}.png')).toBe('https://tile.openstreetmap.org/8/10/15.png')
})

test('parse', () => {
  expect(!!slippyTile.parse(TILE, slippyTile.osm.standard.url)).toBeTruthy()
  expect(!!slippyTile.parse(TILE, slippyTile.bing.imagery.url)).toBeTruthy()
  // Add {-y} provider
  // Add {bbox} provider
})

test('sample', () => {
  expect(slippyTile.sample(['a'])).toBe('a')
})

test('providers', () => {
  expect(slippyTile.osm.standard.url).toBe('https://{s}.tile.openstreetmap.org/{zoom}/{x}/{y}.png')
})
