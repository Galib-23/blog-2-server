import { errorThrower } from "../utils/error.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorThrower(401, "You can only update your own account!"));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorThrower(401, "Password must be at least 6 characters"));
    }
  }
  if (req.body.username) {
    if (req.body.username.length < 6 || req.body.username.length > 20) {
      return next(
        errorThrower(401, "Username must be between 6 to 20 characters"),
      );
    }
    if (req.body.username.includes(" ")) {
      return next(errorThrower(401, "Username can not contain spaces"));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorThrower(401, "Username must be lowercase"));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorThrower(401, "username can only contain letters and numbers"),
      );
    }
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true },
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
