import Controller from '@ember/controller';

// defaults
const center = [-73.92, 40.7], zoom = 10, bearing = 0, pitch = 0;

export default Controller.extend({
  initMapOptions: {
    center,
    zoom,
    pitch,
    bearing,
    style: 'mapbox://styles/mapbox/dark-v9',
  }
});
