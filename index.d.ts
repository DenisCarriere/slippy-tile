export type Tile = [number, number, number]

/**
 * Substitutes the given tile information [x, y, z] to the URL tile scheme.
 */
export default function slippyTile(
    tile: Tile,
    url: string,
    options?: {
      layer?: string
      format?: string
      version?: string
      [key: string]: string
    }
): string;
