// backend/config/db.js
const mongoose = require("mongoose");
require("dotenv").config(); // Ensure this is at the top if you use process.env directly here

const connectDB = async () => {
  try {
    // Retrieve MongoDB URI from environment variables
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      console.error("Error: MONGODB_URI is not defined in your .env file.");
      process.exit(1); // Exit process with failure
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Mongoose 6 doesn't support useCreateIndex and useFindAndModify anymore
      // useCreateIndex: true, // Not needed
      // useFindAndModify: false, // Not needed
    });
    console.log("MongoDB Connected Successfully...");
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
