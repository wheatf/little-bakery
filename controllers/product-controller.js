const productDatastore = require('../datastores/product-datastore');

module.exports = {
    productPage: async function(req, res) {
        let productId = req.params.productId;

        let product = await productDatastore.find(productId);

        // Product is found using the product id
        if (product) {
            res.render('productDetails', {
                product: product
            });
        } else {
            // Invalid product id, redirect to a different page.
            // TODO: Consider using a 404 page not found redirection.
            res.redirect('/category');
        }
    }
}