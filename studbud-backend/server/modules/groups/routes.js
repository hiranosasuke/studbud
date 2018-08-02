import { Router } from "express";
import * as GroupController from "./controller";
import passport from "passport";

const routes = new Router();

routes.get("/groups/test", (req, res) => res.json({ msg: "Groups Works" }));

// @desc   Creates a new group
routes.post(
  "/groups/new",
  passport.authenticate("jwt", { session: false }),
  GroupController.createGroup
);

routes.post("/groups/addUser/:groupId/:userId", GroupController.addUser);

// @desc  Get all groups under user ID
routes.get(
  "/groups/:userId/all",
  passport.authenticate("jwt", { session: false }),
  GroupController.getAllUserGroups
);

// @desc  Get by group ID
routes.get(
  "/groups/:group_id",
  passport.authenticate("jwt", { session: false }),
  GroupController.getGroupByID
);

// @desc   Creates a new meetup with groupId
routes.post(
  "/groups/:groupId/meetups/new",
  passport.authenticate("jwt", { session: false }),
  GroupController.createGroupMeetup
);

// @desc   Gets all meetups with groupId
routes.get(
  "/groups/:groupId/meetups",
  //passport.authenticate("jwt", { session: false }),
  GroupController.getGroupMeetups
);

// @desc   Delete a group and its meetups
routes.delete(
  "/groups/:groupId",
  passport.authenticate("jwt", { session: false }),
  GroupController.deleteGroup
);

// @desc   Delete a meetup and remove it from group
routes.delete(
  "/groups/:groupId/:meetupId",
  passport.authenticate("jwt", { session: false }),
  GroupController.deleteMeetupFromGroup
);

// @desc   Search groups
/*routes.post(
  "/groups/search",
  //passport.authenticate("jwt", { session: false }),
  GroupController.searchGroups
);*/

routes.get("/groups/search/:search", GroupController.searchGroups);

export default routes;
