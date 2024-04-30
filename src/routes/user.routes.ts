import express from "express";
import {
  followOrUnfollow,
  getProfile,
  getUserByName,
  getUsers,
  logOut,
  postedBy,
  signIn,
  signUp,
  updateUser,
} from "../controllers/user.controller";
import { verifyAccessToken } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", verifyAccessToken, getUsers);
router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/profile", verifyAccessToken, getProfile);
router.patch("/update", verifyAccessToken, updateUser);
router.get("/postedBy/:userId", verifyAccessToken, postedBy);
router.post("/follow/:id", verifyAccessToken, followOrUnfollow);
router.post("/logout", verifyAccessToken, logOut);
router.get("/:username", verifyAccessToken, getUserByName);

export default router;
