const express = require('express');
const router = express.Router();
// const inventoryController = require("../controller/inventory.controller")
const inventoryController = require("../controller/inventory.controller")
const authentication = require("../middlewares/authentication");

// GET ALL INVENTORY 
 /**
  * @route GET /inventories/
  * @description Get a list of inventories
 */
router.get('/', authentication.loginRequired, inventoryController.getInventory);
 
module.exports = router