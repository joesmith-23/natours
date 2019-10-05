/* eslint-disable */
export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoic21pZmZ5aiIsImEiOiJjazE5M2Z6cnAwZXhqM2h0YzFxeXowbXIzIn0.C-8BHzANOLuHQJXi4g0RKQ';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/smiffyj/ck193o6th02mm1dlrrlv9prbr',
    scrollZoom: false,
    zoom: 8
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend the map bounds to include the current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 100,
      left: 100,
      right: 100
    }
  });
};
