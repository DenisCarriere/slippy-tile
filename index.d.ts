type Tile = [number, number, number];

interface Options {
  layer?: string
  format?: string
  version?: string
  [key: string]: string
}

declare function slippyTile(tile: Tile, url: string, options?: Options): string;
declare namespace slippyTile { }
export = slippyTile
