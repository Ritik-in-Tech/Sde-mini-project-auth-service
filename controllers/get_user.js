import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/helpers/apiResponse.js";
import { asyncHandler } from "../utils/helpers/asyncHandler.js";

export const getUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Token is invalid. Please log in again"));
  }

  const userDetails = await User.findById(userId).select("name email -_id");
  return res
    .status(200)
    .json(new ApiResponse(200, userDetails, "User fetched successfully!"));
});
