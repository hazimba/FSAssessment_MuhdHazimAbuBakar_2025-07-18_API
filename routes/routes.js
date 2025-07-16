import express from "express";
import {
  createCourse,
  getCourses,
  getCourseById,
} from "../controller/courses.js";

const router = express.Router();

router.get("/getCourses", getCourses);
router.post("/createCourse", createCourse);
router.get("/getCourse/:id", getCourseById);
export default router;
