/**
 * Add routers to the Express application.
 * All of the routers that this function applies will form the route for the entire web application.
 * 
 * @param {Express.Application} app - The Express application. Required for applying routers.
 */
function routes(app) {
    // Index route. Starts with '/', sub-routes will be added using the router in index-route.js.
    app.use('/', require('./index-route'));
    // Login route. Starts with '/login', sub-routes will be added using the router in login-route.js.
    app.use('/login', require('./login-route'));
    // Logout route. Starts with '/logout', sub-routes will be added using the router in login-route.js.
    app.use('/logout', require('./logout-route'));
    // Register route. Starts with '/register', sub-routes will be added using the router in user-route.js
    app.use('/register', require('./register-route'));
    // Category route. Starts with '/category', sub-routes will be added using the router in category-route.js
    app.use('/category', require('./category-route'));
    // Product route. Starts with '/product', sub-routes will be added using the router in product-route.js
    app.use('/product', require('./product-route'));
    // Cart route. Starts with '/cart', sub-routes will be added using the router in cart-route.js
    app.use('/cart', require('./cart-route'));
    // Checkout route. Start with '/checkout', sub-routes will be added using the router in checkout-route.js
    app.use('/checkout', require('./checkout-route'));
    // Profile route. Start with '/profile', sub-routes will be added using the router in profile-route.js
    app.use('/profile', require('./profile-route'));
    // About route. Start with '/about', sub-routes will be added using the router in about-route.js
    app.use('/about', require('./about-route'));
    // Contact route. Start with '/contact', sub-routes will be added using the router in contact-route.js
    app.use('/contact', require('./contact-route'));


}


module.exports = routes;