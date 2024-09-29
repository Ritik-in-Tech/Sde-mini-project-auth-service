import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import { createTcpPool } from "./config/db.js";
import userRoutes from "./routes/user.js";
import { ApiResponse } from "./utils/helpers/apiResponse.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 80;

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Global Middlewares
app.use(cors({ origin: "*", methods: ["GET", "POST"], credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Use of the routes
app.use("/api/v1/users", userRoutes);

// Gloabal check for validations errors
app.use((err, req, res, next) => {
  return res
    .status(500)
    .json(
      new ApiResponse(500, { error: err.message }, "Internal server error")
    );
});

// Default check for the server run
app.get("*", (req, res) => {
  res.json({
    message: "welcome to Authentication Service",
  });
});

// start server with connect with mongodb
const startServer = async () => {
  try {
    await createTcpPool();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
};

startServer();
