const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const api = require("./routes/api.js");
const app = express();
require("dotenv/config");
const ClientService = require("./services/client.services");
const ClientModel = require("./models/ClientModel");

const PORT = process.env.PORT || 8100;
const URI = process.env.ATLAS_URI;

mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established!");
  mongoose.connection.db.collection("clients").countDocuments((err, count) => {
    if (count == 0 || count === null) {
      console.log("count of collection is empty");
      ClientService.saveInitialClients();
    } else if (count > 0) {
      console.log("collection is not empty", count);
    }
    if (err) {
      console.log("err when counting collection ", err);
    }
  });
});

app.use(cors());
/* app.use(express.static("public"));
app.use(express.static("node_modules")); */
app.use(bodyParser.json());
/* app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );

  next();
}); */

app.use("/", api);

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
