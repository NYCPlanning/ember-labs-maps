import mapboxGlMap from 'ember-mapbox-gl/components/mapbox-gl';
import { argument } from '@ember-decorators/argument';
import { computed } from '@ember-decorators/object';

import layout from '../templates/components/labs-map';

export default class MainMapComponent extends mapboxGlMap {
  layout = layout;

  @argument
  layerGroups;

  @argument
  style;

  @computed('model.layerGroups')
  get layers() {
    return this.get('layerGroups').mapBy('layers');
  }

  didUpdateAttrs() {
    const map = this.get('map');

    if (map) {
      map.setStyle(this.get('style'));
    }
  }
}
