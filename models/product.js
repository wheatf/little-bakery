/**
 * The object modeling tool for working with MongoDB.
 */
const mongoose = require('mongoose');
/** 
 * The class that allow us to define our own schema.
 * A schema tells a collection in MongoDB how it should structure its documents.
 */
const Schema = mongoose.Schema;

/**
 * The schema for the 'product' collection.
 */
const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    availableQuantity: Number,
    pointsObtainable: Number,
    imagePath: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
});

/**
 * The model that represent a document in the 'product' collection.
 */
const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;