import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/helpers/apiResponse.js";
import { asyncHandler } from "../utils/helpers/asyncHandler.js";
import jwt from "jsonwebtoken";

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Email or Password is missing"));
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    return res
      .status(404)
      .json(new ApiResponse(404, {}, "Email is not registered"));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return res
      .status(401)
      .json(new ApiResponse(401, {}, "Invalid credentials"));
  }

  const userDetails = {
    _id: user?._id,
  };

  const authToken = jwt.sign({ userDetails }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, { authToken }, "Login success"));
});
