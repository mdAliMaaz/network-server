import express from "express";
import multer from "multer";
import fs from "fs";
import { Cloudinary } from "../utils/Cloudinay";
import User from "../models/user.model";
import { CustomResponse } from "../utils/Response";
import { verifyAccessToken } from "../middlewares/auth.middleware";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post(
  "/uploadSingle",
  verifyAccessToken,
  upload.single("profile"),
  async (req: any, res: any) => {
    const filePath = req.file?.path;
    try {
      if (req.user.profilePic.public_id) {
        await Cloudinary.delete(req.user.profilePic.public_id);
      }

      let user;

      if (req.file?.path) {
        const { url, public_id } = await Cloudinary.uploadSingle(
          req.file?.path
        );

        user = await User.findById(req.user._id);

        if (user) {
          user.profilePic = { url, public_id };
          await user.save();
          fs.unlinkSync(filePath);
        }
      }

      res
        .status(200)
        .json(new CustomResponse(201, "Image Successfully uploaded", "",user));
    } catch (error: any) {
      console.log("Uploading Error:", error.message);
    }
  }
);

router.post("/upload-post", async (req, res) => {
  const filePath = req.file?.path;
  try {
    if (filePath) {
      const { url, public_id } = await Cloudinary.uploadPostImage(filePath);
    }
  } catch (error: any) {
    console.log("Errowhile uploading post image", error.message);
  }
});

export default router;
