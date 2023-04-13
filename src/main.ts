import { Map } from "leaflet";
import { MapCreator } from "./lib/map-toolbox";

/**
 * Base class for creating a Leaflet map.
 */
export class BaseMapApp {
  private el: HTMLElement;
  private mapDiv: HTMLDivElement;
  public map!: Map;

  /**
   * Creates a new instance of `BaseMapApp`
   * and attaches a `div` element for the map to the `#app` element in the DOM.
   */
  constructor() {
    this.el = document.querySelector("#app") as HTMLDivElement;
    this.mapDiv = document.createElement("div");
    this.mapDiv.setAttribute("id", "map-div");
    this.el.append(this.mapDiv);
  }

  /**
   * Sets up a Leaflet map instance and adds a default satellite tile layer to it.
   */
  async setupMap(): Promise<void> {
    this.map = MapCreator.setupMap("map-div");
    const layer = await MapCreator.getDefaultSateliteLayer();
    if (layer) layer.addTo(this.map);
  }
}

const app = new BaseMapApp();
app.setupMap();
