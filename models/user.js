const orderDatastore = require('../datastores/order-datastore');

/**
 * Provides functions for hashing.
 */
const crypto = require('crypto');
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
 * The schema for the 'users' collection.
 */
const userSchema = new Schema({
    fullname: String,
    email: String,
    address: String,
    mobile: String, // Store mobile numbers as String to avoid any loss in numbers, and to support globalization.
    username: String,
    password: {
        type: String,
        // get: function(password) { // Calls the following method when retrieving the password.
        //     return Buffer.from(password, 'base64'); // Decode Base64; the encoding used for storing password in the database.
        // },
        set: function(password) { // Calls the following method when setting the password.
            return crypto.createHash('sha256').update(password).digest('base64'); // Hash the password using SHA256, then encode using Base64.
        }
    }
});

/**
 * The model that represent a document in the 'users' collection.
 */
const userModel = mongoose.model('User', userSchema);

module.exports = userModel;