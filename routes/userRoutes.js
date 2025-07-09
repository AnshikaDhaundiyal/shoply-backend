const {Router} =require("express");
const {registerUser,loginUser, getAllUser, updateAdmin, deleteUser, checkUser}=require('../controllers/userController')
const { check } = require('express-validator');
const { verifyUser, verifyAdmin } = require("../middlewares/authMiddleware");

const routes=Router();

const validation ={
    usernameValidation:[
        check("username")
        .notEmpty().withMessage('Username is Required')
        .isLength({min:8}).withMessage("Username must be 8 characters or long")
        .custom((value) =>/^[a-zA-Z0-9\s]{8,}$/.test(value))
        .withMessage("Username must not contain any special character, except spaces")
    ],
    emailValidation:[
     check("email").notEmpty().withMessage('Email is required')
     .isEmail().withMessage('Invalid Email')
    ],
    passwordValidation:[
    check("password").notEmpty().withMessage('Password is required')
    .custom((value)=>/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(value))
    .withMessage("Password must contain at least one uppercase letter, one lowercase letter, one number and one special character")
    ]
}


/**
 * @description This route registers the user after validating username , email and password
 * @data {username, email, password}
 * @path {http://localhost/api/v1/user/register}
 * @public
 */

routes.post("/register",
[
validation.usernameValidation[0],
validation.emailValidation[0],
validation.passwordValidation[0],
], 
registerUser)


routes.post("/login",
[
validation.emailValidation[0],
validation.passwordValidation[0],
],
loginUser)
routes.get("/checkUser", checkUser)

routes.get("/allUser", verifyUser, verifyAdmin, getAllUser)
routes.put('/updateAdmin/:_id', verifyUser, verifyAdmin, updateAdmin)
routes.delete('/deleteUser/:_id', verifyUser, verifyAdmin, deleteUser)

module.exports=routes;