require("dotenv").config();
const express = require("express");
// для використання import from треба в package.json встановити залежність  "type": "module",
// import "dotenv/config";
// import express from "express";
// import sequelize from "./db.js";

const sequelize = require("./db.js");

const models = require("./models/models.js");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const router = require("./routes/index.js");
const errorHandler = require("./middleware/errorHandlingMiddleware.js");
const path = require("path");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router);

//
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();
