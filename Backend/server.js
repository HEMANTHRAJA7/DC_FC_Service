const express = require('express');
const userRoutes = require('./Routes/user')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors');

require('dotenv').config();
app.use(cors());
app.use(express.json())
app.use('/user',userRoutes)

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(8000,() =>{
        console.log("server is running")
    });
})
.catch((err) => {
    console.log(err);
})