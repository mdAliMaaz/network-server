import jwt from "jsonwebtoken";

export class Jwt {
  public static generateAccessToken(payload: {}): string {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: "1d",
    });
  }

  public static generateRefreshToken(payload: {}): string {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, {
      expiresIn: "7d",
    });
  }
}
