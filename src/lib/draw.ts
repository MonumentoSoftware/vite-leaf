import * as L from "leaflet";

export function drawLine(
  map: L.Map,
  event: L.LeafletMouseEvent,
  layer: L.LayerGroup
): void {
  // Gets the coordinates of the click event
  const { lat, lng } = event.latlng;
  const circleM = L.circle([lat, lng], {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: 500,
  });
  circleM.addTo(layer);

  // Creates variables to store the coordinates of the mousemove event
  let latmove = lat;
  let lngmove = lng;

  // draws a line with the same coordinates
  const polylineM = L.polyline([
    [lat, lng],
    [lat, lng],
  ]);

  // Updates the coordinates of the line when the mouse moves
  map.on("mousemove", (event) => {
    const { lat: latmove_, lng: lngmove_ } = event.latlng;
    latmove = latmove_;
    lngmove = lngmove_;
    polylineM.setLatLngs([
      [lat, lng],
      [latmove, lngmove],
    ]);
  });

  map.on("click", (event) => {
    const circleM2 = L.circle([latmove, lngmove]);
    layer.addLayer(circleM2);
    polylineM.setLatLngs([
      [lat, lng],
      [event.latlng.lat, event.latlng.lng],
    ]);
  });
  polylineM.addTo(layer);
  layer.addTo(map);
}
