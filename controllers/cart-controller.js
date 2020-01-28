const productDatastore = require('../datastores/product-datastore');
const cartDatastore = require('../datastores/cart-datastore');

const cartModel = require('../models/cart');

module.exports = {

    cartPage: async function(req, res) {
        let carts = [];

        // If user is logged in, then his cart is found in database.
        if (req.session.userId) {
            let userId = req.session.userId;
            carts = await cartDatastore.findByUserId(userId);
        } else { // Otherwise, it is found in session.
            
            // Retrieve the array of ids
            let sessionCart = req.session.cart;
            
            // Retrieve the products using the ids and push them to the array.
            if (sessionCart) {
                for (const element of sessionCart) {
                    let product = await productDatastore.find(element.productId);
                    carts.push({product: product, quantity: element.quantity})
                }
            }
        }

        res.render('cart', {
            carts: carts 
        });
    },
    
    add: async function(req, res) {
        let quantity = req.body.quantity;
        let productName = req.body.productName;
        let productId = req.body.productId;
        let product = await productDatastore.find(productId);

        // Product found
        if (product) {
            // Checked whether user is logged in or not.
            if (req.session.userId) {
                // Store user cart in the cart collection.
                let userId = req.session.userId;

                let cart = new cartModel({
                    user: userId,
                    product: productId,
                    quantity: quantity
                });

                await cartDatastore.add(cart);
            } else {
                // Store user cart in the session.
                
                // Attempt to retrieve the cart from the session.
                let cart = req.session.cart;
                // Cart is not found, initalize a new cart for user.
                if (!cart) {
                    cart = [];
                    // Since it is a new cart, we can add it without worrying about duplicate values.
                    cart.push({productId: productId, quantity: quantity});
                } else {
                    // Check if item exists in cart.
                    let cartItem = cart.find(item => item.productId == productId);
                    
                    if (cartItem) {
                        // Add quantity to the item in cart.
                        cartItem.quantity = parseInt(cartItem.quantity, 10) + parseInt(quantity, 10);
                    } else {
                        // Since cart doesn't have said item, we can add it without worrying about duplicate values.
                        cart.push({productId: productId, quantity: quantity});
                    }
                }

                // Replace the updated cart with the one in session.
                req.session.cart = cart;
            }

            // res.redirect('/product/' + productId);

            req.flash('success', ' ' + productName + ' added into your shopping cart.');
            res.redirect('/product/' + productId);


        } else {
            // Product not found, user must have tempered with the hidden input.
            res.redirect('/category')
        }
    },

    remove: async function(req, res) {
        let productId = req.body.productId;
        let userId = req.session.userId;

        // Check whether user is logged in or not.
        if (userId) {
            // Find item in cart collection.
            await cartDatastore.remove(userId, productId);
        } else {
            // Find item in session
            
            // Attempt to retrieve the cart from the session.
            let cart = req.session.cart;
            if (cart) {
                // Attempt to retrieve the index of the matching productId.
                let index = cart.map(item => { return item.productId }).indexOf(productId);

                // Item found
                if (index > -1) {
                    // Remove from cart.
                    cart.splice(index, 1);
                }
            }
        }

        res.redirect('/cart');
    }
}

