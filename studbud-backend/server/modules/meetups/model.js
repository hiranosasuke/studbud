const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("../users");
const Group = require("../groups");

const MeetupSchema = new Schema(
  {
    //change to name
    title: {
      type: String,
      required: true
      //maxLength: [25, 'Title must be at least 5 characters long']
    },
    description: {
      type: String
      //required: true,
      //maxLength: [256, 'Description must be at least 10 characters long']
    },
    //date
    eventDate: {
      type: Date
    },
    location: {
      type: String
      //required: true <--- UPDATE
    },
    group: {
      type: Schema.Types.ObjectId,
      ref: "Group",
      required: true
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  } /*{ timestamps: true }*/
);

module.exports = mongoose.model("Meetup", MeetupSchema);
