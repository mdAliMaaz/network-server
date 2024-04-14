import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { CustomResponse } from "../utils/Response";
import User from "../models/user.model";

export function verifyAccessToken(req: Request, res: any, next: NextFunction) {
  const accessToken = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;

  if (!accessToken) {
    res.status(403).json(new CustomResponse(403, "Access token not found"));
  }

  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET!,
    async (err: any, data: any) => {
      if (err) {
        return res
          .status(403)
          .json(new CustomResponse(403, "access token is not valid"));
      } else {
        const user = await User.findOne({ email: data.email }).select(
          "-password"
        );
        if (user) {
          res.user = user;
        } else {
          return res.status(403).json(new CustomResponse(403, "login failed"));
        }
      }
    }
  );

  next();
}
