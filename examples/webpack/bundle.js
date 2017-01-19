/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const mercator = __webpack_require__(1);
const providers = __webpack_require__(5);
exports.providers = providers;
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
function parse(tile, url) {
    Object.assign({}, {});
    const [x, y, zoom] = tile;
    url = wms(tile, url);
    url = wmts(url);
    url = parseSwitch(url);
    url = url.replace(/{(zoom|z|level)}/, String(zoom));
    url = url.replace(/{(x|col)}/, String(x));
    url = url.replace(/{(y|row)}/, String(y));
    if (url.match(/{-y}/)) {
        url = url.replace(/{-y}/, String(mercator.googleToTile(tile)[1]));
    }
    if (url.match(/{(quadkey|q)}/)) {
        url = url.replace(/{(quadkey|q)}/, mercator.googleToQuadkey(tile));
    }
    if (url.match(/{.*}/)) {
        throw new Error(`Could not completly parse URL ${url}`);
    }
    return url;
}
exports.parse = parse;
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
function wms(tile, url) {
    url = url.replace(/{height}/, '256');
    url = url.replace(/{width}/, '256');
    url = url.replace(/{proj}/, 'EPSG:3857');
    if (url.match(/{bbox}/)) {
        url = url.replace(/{bbox}/, mercator.googleToBBox(tile).join(','));
    }
    return url;
}
exports.wms = wms;
/**
 * Parse WMTS URL to friendly SlippyTile URL format
 *
 * @param {string} url WMTS URL scheme
 * @returns {string}
 * @example
 * wmts('https://<Tile Server>/WMTS/tile/1.0.0/Imagery/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg')
 * //='https://<Tile Server>/WMTS/tile/1.0.0/Imagery/default/GoogleMapsCompatible/{z}/{y}/{x}.jpg'
 */
function wmts(url) {
    url = url.replace(/{TileCol}/, '{x}');
    url = url.replace(/{TileRow}/, '{y}');
    url = url.replace(/{TileMatrix}/, '{z}');
    url = url.replace(/{TileMatrixSet}/, 'GoogleMapsCompatible');
    url = url.replace(/{Style}/, 'default');
    return url;
}
exports.wmts = wmts;
/**
 * Replaces {switch:a,b,c} with a random sample.
 *
 * @param {string} url - URL Scheme
 * @returns {string} Parsed URL with switch replaced
 * @example
 * parseSwitch('http://tile-{switch:a,b,c}.openstreetmap.fr/hot/{zoom}/{x}/{y}.png')
 * //='http://tile-b.openstreetmap.fr/hot/{zoom}/{x}/{y}.png'
 */
function parseSwitch(url) {
    // Default simple switch
    if (url.match(/{s}/i)) {
        const random = String(exports.sample(['a', 'b', 'c']));
        return url.replace(/{s}/, random);
    }
    // Custom switch
    const pattern = /{switch:([a-z,\d]*)}/i;
    const found = url.match(pattern);
    if (found) {
        const random = String(exports.sample(found[1].split(',')));
        return url.replace(pattern, random);
    }
    return url;
}
exports.parseSwitch = parseSwitch;
/**
 * Sample an item from a given list
 *
 * @param {any[]} collection List of items
 * @returns {any} Single item from the list
 * @example
 * sample(['a', 'b', 'c'])
 * //='b'
 */
