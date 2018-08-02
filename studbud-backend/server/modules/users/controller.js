import User from "./model";
var gravatar = require("gravatar");
var bcrypt = require("bcryptjs");
import jwt from "jsonwebtoken";
const keys = require("../../config/db");
import { Group } from "../groups";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ error: true, message: "Name must be provided!" });
  } else if (typeof name !== "string") {
    return res
      .status(400)
      .json({ error: true, message: "Name must be a string!" });
  } else if (name.length > 32) {
    return res.status(400).json({ error: true, message: "Name too long!" });
  }

  if (!email) {
    return res
      .status(400)
      .json({ error: true, message: "Email must be provided!" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Email must be provided!" });
  } else if (password.length < 5) {
    return res
      .status(400)
      .json({ error: true, message: "Password too short!" });
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Search user by email
  User.findOne({ email: email }).then(user => {
    // If user doesn't exist return error
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    }

    // Validate password
    bcrypt.compare(password, user.password).then(isCorrect => {
      if (isCorrect) {
        // Create JWT payload, user._id
        const payload = { id: user._id, name: user.name, avatar: user.avatar };

        // Create JWT token
        jwt.sign(
          payload,
          keys.JWT_SECRET,
          { expiresIn: "30 days" },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(400).json({ password: "Incorrect password" });
      }
    });
  });
};

export const currentUser = async (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    groups: req.user.groups
  });
};

export const getUserById = async (req, res) => {
  User.findOne({ _id: req.params.userId })
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: "User does not exist!" });
      }
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        groups: user.groups,
        avatar: user.avatar
      });
    })
    .catch(err => res.status(404).json(err));
};

// Greate a group contained within a user
export const createUserGroup = async (req, res) => {
  const { name, description, location } = req.body;
  const { userId } = req.params;
  console.log(userId);
  const owner = userId;

  if (!name) {
    return res
      .status(400)
      .json({ error: true, message: "name must be provided!" });
  } else if (typeof name !== "string") {
    return res
      .status(400)
      .json({ error: true, message: "name must be a string!" });
  } else if (name.length < 5) {
    return res
      .status(400)
      .json({ error: true, message: "name must be 5 characters long!" });
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

  if (!location) {
    return res
      .status(400)
      .json({ error: true, message: "Location must be provided!" });
  } else if (typeof location !== "string") {
    return res
      .status(400)
      .json({ error: true, message: "Location must be a string!" });
  } else if (location.length > 40) {
    return res.status(400).json({
      error: true,
      message: "Location too long!"
    });
  }

  if (!userId) {
    return res
      .status(400)
      .json({ error: true, message: "User ID must be provided" });
  }

  const groupId = req.body._id;
  const groupFields = {};
  groupFields.owner = userId;
  if (req.body.name) groupFields.name = req.body.name;
  groupFields.lowerName = String(groupFields.name).toLowerCase();
  if (req.body.description) groupFields.description = req.body.description;
  if (req.body.location) groupFields.location = req.body.location;
  groupFields.users = [];
  groupFields.users.push(userId);
  // Skills, split into array
  if (typeof req.body.tags !== "undefined") {
    groupFields.tags = req.body.tags.split(",");
  }
  groupFields.lowerTags = String(groupFields.tags)
    .toLowerCase()
    .split(",");

  /*if (groupId != null) {
    Group.findOneAndUpdate(
      { _id: groupId },
      { $set: groupFields },
      { new: true }
    )
      .then(group => res.json(group))
      .catch(group => res.json({ msg: "Group not found" }));
  } else {*/

  const group = new Group(groupFields);
  await User.findByIdAndUpdate(userId, { $push: { groups: group.id } });

  try {
    return res.status(201).json({ group: await group.save() });
  } catch (e) {
    return res
      .status(400)
      .json({ error: true, message: "Group cannot be created!" });
  }
};
