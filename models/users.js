import mongoose from "mongoose";
import { UserRole, UserStatus } from "../types/user.ts";

const usersSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    role: {
      type: String,
      enum: [UserRole.Instructor, UserRole.Student],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: [UserStatus.Active, UserStatus.Inactive],
      default: UserStatus.Active,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
    identification: {
      type: String,
      required: true,
      unique: true,
    },
    enrollment: {
      type: [String],
      ref: "Course",
      default: null,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export default mongoose.model("User", usersSchema);
