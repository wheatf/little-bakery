const path = require('path');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: String,
    imagePath: String
});

const categoryModel = mongoose.model('Category', categorySchema);

module.exports = categoryModel;