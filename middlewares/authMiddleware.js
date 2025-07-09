const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { header } = require("express-validator");


module.exports.verifyAdmin = async (req, res, next) => {
    try {
        const user = req.user;
        if(!user.isAdmin){
            return res.status(401).json({message : "Not Authorized"})
        }
        next()
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


module.exports.verifyUser = async (req, res, next) => {
    try {
        const headers = req.headers.authorization;
        let token = undefined
        if(!headers){
            return res.status(401).json({message : "Authorization Failed"})
        }
        token = headers.split(" ")[1]
        if(!token){
            return res.status(401).json({message : "No Token provided"})
        }
        let {_id} = jwt.verify(token, process.env.JWT_SECRET);
    
        if(!_id){
            return res.status(401).json({message : "Invalid token"})
        }
        const user = await User.findById(_id);
        if(!user){
            return res.status(401).json({message : "User not found"})
        }
        req.user = user
        next()
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}