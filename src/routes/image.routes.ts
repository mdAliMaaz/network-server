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
console.log(req.user.profilePic);

if (req.user.profilePic.public_id) {
  await Cloudinary.delete(req.user.profilePic.public_id);
}

if (req.file?.path) {
  const { url, public_id } = await Cloudinary.uploadSingle(req.file?.path);

  const user = await User.findById(req.user._id);

  if (user) {
    user.profilePic = { url, public_id };
    await user.save();
    fs.unlinkSync(filePath);
  }
}

res.status(200).json(new CustomResponse(201, "Image Successfully uploaded"));
    } catch (error: any) {
      console.log("Uploading Error:", error.message);
    }
  }
);

router.post("/upload-many", (req, res) => {});

export default router;