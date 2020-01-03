const cartDatastore = require('../datastores/cart-datastore');

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
    }    
}