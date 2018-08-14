import Model from 'ember-data/model';
import { computed } from '@ember-decorators/object';
import { attr, belongsTo } from '@ember-decorators/data';
import { alias } from '@ember-decorators/object/computed';
import { copy } from '@ember/object/internals';
import { set } from '@ember/object';
import { assign } from '@ember/polyfills';

export default class LayerModel extends Model.extend({}) {
  constructor(...args) {
    super(...args);
    if (!this.get('layout')) this.set('layout', {});
    this.delegateVisibility();
    this.addObserver('layerGroup.visible', this, 'delegateVisibility');
  }

  delegateVisibility() {
    const visible = this.get('layerGroup.visible');

    if (this.get('layerVisibilityType') === 'singleton') {
      if (this.get('position') === 1 && this.get('layerGroup.visible')) {
        this.set('visibility', true);
      } else {
        this.set('visibility', false);
      }
    } else {
      this.set('visibility', visible);
    }
  }

  @attr('string', { defaultValue: 'boundary_country' }) before
  @attr('string') displayName;
  @attr('number', { defaultValue: -1 }) position;
  @attr('boolean', { defaultValue: false }) tooltipable
  @attr('string', { defaultValue: '' }) tooltipTemplate
  @attr({ defaultValue: () => ({}) }) style
  @belongsTo('layer-group') layerGroup

  @alias('layerGroup.highlightable') highlightable;
  @alias('layerGroup.layerVisibilityType') layerVisibilityType;
  @alias('style.paint') paint;

  @computed('style.{paint,layout,filter}')
  get mapboxGlStyle() {
    return this.get('style');
  }

  @computed('style.layout')
  get layout() {
    return this.get('style.layout');
  }
  set layout(layout) {
    this.set('style', assign({}, this.get('style'), { layout }));
    this.toggleProperty('layerGroup.didChange');
  }

  // getter and setter for filter
  // accepts array
  @computed('style.filter')
  get filter() {
    return this.get('style.filter');
  }
  set filter(filter) {
    this.set('style', assign({}, this.get('style'), { filter }));
    this.toggleProperty('layerGroup.didChange');
  }

  // getter and setter for visibility
  // accepts true or false
  // mapbox property that actually determines visibility
  // this also must check that parent visibility is true
  @computed('layout.visibility')
  get visibility() {
    return this.get('layout.visibility') === 'visible';
  }
  set visibility(value) {
    const parentVisibilityState = value && this.get('layerGroup.visible');
    const visibility = (parentVisibilityState ? 'visible' : 'none');
    const layout = copy(this.get('layout'));

    if (layout) {
      set(layout, 'visibility', visibility);
      this.set('layout', layout);
      this.toggleProperty('layerGroup.didChange');
    }
  }
}
