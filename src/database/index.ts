import mongoose from "mongoose";

export async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Database connected successfull 🍀");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Error while connecting Database:", error.message);
    }
    console.log("Error while connecting Database:");
  }
}
