import Group from "./model";
import { Meetup } from "../meetups";
import { User } from "../users";

export const createGroup = async (req, res) => {
  //const { name, description, location } = req.body;

  if (!req.body.name) {
    return res
      .status(400)
      .json({ error: true, message: "Name must be provided!" });
  } else if (typeof req.body.name !== "string") {
    return res
      .status(400)
      .json({ error: true, message: "Name must be a string!" });
  } else if (req.body.name.length > 32) {
    return res.status(400).json({ error: true, message: "Name too long!" });
  }

  if (!req.body.description) {
    return res
      .status(400)
      .json({ error: true, message: "Description must be provided!" });
  } else if (typeof req.body.description !== "string") {
    return res
      .status(400)
      .json({ error: true, message: "Description must be a string!" });
  } else if (req.body.description.length > 256) {
    return res.status(400).json({
      error: true,
      message: "Description must be 10 characters long!"
    });
  }

  const groupFields = {};
  if (req.body.name) groupFields.name = req.body.name;
  if (req.body.description) groupFields.description = req.body.description;
  if (req.body.location) groupFields.location = req.body.location;

  // Skills, split into array
  if (typeof req.body.tags !== "undefined") {
    groupFields.tags = req.body.tags.split(",");
  }

  const newGroup = new Group(groupFields);

  try {
    return res.status(201).json({ group: await newGroup.save() });
  } catch (e) {
    return res
      .status(400)
      .json({ error: true, message: "Error creating Group" });
  }
};

// add user to group
export const addUser = async (req, res) => {
  const { userId, groupId } = req.params;

  const user = await User.findById(userId);
  const group = await Group.findById(groupId);

  console.log(user._id);
  console.log(user.groups.indexOf(group._id) > -1);

  if (user.groups.indexOf(group._id) > -1) {
    return res
      .status(400)
      .json({ error: true, message: "User already in group!" });
  } else {
    try {
      return res.status(200).json({
        error: false,
        group: await Group.findByIdAndUpdate(groupId, {
          $push: { users: user._id }
        }),
        user: await User.findByIdAndUpdate(userId, {
          $push: { groups: group._id }
        })
      });
    } catch (e) {
      return res.status(400).json({ error: true, message: "Cannot add user" });
    }
  }
};

// Greate a meetup contained within a group
export const createGroupMeetup = async (req, res) => {
  const { title, description, eventDate } = req.body;
  const { groupId } = req.params;

  if (!title) {
    return res
      .status(400)
      .json({ error: true, message: "Title must be provided!" });
  } else if (typeof title !== "string") {
    return res
      .status(400)
      .json({ error: true, message: "Title must be a string!" });
  } else if (title.length < 5) {
    return res
      .status(400)
      .json({ error: true, message: "Title must be 5 characters long!" });
  }

  if (!description) {
    return res
      .status(400)
      .json({ error: true, message: "Description must be provided!" });
  } else if (typeof description !== "string") {
    return res
      .status(400)
      .json({ error: true, message: "Description must be a string!" });
  } else if (description.length > 256) {
    return res.status(400).json({
      error: true,
      message: "Description too long!"
    });
  }

  if (!groupId) {
    return res
      .status(400)
      .json({ error: true, message: "Group ID must be provided" });
  }

  const meetupFields = {};
  meetupFields.group = groupId;
  meetupFields.title = title;
  meetupFields.description = description;
  meetupFields.eventDate = eventDate;

  const meetup = new Meetup(meetupFields);
  await Group.findByIdAndUpdate(groupId, { $push: { meetups: meetup.id } });

  try {
    return res.status(201).json({ meetup: await meetup.save() });
  } catch (e) {
    return res
      .status(400)
      .json({ error: true, message: "Meetup cannot be created!" });
  }

  /*try {
    const { meetup } = await Group.addMeetup(groupId, {
      title,
      description,
      eventDate
    });

    return res.status(201).json({ error: false, meetup });
  } catch (e) {
    return res
      .status(400)
      .json({ error: true, message: "Meetup cannot be created!" });
  }*/
};

// When we want to get all the meetups contained in a group
export const getGroupMeetups = async (req, res) => {
  const { groupId } = req.params;

  if (!groupId) {
    return res
      .status(400)
      .json({ error: true, message: "Group ID must be provided!" });
  }

  // Search to see if group exists
  const group = await Group.findById(groupId);

  // If no group has the ID provided
  if (!group) {
    return res
      .status(400)
      .json({ error: true, message: "Group does not exist." });
  }

  // If group ID exists, try to return meetups
  try {
    return res.status(200).json({
      error: false,
      meetups: await Meetup.find({ group: groupId }).populate("group", "name")
    });
  } catch (e) {
    return res
      .status(400)
      .json({ error: true, message: "Cannot fetch meetup" });
  }
};

