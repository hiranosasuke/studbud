const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    name: {
      type: String,
      required: true
    },
    lowerName: {
      type: String
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
    lowerTags: {
      type: [String]
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    ],
    meetups: [
      {
        type: Schema.Types.ObjectId,
        ref: "meetup"
      }
    ],
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "post"
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = Group = mongoose.model("group", GroupSchema);
