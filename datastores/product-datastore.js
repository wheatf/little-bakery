/**
 * The model that this datastore will be using to pefrom CRUD operations.
 */
const productModel = require('../models/product');

module.exports = {

    /**
     * Get all product from the database.
     */
    findAll: async function() {
        return await productModel.find({}).populate('category','name').exec();
    },

    /**
     * Get a product from the database.
     * 
     * @param {Mongoose.SchemaTypes.ObjectId} id - The _id of the product to search for.
     */
    find: async function(id) {
        return await productModel.findById(id).populate('category', 'name').exec();
    },

    /**
     * Get products from the database.
     * 
     * @param {String} name - The name of the product to search for.
     */
    findByName: async function(name) {
        return await productModel.find({name: name}).populate('category', 'name').exec();
    },

    /**
     * Get products from the database.
     * 
     * @param {String} category - The category of the product to search for.
     */
    findByCategory: async function(category) {
        return await productModel.find({'category.name': category}).populate().exec();
    }
}