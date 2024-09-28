import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/helpers/apiResponse.js";
import { asyncHandler } from "../utils/helpers/asyncHandler.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Email or Password is required"));
  }

  const isAlreadyRegistered = await User.findOne({ email: email });
  if (isAlreadyRegistered) {
    return res
      .status(409)
      .json(new ApiResponse(409, {}, "This email is already used"));
  }

  const newUser = User({
    email: email,
    name: name,
    password: password,
  });

  await newUser.save();

  return res
    .status(201)
    .json(new ApiResponse(201, newUser, "User registered successfully!"));
});
