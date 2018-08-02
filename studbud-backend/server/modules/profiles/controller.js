import Profile from "./model";
import User from "../users/model";
const keys = require("../../config/db");

export const getProfile = async (req, res) => {
  Profile.findOne({ user: req.user.id })
    .populate({ model: "User", path: "user", select: "name avatar" })
    .then(profile => {
      if (!profile) {
        return res.status(404).json({ error: "Profile does not exist!" });
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
};

export const getProfileByHandle = async (req, res) => {
  Profile.findOne({ handle: req.params.handle })
    .populate({ model: "User", path: "user", select: "name avatar" })
    .then(profile => {
      if (!profile) {
        return res.status(404).json({ error: "Profile does not exist!" });
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
};

export const getProfileByID = async (req, res) => {
  Profile.findOne({ user: req.params.user_id })
    .populate({ model: "User", path: "user", select: "name avatar" })
    .then(profile => {
      if (!profile) {
        return res.status(404).json({ error: "Profile does not exist!" });
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
};

export const getAllProfiles = async (req, res) => {
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

export const createProfile = async (req, res) => {
  if (!req.body.handle) {
    return res
      .status(400)
      .json({ error: true, message: "Handle must be provided!" });
  }
  if (!req.body.status) {
    return res
      .status(400)
      .json({ error: true, message: "Status must be provided!" });
  }
  if (!req.body.skills) {
    return res
      .status(400)
      .json({ error: true, message: "Skills must be provided!" });
  }

  const profileFields = {};
  profileFields.user = req.user.id;
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.githubusername)
    profileFields.githubusername = req.body.githubusername;

  // Skills, split into array
  if (typeof req.body.skills !== "undefined") {
    profileFields.skills = req.body.skills.split(",");
  }

  profileFields.social = {};
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

  Profile.findOne({ user: req.user.id }).then(profile => {
    if (profile) {
      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      ).then(profile => res.json(profile));
    } else {
      // If profile doesn't exist, create it
      // Make sure the handle doesn't already exist
      Profile.findOne({ handle: profileFields.handle }).then(profile => {
        if (profile) {
          return res.status(400).json({ error: "Handle already exists!" });
        }

        new Profile(profileFields).save().then(profile => res.json(profile));
      });
    }
  });
};
