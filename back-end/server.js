const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "*", credentials: true, optionsSuccessStatus: 200 }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(bodyParser.json({ limit: "10mb" }));

app.use("/person", require("./person/routes"));


module.exports = app;
