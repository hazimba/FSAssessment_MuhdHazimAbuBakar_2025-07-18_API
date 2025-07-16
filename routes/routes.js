import express from "express";
import { createCourse, getCourses } from "../controller/courses.js";

const router = express.Router();

router.get("/getCourses", getCourses);
router.post("/createCourse", createCourse);
export default router;
