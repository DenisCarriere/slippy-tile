import * as mercator from 'global-mercator'
import * as digitalglobe from './providers/digitalglobe'
import * as esri from './providers/esri'
import * as bing from './providers/bing'
import * as osm from './providers/osm'
import * as strava from './providers/strava'

export {
  bing,
  digitalglobe,
  esri,
  osm,
  strava,
}

/**
 * Provider
 */
export interface Provider {
  attribution: string
  categories: Array<string>
  description: string
  name: string
  format: string
  url: string
}

/**
 * Tile [x, y, zoom]
 */
export type Tile = [number, number, number] | number[]

/**
 * Substitutes the given tile information [x,y,zoom] to the URL tile scheme.
 *
 * @param {Tile} tile Tile [x, y, zoom]
 * @param {string} url URL Tile scheme or provider unique key
 * @returns {string}
 * @example
 * import * as slippyTile from 'slippy-tile'
 * slippyTile.parse([10, 15, 8], slippyTile.osm.standard.url)
 * //='https://c.tile.openstreetmap.org/8/10/15.png'
 */
export function parse (tile: Tile, url: string) {
  const [x, y, zoom] = tile
  url = url.replace(/{(zoom|z)}/, String(zoom))
  url = url.replace(/{x}/, String(x))
  url = url.replace(/{y}/, String(y))
  url = url.replace(/{height}/, '256')
  url = url.replace(/{width}/, '256')
  url = url.replace(/{proj}/, 'EPSG:3857')
  if (url.match(/{bbox}/)) { url = url.replace(/{bbox}/, mercator.googleToBBox(tile).join(',')) }
  if (url.match(/{-y}/)) { url = url.replace(/{-y}/, String(mercator.googleToTile(tile)[1])) }
  if (url.match(/{(quadkey|q)}/)) { url = url.replace(/{(quadkey|q)}/, mercator.googleToQuadkey(tile)) }
  url = parseSwitch(url)
  return url
}

/**
 * Replaces {switch:a,b,c} with a random sample.
 *
 * @param {string} url - URL Scheme
 * @returns {string} Parsed URL with switch replaced
 * @example
 * import * as slippyTile from 'slippy-tile'
 * slippyTile.parseSwitch('http://tile-{switch:a,b,c}.openstreetmap.fr/hot/{zoom}/{x}/{y}.png')
 * //='http://tile-b.openstreetmap.fr/hot/{zoom}/{x}/{y}.png'
 */
export function parseSwitch (url: string) {
  // Default simple switch
  if (url.match(/{s}/i)) {
    const random = String(sample(['a', 'b', 'c']))
    return url.replace(/{s}/, random)
  }
  // Custom switch
  const pattern = /{switch:([a-z,\d]*)}/i
  const found = url.match(pattern)
  if (found) {
    const random = String(sample(found[1].split(',')))
    return url.replace(pattern, random)
  }
  return url
}

/**
 * Sample an item from a given list
 *
 * @param {Array<any>} collection List of items
 * @returns {string | number} Single item from the list
 * @example
 * import * as slippyTile from 'slippy-tile'
 * slippyTile.sample(['a', 'b', 'c'])
 * //='b'
 */
export function sample (collection: Array<string | number>): string | number {
  return collection[Math.floor(Math.random() * collection.length)]
}

export default parse