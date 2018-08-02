const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//IMPORT MODELS
const Group = require("../../models/Group");
const Profile = require("../../models/Profile");
const Meetup = require("../../models/Meetup");

//Validtion
const validateMeetupInput = require("../../validation/meetup");

//TEst function
router.get("/test", (req, res) => res.json({ msg: "Meetups Works" }));

module.exports = router;
