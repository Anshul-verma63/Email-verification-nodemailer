import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Database connected!");
  } catch (error) {
    console.log(`Mongoose Error: ${error}`);
  }
};

export default dbConnect;
