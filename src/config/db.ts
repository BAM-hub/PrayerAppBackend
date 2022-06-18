import mongoose from "mongoose";
import { mongoURI } from "./defaults";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("DB Connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
