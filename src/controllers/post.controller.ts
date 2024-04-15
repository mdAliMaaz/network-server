import { NextFunction } from "express";
import Post from "../models/post.model";
import User from "../models/user.model";

export async function createPost(req: any, res: any, next: NextFunction) {
  res.send("create a post");
}

export async function getPost(req: any, res: any, next: NextFunction) {
  res.send("get a post");
}

export async function updatePost(req: any, res: any, next: NextFunction) {
  res.send("update a post");
}

export async function deletePost(req: any, res: any, next: NextFunction) {
  res.send("delete a post");
}

export async function getFeedPost(req: any, res: any, next: NextFunction) {
  res.send("get a post feed");
}

export async function replyToPost(req: any, res: any, next: NextFunction) {
  res.send("reply to a post");
}
