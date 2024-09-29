import { ApiResponse } from "../utils/helpers/apiResponse.js";
import { asyncHandler } from "../utils/helpers/asyncHandler.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { createTcpPool } from "../config/db.js";
import {
  emailStringConstraints,
  passwordStringConstraints,
} from "../utils/helpers/schema.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Name, Email, and Password are required"));
  }

  if (!emailStringConstraints.validate.validator(email)) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, emailStringConstraints.validate.message));
  }

  if (!passwordStringConstraints.validate.validator(password)) {
    return res
      .status(400)
      .json(
        new ApiResponse(400, {}, passwordStringConstraints.validate.message)
      );
  }

  const userId = uuidv4();

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const pool = await createTcpPool();

    const [existingUser] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res
        .status(409)
        .json(new ApiResponse(409, {}, "Email is already in use"));
    }

    const [result] = await pool.query(
      "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)",
      [userId, name, email, hashedPassword]
    );

    if (result.affectedRows > 0) {
      return res
        .status(201)
        .json(new ApiResponse(201, {}, "User registered successfully!"));
    } else {
      return res
        .status(500)
        .json(new ApiResponse(500, {}, "Failed to register the user"));
    }
  } catch (error) {
    console.error("Error registering user:", error);
    return res
      .status(500)
      .json(new ApiResponse(500, {}, "Internal Server Error"));
  }
});
