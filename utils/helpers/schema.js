export const commonStringConstraints = {
  type: String,
  trim: true,
  default: "",
};

export const emailStringConstraints = {
  ...commonStringConstraints,
  validate: {
    validator: (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    message: "Invalid email format",
  },
};

export const passwordStringConstraints = {
  ...commonStringConstraints,
  minlength: 6,
  validate: {
    validator: (password) => password.length > 6,
    message: "Password must be longer than 6 characters",
  },
};
