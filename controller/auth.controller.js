const { catchAsync } = require("../helpers/utils");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const authController = {};

authController.loginWithEmail = catchAsync(async (req, res, next) => {
    const {username, password} = req.body;
    const users = await User.findOne({username}, "+password"); 
    console.log("users",users) 
    if(!users) throw new Error(400, "Invalid Credentials","Login Error");

    const isMatch = await bcrypt.compare(password, users.password);
    if(!isMatch) throw new Error(400, "Wrong Password", "Login Error");
    
    const accessToken = await users.generateToken();
    console.log("accessToken",accessToken)

    res.send(
        {users, accessToken}
    )
});

module.exports = authController;