const express = require("express");
const router = require("./src/route/api");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Security Middlewares
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());
app.use(cors());

// Body Parser
app.use(bodyParser.json());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, 
});
app.use(limiter);

mongoose
    .connect("mongodb://127.0.0.1:27017/my_database", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api", router);

app.use("*", (req, res) => {
    res.status(404).json({ status: "fail", data: "Not Found" });
});

module.exports = app;
