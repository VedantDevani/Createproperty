import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

export const connectToDB = () => {
  mongoose
    .connect(process.env.MONGO_DB_URL!)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
};
