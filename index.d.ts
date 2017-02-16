export interface Provider {
  attribution: string
  categories: string[]
  description: string
  name: string
  format: 'png' | 'pbf' | 'webp' | 'jpg'
  url: string
  type: 'baselayer' | 'overlay'
}
interface Providers {
  [provider: string]: {
    [service: string]: Provider
  }
}
export type Tile = [number, number, number];
export function parse(tile: Tile, url: string): string;
export function wms(tile: Tile, url: string): string;
export function wmts(url: string): string;
export function parseSwitch(url: string): string;
export function sample<T extends string | number>(collection: T[]): T;
export declare const providers: Providers;