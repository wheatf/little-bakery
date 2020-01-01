const categoryDatastore = require('../datastores/category-datastore');
const productDatastore = require('../datastores/product-datastore');

module.exports = {

    /**
     * Serve the categories page to client.
     * 
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     */
    categoriesPage: async function(req, res) {
        let categories = await categoryDatastore.findAll();

        res.render('categories', {
            categories: categories
        });
    },

    /**
     * Serve the specific category page to client.
     * 
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     */
    categoryPage: async function(req, res) {
        let category = req.params.category;

        let products = await productDatastore.findByCategory(category);

        res.render('category', {
            category: category.charAt(0).toUpperCase() + category.slice(1),
            products: products
        });
    }
}