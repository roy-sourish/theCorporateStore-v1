import jwt from "jsonwebtoken";

/**
 *   Generates JWT and stroes it in HTTP only Cookie
 *   @param userId Takes in the userID and stores it in jwt for auth
 *   @returns generated token which is set to a http only cookie
 */

export const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // set jwt as HTTP only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV != "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};
