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

export const getCourse = async (req, res) => {
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

export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const existingCourse = await coursesSchema.findOne({
      title: updates.title,
    });
    if (existingCourse && existingCourse._id.toString() !== id) {
      return res
        .status(400)
        .json({ message: "Course with this title already exists" });
    }

    const updateCourse = {
      ...updates,
      updated_at: Date.now(),
    };

    const course = await coursesSchema.findByIdAndUpdate(id, updateCourse, {
      new: true,
      runValidators: true,
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res
      .status(200)
      .json({ message: "Course updated successfully", course: course });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await coursesSchema.findByIdAndUpdate(
      id,
      { status: "Inactive", deleted_at: Date.now() },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course soft deleted successfully" });
  } catch (error) {
    console.error("Error soft deleting course:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const restoreCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await coursesSchema.findByIdAndUpdate(
      id,
      { status: "Active", deleted_at: null, updated_at: Date.now() },
      { new: true }
    );
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course restored successfully", course });
  } catch (error) {
    console.error("Error restoring course:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
