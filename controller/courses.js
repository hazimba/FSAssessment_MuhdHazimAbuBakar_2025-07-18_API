import coursesSchema from "../models/courses.js";

export const getCourses = async (req, res) => {
  try {
    const courses = await coursesSchema.find();

    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: "No courses found" });
    }
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCourseById = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await coursesSchema.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createCourse = async (req, res) => {
  const courses = new coursesSchema(req.body);
  const { title, description, price, instructor_id } = courses;
  if (!courses.title || !courses.price || !courses.instructor_id) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const existingCourse = await coursesSchema.findOne({ title: courses.title });
  if (existingCourse) {
    return res
      .status(400)
      .json({ message: "Course with this title already exists" });
  }
  try {
    const createCourse = new coursesSchema({
      title,
      description,
      price,
      instructor_id,
    });
    await createCourse.save();
    res
      .status(201)
      .json({ message: "Course created successfully", course: createCourse });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
