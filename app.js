const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./src/routes/api");

dotenv.config();

const app = express();

app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());
app.use(cors());

app.use(bodyParser.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/v1", router);

app.use("*", (req, res) => {
  res.status(404).json({ status: "fail", data: "Not found" });
});

module.exports = app;
