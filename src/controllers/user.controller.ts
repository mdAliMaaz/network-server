import User from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import { ISignInUser, ISignUpUser } from "../types";
import { CustomResponse } from "../utils/Response";
import { HashPassword } from "../utils/Bcrypt";
import { Jwt } from "../utils/Jwt";

export async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, username, password, email }: ISignUpUser = req.body;

    if (!name || !username || !password || !email) {
      return res
        .status(400)
        .json(new CustomResponse(400, "", "all fields are reqired"));
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json(new CustomResponse(400, "", "email already in use"));
    }

    const isUserNameUnique = await User.findOne({ username });

    if (isUserNameUnique) {
      return res
        .status(400)
        .json(new CustomResponse(400, "", "username already taken"));
    }

    const newUser = await User.create({ ...req.body });

    if (newUser) {
      res.status(201).json(new CustomResponse(201, "signup successfull."));
    } else {
      next();
    }
  } catch (error) {
    next();
  }
}

export async function signIn(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password }: ISignInUser = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json(new CustomResponse(404, "", "User not found"));
    }

    const isPasswordCorrect = await HashPassword.check(password, user.password);

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json(new CustomResponse(400, "", "Invalid Password"));
    }
    const payload = { email: user.email, username: user.username };

    const accessToken = Jwt.generateAccessToken(payload);
    const refreshToken = Jwt.generateRefreshToken(payload);

    res.cookie("network_access_token", accessToken);
    res.cookie("network_refresh_token", refreshToken);

    res
      .status(203)
      .json(new CustomResponse(203, "login successfull", "", user));
  } catch (error) {
    next(error);
  }
}

export async function getProfile(req: any, res: any, next: NextFunction) {
  try {
    const user = await User.findOne(req.user._id);
    if (user) {
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
}

export async function updateUser(req: any, res: Response, next: NextFunction) {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { ...req.body.input },
      { new: true }
    );
    if (updatedUser) {
      res
        .status(200)
        .json(
          new CustomResponse(200, "profile updated successfully", "",updatedUser)
        );
    }
  } catch (error) {
    next(error);
  }
}

export async function followOrUnfollow(
  req: any,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.user._id == req.params.id) {
      res
        .status(400)
        .json(new CustomResponse(400, "you can't follow yourself"));
    }

    const currentUser = await User.findById(req.user._id);

    const alreadyFollowing = currentUser?.following.includes(req.params.id);

    if (!alreadyFollowing) {
      const userA = await User.findByIdAndUpdate(req.user._id, {
        $push: { following: req.params.id },
      });
      const userB = await User.findByIdAndUpdate(req.params.id, {
        $push: { followers: req.user._id },
      });
      res.status(200).json(new CustomResponse(200, "userA follows userB"));
    } else {
      const userA = await User.findByIdAndUpdate(req.user._id, {
        $pull: { following: req.params.id },
      });
      const userB = await User.findByIdAndUpdate(req.params.id, {
        $pull: { followers: req.user._id },
      });
      res.status(200).json(new CustomResponse(200, "userA unfollows userB"));
    }
  } catch (error) {
    next(error);
  }
}

export async function logOut(req: any, res: Response, next: NextFunction) {
  try {
    res.clearCookie("network_access_token");
    res.clearCookie("network_refresh_token");
    res.status(203).json(new CustomResponse(203, "successfully logged out"));
  } catch (error) {
    next(error);
  }
}


