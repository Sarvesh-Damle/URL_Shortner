require("dotenv").config();
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");

const app = express();
const PORT = process.env.PORT || 8001;

// Security and CORS middleware
app.use(helmet());
app.use(cors());

connectToMongoDB(process.env.MONGODB_URI)
  .then(() => console.log("Mongodb connected!"))
  .catch((err) => console.log("Mongo error", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Make BASE_URL available to all views
app.locals.baseUrl = process.env.BASE_URL || `http://localhost:${PORT}`;

app.use("/", urlRoute);

if (require.main === module) {
  app.listen(PORT, () =>
    console.log(`Server Started at http://localhost:${PORT}`)
  );
}

module.exports = app;
