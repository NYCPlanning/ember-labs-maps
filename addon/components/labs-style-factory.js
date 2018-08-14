import Component from '@ember/component';
import { argument } from '@ember-decorators/argument';
import { computed } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';
import { copy } from '@ember/object/internals';

import layout from '../templates/components/labs-style-factory';

export default class LabsStyleFactory extends Component {
  layout = layout;

  @service
  store;

  @argument
  before = 'place_other';

  @argument
  baseStyle;

  @argument
  layerGroups;

  @computed('layerGroups.@each.didChange')
  get layers() {
    return this.get('layerGroups').mapBy('layers').reduce((accumulator, current) => {
      const resolvedModels = current;
      const resolvedAccumulator = accumulator;
      const layers = resolvedModels.toArray()
        .map(layer => layer.toJSON())
        .map(({ style }) => style);

      return [...resolvedAccumulator, ...layers];
    }, []);
  }

  @computed('baseStyle', 'layers', 'before')
  get style() {
    const baseStyle = copy(this.get('baseStyle'));
    const layers = this.get('layers');
    baseStyle.layers = [...baseStyle.layers, ...layers];

    return baseStyle;
  }
}
