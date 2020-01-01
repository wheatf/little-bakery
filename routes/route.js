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
    // User route. Starts with '/user', sub-routes will be added using the router in user-route.js
    app.use('/user', require('./user-route'));

}


module.exports = routes;