import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const options: ConnectOptions = {};

const connectDB = async () => {
  mongoose.connect(process.env.DB_URL, options, (err) => {
    if (err) throw err;
    console.log("MongoDB Connected...");
  });
};

export default connectDB;
