const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderDetailsSchema = new Schema(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: Number
    }
);

const orderDetailsModel = mongoose.model('OrderDetail', orderDetailsSchema);

module.exports = orderDetailsModel;