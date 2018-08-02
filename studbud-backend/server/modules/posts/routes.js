import { Router } from "express";

const routes = new Router();

routes.get("/posts/test", (req, res) => res.json({ msg: "Posts works! " }));

/*routes.post("/users/auth0", UserController.loginWithAuth0);
routes.post("/users/:userId/groups/new", GroupController.createGroupMeetup);
routes.get("/users/:userId/groups", GroupController.getGroupMeetups);*/

export default routes;
