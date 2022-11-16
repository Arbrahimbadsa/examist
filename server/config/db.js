import mongoose from "mongoose";

export const connectMongoDB = async () => {
  const URI = process.env.MONGODB_URI;
  try {
    const con = await mongoose.connect(URI);
    console.log(`MongoDB connected: ${con.connection.host}`.green.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
