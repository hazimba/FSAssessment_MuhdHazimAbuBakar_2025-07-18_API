import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { UserRole, UserStatus } from "../types/user.ts";

const usersSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
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
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
export default mongoose.model("User", usersSchema);
