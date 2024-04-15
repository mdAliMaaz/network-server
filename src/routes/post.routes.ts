import express from "express";
import {
  createPost,
  getPost,
  updatePost,
  deletePost,
  getFeedPost,
  replyToPost,
} from "../controllers/post.controller";
import { verifyAccessToken } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/", verifyAccessToken, createPost);
router.get("/", verifyAccessToken, getFeedPost);
router.get("/:id", verifyAccessToken, getPost);
router.patch("/:id", verifyAccessToken, updatePost);
router.delete("/:id", verifyAccessToken, deletePost);
router.post("/reply/:id", verifyAccessToken, replyToPost);

export default router;
