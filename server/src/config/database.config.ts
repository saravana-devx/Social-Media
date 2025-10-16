import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

export async function connectToDatabase() {
  try {
    const database = process.env.DATABASE_URL;
    if (!database) {
      throw new Error(
        "DATABASE_URL is not defined in the environment variable"
      );
    }
    await mongoose.connect(database);
    console.log("Database connected successfully.");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
    process.exit(1);
  }
}
