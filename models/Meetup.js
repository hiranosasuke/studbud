const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MeetupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: "group",
    required: true
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "users"
    }
  ]
  //Name, Date, location, Group, users
});

module.exports = Meetup = mongoose.model("meetup", MeetupSchema);