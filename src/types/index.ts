import { Response } from "express";

export interface ISignUpUser {
  name: string;
  username: string;
  email: string;
  password: string;
}
export interface ISignInUser {
  email: string;
  password: string;
}

export interface ICustomResponse extends Response {
  user: any;
}
