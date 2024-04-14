import User from "../model/user.model";
import { NextFunction, Request, Response } from "express";
import { SignUpUser } from "../types";
import { CustomResponse } from "../utils/response";

export async function signUp(req: Request, res: Response, next: NextFunction) {
  const { name, username, password, email }: SignUpUser = req.body;

  if (!name || !username || !password || !email) {
    return res.status(400).json({ message: "all fields are required." });
  }
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: "email is already in use." });
  }

  const isUserNameUnique = await User.findOne({ username });

  if (isUserNameUnique) {
    return res
      .status(400)
      .json({ message: "username is already taken try something new." });
  }

  const newUser = await User.create({ ...req.body });

  if (newUser) {
    res.status(201).json(new CustomResponse(201, "signup successfull."));
  } else {
    next();
  }
}

export async function signIn(req: Request, res: Response) {
  res.send("i am signin");
}

export async function getUsers(req: Request, res: Response) {
  res.send("i am getUsers");
}

export async function getProfile(req: Request, res: Response) {
  res.send("i am getProfile");
}

export async function updateUser(req: Request, res: Response) {
  res.send("i am update");
}

export async function deleteUser(req: Request, res: Response) {
  res.send("i am delete");
}
