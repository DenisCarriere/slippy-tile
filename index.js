const mercator = require('global-mercator')
const providers = require('./providers')
module.exports.providers = providers

/**
 * Substitutes the given tile information [x, y, z] to the URL tile scheme.
 *
 * @param {Tile} tile Tile [x, y, z]
 * @param {string} url URL Tile scheme or provider unique key
 * @returns {string}
 * @example
 * const tile = [10, 15, 8]
 * const url = 'https://{s}.tile.openstreetmap.org/{zoom}/{x}/{y}.png'
 * parse(tile, url)
 * //='https://c.tile.openstreetmap.org/8/10/15.png'
 */
function parse (tile, url) {
  const [x, y, zoom] = tile
  url = wms(tile, url)
  url = wmts(url)
  url = parseSwitch(url)
  url = url.replace(/{(zoom|z|level)}/, String(zoom))
  url = url.replace(/{(x|col)}/, String(x))
  url = url.replace(/{(y|row)}/, String(y))
  if (url.match(/{-y}/)) { url = url.replace(/{-y}/, String(mercator.googleToTile(tile)[1])) }
  if (url.match(/{(quadkey|q)}/)) { url = url.replace(/{(quadkey|q)}/, mercator.googleToQuadkey(tile)) }
  if (url.match(/{.*}/)) { throw new Error(`Could not completly parse URL ${url}`) }
  return url
}
module.exports.parse = parse

/**
 * Parse WMS URL to friendly SlippyTile format
 *
 * @param {Tile} tile Tile [x, y, z]
 * @param {string} url WMTS URL scheme
 * @returns {string}
 * @example
 * const tile = [10, 15, 8]
 * const url = 'https://<Tile Server>/?layers=imagery&SRS={proj}&WIDTH={width}&HEIGHT={height}&BBOX={bbox}'
 * wms(tile, url)
 * //='https://<Tile Server>/?layers=imagery&SRS=EPSG:3857&WIDTH=256&HEIGHT=256&BBOX=-165.9375,82.676285,-164.53125,82.853382'
 */
function wms (tile, url) {
  url = url.replace(/{height}/, '256')
  url = url.replace(/{width}/, '256')
  url = url.replace(/{proj}/, 'EPSG:3857')
  if (url.match(/{bbox}/)) { url = url.replace(/{bbox}/, mercator.googleToBBox(tile).join(',')) }
  return url
}
module.exports.wms = wms

/**
 * Parse WMTS URL to friendly SlippyTile URL format
 *
 * @param {string} url WMTS URL scheme
 * @returns {string}
 * @example
 * wmts('https://<Tile Server>/WMTS/tile/1.0.0/Imagery/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg')
 * //='https://<Tile Server>/WMTS/tile/1.0.0/Imagery/default/GoogleMapsCompatible/{z}/{y}/{x}.jpg'
 */
function wmts (url) {
  url = url.replace(/{TileCol}/, '{x}')
  url = url.replace(/{TileRow}/, '{y}')
  url = url.replace(/{TileMatrix}/, '{z}')
  url = url.replace(/{TileMatrixSet}/, 'GoogleMapsCompatible')
  url = url.replace(/{Style}/, 'default')
  return url
}
module.exports.wmts = wmts

/**
 * Replaces {switch:a,b,c} with a random sample.
 *
 * @param {string} url - URL Scheme
 * @returns {string} Parsed URL with switch replaced
 * @example
 * parseSwitch('http://tile-{switch:a,b,c}.openstreetmap.fr/hot/{zoom}/{x}/{y}.png')
 * //='http://tile-b.openstreetmap.fr/hot/{zoom}/{x}/{y}.png'
 */
function parseSwitch (url) {
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
module.exports.parseSwitch = parseSwitch

/**
 * Sample an item from a given list
 *
 * @name sample
 * @param {any[]} collection List of items
 * @returns {any} Single item from the list
 * @example
 * sample(['a', 'b', 'c'])
 * //='b'
 */
function sample (collection) {
  return collection[Math.floor(Math.random() * collection.length)]
}
module.exports.sample = sample