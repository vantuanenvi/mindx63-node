var express = require('express');
const router = express.Router();
const authentication = require('../middlewares/authentication');


/* GET inventory page. */
const authRouter = require('./auth.api');
router.use('/auth',authRouter);

const inventoryRouter = require('./inventory.api.js');
router.use('/inventories', inventoryRouter);


module.exports = router;
