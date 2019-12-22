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
    }
}