/*export const getAllGroups = async (req, res) => {
  Profile.find()
    .populate({ model: "User", path: "user", select: "name avatar" })
    .then(profile => {
      if (!profile) {
        return res.status(404).json({ error: "There are no profiles!" });
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
};
*/

// Get all groups under user
export const getAllUserGroups = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res
      .status(400)
      .json({ error: true, message: "User ID must be provided!" });
  }

  // Search to see if user exists
  const user = await User.findById(userId);

  // If no user has the ID provided
  if (!user) {
    return res
      .status(400)
      .json({ error: true, message: "User does not exist." });
  }

  // If user ID exists, try to return groups
  try {
    return res.status(200).json({
      error: false,
      groups: await Group.find({ _id: { $in: user.groups } })
    });
  } catch (e) {
    return res
      .status(400)
      .json({ error: true, message: "Cannot fetch groups" });
  }

  /*Group.find({ user: userId })
    .then(groups => {
      res.json(groups);
    })
    .catch(err => res.status(404).json(err));*/

  try {
    return res.status(200).json({ groups: await Group.find({ user: userId }) });
  } catch (e) {
    return res
      .status(e.status)
      .json({ error: true, message: "Error with Groups" });
  }
};

export const getGroupByID = async (req, res) => {
  Group.findOne({ _id: req.params.group_id })
    .then(group => {
      if (!group) {
        return res.status(404).json({ error: "Group does not exist!" });
      }
      res.json(group);
    })
    .catch(err => res.status(404).json(err));
};

export const deleteGroup = async (req, res) => {
  const { groupId } = req.params;
  /*meetup = await Meetup.findOne({ group: req.group.id });

  while (meetup) {
    Meetup.findOneAndRemove({ group: req.group.id });
    meetup = await Meetup.findOne({ group: req.group.id });
  }
  Group.findOneAndRemove({ _id: req.group.id })
    .then(() => res.json({ success: true }))
    .catch(err => res.status(404).json(err));*/

  Meetup.remove({ group: groupId }).then(() => {
    Group.findOneAndRemove({ _id: groupId }).then(() =>
      res.json({ success: true })
    );
  });
};

export const deleteMeetupFromGroup = async (req, res) => {
  const { meetupId } = req.params;
  const { groupId } = req.params;

  Group.findOneAndUpdate(
    { _id: groupId },
    { $pull: { meetups: meetupId } }
  ).then(group => res.json(group));

  /*Meetup.findOne({ _id: meetupId })
    .then(meetup => {
      if (meetup) {
        Group.findOneAndUpdate(
          { _id: meetup.group },
          { $pull: { meetups: meetupId } }
        )
          .then(() =>
            Meetup.findOneAndRemove({ _id: meetupId }).then(() =>
              res
                .json({ success: true })
                .catch(err => res.status(404).json(err))
            )
          )
          .catch(err => res.status(404).json(err));
      }
    })
    .catch(err => res.status(404).json(err));*/
};

export const searchGroups = async (req, res) => {
  /*const { searchterm } = req.body;

  Group.find(
    // Find documents matching any of these values
    {
      $or: [
        { tags: { $in: ["dog", "cat", "to", "i"] } },
        { name: { $in: ["space", "Space", "og"] } }
      ]
    }
  ).then(groups => {
    res.json(groups);
  });*/

  /*Group.collection.ensureIndex({ name: "text", tags: "text" });
  Group.records.runCommand("text", { search: "space" })
  });*/

  var val = ".*" + String(req.params.search).toLowerCase() + ".*";
  Group.find({ lowerName: new RegExp(val) })
    .then(group => {
      if (group.length > 0) {
        res.json(group);
      } else {
        var array = String(req.params.search).toLowerCase();
        array = String(array).split(",");
        Group.find({ lowerTags: { $in: array } })
          .then(group => {
            if (group.length > 0) {
              res.json(group);
            } else {
              res.status(404).json({ err: "No Results" });
            }
          })
          .catch(err => res.status(404).json({ msg: "Not Found" }));
      }
    })
    .catch(err => res.status(404).json({ msg: req.params.search }));
};
