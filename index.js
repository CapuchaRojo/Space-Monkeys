import express from "express";
import cookieParser from "cookie-parser";
import flash from "connect-flash";
import session from "express-session";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import { fileURLToPath } from "url";
import { connectDB } from "./src/config/mongo.js";
import mongoose from "mongoose";
import promptRoute from "./src/routes/prompt.route.js";
import Telemetry from "./src/models/Telemetry.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(flash());
app.use(cors());

// Log API requests
app.use(morgan("combined"));

app.set("view engine", "ejs");
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

await connectDB();
console.log("MongoDB Connection State:", mongoose.connection.readyState);

// Routes
app.get("/", (req, res) => {
  res.json({ success: true, message: "Server is running!!" });
});

// measure the execution time for each request.
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", async () => {
    const duration = Date.now() - start;

    await Telemetry.create({
      event: "API Request",
      metadata: {
        method: req.method,
        url: req.originalUrl,
        responseTime: `${duration}ms`,
      },
    });
  });
  next();
});


// Use router
app.use("/api", promptRoute);

// Flash messages middleware
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success") || [];
  res.locals.error_msg = req.flash("error") || [];
  next();
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
