/**
 * Loads environment variables from the .env file
 */
require('dotenv').config();

/**
 * The object modeling tool for working with MongoDB.
 */
const mongoose = require('mongoose');
/**
 * Retrieve the path for connecting to database.
 */
// If 'process.env.DB_PATH' returns undefined (because either the .env file is missing or there isn't a DB_PATH variable defined in the file), use the default mongodb path.
const path = process.env.DB_PATH || 'mongodb://localhost:27017/little-bakery';

/**
 * Connect to database.
 */
async function connect() {
    await mongoose.connect(path, {
        // The options below will fix most deprecation warnings. There are still some methods that are depreciated, so avoid them as well.
        useNewUrlParser: true, // Use the updated string parser.
        useFindAndModify: false, // Make Mongoose use MongoDB driver's 'findOneAndUpdate()'.
        useCreateIndex: true, // Use the updated index creation.
        useUnifiedTopology: true // Use the new topology engine introduced by MongoDB driver.
    })
}

module.exports = connect;