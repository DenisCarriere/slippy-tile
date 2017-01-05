import * as slippyTile from './index'
import {Tile} from './index'

const TILE: Tile = [10, 15, 8]
const [x, y, z] = TILE

describe('parse', () => {
  test('leaflet', () => { expect(slippyTile.parse(TILE,
    'https://example.org/{z}/{x}/{y}.png')).toBe(
    `https://example.org/${z}/${x}/${y}.png`)
  })
  test('leaflet {-y}', () => { expect(slippyTile.parse(TILE,
    'https://example.org/{z}/{x}/{-y}.png')).toBe(
    `https://example.org/${z}/${x}/240.png`)
  })
  test('arcgis', () => { expect(slippyTile.parse(TILE,
    'https://example.org/tiles/256/{level}/{col}/{row}')).toBe(
    `https://example.org/tiles/256/${z}/${x}/${y}`)
  })
  test('wmts', () => { expect(slippyTile.parse(TILE,
    'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/WMTS/tile/1.0.0/World_Imagery/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg')).toBe(
    `https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/WMTS/tile/1.0.0/World_Imagery/default/GoogleMapsCompatible/${z}/${y}/${x}.jpg`)
  })
  test('wms', () => { expect(slippyTile.parse(TILE,
    'http://irs.gis-lab.info/?layers=landsat&SRS={proj}&WIDTH={width}&HEIGHT={height}&BBOX={bbox}')).toBe(
    'http://irs.gis-lab.info/?layers=landsat&SRS=EPSG:3857&WIDTH=256&HEIGHT=256&BBOX=-165.9375,82.676285,-164.53125,82.853382')
  })
})

describe('sample', () => {
  test(`['a'] === 'a'`, () => { expect(slippyTile.sample(['a'])).toBe('a') })
})

describe('providers', () => {
  test('osm.standard', () => { expect(slippyTile.parse(TILE, slippyTile.providers.osm.standard.url)).toBeDefined() })
  test('bing.imagery', () => { expect(slippyTile.parse(TILE, slippyTile.providers.bing.imagery.url)).toBeDefined() })
})
