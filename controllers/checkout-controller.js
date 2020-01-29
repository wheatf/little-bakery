const cartDatastore = require('../datastores/cart-datastore');
const orderDatastore = require('../datastores/order-datastore');
const userDatastore = require('../datastores/user-datastore');

module.exports = {
    checkoutPage: async function(req, res) {
        let userId = req.session.userId;

        // Check if user is logged in or not.
        if (userId) {
            // Retrieve cart items
            let carts = await cartDatastore.findByUserId(userId);
            // Retrieve user's points
            let user = await userDatastore.find(userId);
            
            res.render('checkout', {
                carts: carts,
                userPoints: user.pointsEarned
            });
        } else {
            req.session.loginRedirect = '/checkout';
            res.redirect('/login');
        }
    },

    checkout: async function(req, res) {
        let userId = req.session.userId;
        let usePoints = req.body.usePoints;

        // Check if user is logged in or not.
        if (userId) {
            // Retrieve cart items
            let carts = await cartDatastore.findByUserId(userId);

            // Check if cart have any items
            if (carts) {
                orderDatastore.add(userId, carts, usePoints);
                // TODO: Redirect somewhere else.
                // return res.redirect('/index');
                return res.render('checkoutsuccess');
            }
        }

        return res.redirect('/checkout')
    }
}