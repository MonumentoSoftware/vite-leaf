import { tileLayer, MapOptions, Map, TileLayer } from "leaflet";
import { Coordinates } from "./common-types";

/**
 * A utility class for creating Leaflet maps with a default satellite tile layer.
 */
export class MapCreator {
  /**
   * Sets up a Leaflet map with an initial view centered on the specified coordinates
   * and an initial zoom level, and returns a `Map` instance.
   *
   * @param  divId - The ID of the div element to which the map should be attached.
   * @param [initialCords=[-8.6448, -35.216721]] - The initial coordinates of the map.
   * @param  [initialZoom=5] - The initial zoom level of the map.
   * @param  [mapOptions={}] - Additional options for the map.
   * @returns A `Map` instance.
   */
  static setupMap(
    divId: string,
    initialCords: Coordinates = [-8.6448, -35.216721],
    initialZoom: number = 5,
    mapOptions: MapOptions = {}
  ): Map {
    return new Map(divId, mapOptions).setView(initialCords, initialZoom);
  }

  /**
   * Returns a default satellite tile layer for the map.
   *
   * @returns A `Promise` that resolves to a `TileLayer`
   * If an error occurs while retrieving the tile layer, a warning is logged to
   */
  static async getDefaultSateliteLayer(): Promise<TileLayer | null> {
    try {
      const tileLayerUrl =
        "https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}&s=Ga";
      const attribution = "monumentosoftware.com";
      return tileLayer(tileLayerUrl, { attribution });
    } catch (error) {
      console.warn(error);
      return null;
    }
  }
}
