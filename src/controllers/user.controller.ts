import User from "../model/user.model";
import { Request, Response } from "express";

export async function signUp(req: Request, res: Response) {
  res.send("i am signup");
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
