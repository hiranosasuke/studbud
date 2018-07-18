const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: true
  },
  users: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  meetups: [
    {
      meetup: {
        type: Schema.Types.ObjectId,
        ref: "meetup"
      }
    }
  ]
});

module.exports = Group = mongoose.model("group", GroupSchema);
