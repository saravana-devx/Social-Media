import express from "express";
import { app } from "./app";
import { connectToDatabase } from "./config/database.config";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    console.log(`http://localhost:${PORT}`);
  });
});
