const test = require('tape')
const {googleToTile, googleToBBox, bboxToMeters} = require('global-mercator')
const slippyTile = require('./')

const TILE = [10, 15, 8]
const [x, y, z] = TILE
const inverseY = googleToTile(TILE)[1]
const bbox = googleToBBox(TILE)
const bboxMeters = bboxToMeters(googleToBBox(TILE))
const proj = 'EPSG:3857'
const width = 256
const height = 256
const style = 'default'
const tileMatrixSet = 'GoogleMapsCompatible'

test('slippy-tile', t => {
  t.equal(slippyTile(TILE,
    'https://example.org/{z}/{x}/{y}.png'),
    `https://example.org/${z}/${x}/${y}.png`,
    'simple'
  )
  t.equal(slippyTile(TILE,
    'https://example.org/{z}/{x}/{-y}.png'),
    `https://example.org/${z}/${x}/${inverseY}.png`,
    'leaflet {-y}'
  )
  t.equal(slippyTile(TILE,
    'https://example.org/tiles/256/{level}/{col}/{row}'),
    `https://example.org/tiles/256/${z}/${x}/${y}`,
    'arcgis'
  )

  t.equal(slippyTile(TILE,
    'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/WMTS/tile/1.0.0/World_Imagery/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg'),
    `https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/WMTS/tile/1.0.0/World_Imagery/${style}/${tileMatrixSet}/${z}/${y}/${x}.jpg`,
    'wmts'
  )
  t.equal(slippyTile(TILE,
    'http://irs.gis-lab.info/?layers=landsat&SRS={proj}&WIDTH={Width}&HEIGHT={height}&BBOX={bbox}'),
    `http://irs.gis-lab.info/?layers=landsat&SRS=${proj}&WIDTH=${width}&HEIGHT=${height}&BBOX=${bboxMeters}`,
    'wms'
  )

  t.equal(slippyTile(TILE,
    'http://irs.gis-lab.info/?layers=landsat&SRS=EPSG:4326&WIDTH={Width}&HEIGHT={height}&BBOX={bbox}'),
    `http://irs.gis-lab.info/?layers=landsat&SRS=EPSG:4326&WIDTH=${width}&HEIGHT=${height}&BBOX=${bbox}`,
    'wms - WGS84'
  )
  t.equal(slippyTile(TILE,
    'https://ecn.t2.tiles.virtualearth.net/tiles/a{quadkey}.jpeg'),
    'https://ecn.t2.tiles.virtualearth.net/tiles/a00003232.jpeg',
    'quadkey'
  )
  slippyTile(TILE, 'https://ecn.t{switch:1,2,3}.tiles.virtualearth.net/tiles/a{quadkey}.jpeg'),
  t.throws(() => slippyTile(TILE, 'http://example.org/{foo}/{bar}'))
  t.end()
})
