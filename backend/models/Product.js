const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'price must be greater than 0']
  },
  imageUrl: {
    type: String
  },
  category: {
    type: String
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
