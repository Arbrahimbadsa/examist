import mongoose from "mongoose";

export const connectMongoDB = async () => {
  let URI = process.env.MONGODB_DEV_URI;
  if (process.env.NODE_ENV === "production") {
    URI = process.env.MONGODB_URI;
  }
  try {
    const con = await mongoose.connect(URI);
    console.log(
      `\nMongoDB (dev) connected: ${con.connection.host}`.white.bgBlue
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
