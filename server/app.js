import express from "express";
import path from "path";
import logger from "morgan";
import mongoose from "mongoose";
import { getNumerals, convertNumeral } from "./controllers/numeral.controller.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const __dirname = path.resolve(path.dirname(''));

app.use(express.static(path.join(__dirname, "public"))); // set the port

const port = process.env.PORT || 3001;

// connect to database
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/arabic-roman-numbers");

app.get("/api", (req, res) => {
  return res.end("Api working");
});

app.get("/api/get", getNumerals);

app.post("/api/convert", convertNumeral);

// catch 404
app.use((req, res, next) => {
  res.status(404).send("<h2 align=center>Page Not Found!</h2>");
});

// start the server
app.listen(port, () => {
  console.log(`App Server Listening at ${port}`);
});

export default app;