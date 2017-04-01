var mercator = require('global-mercator')
var googleToBBox = mercator.googleToBBox
var googleToTile = mercator.googleToTile
var googleToQuadkey = mercator.googleToQuadkey
var bboxToMeters = mercator.bboxToMeters

/**
 * Substitutes the given tile information [x, y, z] to the URL tile scheme.
 *
 * @name slippyTile
 * @param {Tile} tile Tile [x, y, z]
 * @param {string} url URL Tile scheme or provider unique key
 * @returns {string} parsed URL
 * @example
 * slippyTile([10, 15, 8], 'https://{s}.tile.openstreetmap.org/{zoom}/{x}/{y}.png')
 * //='https://c.tile.openstreetmap.org/8/10/15.png'
 */
module.exports = function (tile, url) {
  var x = tile[0]
  var y = tile[1]
  var zoom = tile[2]
  url = wms(tile, url)
  url = wmts(url)
  url = parseSwitch(url)
  url = url.replace(/{(zoom|z|level)}/gi, String(zoom))
  url = url.replace(/{(x|col)}/gi, String(x))
  url = url.replace(/{(y|row)}/gi, String(y))
  if (url.match(/{-y}/)) url = url.replace(/{-y}/gi, String(googleToTile(tile)[1]))
  if (url.match(/{(quadkey|q)}/)) url = url.replace(/{(quadkey|q)}/gi, googleToQuadkey(tile))
  if (url.match(/{.*}/)) throw new Error('Could not completly parse URL' + url)
  return url
}

/**
 * Parse WMS URL to friendly SlippyTile format
 *
 * @private
 * @param {Tile} tile Tile [x, y, z]
 * @param {string} url WMTS URL scheme
 * @returns {string} parsed URL
 * @example
 * wms([10, 15, 8], 'https://<Tile Server>/?layers=imagery&SRS={proj}&WIDTH={width}&HEIGHT={height}&BBOX={bbox}')
 * //='https://<Tile Server>/?layers=imagery&SRS=EPSG:3857&WIDTH=256&HEIGHT=256&BBOX=-165.9375,82.676285,-164.53125,82.853382'
 */
function wms (tile, url) {
  if (url.match(/{height|width|proj|srs|crs|bbox}/gi)) {
    url = url.replace(/{height}/gi, '256')
    url = url.replace(/{width}/gi, '256')
    url = url.replace(/{(proj|srs|crs)}/gi, 'EPSG:3857')
    var bbox
    if (url.match(/EPSG:(3857|900913)/i)) {
      bbox = bboxToMeters(googleToBBox(tile))
    } else {
      bbox = googleToBBox(tile)
    }

    if (url.match(/{bbox}/i)) { url = url.replace(/{bbox}/gi, bbox.join(',')) }
  }
  return url
}

/**
 * Parse WMTS URL to friendly SlippyTile URL format
 *
 * @private
 * @param {string} url WMTS URL scheme
 * @returns {string} parsed URL
 * @example
 * wmts('https://<Tile Server>/WMTS/tile/1.0.0/Imagery/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg')
 * //='https://<Tile Server>/WMTS/tile/1.0.0/Imagery/default/GoogleMapsCompatible/{z}/{y}/{x}.jpg'
 */
function wmts (url) {
  if (url.match(/{TileCol|TileRow|TileMatrix|TileMatrixSet|Style}/gi)) {
    url = url.replace(/{TileCol}/gi, '{x}')
    url = url.replace(/{TileRow}/gi, '{y}')
    url = url.replace(/{TileMatrix}/gi, '{z}')
    url = url.replace(/{TileMatrixSet}/gi, 'GoogleMapsCompatible')
    url = url.replace(/{Style}/gi, 'default')
  }
  return url
}

/**
 * Replaces {switch:a,b,c} with a random sample.
 *
 * @private
 * @param {string} url - URL Scheme
 * @returns {string} Parsed URL with switch replaced
 * @example
 * parseSwitch('http://tile-{switch:a,b,c}.openstreetmap.fr/hot/{zoom}/{x}/{y}.png')
 * //='http://tile-b.openstreetmap.fr/hot/{zoom}/{x}/{y}.png'
 */
function parseSwitch (url) {
  // Default simple switch
  if (url.match(/{s}/gi)) {
    return url.replace(/{s}/gi, String(sample(['a', 'b', 'c'])))
  }
  // Custom switch
  var pattern = /{switch:([a-z,\d]*)}/gi
  var found = url.match(pattern)
  if (found) {
    return url.replace(pattern, String(sample(found[1].split(','))))
  }
  return url
}

/**
 * Sample an item from a given list
 *
 * @private
 * @name sample
 * @param {Array} array List of items
 * @returns {*} Single item from the list
 * @example
 * sample(['a', 'b', 'c'])
 * //='b'
 */
function sample (array) {
  if (array === null || array === undefined || array.length === 0) { return undefined }
  return array[Math.floor(Math.random() * array.length)]
}
