const test = require('tap').test
const mercator = require('global-mercator')
const googleToTile = mercator.googleToTile
const googleToBBox = mercator.googleToBBox
const bboxToMeters = mercator.bboxToMeters
const slippyTile = require('./')

const x = 10
const y = 15
const z = 8
const TILE = [x, y, z]
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
  const options = {
    format: 'image/png',
    layer: 'FooLayer',
    version: '1.3.0'
  }
  t.equal(slippyTile(TILE,
    'http://hostname/?service=WMS&request=GetMap&version={Version}&layers={Layer}&transparent=false&format={format}&height={height}&width={width}&srs={srs}&bbox={bbox}', options),
    'http://hostname/?service=WMS&request=GetMap&version=1.3.0&layers=FooLayer&transparent=false&format=image/png&height=256&width=256&srs=EPSG:3857&bbox=-18472078,17532819.8,-18315535,17689362.6',
    'ogc.wms'
  )
  t.equal(slippyTile([0, 0, 0],
    'https://services.arcgisonline.com/arcgis/rest/services/ESRI_Imagery_World_2D/MapServer/export?bbox={bbox4326}&bboxSR=EPSG:4326&imageSR={srs}&size={size}&format=png&transparent=true&f=image', options),
    'https://services.arcgisonline.com/arcgis/rest/services/ESRI_Imagery_World_2D/MapServer/export?bbox=-180,-85.051129,180,85.051129&bboxSR=EPSG:4326&imageSR=EPSG:3857&size=256,256&format=png&transparent=true&f=image',
    'ESRI_Imagery_World_2D'
  )
  slippyTile(TILE, 'https://ecn.t{switch:1,2,3}.tiles.virtualearth.net/tiles/a{quadkey}.jpeg')
  t.end()
})
