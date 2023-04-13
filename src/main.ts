import { Map } from "leaflet";
import { MapCreator } from "./lib/map-toolbox";

/**
 * Base class for creating a leaflet map.
 */
class BaseMapApp {
  private el!: HTMLElement;
  private mapDiv: HTMLDivElement;
  public map!: Map;

  constructor() {
    this.el = document.querySelector("#app") as HTMLDivElement;
    this.mapDiv = document.createElement("div");
    this.mapDiv.setAttribute("id", "map-div");
    this.el.append(this.mapDiv);
  }

  /**
   * Creates a leaflet map instance,
   * and adds a tile layer to it.
   */
  async setupMap() {
    this.map = MapCreator.setupMap("map-div");
    const layer = await MapCreator.getDefaultSateliteLayer();
    if (layer) layer.addTo(this.map);
  }
}

const app = new BaseMapApp();
app.setupMap();
