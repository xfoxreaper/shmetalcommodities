declare module 'd3-geo' {
  interface GeoProjection {
    (coordinates: [number, number]): [number, number] | null;
    scale(scale: number): GeoProjection;
    center(center: [number, number]): GeoProjection;
    translate(translate: [number, number]): GeoProjection;
  }

  export function geoMercator(): GeoProjection;
}
