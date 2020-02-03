const productDatastore = require('../datastores/product-datastore');

module.exports = {
    /**
     * Serve the index page to client.
     * 
     * @param {Express.Request} req - The request object.
     * @param {Express.Response} res - The response object.
     */
    indexPage: async function(req, res) {
        // Use res.render() to render .ejs files.
        // Express will start searching from the views directory, as stated in app.js.
        // res.render('index');

        let products = await productDatastore.sortTopFour();

        res.render('index', {
            products: products
        });

        // // make 'user' available to template
        // res.render('index', {
        //     session: req.session
        // });
    }


}