const express = require("express");

const morgan = require("morgan");

const cors = require("cors");
const userRouter = require("./routes/userRoutes");

import { Express } from "express";

const app: Express = express();

// 1 MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

// 3 ROUTES
app.use("/api/v1/users", userRouter);

// 4 START A SERVER
module.exports = app;
