import express from "express";
import {
  deleteUser,
  getProfile,
  getUsers,
  signIn,
  signUp,
  updateUser,
} from "../controllers/user.controller";

const router = express.Router();

router.get("/", getUsers);
router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/profile", getProfile);
router.patch("/update", updateUser);
router.delete("/delete", deleteUser);

export default router;
