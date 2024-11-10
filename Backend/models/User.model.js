import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    avatar: {
      type: String,
    },
    userName: {
      type: String,
      require: true,
    },
    gmail: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "others", "None"],
      default: "None",
    },
    posts: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true }
);

// Creating modle using Mongoose.
export const User = new mongoose.model("User", userSchema);
