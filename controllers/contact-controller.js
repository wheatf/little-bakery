module.exports = {
    /**
     * Serve the index page to client.
     * 
     * @param {Express.Request} req - The request object.
     * @param {Express.Response} res - The response object.
     */
    contactPage: async function(req, res) {
        // Use res.render() to render .ejs files.
        // Express will start searching from the views directory, as stated in app.js.
        res.render('contact'); //link to contact.ejs  , will search in view folder
    }
}