const orderModel = require('../models/order');
const orderDetailsModel = require('../models/orderDetails');

const userDatastore = require('../datastores/user-datastore');
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
     * @param {String} usePoints - Whether points should be used or not.
     */
    add: async function(userId, carts, usePoints) {
        // Store order details ids.
        let orderDetailsIds = [];
        // Store total price.
        let totalPrice = 0;
        // Store total points.
        let totalPoints = 0;

        // Save every cart into order details.
        for (const cart of carts) {
            let orderDetails = new orderDetailsModel({
                product: cart.product._id,
                quantity: cart.quantity,
            });

            // Update available quantity of product.
            await productDatastore.reduceQuantity(cart.product._id, cart.quantity);

            // Save into order details.
            await orderDetails.save().then(function (value) {
                orderDetailsIds.push(value._id);
            });

            // Add to total points.
            totalPoints += parseInt(cart.product.pointsObtainable) * parseInt(cart.quantity);
            console.log(`Total Points: ${totalPoints}`);

            // Add to total price.
            totalPrice += parseFloat(cart.product.price) * parseInt(cart.quantity);
        }
        
        // Store discounted price.
        let discountedPrice = null;
        // Check whether user is redeeming their points
        if (usePoints == "yes") {
            // Get user's total points
            let user = await userDatastore.find(userId);
            let userPoints = user.pointsEarned;
            // Prepare discounted price
            discountedPrice = totalPrice;

            // For every 10 points, reduct $1
            // Round down to avoid user having extra discount
            discountedPrice -= Math.floor(userPoints / 10);

            // Prevent discounted price from going below 0
            if (discountedPrice < 0) {
                discountedPrice = 0;
            }

            // Remove all user points.
            await userDatastore.removeAllPoints(userId);
            console.log("User: " + await userDatastore.find(userId));
        } 

        // Add points to user
        await userDatastore.addPoints(userId, totalPoints);
        console.log("New User: " + await userDatastore.find(userId));

        // Store order into database.
        let order = new orderModel({
            user: userId,
            orderDetails: orderDetailsIds,
            discountedPrice: discountedPrice,
            status: "Ordered"
        });
        order.save();

        // Clear the cart.
        await cartDatastore.removeByUserId(userId);
    }
}