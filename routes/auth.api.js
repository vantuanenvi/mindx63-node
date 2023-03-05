const express = require("express");
// const validators = require("../middlewares/validators");
const router = express.Router();
// const { body } = require("express-validator");
const {loginWithEmail} = require("../controller/auth.controller");

/**
 * @route POST /auth/login
 * @description Log in with Email & Password
 * @body {email, password}
 * @access public
 */
router.post(
    "/login",
    loginWithEmail
    );

module.exports = router