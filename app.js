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

// The web framework for Node.js for creating web applications.
const express = require('express');
// Provides utilities for working with files and directory paths, regardless of which OS the application is running on.
const path = require('path');

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
 * Setup routes.
 */
// A file called route.js will create the route for us. Look at route.js to find out how.
require('./routes/route')(app);

// Export the partially configured Express application so that startup scripts may add on their own configurations.
module.exports = app;