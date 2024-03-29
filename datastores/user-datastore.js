/**
 * The model that this datastore will be using to pefrom CRUD operations.
 */
const userModel = require('../models/user');

module.exports = {
    /**
     * Get a user from the database.
     * 
     * @param {Mongoose.SchemaTypes.ObjectId} id - The _id of the user to search for.
     */
    find: async function(id) {
        return await userModel.findById(id);
    },

    /**
     * Get a user from the database.
     * 
     * @param {String} username - The username of the user to search for.
     */
    findByUsername: async function(username) {
        return await userModel.findOne({username: username});
    },

    /**
     * Get a user from the database.
     * 
     * @param {String} email - The email of the user to search for.
     */
    findByEmail: async function(email) {
        return await userModel.findOne({email: email});
    },

    /**
     * Add a new user to the database.
     * 
     * @param {userModel} user - The user to add.
     * @returns A list of error if validation fails.
     */
    add: async function(user) {
        await user.save();
    },

    /**
     * Update an existing user in the database.
     * 
     * @param {userModel} user - The user with the updated information. The _id of the user will determine which user gets updated in the database.
     */
    update: async function(user) {
        await userModel.updateOne({_id: user._id}, {
            fullname: user.fullname,
            email: user.email,
            address: user.address,
            mobile: user.mobile,
            password: user.password
        });
    },

    /**
     * Remove an existing user in the database.
     * 
     * @param {Mongoose.SchemaTypes.ObjectId} id - The _id of the user to search for.
     */
    delete: async function(id) {
        await userModel.deleteOne({_id: id});
    }
}