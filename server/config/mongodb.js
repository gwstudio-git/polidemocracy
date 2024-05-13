const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

const DB = process.env.MONGO_URL;
const connectionpOptions = {
  dbName: `polidemo`,
  useUnifiedTopology: true,
}
const connectDb = async ()=>{
    try {
        const connection = await mongoose.connect(DB,connectionpOptions)
        console.log(`connection successful ${connection.connection.host}`)
    } catch (error) {
        console.log('mongo error',error)
    }
}

module.exports = connectDb;


