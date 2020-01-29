const cartDatastore = require('../datastores/cart-datastore');
const orderDatastore = require('../datastores/order-datastore');

module.exports = {
    checkoutPage: async function(req, res) {
        let userId = req.session.userId;

        // Check if user is logged in or not.
        if (userId) {
            // Retrieve cart items
            let carts = await cartDatastore.findByUserId(userId);
            
            res.render('checkout', {
                carts: carts
            });
        } else {
            req.session.loginRedirect = '/checkout';
            res.redirect('/login');
        }
    },

    checkout: async function(req, res) {
        let userId = req.session.userId;

        // Check if user is logged in or not.
        if (userId) {
            // Retrieve cart items
            let carts = await cartDatastore.findByUserId(userId);

            // Check if cart have any items
            if (carts) {
                orderDatastore.add(userId, carts);
                // TODO: Redirect somewhere else.
                // return res.redirect('/index');
                return res.render('checkoutsuccess');
            }
        }

        return res.redirect('/checkout')
    }
}