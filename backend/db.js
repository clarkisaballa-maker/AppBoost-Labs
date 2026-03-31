// db.js
const mongoose = require("mongoose");

// Replace <db_password> with your actual password
const uri = "mongodb://clarkisaballa_db_user:413spq5floRlH5YS@ac-bmrebmw-shard-00-00.jhzpugm.mongodb.net:27017,ac-bmrebmw-shard-00-01.jhzpugm.mongodb.net:27017,ac-bmrebmw-shard-00-02.jhzpugm.mongodb.net:27017/appboost?ssl=true&replicaSet=atlas-u8ceiy-shard-0&authSource=admin&appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected with Mongoose permanently!");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;