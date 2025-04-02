const food = require('../Models/foodSchema')
const mongoose = require('mongoose')

const getFood = async(req,res) =>{
    const user_id = req.user._id

    try {
        const Food = await food.find({ user_id }).sort({ createdAt: -1 });
        res.status(200).json(Food);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createFoodOrder = async (req, res) => {
    const { food_item, No_of_items, Total_amount } = req.body;
    
    let emptyFields = [];
    
    if (!food_item || food_item.length === 0) {
        emptyFields.push('food_item');
    }
    if (!No_of_items) {
        emptyFields.push('No_of_items');
    }
    if (!Total_amount) {
        emptyFields.push('Total_amount');
    }
    
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
    }
    
    try {
        const user_id = req.user._id
        const foodOrder = await food.create({ food_item, No_of_items, Total_amount,user_id });
        res.status(200).json(foodOrder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getFood,
    createFoodOrder
}
