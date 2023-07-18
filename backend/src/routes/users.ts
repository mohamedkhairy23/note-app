import express from "express";
const router = express.Router();
import * as UsersController from "../controllers/users";
import { requiresAuth } from "../../middleware/auth";

router.get("/", requiresAuth, UsersController.getAuthUser);
router.post("/signup", UsersController.signUp);
router.post("/login", UsersController.login);
router.post("/logout", UsersController.logout);

export default router;
