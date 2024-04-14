import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomResponse } from "../utils/Response";
import User from "../models/user.model";
import { Jwt } from "../utils/Jwt";

export function verifyAccessToken(req: any, res: any, next: NextFunction) {
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
        jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET!,
          async (err: any, data: any) => {
            if (err) {
              res
                .status(403)
                .json(new CustomResponse(403, "invalid refresh token"));
            }

            const user = await User.findOne({ email: data.email }).select(
              "-password"
            );
            if (user) {
              const { accessToken, refreshToken } = Jwt.refreshToken({
                email: user.email,
                username: user.username,
              });
              res.cookie("access_token", accessToken, { httpOnly: true });
              res.cookie("refresh_token", refreshToken, { httpOnly: true });
              req.user = user;
              next();
            }
          }
        );
      } else {
        const user = await User.findOne({ email: data.email }).select(
          "-password"
        );
        if (user) {
          req.user = user;
          next();
        } else {
          return res.status(403).json(new CustomResponse(403, "login failed"));
        }
      }
    }
  );
}
