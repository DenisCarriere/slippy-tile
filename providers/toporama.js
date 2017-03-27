module.exports.en = {
  name: 'Toporama English',
  categories: [
    'toporama',
    'canada',
    'topographic',
    'english'
  ],
  minZoom: 1,
  maxZoom: 19,
  url: 'http://wms.ess-ws.nrcan.gc.ca/wms/toporama_en?&service=WMS&request=GetMap&layers=WMS-Toporama&format=image/jpeg&transparent=false&version=1.1.1&height={height}&width={width}&srs={srs}&bbox={bbox}',
  description: 'Tiles from Toporama',
  attribution: 'Map data Toporama',
  format: 'jpeg',
  type: 'baselayer'
}

module.exports.fr = {
  name: 'Toporama French',
  categories: [
    'toporama',
    'canada',
    'topographic',
    'francais'
  ],
  minZoom: 1,
  maxZoom: 19,
  url: 'http://wms.ess-ws.nrcan.gc.ca/wms/toporama_fr?&service=WMS&request=GetMap&layers=WMS-Toporama&format=image/jpeg&transparent=false&version=1.1.1&height={height}&width={width}&srs={srs}&bbox={bbox}',
  description: 'Tiles from Toporama',
  attribution: 'Map data Toporama',
  format: 'jpeg',
  type: 'baselayer'
}
