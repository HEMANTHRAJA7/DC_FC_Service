const express = require('express')
const router = express.Router()
const food = require('../Models/foodSchema')
const{
    getFood,
    createFoodOrder
} = require('../Controllers/foodController')
const requireAuth = require('../Middleware/requireAuth')

//require auth for all
router.use(requireAuth)
router.get('/',getFood)
router.post('/',createFoodOrder)

module.exports = router