# Slippy Tile

[![Build Status](https://travis-ci.org/DenisCarriere/slippy-tile.svg?branch=master)](https://travis-ci.org/DenisCarriere/slippy-tile)
[![Coverage Status](https://coveralls.io/repos/github/DenisCarriere/slippy-tile/badge.svg?branch=master)](https://coveralls.io/github/DenisCarriere/slippy-tile?branch=master)
[![npm version](https://badge.fury.io/js/slippy-tile.svg)](https://badge.fury.io/js/slippy-tile)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/DenisCarriere/slippy-tile/master/LICENSE)

[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

Slippy Tile helps parse a Tile scheme URL from a given Tile [x, y, zoom].

## Install

**npm**

```bash
$ npm install --save slippy-tile
```

**web browser ([ES5](https://kangax.github.io/compat-table/es5))**

```html
<script src="https://unpkg.com/slippy-tile/slippy-tile.browser.js"></script>
```

## Quickstart

```javascript
var tile = [10, 15, 8] // [x, y, zoom]
var scheme = 'https://{switch:a,b,c}.tile.openstreetmap.org/{zoom}/{x}/{y}.png'
var url = slippyTile.parse(tile, scheme)
//= https://b.tile.openstreetmap.org/8/10/15.png
```

## Providers

| Name                          | Unique Key              |
| ----------------------------- | ----------------------- |
| OpenStreetMap Standard        | openstreetmap.standard  |
| OpenStreetMap Cycle Map       | openstreetmap.cycle     |
| OpenStreetMap Humanitarian    | openstreetmap.hot       |
| OpenStreetMap Transport       | openstreetmap.transport |
| OpenStreetMap Wikimedia       | openstreetmap.wikimedia |
| OpenStreetMap Lyrk            | openstreetmap.lyrk      |
| Bing Imagery                  | bing.imagery            |
| Strava Cycling & Running      | strava.both             |
| National Geographic World Map | esri.natgeo             |
| ESRI Imagery                  | esri.imagery            |
| ESRI Ocean Basemap            | esri.ocean              |
| ESRI USA Topo Maps            | esri.usatopo            |
| ESRI World Street Map         | esri.street             |
| ESRI World Topographic Map    | esri.topo               |
| DigitalGlobe Imagery          | digitalglobe.imagery    |
| DigitalGlobe Hybrid           | digitalglobe.hybrid     |
| Mapbox Imagery                | mapbox.imagery          |
| Mapbox Outdoors               | mapbox.outdoors         |

## Scheme

You can provide your own scheme by following the same syntax as JOSM.

```javascript
const scheme = 'https://{switch:a,b,c}.tile.openstreetmap.org/{zoom}/{x}/{y}.png'
const url = slippyTile.parse([10, 15, 8], scheme)
//= https://b.tile.openstreetmap.org/8/10/15.png
```

**Options**

-   `{x}` or `{TileColumn}`: Tile Column
-   `{y}` or `{TileRow}`: Tile Row for Google Maps Compatible scheme
-   `{-y}`: Tile Row for TMS scheme
-   `{zoom}` or `{z}` or `{TileMatrix}`: Zoom Level
-   `{bbox}`: GeoJSON Bounding Box
-   `{quadkey}` or `{q}`: Microsoft's Quadkey
-   `{switch:1,2,3}`: Selects a random sample
-   `{height}` default = 256
-   `{width}`: default = 256
-   `{proj}`: default = EPSG:3857

## API

### parse

Substitutes the given tile information [x, y, z] to the URL tile scheme.

**Parameters**

-   `tile` **Tile** Tile [x, y, z]
-   `url` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** URL Tile scheme or provider unique key

**Examples**

```javascript
var tile = [10, 15, 8]
var url = 'https://{s}.tile.openstreetmap.org/{zoom}/{x}/{y}.png'
parse(tile, url)
//='https://c.tile.openstreetmap.org/8/10/15.png'
```

Returns **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### wms

Parse WMS URL to friendly SlippyTile format

**Parameters**

-   `tile` **Tile** Tile [x, y, z]
-   `url` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** WMTS URL scheme

**Examples**

```javascript
var tile = [10, 15, 8]
var url = 'https://<Tile Server>/?layers=imagery&SRS={proj}&WIDTH={width}&HEIGHT={height}&BBOX={bbox}'
wms(tile, url)
//='https://<Tile Server>/?layers=imagery&SRS=EPSG:3857&WIDTH=256&HEIGHT=256&BBOX=-165.9375,82.676285,-164.53125,82.853382'
```

Returns **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### wmts

Parse WMTS URL to friendly SlippyTile URL format

**Parameters**

-   `url` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** WMTS URL scheme

**Examples**

```javascript
wmts('https://<Tile Server>/WMTS/tile/1.0.0/Imagery/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg')
//='https://<Tile Server>/WMTS/tile/1.0.0/Imagery/default/GoogleMapsCompatible/{z}/{y}/{x}.jpg'
```

Returns **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### parseSwitch

Replaces {switch:a,b,c} with a random sample.

**Parameters**

-   `url` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** URL Scheme

**Examples**

```javascript
parseSwitch('http://tile-{switch:a,b,c}.openstreetmap.fr/hot/{zoom}/{x}/{y}.png')
//='http://tile-b.openstreetmap.fr/hot/{zoom}/{x}/{y}.png'
```

Returns **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Parsed URL with switch replaced

### sample

Sample an item from a given list

**Parameters**

-   `collection` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;any>** List of items

**Examples**

```javascript
sample(['a', 'b', 'c'])
//='b'
```

Returns **any** Single item from the list
