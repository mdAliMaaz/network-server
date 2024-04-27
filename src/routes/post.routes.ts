import express from "express";
import {
  createPost,
  getPost,
  updatePost,
  deletePost,
  getFeedPost,
  replyToPost,
  likeAndUnLikePost,
  postByUserName,
} from "../controllers/post.controller";
import { verifyAccessToken } from "../middlewares/auth.middleware";
import multer from "multer";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/", verifyAccessToken, upload.single("postImg"), createPost);
router.get("/", verifyAccessToken, getFeedPost);
router.get("/:id", verifyAccessToken, getPost);
router.patch("/:id", verifyAccessToken, updatePost);
router.delete("/:id", verifyAccessToken, deletePost);
router.get("/user/:id", verifyAccessToken, postByUserName);
router.post("/reply/:id", verifyAccessToken, replyToPost);
router.post("/like/:id", verifyAccessToken, likeAndUnLikePost);

export default router;