exports.sample = (collection) => {
    return collection[Math.floor(Math.random() * collection.length)];
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.tileSize = 256;
exports.initialResolution = 2 * Math.PI * 6378137 / exports.tileSize;
exports.originShift = 2 * Math.PI * 6378137 / 2.0;
/**
 * Hash for Map ID
 *
 * @param {Tile} tile [x, y, z]
 * @returns {number} hash
 * @example
 * const id = hash([312, 480, 4])
 * //=5728
 */
function hash(tile) {
    const [x, y, z] = tile;
    return (1 << z) * ((1 << z) + x) + y;
}
exports.hash = hash;
/**
 * Converts BBox to Center
 *
 * @param {BBox} bbox - [west, south, east, north] coordinates
 * @return {LngLat} center
 * @example
 * const center = bboxToCenter([90, -45, 85, -50])
 * //= [ 87.5, -47.5 ]
 */
function bboxToCenter(bbox) {
    const [west, south, east, north] = bbox;
    let lng = (west - east) / 2 + east;
    let lat = (south - north) / 2 + north;
    lng = Number(lng.toFixed(6));
    lat = Number(lat.toFixed(6));
    return [lng, lat];
}
exports.bboxToCenter = bboxToCenter;
/**
 * Converts {@link LngLat} coordinates to {@link Meters} coordinates.
 *
 * @param {LngLat} lnglat Longitude (Meridians) & Latitude (Parallels) in decimal degrees
 * @returns {Meters} Meters coordinates
 * @example
 * const meters = lngLatToMeters([126, 37])
 * //=[ 14026255.8, 4439106.7 ]
 */
function lngLatToMeters(lnglat) {
    const [lng, lat] = validateLngLat(lnglat);
    let x = lng * exports.originShift / 180.0;
    let y = Math.log(Math.tan((90 + lat) * Math.PI / 360.0)) / (Math.PI / 180.0);
    y = y * exports.originShift / 180.0;
    x = Number(x.toFixed(1));
    y = Number(y.toFixed(1));
    return [x, y];
}
exports.lngLatToMeters = lngLatToMeters;
/**
 * Converts {@link Meters} coordinates to {@link LngLat} coordinates.
 *
 * @param {Meters} meters Meters in Mercator [x, y]
 * @returns {LngLat} LngLat coordinates
 * @example
 * const lnglat = metersToLngLat([14026255, 4439106])
 * //=[ 126, 37 ]
 */
function metersToLngLat(meters) {
    const [x, y] = validateMeters(meters);
    let lng = (x / exports.originShift) * 180.0;
    let lat = (y / exports.originShift) * 180.0;
    lat = 180 / Math.PI * (2 * Math.atan(Math.exp(lat * Math.PI / 180.0)) - Math.PI / 2.0);
    lng = Number(lng.toFixed(6));
    lat = Number(lat.toFixed(6));
    return [lng, lat];
}
exports.metersToLngLat = metersToLngLat;
/**
 * Converts {@link Meters} coordinates to {@link Pixels} coordinates.
 *
 * @param {Meters} meters Meters in Mercator [x, y]
 * @param {number} zoom Zoom level
 * @returns {Pixels} Pixels coordinates
 * @example
 * const pixels = metersToPixels([14026255, 4439106], 13)
 * //=[ 1782579.1, 1280877.3, 13 ]
 */
function metersToPixels(meters, zoom) {
    const [x, y] = validateMeters(meters);
    const res = resolution(zoom);
    const px = (x + exports.originShift) / res;
    const py = (y + exports.originShift) / res;
    return [px, py, zoom];
}
exports.metersToPixels = metersToPixels;
/**
 * Converts {@link LngLat} coordinates to TMS {@link Tile}.
 *
 * @param {LngLat} lnglat Longitude (Meridians) & Latitude (Parallels) in decimal degrees
 * @param {number} zoom Zoom level
 * @returns {Tile} TMS Tile
 * @example
 * const tile = lngLatToTile([126, 37], 13)
 * //=[ 6963, 5003, 13 ]
 */
function lngLatToTile(lnglat, zoom) {
    const meters = lngLatToMeters(validateLngLat(lnglat));
    const pixels = metersToPixels(meters, zoom);
    return pixelsToTile(pixels);
}
exports.lngLatToTile = lngLatToTile;
/**
 * Converts {@link LngLat} coordinates to {@link Google} (XYZ) Tile.
 *
 * @param {LngLat} lnglat Longitude (Meridians) & Latitude (Parallels) in decimal degrees
 * @param {number} zoom Zoom level
 * @returns {Google} Google (XYZ) Tile
 * @example
 * const google = lngLatToGoogle([126, 37], 13)
 * //=[ 6963, 3188, 13 ]
 */
function lngLatToGoogle(lnglat, zoom) {
    if (zoom === 0) {
        return [0, 0, 0];
    }
    const tile = lngLatToTile(validateLngLat(lnglat), zoom);
    return tileToGoogle(tile);
}
exports.lngLatToGoogle = lngLatToGoogle;
/**
 * Converts {@link Meters} coordinates to TMS {@link Tile}.
 *
 * @param {Meters} meters Meters in Mercator [x, y]
 * @param {number} zoom Zoom level
 * @returns {Tile} TMS Tile
 * @example
 * const tile = metersToTile([14026255, 4439106], 13)
 * //=[ 6963, 5003, 13 ]
 */
function metersToTile(meters, zoom) {
    if (zoom === 0) {
        return [0, 0, 0];
    }
    const pixels = metersToPixels(validateMeters(meters), zoom);
    return pixelsToTile(pixels);
}
exports.metersToTile = metersToTile;
/**
 * Converts {@link Pixels} coordinates to {@link Meters} coordinates.
 *
 * @param {Pixels} pixels Pixels [x, y, zoom]
 * @returns {Meters} Meters coordinates
 * @example
 * const meters = pixelsToMeters([1782579, 1280877, 13])
 * //=[ 14026252.0, 4439099.5 ]
 */
function pixelsToMeters(pixels) {
    const [px, py, zoom] = validatePixels(pixels);
    const res = resolution(zoom);
    let mx = px * res - exports.originShift;
    let my = py * res - exports.originShift;
    mx = Number(mx.toFixed(1));
    my = Number(my.toFixed(1));
    return [mx, my];
}
exports.pixelsToMeters = pixelsToMeters;
/**
 * Converts {@link Pixels} coordinates to TMS {@link Tile}.
 *
 * @param {Pixels} pixels Pixels [x, y, zoom]
 * @returns {Tile} TMS Tile
 * @example
 * const tile = pixelsToTile([1782579, 1280877, 13])
 * //=[ 6963, 5003, 13 ]
 */
function pixelsToTile(pixels) {
    const [px, py, zoom] = validatePixels(pixels);
    if (zoom === 0) {
        return [0, 0, 0];
    }
    let tx = Math.ceil(px / exports.tileSize) - 1;
    let ty = Math.ceil(py / exports.tileSize) - 1;
    if (tx < 0) {
        tx = 0;
    }
    if (ty < 0) {
        ty = 0;
    }
    return [tx, ty, zoom];
}
exports.pixelsToTile = pixelsToTile;
/**
 * Converts TMS {@link Tile} to {@link bbox} in {@link Meters} coordinates.
 *
 * @param {Tile} tile Tile [x, y, zoom]
 * @param {number} x TMS Tile X
 * @param {number} y TMS Tile Y
 * @param {number} zoom Zoom level
 * @returns {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @example
 * const bbox = tileToBBoxMeters([6963, 5003, 13])
 * //=[ 14025277.4, 4437016.6, 14030169.4, 4441908.5 ]
 */
function tileToBBoxMeters(tile) {
    const [tx, ty, zoom] = validateTile(tile);
    let min = pixelsToMeters([tx * exports.tileSize, ty * exports.tileSize, zoom]);
    let max = pixelsToMeters([(tx + 1) * exports.tileSize, (ty + 1) * exports.tileSize, zoom]);
    return [min[0], min[1], max[0], max[1]];
}
exports.tileToBBoxMeters = tileToBBoxMeters;
/**
 * Converts TMS {@link Tile} to {@link bbox} in {@link LngLat} coordinates.
 *
 * @param {Tile} tile Tile [x, y, zoom]
 * @param {number} x TMS Tile X
 * @param {number} y TMS Tile Y
 * @param {number} zoom Zoom level
 * @returns {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @example
 * const bbox = tileToBBox([6963, 5003, 13])
 * //=[ 125.991, 36.985, 126.035, 37.020 ]
 */
function tileToBBox(tile) {
    const [tx, ty, zoom] = validateTile(tile);
    if (zoom === 0) {
        return [-180, -85.05112877980659, 180, 85.05112877980659];
    }
    const [mx1, my1, mx2, my2] = tileToBBoxMeters([tx, ty, zoom]);
    const min = metersToLngLat([mx1, my1, zoom]);
    const max = metersToLngLat([mx2, my2, zoom]);
    return [min[0], min[1], max[0], max[1]];
}
exports.tileToBBox = tileToBBox;
/**
 * Converts {@link Google} (XYZ) Tile to {@link bbox} in {@link Meters} coordinates.
 *
 * @param {Google} google Google [x, y, zoom]
 * @returns {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @example
 * const bbox = googleToBBoxMeters([6963, 3188, 13])
 * //=[ 14025277.4, 4437016.6, 14030169.4, 4441908.5 ]
 */
function googleToBBoxMeters(google) {
    const Tile = googleToTile(google);
    return tileToBBoxMeters(Tile);
}
exports.googleToBBoxMeters = googleToBBoxMeters;
/**
 * Converts {@link Google} (XYZ) Tile to {@link bbox} in {@link LngLat} coordinates.
 *
 * @param {Google} google Google [x, y, zoom]
 * @returns {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @example
 * const bbox = googleToBBox([6963, 3188, 13])
 * //=[ 125.991, 36.985, 126.035, 37.020 ]
 */
function googleToBBox(google) {
    const Tile = googleToTile(google);
    return tileToBBox(Tile);
}
exports.googleToBBox = googleToBBox;
/**
 * Converts TMS {@link Tile} to {@link Google} (XYZ) Tile.
 *
 * @param {Tile} tile Tile [x, y, zoom]
 * @returns {Google} Google (XYZ) Tile
 * @example
 * const google = tileToGoogle([6963, 5003, 13])
 * //=[ 6963, 3188, 13 ]
 */
function tileToGoogle(tile) {
    const [tx, ty, zoom] = validateTile(tile);
    if (zoom === 0) {
        return [0, 0, 0];
    }
    const x = tx;
    const y = (Math.pow(2, zoom) - 1) - ty;
    return [x, y, zoom];
}
exports.tileToGoogle = tileToGoogle;
/**
 * Converts {@link Google} (XYZ) Tile to TMS {@link Tile}.
 *
 * @param {Google} google Google [x, y, zoom]
 * @returns {Tile} TMS Tile
 * @example
 * const tile = googleToTile([6963, 3188, 13])
 * //=[ 6963, 5003, 13 ]
 */
function googleToTile(google) {
    const [x, y, zoom] = google;
    const tx = x;
    const ty = Math.pow(2, zoom) - y - 1;
    return [tx, ty, zoom];
}
exports.googleToTile = googleToTile;
/**
 * Converts {@link Google} (XYZ) Tile to {@link Quadkey}.
 *
 * @param {Google} google Google [x, y, zoom]
 * @returns {string} Microsoft's Quadkey schema
 * @example
 * const quadkey = googleToQuadkey([6963, 3188, 13])
 * //='1321102330211'
 */
function googleToQuadkey(google) {
    const Tile = googleToTile(google);
    return tileToQuadkey(Tile);
}
exports.googleToQuadkey = googleToQuadkey;
/**
 * Converts TMS {@link Tile} to {@link QuadKey}.
 *
 * @param {Tile} tile Tile [x, y, zoom]
 * @returns {string} Microsoft's Quadkey schema
 * @example
 * const quadkey = tileToQuadkey([6963, 5003, 13])
 * //='1321102330211'
 */
function tileToQuadkey(tile) {
    let [tx, ty, zoom] = validateTile(tile);
    // Zoom 0 does not exist for Quadkey
    if (zoom === 0) {
        return '';
    }
    let quadkey = '';
    ty = (Math.pow(2, zoom) - 1) - ty;
    range(zoom, 0, -1).map(i => {
        let digit = 0;
        let mask = 1 << (i - 1);
        if ((tx & mask) !== 0) {
            digit += 1;
        }
        if ((ty & mask) !== 0) {
            digit += 2;
        }
        quadkey = quadkey.concat(digit);
    });
    return quadkey;
}
exports.tileToQuadkey = tileToQuadkey;
/**
 * Converts {@link Quadkey} to TMS {@link Tile}.
 *
 * @param {string} quadkey Microsoft's Quadkey schema
 * @returns {Tile} TMS Tile
 * @example
 * const tile = quadkeyToTile('1321102330211')
 * //=[ 6963, 5003, 13 ]
 */
function quadkeyToTile(quadkey) {
    const Google = quadkeyToGoogle(quadkey);
    return googleToTile(Google);
}
exports.quadkeyToTile = quadkeyToTile;
/**
 * Converts {@link Quadkey} to {@link Google} (XYZ) Tile.
 *
 * @param {string} quadkey Microsoft's Quadkey schema
 * @returns {Google} Google (XYZ) Tile
 * @example
 * const google = quadkeyToGoogle('1321102330211')
 * //=[ 6963, 3188, 13 ]
 */
function quadkeyToGoogle(quadkey) {
    let x = 0;
    let y = 0;
    const zoom = quadkey.length;
    range(zoom, 0, -1).map(i => {
        let mask = 1 << (i - 1);
        switch (parseInt(quadkey[zoom - i], 0)) {
            case 0:
                break;
            case 1:
                x += mask;
                break;
            case 2:
                y += mask;
                break;
            case 3:
                x += mask;
                y += mask;
                break;
            default:
                throw new Error('Invalid Quadkey digit sequence');
        }
    });
    return [x, y, zoom];
}
exports.quadkeyToGoogle = quadkeyToGoogle;
/**
 * Converts {@link BBox} from {@link LngLat} coordinates to {@link Meters} coordinates
 *
 * @param {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @returns {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @example
 * const meters = bboxToMeters([ 125, 35, 127, 37 ])
 * //=[ 13914936.3, 4163881.1, 14137575.3, 4439106.7 ]
 */
function bboxToMeters(bbox) {
    const min = lngLatToMeters([bbox[0], bbox[1]]);
    const max = lngLatToMeters([bbox[2], bbox[3]]);
    return [min[0], min[1], max[0], max[1]];
}
exports.bboxToMeters = bboxToMeters;
/**
 * Creates an Iterator of Tiles from a given BBox
 *
 * @param {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @param {number} minZoom Minimum Zoom
 * @param {number} maxZoom Maximum Zoom
 * @returns {Iterator<Tile>} Iterable Tiles from BBox
 * @example
 * const iterable = grid([-180.0, -90.0, 180, 90], 3, 8)
 * const {value, done} = iterable.next()
 * //=value
 * //=done
 */
function* grid(bbox, minZoom, maxZoom) {
    for (const [columns, rows, zoom] of gridLevels(bbox, minZoom, maxZoom)) {
        for (const row of rows) {
            for (const column of columns) {
                yield [column, row, zoom];
            }
        }
    }
}
exports.grid = grid;
/**
 * Creates a bulk Iterator of Tiles from a given BBox
 *
 * @param {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @param {number} minZoom Minimum Zoom
 * @param {number} maxZoom Maximum Zoom
 * @param {number} size Maximum size for bulk Tiles
 * @returns {Iterator<Tile[]>} Bulk iterable Tiles from BBox
 * @example
 * const grid = gridBulk([-180.0, -90.0, 180, 90], 3, 8, 5000)
 * const {value, done} = grid.next()
 * //=value
 * //=done
 */
function* gridBulk(bbox, minZoom, maxZoom, size) {
    const iterable = grid(bbox, minZoom, maxZoom);
    let container = [];
    let i = 0;
    while (true) {
        i++;
        const { value, done } = iterable.next();
        if (value) {
            container.push(value);
        }
        if (i % size === 0) {
            yield container;
            container = [];
        }
        if (done) {
            yield container;
            break;
        }
    }
}
exports.gridBulk = gridBulk;
/**
 * Creates a grid level pattern of arrays
 *
 * @param {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @param {number} minZoom Minimum Zoom
 * @param {number} maxZoom Maximum Zoom
 * @returns {GridLevel[]} Grid Level
 * @example
 * const levels = gridLevels([-180.0, -90.0, 180, 90], 3, 8)
 * //=levels
 */
function gridLevels(bbox, minZoom, maxZoom) {
    const levels = [];
    for (let zoom of range(minZoom, maxZoom + 1)) {
        let [x1, y1, x2, y2] = bbox;
        let t1 = lngLatToTile([x1, y1], zoom);
        let t2 = lngLatToTile([x2, y2], zoom);
        let minty = Math.min(t1[1], t2[1]);
        let maxty = Math.max(t1[1], t2[1]);
        let mintx = Math.min(t1[0], t2[0]);
        let maxtx = Math.max(t1[0], t2[0]);
        const rows = range(minty, maxty + 1);
        const columns = range(mintx, maxtx + 1);
        levels.push([columns, rows, zoom]);
    }
    return levels;
}
exports.gridLevels = gridLevels;
/**
 * Counts the total amount of tiles from a given BBox
 *
 * @param {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @param {number} minZoom Minimum Zoom
 * @param {number} maxZoom Maximum Zoom
 * @returns {number} Total tiles from BBox
 * @example
 * const count = gridCount([-180.0, -90.0, 180, 90], 3, 8)
 * //=563136
 */
function gridCount(bbox, minZoom, maxZoom) {
    let count = 0;
    for (const [columns, rows] of gridLevels(bbox, minZoom, maxZoom)) {
        count += rows.length * columns.length;
    }
    return count;
}
exports.gridCount = gridCount;
/**
 * Validates TMS {@link Tile}.
 *
 * @param {Tile} tile Tile [x, y, zoom]
 * @throws {Error} Will throw an error if TMS Tile is not valid.
 * @returns {Tile} TMS Tile
 * @example
 * validateTile([60, 80, 12])
 * //=[60, 80, 12]
 * validateTile([60, -43, 5])
 * //= Error: Tile <y> must not be less than 0
 * validateTile([25, 60, 3])
 * //= Error: Illegal parameters for tile
 */
function validateTile(tile) {
    const [tx, ty, zoom] = tile;
    validateZoom(zoom);
    if (tx < 0) {
        const message = '<x> must not be less than 0';
        throw new Error(message);
    }
    else if (ty < 0) {
        const message = '<y> must not be less than 0';
        throw new Error(message);
    }
    const maxCount = Math.pow(2, zoom);
    if (tx >= maxCount || ty >= maxCount) {
        throw new Error('Illegal parameters for tile');
    }
    return tile;
}
exports.validateTile = validateTile;
/**
 * Validates {@link Zoom} level.
 *
 * @param {number} zoom Zoom level
 * @throws {Error} Will throw an error if zoom is not valid.
 * @returns {number} zoom Zoom level
 * @example
 * mercator.validateZoom(12)
 * //=12
 * mercator.validateZoom(-4)
 * //= Error: <zoom> cannot be less than 0
 * validateZoom(32)
 * //= Error: <zoom> cannot be greater than 30
 */
function validateZoom(zoom) {
    if (zoom < 0) {
        const message = '<zoom> cannot be less than 0';
        throw new Error(message);
    }
    else if (zoom > 30) {
        const message = '<zoom> cannot be greater than 30';
        throw new Error(message);
    }
    return zoom;
}
exports.validateZoom = validateZoom;
/**
 * Validates {@link Meters} coordinates.
 *
 * @param {Meters} meters Meters in Mercator [x, y]
 * @throws {Error} Will throw an error if Meters is not valid.
 * @returns {number[]} Meters coordinates
 * @example
 * validateMeters([-115, 44])
 * //= [ -115, 44 ]
 * validateMeters([-230, 999000000])
 * //= Error: Meters [y] cannot be greater than 20037508.342789244
 */
function validateMeters(meters) {
    const [mx, my] = meters;
    // const max = 20037508.342789244
    // const min = -20037508.342789244
    // if (my > max) {
    //   const message = `Meters [y] cannot be greater than ${ max }`
    //   throw new Error(message)
    // }
    // if (my < min) {
    //   const message = `Meters [y] cannot be less than ${ min }`
    //   throw new Error(message)
    // }
    // if (mx > max) {
    //   const message = `Meters [x] cannot be greater than ${ max }`
    //   throw new Error(message)
    // }
    // if (mx < min) {
    //   const message = `Meters [x] cannot be less than ${ min }`
    //   throw new Error(message)
    // }
    return [mx, my];
}
exports.validateMeters = validateMeters;
/**
 * Validates {@link LngLat} coordinates.
 *
 * @param {LngLat} lnglat Longitude (Meridians) & Latitude (Parallels) in decimal degrees
 * @throws {Error} Will throw an error if LngLat is not valid.
 * @returns {LngLat} LngLat coordinates
 * @example
 * validateLngLat([-115, 44])
 * //= [ -115, 44 ]
 * validateLngLat([-225, 44])
 * //= Error: LngLat [lng] must be within -180 to 180 degrees
 */
function validateLngLat(lnglat) {
    const [lng, lat] = lnglat;
    if (lat < -90 || lat > 90) {
        const message = 'LngLat [lat] must be within -90 to 90 degrees';
        throw new Error(message);
    }
    else if (lng < -180 || lng > 180) {
        const message = 'LngLat [lng] must be within -180 to 180 degrees';
        throw new Error(message);
    }
    return [lng, lat];
}
exports.validateLngLat = validateLngLat;
/**
 * Validates {@link Pixels} coordinates.
 *
 * @param {Pixels} pixels Pixels [x, y, zoom]
 * @param {number} x Pixels X
 * @param {number} y Pixels Y
 * @param {number} [zoom] Zoom level
 * @throws {Error} Will throw an error if Pixels is not valid.
 * @returns {Pixels} Pixels coordinates
 * @example
 * validatePixels([-115, 44])
 */
function validatePixels(pixels) {
    // TODO
    return pixels;
}
exports.validatePixels = validatePixels;
/**
 * Retrieve resolution based on zoom level
 *
 * @private
 * @param {number} zoom zoom level
 * @returns {number} resolution
 * @example
 * const res = resolution(13)
 * //=19.109257071294063
 */
function resolution(zoom) {
    return exports.initialResolution / Math.pow(2, zoom);
}
exports.resolution = resolution;
/**
 * Generate an integer Array containing an arithmetic progression.
 *
 * @private
 * @param {number} [start=0] Start
 * @param {number} stop Stop
 * @param {number} [step=1] Step
 * @returns {number[]} range
 * @example
 * range(3)
 * //=[ 0, 1, 2 ]
 * range(3, 6)
 * //=[ 3, 4, 5 ]
 * range(6, 3, -1)
 * //=[ 6, 5, 4 ]
 */
function range(start, stop, step) {
    if (stop == null) {
        stop = start || 0;
        start = 0;
    }
    if (!step) {
        step = stop < start ? -1 : 1;
    }
    const length = Math.max(Math.ceil((stop - start) / step), 0);
    const range = Array(length);
    for (let idx = 0; idx < length; idx++, start += step) {
        range[idx] = start;
    }
    return range;
}
exports.range = range;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.imagery = {
    name: 'Bing Imagery',
    categories: [
        'bing',
        'imagery',
        'world',
    ],
    url: 'https://ecn.t{switch:0,1,2,3}.tiles.virtualearth.net/tiles/a{quadkey}.jpeg?g=5250',
    description: 'Tiles from Bing',
    attribution: 'Map data © Bing',
    format: 'jpg',
    type: 'baselayer',
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.hybrid = {
    attribution: '© DigitalGlobe, © OpenStreetMap, © Mapbox',
    categories: [
        'digitalglobe',
        'dg',
        'imagery',
        'street',
        'hybrid',
        'world',
    ],
    description: 'Tiles from DigitalGlobe',
    name: 'DigitalGlobe Hybrid',
    format: 'png',
    url: 'https://{s}.tiles.mapbox.com/v4/digitalglobe.nal0mpda/{z}/{x}/{y}.png',
    type: 'baselayer',
};
exports.imagery = {
    name: 'DigitalGlobe Imagery',
    categories: [
        'digitalgloble',
        'dg',
        'imagery',
        'world',
    ],
    url: 'https://{s}.tiles.mapbox.com/v4/digitalglobe.nal0g75k/{z}/{x}/{y}.png',
    description: 'Tiles from DigitalGlobe',
    attribution: '© DigitalGlobe',
    format: 'png',
    type: 'baselayer',
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.natgeo = {
    name: 'National Geographic World Map',
    categories: [
        'esri',
        'national',
        'geographic',
        'world',
    ],
    url: 'https://services.arcgisonline.com/arcgis/rest/services/NatGeo_World_Map/MapServer/WMTS/tile/1.0.0/World_Imagery/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg',
    description: 'This map is designed to be used as a general reference map for informational and educational purposes as well as a basemap by GIS professionals and other users for creating web maps and web mapping applications.',
    attribution: 'National Geographic, Esri, DeLorme, HERE, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, INCREMENT P',
    format: 'jpg',
    type: 'baselayer',
};
exports.ocean = {
    name: 'Ocean Basemap',
    categories: [
        'esri',
        'ocean',
        'world',
    ],
    url: 'https://services.arcgisonline.com/arcgis/rest/services/Ocean_Basemap/MapServer/WMTS/tile/1.0.0/World_Imagery/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg',
    description: 'The ocean basemap includes bathymetry, surface and subsurface feature names, and derived depths. This service is designed to be used as a basemap by marine GIS professionals and as a reference map by anyone interested in ocean data.',
    attribution: 'Esri, GEBCO, NOAA, National Geographic, DeLorme, HERE, Geonames.org, and other contributors',
    format: 'jpg',
    type: 'baselayer',
};
exports.usatopo = {
    name: 'USA Topo Maps',
    categories: [
        'esri',
        'topo',
        'topographicusa',
    ],
    url: 'https://services.arcgisonline.com/arcgis/rest/services/USA_Topo_Maps/MapServer/WMTS/tile/1.0.0/World_Imagery/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg',
    description: 'This map service presents detailed USGS topographic maps for the United States at multiple scales.',
    attribution: '© 2011 National Geographic Society, i-cubed',
    format: 'jpg',
    type: 'baselayer',
};
exports.imagery = {
    name: 'ESRI World Imagery',
    categories: [
        'esri',
        'imagery',
        'world',
    ],
    url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/WMTS/tile/1.0.0/World_Imagery/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg',
    description: 'This map service presents satellite imagery for the world and high-resolution imagery for the United States and other areas around the world.',
    attribution: 'Esri, DigitalGlobe, Earthstar Geographics, CNES/Airbus DS, GeoEye, USDA FSA, USGS, Getmapping, Aerogrid, IGN, IGP, and the GIS User Community',
    format: 'jpg',
    type: 'baselayer',
};
exports.street = {
    name: 'World Street Map',
    categories: [
        'esri',
        'street',
        'world',
    ],
    url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/WMTS/tile/1.0.0/World_Topo_Map/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg',
    description: 'This map service presents highway-level data for the world and street-level data for North America, Europe, Africa, parts of the Middle East, Asia, and more.',
    attribution: 'Esri, HERE, DeLorme, USGS, Intermap, INCREMENT P, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), MapmyIndia, © OpenStreetMap contributors, and the GIS User Community',
    format: 'jpg',
    type: 'baselayer',
};
exports.topo = {
    name: 'ESRI World Topographic Map',
    categories: [
        'esri',
        'topo',
        'topographic',
        'world',
    ],
    url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer/WMTS/tile/1.0.0/World_Imagery/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg',
    description: 'This world topographic map includes boundaries, cities, water features, physiographic features, parks, landmarks, transportation, and buildings.',
    attribution: 'Esri, HERE, DeLorme, Intermap, INCREMENT P, GEBCO, USGS, FAO, NPS, NRCAN, GeoBase, IGN, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), swisstopo, MapmyIndia, © OpenStreetMap contributors, GIS User Community',
    format: 'jpg',
    type: 'baselayer',
};
exports.topographic = exports.topo;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const bing = __webpack_require__(2);
exports.bing = bing;
const esri = __webpack_require__(4);
exports.esri = esri;
const osm = __webpack_require__(7);
exports.osm = osm;
const strava = __webpack_require__(8);
exports.strava = strava;
const digitalglobe = __webpack_require__(3);
exports.digitalglobe = digitalglobe;
const mapbox = __webpack_require__(6);
exports.mapbox = mapbox;
// Alternate names
const openstreetmap = osm;
exports.openstreetmap = openstreetmap;
const arcgis = esri;
exports.arcgis = arcgis;
const dg = digitalglobe;
exports.dg = dg;
const microsoft = bing;
exports.microsoft = microsoft;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.outdoors = {
    name: 'Mapbox Outdoors',
    categories: [
        'mapbox',
        'classic',
        'outdoors',
        'topo',
        'world',
    ],
    url: 'https://{s}.tiles.mapbox.com/v4/aj.um7z9lus/{z}/{x}/{y}.png',
    description: 'Tiles from Mapbox',
    attribution: '© Mapbox, OpenStreetMap',
    format: 'png',
    type: 'overlay',
};
exports.labels = {
    name: 'Mapbox Labels',
    categories: [
        'mapbox',
        'labels',
        'world',
    ],
    url: 'https://{s}.tiles.mapbox.com/v4/openstreetmap.map-inh7ifmo/{z}/{x}/{y}.png',
    description: 'Tiles from Mapbox',
    attribution: '© Mapbox, OpenStreetMap',
    format: 'png',
    type: 'overlay',
};
exports.imagery = {
    name: 'Mapbox Imagery',
    categories: [
        'mapbox',
        'imagery',
        'world',
    ],
    url: 'https://{s}.tiles.mapbox.com/v4/openstreetmap.map-inh7ifmo/{z}/{x}/{y}.png',
    description: 'Tiles from Mapbox',
    attribution: '© Mapbox, OpenStreetMap',
    format: 'png',
    type: 'baselayer',
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.standard = {
    name: 'OSM Standard',
    categories: [
        'osm',
        'standard',
        'world',
    ],
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    description: 'Tiles from OSM',
    attribution: 'Map data © OSM',
    format: 'png',
    type: 'baselayer',
};
exports.cycle = {
    name: 'OSM Cycle Map',
    categories: [
        'osm',
        'cycle',
        'world',
    ],
    url: 'https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png',
    description: 'Tiles from OSM',
    attribution: 'Map data © OSM',
    format: 'png',
    type: 'baselayer',
};
exports.hot = {
    name: 'OSM Humanitarian',
    categories: [
        'osm',
        'hot',
        'humanitarian',
        'world',
    ],
    url: 'https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    description: 'Tiles from OSM',
    attribution: 'Map data © OSM',
    format: 'png',
    type: 'baselayer',
};
exports.transport = {
    name: 'OSM Transport Map',
    categories: [
        'osm',
        'transport',
        'world',
    ],
    url: 'https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png',
    description: 'Tiles from OSM',
    attribution: 'Map data © OSM',
    format: 'png',
    type: 'baselayer',
};
exports.wikimedia = {
    name: 'OSM Wikimedia',
    categories: [
        'osm',
        'wikimedia',
        'world',
    ],
    url: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png',
    description: 'Tiles from OSM',
    attribution: 'Map data © OSM',
    format: 'png',
    type: 'baselayer',
};
exports.lyrk = {
    name: 'OSM Lyrk',
    categories: [
        'osm',
        'lyrk',
        'world',
    ],
    url: 'https://tiles.lyrk.org/ls/{z}/{x}/{y}?apikey=6e8cfef737a140e2a58c8122aaa26077',
    description: 'Tiles from OSM',
    attribution: 'Map data © OSM',
    format: 'png',
    type: 'baselayer',
};
exports.mapbox = {
    name: 'OSM Mapbox',
    categories: [
        'osm',
        'mapbox',
        'world',
    ],
    url: 'https://{s}.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png',
    description: 'Tiles from OSM',
    attribution: 'Map data © OSM',
    format: 'png',
    type: 'baselayer',
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.both = {
    name: 'Strava Cycling & Running',
    categories: [
        'strava',
        'cycling',
        'running',
        'world',
    ],
    url: 'https://globalheat.strava.com/tiles/both/color/{z}/{x}/{y}.png',
    description: 'Tiles from Strava',
    attribution: 'Map data © Strava',
    format: 'png',
    type: 'overlay',
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

const slippy = __webpack_require__(0)
console.log(`
const osm = slippy.providers.osm.standard.url
const url = slippy.parse([3, 10, 8], osm)
`)
const osm = slippy.providers.osm.standard.url
console.log(osm)
const url = slippy.parse([3, 10, 8], osm)
console.log(url)


/***/ })
/******/ ]);