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
    // put group id into variable.
    id = req.body._id;

    if (req.body.name) groupFields.name = req.body.name;
    if (req.body.description) groupFields.description = req.body.description;
    if (req.body.location) groupFields.location = req.body.location;
    if (req.body.tags) groupFields.tags = req.body.tags.split(",");
    if (!(req.body.meetups == ""))
      groupFields.meetups = req.body.meetups.split(",");
    if (!(req.body.users == "")) groupFields.users = req.body.users.split(",");

    //Check to see if group id was passed in
    if (id != null) {
      Group.findOneAndUpdate(
        { _id: id },
        { $set: groupFields },
        { new: true }
      ).then(group => res.json(group));
    } else {
      new Group(groupFields).save().then(group => res.json(group));
      //return res.status(404).json({ msg: "not the right id" });
    }
  }
);
// Edit Group

// Delete Group

// Get Group

// Get All Group

module.exports = router;
