import express from "express";
import {
  deleteUser,
  getProfile,
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
router.delete("/delete", verifyAccessToken, deleteUser);

export default router;
