import Meetup from "./model";

export const createMeetup = async (req, res) => {
  //const { name, description, location } = req.body;

  if (!req.body.title) {
    return res
      .status(400)
      .json({ error: true, message: "title must be provided!" });
  } else if (typeof req.body.title !== "string") {
    return res
      .status(400)
      .json({ error: true, message: "title must be a string!" });
  } else if (req.body.title.length > 32) {
    return res.status(400).json({ error: true, message: "title too long!" });
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

  const meetupFields = {};
  if (req.body.title) meetupFields.title = req.body.title;
  if (req.body.description) meetupFields.description = req.body.description;
  if (req.body.eventDate) meetupFields.eventDate = req.body.eventDate;

  meetupFields.group = req.body.group;

  const newMeetup = new Meetup(meetupFields);
  console.log(newMeetup);

  try {
    return res.status(201).json({
      meetup: await newMeetup.save()
    });
  } catch (e) {
    return res
      .status(400)
      .json({ error: true, message: "Error creating meetup" });
  }
};

// add user to group
export const addUser = async (req, res) => {
  const { userId, groupId } = req.params;

  const user = await User.findById(userId);
  const group = await Group.findById(groupId);

  if (group.users.includes(user)) {
    return res
      .status(400)
      .json({ error: true, message: "User already in group!" });
  }

  try {
    return res.status(200).json({
      error: false,
      group: Group.findByIdAndUpdate(groupId, { $push: { users: user.id } }),
      user: User.findByIdAndUpdate(userId, { $push: { groups: group.id } })
    });
  } catch (e) {
    return res.status(400).json({ error: true, message: "Cannot add user" });
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

  const groupFields = {};
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

export const getAllMeetups = async (req, res) => {
  try {
    return res.status(200).json({ meetups: await Meetup.find({}) });
  } catch (e) {
    return res
      .status(e.status)
      .json({ error: true, message: "Error with Meetup" });
  }
};

export const deleteMeetup = async (req, res) => {
  const { meetupId } = req.params;

  Meetup.findOneAndRemove({ _id: meetupId }).then(() =>
    res.json({ success: true })
  );
};
