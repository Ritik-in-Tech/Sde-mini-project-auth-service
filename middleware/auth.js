import { ApiResponse } from "../utils/helpers/apiResponse.js";
import { asyncHandler } from "../utils/helpers/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyToken = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(400).json(new ApiResponse(400, {}, "Token is not found"));
  }

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  if (!decodedToken || !decodedToken?.userDetails) {
    return res
      .status(401)
      .json(new ApiResponse(401, {}, "The token is invalid!"));
  }

  req.user = decodedToken?.userDetails;
  req.userDetails = decodedToken?.userDetails;

  next();
});
