const categoryModel = require('../models/category');

module.exports = {
    findAll: async function() {
        return await categoryModel.find({});
    }
}