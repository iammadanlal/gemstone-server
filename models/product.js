const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String
  },
  price: {
    type: String
  },
  desc: {
    type: String
  },
  sku: {
    type: String
  },
  origin: {
    type: String, default: null
  },
  assets: {
    images: [String],
    videos: [String]
  },
  certificate: {type: String, default: null},
  pooja_energization: { type: String, default: null },
  item_type: {
    selected: {type: String, default: null},
    types: [String],
    system: {type: String, default: null},
    size: {type: String, default: null}
  },
  metal: {
    value: {type: String, default: null},
    type: {type: String, default: null}
  },
  gemstone: {
    value: {type: String},
    type_quality: {type: String, default: null},
    diamond_substitute: {type: String, default: null},
  },
  treatment: {type: String, default: null},
  cut: {type: String, default: null},
  certifiedBy: {type: String},
  Shape: {type: String, default: null},
  composition: {type: String},
  returnPolicy: {type: String},
  colour: {type: String},
  dimensions: {
    value:{type: String, default: null},
    type: {type: String, default: null}
  },
  gravity: {type: String, default: null},
  refractive_index: { type: String, default: null},
  weight: {
    carat: {type: String, default: null},
    grams: {type: String, default: null},
    ratti: {type: String, default: null}
  },
  quality: {type: String, default: null},
  additional: {type: String, default: null},
  category: {type: String},
  subCate: {type: String},
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;