import { Router } from "express";
import * as ProfileController from "./controller";
import passport from "passport";

const routes = new Router();

// @desc    Testerooni
routes.get("/profiles/test", (req, res) =>
  res.json({ msg: "Profiles works! " })
);

// @desc    Get current
routes.get(
  "/profiles/",
  passport.authenticate("jwt", { session: false }),
  ProfileController.getProfile
);

// @desc    Get current
routes.get(
  "/profiles/",
  passport.authenticate("jwt", { session: false }),
  ProfileController.getProfile
);

// @desc  Get by handle
routes.get(
  "/profiles/handle/:handle",
  passport.authenticate("jwt", { session: false }),
  ProfileController.getProfileByHandle
);

// @desc  Get by user ID
routes.get(
  "/profiles/user/:user_id",
  passport.authenticate("jwt", { session: false }),
  ProfileController.getProfileByID
);

// @desc  Get all profiles
routes.get(
  "/profiles/all",
  passport.authenticate("jwt", { session: false }),
  ProfileController.getAllProfiles
);

// @desc    Create/edit profile
routes.post(
  "/profiles/",
  passport.authenticate("jwt", { session: false }),
  ProfileController.createProfile
);

export default routes;
