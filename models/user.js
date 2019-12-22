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
    name: String,
    email: String,
    address: String,
    mobile: String, // Store mobile numbers as String to avoid any loss in numbers, and to support globalization.

    pointsEarned: Number,
    
    username: String,
    password: String
});

/**
 * The model that represent a document in the 'users' collection.
 */
const userModel = mongoose.model('User', userSchema);

module.exports = userModel;