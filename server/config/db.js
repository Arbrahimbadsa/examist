import mongoose from "mongoose";

export const connectMongoDB = async () => {
  const URI = process.env.MONGODB_URI;
  try {
    const con = await mongoose.connect(URI);
    console.log(`\nMongoDB connected: ${con.connection.host}`.white.bgBlue);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
