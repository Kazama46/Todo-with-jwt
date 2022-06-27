const express = require("express");
const todoController = require("./controllers/todo");
const loginController = require("./controllers/login");
const mongoose = require("mongoose");
const mongourl = require("../dbConfig/mongoDbConfig");
const { isAuthorized } = require("./middleware/auth");
const app = express();

// conenction to mongodb
mongoose
  .connect(mongourl)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// mongodb
//   .on("error", console.error.bind(console, "MongoDB connection error:"))
//   .then(() => console.log("MongoDB Connected"));

// middlewares
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
// app.set("view engine", "ejs");

// routes
// app.use(require("./routes/index"));
app.use(express.json());
app.use("/", isAuthorized, todoController);
app.use("/login", loginController);

// server configurations....
app.listen(3000, () => console.log("Server started listening on port: 3000"));
