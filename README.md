# Slippy Tile

[![Build Status](https://travis-ci.org/DenisCarriere/slippy-tile.svg?branch=master)](https://travis-ci.org/DenisCarriere/slippy-tile)
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
<script src="https://unpkg.com/slippy-tile/docs/slippy-tile.min.js"></script>
```

## Quickstart

```javascript
var slippyTile = require('slippy-tile')
var tile = [10, 15, 8] // [x, y, zoom]
var scheme = 'https://{switch:a,b,c}.tile.openstreetmap.org/{zoom}/{x}/{y}.png'
var url = slippyTile(tile, scheme)
//= https://b.tile.openstreetmap.org/8/10/15.png
```

## Scheme

You can provide your own scheme by following the same syntax as JOSM.

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

### slippyTile

Substitutes the given tile information [x, y, z] to the URL tile scheme.

**Parameters**

-   `tile` **Tile** Tile [x, y, z]
-   `url` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** URL Tile scheme or provider unique key

**Examples**

```javascript
slippyTile([10, 15, 8], 'https://{s}.tile.openstreetmap.org/{zoom}/{x}/{y}.png')
//='https://c.tile.openstreetmap.org/8/10/15.png'
```

Returns **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** parsed URL
