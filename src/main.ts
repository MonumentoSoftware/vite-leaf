import { Layer, LayerGroup, Map, tileLayer } from "leaflet";
import { MapCreator } from "./lib/map-toolbox";
import { MapTilesProviders } from "./lib/common-types";

/**
 * Base class for creating a Leaflet map.
 */
export class BaseMapApp {
  private el: HTMLElement;
  private mapDiv: HTMLDivElement;
  public map!: Map;
  protected tileLayer = new LayerGroup();
  selection: HTMLSelectElement;

  /**
   * Creates a new instance of `BaseMapApp`
   * and attaches a `div` element for the map to the `#app` element in the DOM.
   */
  constructor() {
    this.el = document.querySelector("#app") as HTMLDivElement;
    this.mapDiv = document.createElement("div");
    this.mapDiv.setAttribute("id", "map-div");
    this.selection = document.createElement("select");
    this.selection.setAttribute("id", "map-selection");

    const option = MapCreator.getTileMapper();
    option.map((item) => {
      const option = document.createElement("option");
      option.value = item.key;
      option.text = item.value;
      this.selection.appendChild(option);
    });
    this.selection.addEventListener<"change">("change", (event) => {
      const target = event.target as HTMLSelectElement;
      const layer = this.getMapLayer(target.value as MapTilesProviders);
      if (layer) this.changeMapLayer(layer);
    });
    this.el.append(this.mapDiv);
    this.el.append(this.selection);
    Promise.all([this.setupMap()]);
  }

  /**
   * Sets up a Leaflet map instance and adds a default satellite tile layer to it.
   */
  async setupMap(): Promise<void> {
    this.map = MapCreator.setupMap("map-div");
    this.selection.value = "GoogleSatellite";
    const layer = this.getMapLayer("GoogleSatellite");
    if (layer) {
      layer.addTo(this.tileLayer);
      this.tileLayer.addTo(this.map);
    } else {
      alert("No layer");
    }
  }

  getMapLayer(provider: MapTilesProviders): Layer | undefined {
    const tile = MapCreator.tileMapper[provider];
    const attribution = "monumentosoftware.com";
    const layer = tileLayer(tile, { attribution });
    if (layer) {
      return layer;
    }
    return undefined;
  }

  changeMapLayer(newLayer: Layer): void {
    this.tileLayer.clearLayers();
    newLayer.addTo(this.tileLayer);
  }
}

new BaseMapApp();
