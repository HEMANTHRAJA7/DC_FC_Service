const mongoose = require('mongoose');

const schema = mongoose.Schema;

const foodSchema = new schema({
    food_item: [{
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    No_of_items: {
        type: Number,
        required: true
    },
    Total_amount: {
        type: Number,
        required: true
    },
    user_id:{
        type:String,
        required:true
    }
}, { timestamps: true });

module.exports = mongoose.model('Food', foodSchema);
