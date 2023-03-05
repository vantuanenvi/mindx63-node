const mongoose = require("mongoose");
const inventorySchema = new mongoose.Schema(
  {
    item: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
  },
    quantity: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;