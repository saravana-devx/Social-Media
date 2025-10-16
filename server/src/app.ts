import express, { Request, Response } from "express";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import errorMiddleware from "./middlewares/errorHandler.middleware";
dotenv.config();
export const app: express.Application = express();

import authRoute from "./routes/auth.route";

// Rate-Limiting
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      error: "Rate limit exceeded",
      message: "Too many requests. Try again later.",
    });
  },
});
app.use(rateLimiter);

// Body Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security Middlewares
app.use(mongoSanitize());
// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ["'self'"],
//         // scriptSrc: ["'self'", "trusted.cdn.com"],
//       },
//     },
//   })
// );
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'", "http://localhost:5173"],
        scriptSrc: ["'self'", "'unsafe-inline'", "http://localhost:5173"], // Allow Vite's HMR
        styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles (CSS-in-JS)
        imgSrc: ["'self'", "data:"], // Allow base64 images
        connectSrc: ["'self'", "http://localhost:4000", "ws://localhost:5173"], // For API + Vite HMR
      },
    },
  })
);

// CORS
const allowedOrigins: string[] =
  process.env.NODE_ENV === "production"
    ? [process.env.Frontend_Production_url || ""]
    : ["http://localhost:5173"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
};
app.use(cors(options));

// ===============================================
// Routes will be here
app.use("/api/v1/auth", authRoute);
// ===============================================

app.use(errorMiddleware);


//Testing route to check server is running or not
app.get("/test", function (req: Request, res: Response): void {
  res.send("<h1>Server is running</h1>");
});


//Fallback response if any requested route is not available.
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    success: false,
    message: "!Oops page not found",
  });
});