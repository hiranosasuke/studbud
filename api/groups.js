const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Import models
const Group = require("../../models/Group");
const Profile = require("../../models/Profile");

//Validation
const validateGroupInput = require("../../validation/group");

// @route   GET api/groups/test
// @desc    Tests group route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Groups Works" }));

//Create/Edit Group

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateGroupInput(req.body);

    //Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // load all data from form into groupFields element
    const groupFields = {};
    // load user and owner of group.
    groupFields.owner = req.user.id;

    if (req.body.name) groupFields.name = req.body.name;
    if (req.body.description) groupFields.description = req.body.description;
    if (req.body.location) groupFields.location = req.body.location;
    if (req.body.tags) groupFields.tags = req.body.tags.split(",");
    if (!(req.body.meetups == ""))
      groupFields.meetups = req.body.meetups.split(",");
    if (!(req.body.users == "")) groupFields.users = req.body.users.split(",");

    //Check to see if group id was passed in
    if (req.group != null) {
      //update existing group
    } else {
      new Group(groupFields).save().then(group => res.json(group));
    }
  }
);
// Edit Group

// Delete Group

// Get Group

// Get All Group

module.exports = router;
