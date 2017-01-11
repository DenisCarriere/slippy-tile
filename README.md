# [Slippy Tile](https://www.npmjs.com/package/slippy-tile)

[![Build Status](https://travis-ci.org/DenisCarriere/slippy-tile.svg?branch=master)](https://travis-ci.org/DenisCarriere/slippy-tile)
[![Circle CI](https://circleci.com/gh/DenisCarriere/slippy-tile.svg?style=svg)](https://circleci.com/gh/DenisCarriere/slippy-tile)
[![Coverage Status](https://coveralls.io/repos/github/DenisCarriere/slippy-tile/badge.svg?branch=master)](https://coveralls.io/github/DenisCarriere/slippy-tile?branch=master)
[![npm version](https://badge.fury.io/js/slippy-tile.svg)](https://badge.fury.io/js/slippy-tile)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/DenisCarriere/slippy-tile/master/LICENSE)

Slippy Tile helps parse a Tile scheme URL from a given Tile [x, y, zoom].

## Install

```bash
$ npm install --save slippy-tile
```

## Quickstart

```javascript
import slippyTile from 'slippy-tile'

const tile = [10, 15, 8] // x, y, zoom
const url = slippyTile(tile, 'osm')
//= https://b.tile.openstreetmap.org/8/10/15.png
```

## Providers

| Name                          | Unique Key          |
|-------------------------------|---------------------|
| OpenStreetMap Standard        | osm.standard
| OpenStreetMap Cycle Map       | osm.cycle
| OpenStreetMap Humanitarian    | osm.hot
| OpenStreetMap Transport       | osm.transport
| OpenStreetMap Wikimedia       | osm.wikimedia
| OpenStreetMap Lyrk            | osm.lyrk
| Bing Imagery                  | bing.imagery
| Strava Cycling & Running      | strava.both
| National Geographic World Map | esri.natgeo
| ESRI Imagery                  | esri.imagery
| ESRI Ocean Basemap            | esri.ocean
| ESRI USA Topo Maps            | esri.usatopo
| ESRI World Street Map         | esri.street
| ESRI World Topographic Map    | esri.topo
| DigitalGlobe Imagery          | digitalglobe.imagery
| DigitalGlobe Hybrid           | digitalglobe.hybrid


## Scheme

You can provide your own scheme by following the same syntax as JOSM.

```javascript
const scheme = 'https://{switch:a,b,c}.tile.openstreetmap.org/{zoom}/{x}/{y}.png'
const url = slippyTile.parse([10, 15, 8], scheme)
//= https://b.tile.openstreetmap.org/8/10/15.png
```

**Options**

- `{x}` or `{TileColumn}`: Tile Column
- `{y}` or `{TileRow}`: Tile Row for Google Maps Compatible scheme
- `{-y}`: Tile Row for TMS scheme
- `{zoom}` or `{z}` or `{TileMatrix}`: Zoom Level
- `{bbox}`: GeoJSON Bounding Box
- `{quadkey}` or `{q}`: Microsoft's Quadkey
- `{switch:1,2,3}`: Selects a random sample
- `{height}` default = 256
- `{width}`: default = 256
- `{proj}`: default = EPSG:3857
# parse

Substitutes the given tile information [x, y, z] to the URL tile scheme.

**Parameters**

-   `tile` **[Tile](https://en.wikipedia.org/wiki/Tiled_web_map)** Tile [x, y, z]
-   `url` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** URL Tile scheme or provider unique key

**Examples**

```javascript
const tile = [10, 15, 8]
const url = 'https://{s}.tile.openstreetmap.org/{zoom}/{x}/{y}.png'
slippyTile.parse(tile, url)
//='https://c.tile.openstreetmap.org/8/10/15.png'
```

Returns **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 

# wms

Parse WMS URL to friendly SlippyTile format

**Parameters**

-   `tile` **[Tile](https://en.wikipedia.org/wiki/Tiled_web_map)** Tile [x, y, z]
-   `url` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** WMTS URL scheme

**Examples**

```javascript
const tile = [10, 15, 8]
const url = 'https://<Tile Server>/?layers=imagery&SRS={proj}&WIDTH={width}&HEIGHT={height}&BBOX={bbox}'
slippyTile.wmts(tile, url)
//='https://<Tile Server>/?layers=imagery&SRS=EPSG:3857&WIDTH=256&HEIGHT=256&BBOX=-165.9375,82.676285,-164.53125,82.853382'
```

Returns **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 

# wmts

Parse WMTS URL to friendly SlippyTile URL format

**Parameters**

-   `url` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** WMTS URL scheme

**Examples**

```javascript
const url = 'https://<Tile Server>/WMTS/tile/1.0.0/Imagery/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg'
slippyTile.wmts(url)
//='https://<Tile Server>/WMTS/tile/1.0.0/Imagery/default/GoogleMapsCompatible/{z}/{y}/{x}.jpg'
```

Returns **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 

# parseSwitch

Replaces {switch:a,b,c} with a random sample.

**Parameters**

-   `url` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** URL Scheme

**Examples**

```javascript
import * as slippyTile from 'slippy-tile'
slippyTile.parseSwitch('http://tile-{switch:a,b,c}.openstreetmap.fr/hot/{zoom}/{x}/{y}.png')
//='http://tile-b.openstreetmap.fr/hot/{zoom}/{x}/{y}.png'
```

Returns **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Parsed URL with switch replaced

# sample

Sample an item from a given list

**Parameters**

-   `collection` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;any>** List of items

**Examples**

```javascript
slippyTile.sample(['a', 'b', 'c'])
//='b'
```

Returns **any** Single item from the list

# Changelog

## 1.6.0 - 2017-01-11

- Change OSM `{zoom}` to `{z}` as a safer URL
- Add individual parsing functions for WMS & WMTS
- Improve typescript handling for `sample`

## 1.5.0 - 2017-01-05

- Add schema support for WMS, WMTS, ArcGIS & Leaflet

## 1.4.2 - 2017-01-01

- Add providers as export

## 1.4.0 - 2016-12-04

- Added Circle CI tests
- Replace test cases with Jest
- Refactor providers to Typescript (removed .yml & .json)

## 1.3.2 - 2016-10-27

- Add WMTS 1.0.0 options `{TileColumn}`, `{TileRow}` & `{TileMatrix}`

## 1.3.0 - 2016-10-25

- Changed main function to `parse`
- Reduce library file size 550% (268KB to 48KB)

## 1.2.4 - 2016-10-21

- Add `{s}` to switch cases as default `['a', 'b', 'c']`
- Removed `js-yaml` dependency
- Removed all `request` related dependencies
- Removed `download` method
- Added DigitalGlobe as provider
- Converted `source.json` to `providers.yml`

## 1.1.0 - 2016-10-14

- Changed default function to `url`
- Added `download` feature
- Fallbacks, request-promise dependency for downloading Tile data Buffer
- Update docs

## 1.0.0 - 2016-10-13

First Stable release of `slippy-tile`.
