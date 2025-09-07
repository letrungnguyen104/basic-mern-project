import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
    console.log("Connected!");
  } catch (error) {
    console.error("Error!");
    process.exit(1);
  }
}