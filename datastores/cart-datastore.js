const cartModel = require('../models/cart');

const userModel = require('../models/user');
const productModel = require('../models/product');

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
    }
}