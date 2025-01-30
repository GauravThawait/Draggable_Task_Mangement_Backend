import mongoose from "mongoose";

const connectDB = async () => {
    console.log(process.env.DB_URL)
    try {
      const conn = await mongoose.connect(process.env.DB_URL, {
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }


export default connectDB