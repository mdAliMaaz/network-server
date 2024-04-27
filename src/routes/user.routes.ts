import express from "express";
import {
  followOrUnfollow,
  getProfile,
  getUserByName,
  logOut,
  postedBy,
  signIn,
  signUp,
  updateUser,
} from "../controllers/user.controller";
import { verifyAccessToken } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/:username", verifyAccessToken, getUserByName);
router.get("/profile", verifyAccessToken, getProfile);
router.get("/postedBy/:userId", verifyAccessToken, postedBy);
router.patch("/update", verifyAccessToken, updateUser);
router.post("/follow/:id", verifyAccessToken, followOrUnfollow);
router.post("/logout", verifyAccessToken, logOut);

export default router;
