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
