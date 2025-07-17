import express from "express";
import {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
  restoreCourse,
} from "../controller/courses.js";

import {
  getUsers,
  createUser,
  deleteUser,
  restoreUser,
  updateUser,
} from "../controller/users.js";

const router = express.Router();

router.get("/getCourses", getCourses);
router.post("/createCourse", createCourse);
router.get("/getCourse/:id", getCourse);
router.patch("/updateCourse/:id", updateCourse);
router.delete("/deleteCourse/:id", deleteCourse);
router.patch("/restoreCourse/:id", restoreCourse);

router.get("/getUsers", getUsers);
router.post("/createUser", createUser);
router.delete("/deleteUser/:id", deleteUser);
router.patch("/restoreUser/:id", restoreUser);
router.patch("/updateUser/:id", updateUser);

export default router;
