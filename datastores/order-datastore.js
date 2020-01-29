const orderModel = require('../models/order');
const orderDetailsModel = require('../models/orderDetails');

const productDatastore = require('../datastores/product-datastore');
const cartDatastore = require('../datastores/cart-datastore');

module.exports = {

    /**
     * Get order from the database.
     * 
     * @param {Mongoose.SchemaTypes.ObjectId} id - The id of the order to search for
     */
    find: async function(id) {
        return await orderModel.findOne({_id: id}).populate({
            path: 'orderDetails',
            populate: {
                path: 'product'
            }
        }).exec();
    },

    /**
     * Get orders from the database.
     * 
     * @param {Mongoose.SchemaTypes.ObjectId} id - The id of the user to search for. 
     */
    findByUserId: async function(id) {
        return await orderModel.find({user: id}).populate({
            path: 'orderDetails',
            populate: { 
                path: 'product'
            }
        }).exec();
    },

    /**
     * Add a order to the database.
     * 
     * @param {Mongoose.SchemaTypes.ObjectId} userId - The id of the user that performed the order.
     * @param {orderModel} carts - The carts to add as orders.
     */
    add: async function(userId, carts) {
        // Store order details ids.
        let orderDetailsIds = [];

        // Save every cart into order details.
        for (const cart of carts) {
            let orderDetails = new orderDetailsModel({
                product: cart.product._id,
                quantity: cart.quantity,
                status: "Ordered" 
            });

            await orderDetails.save().then(function (value) {
                orderDetailsIds.push(value._id);
            });

            // Update available quantity of product.
            await productDatastore.reduceQuantity(cart.product._id, cart.quantity);
        }

        // Store order into database.
        let order = new orderModel({
            user: userId,
            orderDetails: orderDetailsIds,
        
        });
        order.save();

        // Clear the cart.
        await cartDatastore.removeByUserId(userId);
    }
}