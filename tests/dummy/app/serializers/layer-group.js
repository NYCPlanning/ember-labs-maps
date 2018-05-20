import DS from 'ember-data';
import ApplicationSerializer from '../serializers/application';

const { EmbeddedRecordsMixin, JSONAPISerializer } = DS;
const EmbeddableSerializer = ApplicationSerializer.extend(EmbeddedRecordsMixin);

export default class LayerGroupSerializer extends EmbeddableSerializer {
  attrs = {
    layers: { serialize: 'records', deserialize: 'records' },
  }

  normalizeResponse(a, b, { layerGroups }, ...args) {
    return super.normalizeResponse(a, b, layerGroups, ...args);
  }

  normalize(typeClass, hash, ...args) {
    if (hash.layers) {
      hash.layers.forEach((layer, index) => {
        const mutatedLayer = layer;
        // avoid 0-based counting
        mutatedLayer.position = index + 1;
      });
    }

    return super.normalize(typeClass, hash, ...args);
  }
}
