
# Changelog

## 3.0.0 - 2017-09-29

- Support ES Modules

## 2.3.0 - 2017-09-11

- Add new replacers
  - `{bbox4326}`: GeoJSON Bounding Box using EPSG:4326 (WGS84)
  - `{bbox3857}`: GeoJSON Bounding Box using EPSG:3857 (World Mercator)
  - `{size}`: default = 256,256

## 2.2.0 - 2017-09-08

- Dropped throw errors on uncomplete parsed URL
- Add extra optional params
- Remove extra devDependencies
- Support for NodeJS 4

## 2.1.0 - 2017-04-24

- Fix Bing Quadkey Regex parsing issue

## 2.0.0 - 2017-04-01

- Performance increase
- Drop providers in favor of `map-providers`
- **Breaking** Single function module `parse()` is now the only function for this library.

## 1.13.0 - 2017-03-27

- Add Toporama WMS as provider (English & French "not working")

## 1.12.0 - 2017-03-15

- Added `minZoom` & `maxZoom` to providers
- Improve rollup build
- Added minified build (11KB)

## 1.11.0 - 2017-03-08

- Convert module back to CommonJS
- Dropped Mapbox, DigitalGlobe & Strava (due to API keys being required)

## 1.10.0 - 2017-02-18

- Convert module to ES5
- Convert project to Rollup

## 1.9.0 - 2017-02-17

- Add case insenstive to replacements
- Replace `{bbox}` with meters instead of degrees

## 1.8.0 - 2017-02-14

- Convert library to ES2015

## 1.7.0 - 2017-01-19

- Support Webpack & Browserify
- Add HTML examples

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
