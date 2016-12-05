import { Provider } from '../index'

export const natgeo: Provider = {
  name: 'National Geographic World Map',
  categories: [
    'esri',
    'national',
    'geographic',
    'world',
  ],
  url: 'https://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{zoom}/{y}/{x}',
  description: 'This map is designed to be used as a general reference map for informational and educational purposes as well as a basemap by GIS professionals and other users for creating web maps and web mapping applications.',
  attribution: 'National Geographic, Esri, DeLorme, HERE, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, INCREMENT P',
  format: 'jpg',
}

export const ocean: Provider = {
  name: 'Ocean Basemap',
  categories: [
    'esri',
    'ocean',
    'world',
  ],
  url: 'https://services.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{zoom}/{y}/{x}',
  description: 'The ocean basemap includes bathymetry, surface and subsurface feature names, and derived depths. This service is designed to be used as a basemap by marine GIS professionals and as a reference map by anyone interested in ocean data.',
  attribution: 'Esri, GEBCO, NOAA, National Geographic, DeLorme, HERE, Geonames.org, and other contributors',
  format: 'jpg',
}

export const usatopo: Provider = {
  name: 'USA Topo Maps',
  categories: [
    'esri',
    'topo',
    'topographicusa',
  ],
  url: 'https://services.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer/tile/{zoom}/{y}/{x}',
  description: 'This map service presents detailed USGS topographic maps for the United States at multiple scales.',
  attribution: '© 2011 National Geographic Society, i-cubed',
  format: 'jpg',
}

export const imagery: Provider = {
  name: 'ESRI World Topographic Map',
  categories: [
    'esri',
    'imagery',
    'world',
  ],
  url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{zoom}/{y}/{x}',
  description: 'This map service presents satellite imagery for the world and high-resolution imagery for the United States and other areas around the world.',
  attribution: 'Esri, DigitalGlobe, Earthstar Geographics, CNES/Airbus DS, GeoEye, USDA FSA, USGS, Getmapping, Aerogrid, IGN, IGP, and the GIS User Community',
  format: 'jpg',
}

export const street: Provider = {
  name: 'World Street Map',
  categories: [
    'esri',
    'street',
    'world',
  ],
  url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{zoom}/{y}/{x}',
  description: 'This map service presents highway-level data for the world and street-level data for North America, Europe, Africa, parts of the Middle East, Asia, and more.',
  attribution: 'Esri, HERE, DeLorme, USGS, Intermap, INCREMENT P, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), MapmyIndia, © OpenStreetMap contributors, and the GIS User Community',
  format: 'jpg',
}

export const topo: Provider = {
  name: 'ESRI World Topographic Map',
  categories: [
    'esri',
    'topo',
    'topographic',
    'world',
  ],
  url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{zoom}/{y}/{x}',
  description: 'This world topographic map includes boundaries, cities, water features, physiographic features, parks, landmarks, transportation, and buildings.',
  attribution: 'Esri, HERE, DeLorme, Intermap, INCREMENT P, GEBCO, USGS, FAO, NPS, NRCAN, GeoBase, IGN, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), swisstopo, MapmyIndia, © OpenStreetMap contributors, GIS User Community',
  format: 'jpg',
}
