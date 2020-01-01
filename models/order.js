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
 * The schema for the 'orders' collection.
 */
const orderSchema = new Schema({
    user: { // References to another collection using their _id.
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },{
        quantity: Number
    }]
});

/**
 * The model that represent a document in the 'orders' collection.
 */
const orderModel = mongoose.model('Order', orderSchema);

module.exports = orderModel;