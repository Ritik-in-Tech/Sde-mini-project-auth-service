import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import {
  commonStringConstraints,
  emailStringConstraints,
  passwordStringConstraints,
} from "../utils/helpers/schema.js";

const userSchema = new Schema({
  name: commonStringConstraints,
  email: emailStringConstraints,
  password: passwordStringConstraints,
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    throw new Error(error);
  }
};

const User = model("User", userSchema);
export { User };
