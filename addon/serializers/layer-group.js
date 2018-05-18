import DS from 'ember-data';

const { EmbeddedRecordsMixin, JSONSerializer } = DS;
const EmbeddableSerializer = JSONSerializer.extend(EmbeddedRecordsMixin);

export default class LayerGroupSerializer extends EmbeddableSerializer {
  attrs = {
    layers: { serialize: 'records', deserialize: 'records' },
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
