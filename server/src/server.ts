import { app } from "./app";
import { connectToDatabase } from "./config/database.config";
import { initRedis } from "./config/redis.config";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;

// To run on all device within same network
const hostAddress = "192.168.0.101";

connectToDatabase().then(async () => {
  await initRedis();
  app.listen(Number(PORT), hostAddress, () => {
    console.log(`Server is running on ${PORT}`);
    console.log(`http://${hostAddress}:${PORT}`);
  });
});
