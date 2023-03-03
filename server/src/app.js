const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes");
const session = require("express-session");
const errorMiddleware = require("./middlewares/errorMiddleware");

const isProduction = process.env.NODE_ENV === "production";

app.use(cors({
  credentials: true,
  origin: ["http://192.168.100.6:3000"],
}));

app.use(session({ 
  secret: "cat", 
  resave: false, 
  cookie: {secure: false},
  saveUninitialized: false 
}));

app.use(express.json());
app.use(routes);
app.use(errorMiddleware);

module.exports = app;