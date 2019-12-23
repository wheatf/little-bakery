/**
 * The model that this datastore will be using to pefrom CRUD operations.
 */
const breadModel = require('../models/bread');

module.exports = {
    /**
     * Get all bread from the database.
     */
    findAll: async function() {
        return await breadModel.find({});
    },

    /**
     * Get a bread from the database.
     * 
     * @param {Mongoose.SchemaTypes.ObjectId} id - The _id of the bread to search for.
     */
    find: async function(id) {
        return await breadModel.findById(id);
    },

    /**
     * Get a bread from the database.
     * 
     * @param {String} name - The name of the bread to search for.
     */
    findByName: async function(name) {
        return await breadModel.find({name: name});
    },

    /**
     * Get a bread from the database.
     * 
     * @param {String} description - The description of the bread to search for.
     */
    findByDescription: async function(description) {
        return await breadModel.find({description: description});
    }
}