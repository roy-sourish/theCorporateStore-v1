import jwt, { decode } from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

// protected routes
export const protect = asyncHandler(
  async(async (req, res, next) => {
    let token;

    // read the jwt from the cookie
    token = req.cookies.jwt;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        await User.findById(decoded.userId);
      } catch (error) {}
    } else {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  })
);
