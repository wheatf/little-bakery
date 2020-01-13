/**
 * This file is used to setup configurations
 * for an Express application.
 * 
 * WARNING:     This file CANNOT directly start
 *              an Express application.
 *              Use 'npm start' instead.
 *              For explanation, look at the file
 *              located at 'bin/www'.
 */

require('dotenv').config();
// The web framework for Node.js for creating web applications.
const express = require('express');
// Provides utilities for working with files and directory paths, regardless of which OS the application is running on.
const path = require('path');
// Extracts the entire body of an incoming request.
const bodyParser = require('body-parser');
// Allows Express to render flash messages.
// Flash messages are one-time messages that are used for passing temporary messages, such as errors and success messages.
const flash = require('express-flash-messages');
// Session middleware for Express.
const session = require('express-session');
// Database storage for session
const mongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

// Create an Express application.
const app = express();

/**
 * Setup view engine.
 */
// Tells Express where the webpages are stored.
app.set(
    'views', // A property of the application settings; tells express where the webpages are stored.
    path.join(__dirname, 'views') // The path to the views folder; sets to '(current_directory)/views'.
);
// Tells Express what template engine we are going to use for rendering static HTML pages.
// A template engine convert custom files to HTML files, while allowing data, such as values from databases, to be printed onto these HTML files.
app.set(
    'view engine',
    'ejs' // This template engine uses syntaxs that are very similar, if not same, to the scriptlets used in Java EE.
);

/**
 * Setup static files.
 */
// Tells Express where the images, JavaScript and CSS files are located.
app.use(
    '/public', // Mount path for the directory. Use '/public/(static_files_directory)/(static_file)' to serve static files.
    // Middleware function for finding and serving static files.
    express.static(
        path.join(__dirname, 'public') // The path to the public folder; sets to '(current_directory)/public'.
    )
);

/**
 * Connect to database
 */
// A file called datastore.js will connect to MongoDB for us. Look at datastore.js to find out how.
require('./datastores/datastore')();

/**
 * Allow Express to use session state.
 */
let secret = process.env.SESSION_SECRET || 'keyboard cat';
let cookieMaxAge = parseInt(process.env.COOKIE_MAX_AGE) || 600000;

app.use(session({
    secret: secret,
    store: new mongoStore({mongooseConnection: mongoose.connection}),
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: cookieMaxAge}
}));

// Middleware to allow all '.ejs' files to access session
app.use(function(req, res, next){
    res.locals.session = req.session;
    next();
});

/**
 * Parse URL encoded data sent using HTTP POST requests, such as from a form.
 */
app.use(bodyParser.urlencoded({
    // If true, objects parsed can contain values of any types, rather than just String or array.
    extended: true
}));

/**
 * Provde Express with flash messaging capabilities.
 */
app.use(flash());

/**
 * Setup routes.
 */
// A file called route.js will create the route for us. Look at route.js to find out how.
require('./routes/route')(app);

// Export the partially configured Express application so that startup scripts may add on their own configurations.
module.exports = app;