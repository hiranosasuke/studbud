const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Meetup = require("../meetups");

const GroupSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    name: {
      type: String,
      required: true
      //unique: true,
      //maxLength: [32, 'Name must be at least 5 characters long']
    },
    lowerName: {
      type: String
    },
    description: {
      type: String,
      required: true
      //maxLength: [256, 'Description must be at least 10 characters long']
    },
    /*category: {
    type: String
  },*/
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
        ref: "Users"
      }
    ],
    meetups: [
      {
        type: Schema.Types.ObjectId,
        ref: "Meetup"
      }
    ]
  },
  { timestamps: true }
);

// Create a meetup and add it to the meetups array in the group
GroupSchema.statics.addMeetup = async function(id, args) {
  //const Meetup = mongoose.model("Meetup");

  // Add the group ID to the meetup group element
  // Keeps track of which group created the meetup
  const meetup = await new Meetup({ args, group: id });

  // Find group with the given ID
  // Push the meetup id in the meetups element
  await this.findByIdAndUpdate(id, { $push: { meetups: meetup.id } }).catch(
    err => res.status(404).json(err)
  );

  return {
    meetup: await meetup.save()
  };
};

module.exports = mongoose.model("Group", GroupSchema);
