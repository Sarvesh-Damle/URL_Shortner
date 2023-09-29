const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/url-shortner")
  .then(() => console.log("Mongodb connected!"))
  .catch((err) => console.log("Mongo error", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/", urlRoute);

app.listen(PORT, () =>
  console.log(`Server Started at https://localhost:${PORT}`)
);
