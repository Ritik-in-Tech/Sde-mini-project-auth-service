import { ApiResponse } from "./apiResponse.js";

export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    if (error.name === "ValidationError") {
      const formattedErrors = Object.keys(error.errors).map((field) => ({
        field: field,
        message: error.errors[field].message,
      }));

      return res
        .status(400)
        .json(
          new ApiResponse(400, { errors: formattedErrors }, "Validation Error")
        );
    }

    next(error);
  });
};
