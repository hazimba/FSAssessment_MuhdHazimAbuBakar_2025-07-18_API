import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const coursesSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: Text,
  },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  instructor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Instructor",
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: true,
  },
  image_url: {
    type: String,
    required: false,
  },
});
export default mongoose.model("Course", coursesSchema);
