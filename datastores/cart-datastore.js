const cartModel = require('../models/cart');

module.exports = {
    
    /**
     * Get carts from the database.
     * 
     * @param {Mongoose.SchemaTypes.ObjectId} id - The _id of the user to search for.
     */
    findByUserId: async function(id) {
        return await cartModel.find({user: id}).populate('product').exec();
    },

    /**
     * Add a cart to the database. This function will check for any existing cart and add to their quantity instead.
     * 
     * @param {cartModel} cart - The cart to add to database.
     */
    add: async function(cart) {
        // Check if item exists in cart.
        let cartItem = await cartModel.findOne({user: cart.user, product: cart.product});

        if (cartItem) { // Item exists, add to quantity instead.
            cartItem.quantity += parseInt(cart.quantity);
            cartItem.save();
        } else {
            // Item doesn't exists, insert to database.
            cart.save();
        }
    },

    /**
     * Remove an item from the cart.
     * 
     * @param {Mongoose.SchemaTypes.ObjectId} userId - The _id of the user that the cart belongs.
     * @param {Mongoose.SchemaTypes.ObjectId} productId - The _id of the product
     */
    remove: async function(userId, productId) {
        // Check if item exists in cart.
        let cartItem = await cartModel.findOne({user: userId, product: productId});

        if (cartItem) { // Item exists, remove it.
            cartItem.remove();
        }
    },

    /**
     * Clears all cart from the user.
     * 
     * @param {Mongoose.SchemaTypes.ObjectId} id - The _id of the user to search for.
     */
    removeByUserId: async function(id) {
        await cartModel.deleteMany({user: id});
    }
}