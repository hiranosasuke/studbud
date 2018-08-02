const mongoose = require("mongoose");

/*export default () => {
  mongoURI: "mongodb://katertots:katertots1@ds253821.mlab.com:53821/studbudtest";
  mongoose.Promise = global.Promise;
  //mongoose.connect('mongodb://localhost/StudBud');
  mongoose.connect(
    "mongodb://katertots:katertots1@ds253821.mlab.com:53821/studbudtest"
  );
  mongoose.connection
    .once("open", () => console.log("Mongodb running"))
    .on("error", err => console.error(err));
};*/

module.exports = {
  mongoURI:
    "mongodb://katertots:katertots1@ds253821.mlab.com:53821/studbudtest",
  //mongoURI: "mongodb://kate:a191919@ds127771.mlab.com:27771/devconnector",
  //"mongodb://ot:1234ot@ds127771.mlab.com:27771/devconnector",
  JWT_SECRET: "secret"
};
