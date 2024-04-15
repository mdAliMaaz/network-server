import { NextFunction } from "express";
import Post from "../models/post.model";
import User from "../models/user.model";
import { CustomResponse } from "../utils/Response";

export async function createPost(req: any, res: any, next: NextFunction) {
  try {
    const newPost = await Post.create({ postedBy: req.user._id, ...req.body });
    if (newPost) {
      res
        .status(201)
        .json(
          new CustomResponse(201, "new post created successfully", newPost)
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
      res.status(200).json(new CustomResponse(200, "OK", post));
    } else {
      res.status(400).json(new CustomResponse(400, "post not found"));
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
          new CustomResponse(200, "post updated successfully", updatedPost)
        );
    } else {
      res.status(400).json(new CustomResponse(400, "post not found"));
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
      res.status(404).json(new CustomResponse(404, "post not found"));
    }
  } catch (error) {
    next(error);
  }
}

export async function getFeedPost(req: any, res: any, next: NextFunction) {
  try {
  } catch (error) {
    next(error);
  }
}

export async function replyToPost(req: any, res: any, next: NextFunction) {
  try {
  } catch (error) {
    next(error);
  }
}
