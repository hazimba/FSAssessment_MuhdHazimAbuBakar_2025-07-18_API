import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const usersSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  role: {
    type: String,
    enum: ["Instructor", "Student"],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  deleted_at: {
    type: Date,
    default: null,
  },
});
export default mongoose.model("User", usersSchema);
