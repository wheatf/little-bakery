module.exports = {
    /**
     * Serve the index page to client.
     * 
     * @param {Express.Request} req - The request object.
     * @param {Express.Response} res - The response object.
     */
    aboutPage: async function(req, res) {
        // Use res.render() to render .ejs files.
        // Express will start searching from the views directory, as stated in app.js.
        res.render('about'); //link to about.ejs  , will search in view folder
    }
}