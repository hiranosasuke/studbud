const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
import middlewaresConfig from "./config/middleware";

const app = express();
middlewaresConfig(app);

const {
  MeetupRoutes,
  GroupRoutes,
  UserRoutes,
  PostRoutes,
  ProfileRoutes
} = require("./modules");

/**
 * Database
 */
//dbConfig();

/**
 * Middlewares
 */

// DB Config
const db = require("./config/keys").mongoURI;
mongoose.Promise = global.Promise;

// connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/app", [
  MeetupRoutes,
  GroupRoutes,
  UserRoutes,
  PostRoutes,
  ProfileRoutes
]);

//const PORT = process.env.PORT || 3000;
const PORT = process.env.PORT || 5000;

app.listen(PORT, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Server running on port: ${PORT}`);
  }
});
