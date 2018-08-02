const bodyParser = require("body-parser");
const morgan = require("morgan");
const passport = require("passport");

export default app => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(morgan("dev"));
  app.use(passport.initialize());
};
