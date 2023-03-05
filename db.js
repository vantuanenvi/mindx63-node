const { MongoClient } = require("mongodb");

const db = {};

const connectToDb = () => {
  const client = new MongoClient("mongodb+srv://web63tuan:web63!tuan@cluster0.hkdxqtt.mongodb.net/test");
  client.connect(() => {
    const database = client.db("Test-node");
    db.inventories = database.collection("inventory");
    db.orders = database.collection("order");
    db.users = database.collection("users");
  });
};

module.export = { connectToDb, db };