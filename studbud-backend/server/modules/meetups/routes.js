import { Router } from "express";
import * as MeetupController from "./controller";
import passport from "passport";

const routes = new Router();

// @desc   Creates a new meetup

routes.post(
  "/meetups/new",
  passport.authenticate("jwt", { session: false }),
  MeetupController.createMeetup
);

// @desc   Gets all meetups
routes.get(
  "/meetups",
  passport.authenticate("jwt", { session: false }),
  MeetupController.getAllMeetups
);

// @desc   Delete a meetup
routes.delete(
  "/meetups/:meetupId",
  passport.authenticate("jwt", { session: false }),
  MeetupController.deleteMeetup
);

export default routes;
