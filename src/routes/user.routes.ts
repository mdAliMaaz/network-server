import express from "express";
import {
  followOrUnfollow,
  getProfile,
  getUserById,
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
router.get("/profile", verifyAccessToken, getProfile);
router.get("/:username", verifyAccessToken, getUserByName);
router.get("/:id", verifyAccessToken, getUserById);
router.post("/signup", signUp);
router.post("/signin", signIn);
router.patch("/update", verifyAccessToken, updateUser);
router.get("/postedBy/:userId", verifyAccessToken, postedBy);
router.post("/follow/:id", verifyAccessToken, followOrUnfollow);
router.post("/logout", verifyAccessToken, logOut);

export default router;
