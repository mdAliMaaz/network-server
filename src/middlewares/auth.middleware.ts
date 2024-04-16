import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomResponse } from "../utils/Response";
import User from "../models/user.model";
import { Jwt } from "../utils/Jwt";

export async function verifyAccessToken(
  req: any,
  res: any,
  next: NextFunction
) {
  try {
    const accessToken = req.cookies.network_access_token;
    const refreshToken = req.cookies.network_refresh_token;

    if (!accessToken) {
      return res
        .status(403)
        .json(new CustomResponse(403, "Access token not found"));
    }

    jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET!,
      async (accessTokenErr: any, accessTokenData: any) => {
        if (accessTokenErr) {
          jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET!,
            async (refreshTokenErr: any, refreshTokenData: any) => {
              if (refreshTokenErr) {
                return res
                  .status(403)
                  .json(new CustomResponse(403, "Invalid refresh token"));
              }

              const user = await User.findOne({
                email: refreshTokenData.email,
              }).select("-password");
              if (!user) {
                return res
                  .status(403)
                  .json(new CustomResponse(403, "User not found"));
              }

              const { accessToken, refreshToken } = Jwt.refreshToken({
                email: user.email,
                username: user.username,
              });

              res.cookie("network_access_token", accessToken, {
                httpOnly: true,
              });
              res.cookie("network_refresh_token", refreshToken, {
                httpOnly: true,
              });
              req.user = user;
              next();
            }
          );
        } else {
          const user = await User.findOne({
            email: accessTokenData.email,
          }).select("-password");
          if (!user) {
            return res
              .status(403)
              .json(new CustomResponse(403, "User not found"));
          }
          req.user = user;
          next();
        }
      }
    );
  } catch (error) {
    next(error);
  }
}
