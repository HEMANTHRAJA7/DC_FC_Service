const express = require('express')
const router = express.Router()
const food = require('../Models/foodSchema')
const{
    getFood,
    createFoodOrder
} = require('../Controllers/foodController')

router.get('/',getFood)
router.post('/',createFoodOrder)

module.exports = router