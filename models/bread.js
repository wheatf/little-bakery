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
 * The schema for the 'breads' collection.
 */
const breadSchema = new Schema({
    name: String,
    description: String,
    price: Schema.Types.Decimal128, // Decimal128 is the type used for handling currency values.
    availableQuantity: Number,
    pointsObtainable: Number
});

/**
 * The model that represent a document in the 'breads' collection.
 */
const breadModel = mongoose.model('Bread', breadSchema);

module.exports = breadModel;