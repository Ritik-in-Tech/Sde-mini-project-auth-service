import { ApiResponse } from "../utils/helpers/apiResponse.js";
import { asyncHandler } from "../utils/helpers/asyncHandler.js";
import { createTcpPool } from "../config/db.js";

export const getUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Token is invalid. Please log in again"));
  }

  try {
    const pool = await createTcpPool();

    const [users] = await pool.query(
      "SELECT name, email FROM users WHERE id = ?",
      [userId]
    );

    const userDetails = users[0];

    if (!userDetails) {
      return res.status(404).json(new ApiResponse(404, {}, "User not found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, userDetails, "User fetched successfully!"));
  } catch (error) {
    console.error("Error fetching user:", error);
    return res
      .status(500)
      .json(new ApiResponse(500, {}, "Internal Server Error"));
  }
});
