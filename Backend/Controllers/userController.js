const User = require('../Models/userSchema')
const jwt = require('jsonwebtoken')
const createToken = (_id) =>{
    return jwt.sign({_id:_id},process.env.SECRET,{expiresIn: '3d'})
}
const loginUser = async(req,res) => {
    const {email,password} = req.body

  try {
    const user = await User.login(email, password)

    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}
const signupUser = async(req,res) => {
    const {email,password,username} = req.body
    try {
      const user = await User.signup(email, password,username)
  
      const token = createToken(user._id)
  
      res.status(200).json({email,token,username})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
}
module.exports = {loginUser,signupUser}