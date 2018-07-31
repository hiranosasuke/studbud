const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Import models
const Group = require("../../models/Group");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Meetup = require("../../models/Meetup");

//Validation
const validateGroupInput = require("../../validation/group");

// @route   GET api/groups/test
// @desc    Tests group route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Groups Works" }));

// POST api/groups
//Create/Edit Group
// YOU MUST PASS IN ID WITH REQ object AS "_id" !!!!!! ******* !!!!!!
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
    groupFields.lowerName = String(groupFields.name).toLowerCase();
    if (req.body.description) groupFields.description = req.body.description;
    if (req.body.location) groupFields.location = req.body.location;
    if (req.body.tags) groupFields.tags = req.body.tags.split(",");
    groupFields.lowerTags = String(groupFields.tags)
      .toLowerCase()
      .split(",");
    if (req.body.meetups) groupFields.meetups = req.body.meetups;
    if (req.body.users) groupFields.users = req.body.users;
    groupFields.owner = req.body.owner;

    //Check to see if group id was passed in
    if (id != null) {
      Group.findOneAndUpdate({ _id: id }, { $set: groupFields }, { new: true })
        .then(group => res.json(group))
        .catch(group => res.json({ msg: "Group Not Found" }));
    } else {
      new Group(groupFields).save().then(group => res.json(group));
      //return res.status(404).json({ msg: "not the right id" });
    }
  }
);

// Delete Group
// api/groups
// YOU MUST PASS IN ID WITH REQ object AS "_id" !!!!!! ******* !!!!!!
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Group.findOneAndRemove({ _id: req.params.id })
      .then(() => res.json(res.body))
      .catch(() => res.json({ msg: "Group Not Found" }));
  }
);

// Get Group by search
// api/groups/search/:search
router.get("/search/:search", (req, res) => {
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
});

//Get Group by id
// api/groups/id/:id
router.get("/id/:id", (req, res) => {
  Group.findById(req.params.id)
    .populate("users")
    .populate("meetups")
    .populate("posts")
    .then(group => res.json(group))
    .catch(err => res.status(404).json({ msg: err }));
});

// Get All Group
// api/groups/all
router.get("/all", (req, res) => {
  const errors = {};

  Group.find()
    .limit(6)
    .then(groups => {
      if (!groups) {
        errors.nogroups = "There are no groupss";
        return res.status(404).json(errors);
      }

      res.json(groups);
    })
    .catch(err => res.status(404).json({ profile: "There are no groups" }));
});

//Get by User
router.get("/user/:user", (req, res) => {
  Group.find({ owner: req.params.user })
    .then(groups => {
      if (!groups) {
        return res.status(404).json({ msg: "No Groups found" });
      }
      res.json(groups);
    })
    .catch(err => res.status(404).json({ profile: "There are no groups" }));
});

//Add User
//addUserIDtoGroup
router.post("/addUser", (req, res) => {
  Profile.findOne({ handle: req.body.handle })
    .then(profile => {
      Group.findById(req.body.group_id).then(group => {
        if (group.users.includes(profile.user)) {
        } else {
          group.users.unshift(profile.user);
          group.save().then(group => res.json(group));
        }
      });
    })
    .catch(profile => res.status(404).json(profile));
});

router.post("/removeUser", (req, res) => {
  Group.findById(req.body.group_id)
    .then(group => {
      group.users.splice(group.users.indexOf(req.body.userId), 1);
      group.save().then(group => res.json(group));
    })
    .catch(group => res.json({ msg: "User Not Deleted" }));
});

router.post("/removeMeetup", (req, res) => {
  Group.findById(req.body.group_id)
    .then(group => {
      group.meetups.splice(group.meetups.indexOf(req.body.meetupId), 1);
      group.save().then(group => {
        res.json(group);
      });
    })
    .catch(group => res.json({ msg: "Meetup Not Deleted" }));
});

//Add Meetup
router.post(
  "/addMeetup",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    /*const { errors, isValid } = validateMeetupInput(req.body);

    //Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }*/

    // load all data from form into groupFields element
    const meetupFields = {};

    // put meetup id into variable.
    if (req.body._id === "") {
      id = null;
    } else {
      id = req.body._id;
    }

    if (req.body.title) meetupFields.title = req.body.title;
    if (req.body.description) meetupFields.description = req.body.description;
    if (req.body.location) meetupFields.location = req.body.location;
    if (req.body.eventDate) meetupFields.eventDate = req.body.eventDate;
    meetupFields.group = req.body.gr_id;
    users = [];

    //Check to see if group id was passed in
    if (id != null) {
      Meetup.findOneAndUpdate(
        { _id: id },
        { $set: meetupFields },
        { new: true }
      )
        .then(meetup => res.json(meetup._id))
        .catch(resp => res.json({ msg: "Group Not Found" }));
    } else {
      new Meetup(meetupFields)
        .save()
        .then(meetup => {
          Group.findById(req.body.gr_id).then(group => {
            group.meetups.unshift(meetup._id);
            group.save().then(group => res.json(group));
          });
        })
        .catch(meetup => res.json(meetup));
    }
  }
);

//addMeetupIDtoGroup
router.post("/addMeetupID", (req, res) => {
  Group.findById(req.body.group_id).then(group => {
    Meetup.findOne()
      .then(meetup => {
        group.meetups.unshift(meetup._id);
        group.save().then(group => res.json(group));
        res.json(group);
      })
      .catch(group => res.json(group));
  });
});

router.post("/similarityScore", (req, res) => {
  var p1 = [];
  var p2 = [];
  var total;
  var id;
  Group.find().then(groups => {
    total = groups.length;
  });
  Group.find({ users: { $all: [req.body.p1_id] } })
    .then(groups => {
      groups.forEach(group => {
        id = group._id;
        name = group.name;
        p1.push(id);
      });
    })
    .then(
      Group.find({ users: { $all: [req.body.p2_id] } }).then(groups => {
        groups.forEach(group => {
          id = group._id;
          name = group.name;
          p2.push(id);
        });
        res.json({
          p1: p1,
          p2: p2,
          total: total
        });
      })
    );
});

module.exports = router;
