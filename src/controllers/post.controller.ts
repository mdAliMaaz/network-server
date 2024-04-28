import { NextFunction } from "express";
import Post from "../models/post.model";
import { CustomResponse } from "../utils/Response";
import User from "../models/user.model";
import { Cloudinary } from "../utils/Cloudinay";
import fs from "fs";

export async function createPost(req: any, res: any, next: NextFunction) {
  try {
    const filePath = req.file?.path;

    if (filePath) {
      const { public_id, url } = await Cloudinary.uploadPostImage(filePath);
      req.body.image = { public_id, url };
      fs.unlinkSync(filePath);
    }

    const newPost = await Post.create({ postedBy: req.user._id, ...req.body });

    if (newPost) {
      res
        .status(201)
        .json(
          new CustomResponse(201, "new post created successfully", "", newPost)
        );
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

export async function getPost(req: any, res: any, next: NextFunction) {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      res.status(200).json(new CustomResponse(200, "OK", "", post));
    } else {
      res.status(400).json(new CustomResponse(400, "", "post not found"));
    }
  } catch (error) {
    next(error);
  }
}

export async function updatePost(req: any, res: any, next: NextFunction) {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
      ...req.body,
    });

    if (updatedPost) {
      res
        .status(200)
        .json(
          new CustomResponse(200, "post updated successfully", "", updatedPost)
        );
    } else {
      res.status(400).json(new CustomResponse(400, "", "post not found"));
    }
  } catch (error) {
    next(error);
  }
}

export async function deletePost(req: any, res: any, next: NextFunction) {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (deletedPost) {
      res.status(203).json(new CustomResponse(203, "post deleted"));
    } else {
      res.status(404).json(new CustomResponse(404, "", "post not found"));
    }
  } catch (error) {
    next(error);
  }
}

export async function getFeedPost(req: any, res: any, next: NextFunction) {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      res
        .status(404)
        .json(new CustomResponse(404, "", "user not found login please"));
    }

    const feedPost = await Post.find({
      postedBy: { $in: user?.following },
    });

    const currentUserPost = await Post.find({ postedBy: req.user._id }).sort({
      createdAt: -1,
    });

    const result = [...feedPost, ...currentUserPost].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();

      if (isNaN(dateA) || isNaN(dateB)) {
        return 0;
      }

      return dateB - dateA;
    });

    res.status(200).json(new CustomResponse(200, "feed post", "", result));
  } catch (error) {
    next(error);
  }
}

export async function likeAndUnLikePost(
  req: any,
  res: any,
  next: NextFunction
) {
  try {
    const post = await Post.findById(req.params.id);

    if (post) {
      const alreadyLiked = post.likes.includes(req.user._id);

      if (!alreadyLiked) {
        const updaetdPost = await Post.findByIdAndUpdate(req.params.id, {
          $push: { likes: req.user._id },
        });
        res.status(200).json(new CustomResponse(200, "you liked the post"));
      } else {
        const updaetdPost = await Post.findByIdAndUpdate(req.params.id, {
          $pull: { likes: req.user._id },
        });
        res.status(200).json(new CustomResponse(200, "you unliked the post"));
      }
    } else {
      res.status(404).json(new CustomResponse(404, "", "post not found"));
    }
  } catch (error) {
    next(error);
  }
}

export async function replyToPost(req: any, res: any, next: NextFunction) {
  try {
    const reply = {
      userId: req.user._id,
      text: req.body.text,
      userProfilePic: req.user.profilePic.url,
      username: req.user.username,
    };

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
      $push: { replies: reply },
    });
    if (updatedPost) {
      res.status(200).json(new CustomResponse(200, "you reply to post"));
    } else {
      res.status(400).json(new CustomResponse(400, "", "post not found"));
    }
  } catch (error) {
    next(error);
  }
}

export async function postByUserName(req: any, res: any, next: NextFunction) {
  try {
    const posts = await Post.find({ postedBy: req.params.id }).sort({
      createdAt: -1,
    });

    if (posts) {
      res.status(200).json(new CustomResponse(200, "Ok", "", posts));
    } else {
      res.status(200).json(new CustomResponse(404, "", "No Post yet"));
    }
  } catch (error) {
    next(error);
  }
}
