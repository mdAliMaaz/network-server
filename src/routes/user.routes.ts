import express from "express";
import {
  followOrUnfollow,
  getProfile,
  logOut,
  signIn,
  signUp,
  updateUser,
} from "../controllers/user.controller";
import { verifyAccessToken } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/profile", verifyAccessToken, getProfile);
router.patch("/update", verifyAccessToken, updateUser);
router.post("/follow/:id", verifyAccessToken, followOrUnfollow);
router.post("/logout", verifyAccessToken, logOut);

export default router;
