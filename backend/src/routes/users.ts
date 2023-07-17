import express from "express";
const router = express.Router();
import * as UsersController from "../controllers/users";

router.get("/", UsersController.getAuthUser);
router.post("/signup", UsersController.signUp);
router.post("/login", UsersController.login);
router.post("/logout", UsersController.logout);

export default router;
