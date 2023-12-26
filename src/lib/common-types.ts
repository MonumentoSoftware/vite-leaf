export type Coordinates = [number, number];
export type PolygonShell = Array<Coordinates>;
export type CoordinatesAltitude = [number, number, number];
export type PolygonXYZ = Array<CoordinatesAltitude>;
export type MapTilesProviders =
  | "OpenStreetMap"
  | "GoogleNormal"
  | "GoogleSatellite";

export type TileMapper = { [key in MapTilesProviders]: string };

export const TILE_MAPPER: TileMapper = {
  OpenStreetMap: "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
  GoogleNormal: "https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&s=Ga",
  GoogleSatellite:
    "https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}&s=Ga",
};

export const DisplayedTileMapper = {
  OpenStreetMap: "OpenStreetMap",
  GoogleNormal: "Google Normal",
  GoogleSatellite: "Google Satellite",
  PaintingStyle: "Watercolor",
  BlackAndWhite: "Black and White",
  DetailedHiking: "Hiking",
  NoLabels: "No Labels",
};

export interface SelectionOption {
  key: string;
  value: string;
}
