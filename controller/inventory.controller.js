const mongoose = require('mongoose');
const Inventory = require('../models/Inventory.js');
const { catchAsync} = require("../helpers/utils.js");


const inventoryController = {};

inventoryController.getInventory = catchAsync(async(req, res, next) => {
    try {
        let { page, limit, ...filterQuery } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;

        const filterConditions = [{isDeleted: false}];

        if(filterQuery.quantity) {
            filterConditions.push({
                quantity: { $regex: filterQuery.quantity, $options: "i"},
            })
        };

        const filterCriteria = filterConditions.length
        ? { $and: filterConditions}
        : {};
        console.log("filterCriteria",filterCriteria)
    
        const count = await Post.countDocuments(filterCriteria);
        const totalPage = Math.ceil(count/limit);
        const offset = (page - 1)*limit;


        let inventories = await Inventory.find(filterCriteria)
        .sort({ createAt: -1})
        .skip(offset)
        .limit(limit)

        res.status(200).send(inventories)
        } catch (error) {
            next(error);
        }   
});

module.exports = inventoryController;