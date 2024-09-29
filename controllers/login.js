import { ApiResponse } from "../utils/helpers/apiResponse.js";
import { asyncHandler } from "../utils/helpers/asyncHandler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createTcpPool } from "../config/db.js";

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Email or Password is missing"));
  }

  try {
    const pool = await createTcpPool();

    const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    const user = users[0];

    if (!user) {
      return res
        .status(404)
        .json(new ApiResponse(404, {}, "Email is not registered"));
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res
        .status(401)
        .json(new ApiResponse(401, {}, "Invalid credentials"));
    }

    const userDetails = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const authToken = jwt.sign(
      { userDetails },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );

    return res
      .status(200)
      .json(new ApiResponse(200, { authToken }, "Login success"));
  } catch (error) {
    console.error("Error during login:", error);
    return res
      .status(500)
      .json(new ApiResponse(500, {}, "Internal Server Error"));
  }
});
