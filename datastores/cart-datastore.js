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
        return await cartModel.aggregate([
            {
                $lookup: {
                    from: userModel.collection.name,
                    localField: 'user',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $match: { 'user._id' : id }
            },
            {
                $lookup: {
                    from: productModel.collection.name,
                    localField: 'products',
                    foreignField: '_id',
                    as: 'products'
                }
            }
        ]);
    },

    /**
     * Add a cart to the database. This function will check for any existing cart and add to their quantity instead.
     * 
     * @param {cartModel} cart - The cart to add to database.
     */
    add: async function(cart) {
        // Find current user's carts
        let userCarts = await this.findByUserId(cart.user);
        // Check if item exists in cart.
        let cartItem = userCarts.find(item => item.product == cart.product);

        if (cartItem) { // Item exists, add to quantity instead.
            cartItem.quantity += cart.quantity;
            cartItem.save();
        } else {
            // Item doesn't exists, insert to database.
            cart.save();
        }
    }
}