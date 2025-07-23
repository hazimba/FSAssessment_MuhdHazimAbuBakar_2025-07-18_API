import users from "../models/users.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const usersList = await users.find();

    if (!usersList || usersList.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(usersList);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createUser = async (req, res) => {
  const { role, name, identification, enrollment, email, password } = req.body;

  if (!role || !name) {
    console.error("Role, name are required");
    return res.status(400).json({ message: "Role and name are required" });
  }

  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      console.error("User with this email already exists");
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }
    const SALT_ROUNDS = 10;

    const userData = {
      name,
      role,
      status: "Active",
    };

    if (identification) {
      userData.identification = identification;
    }
    if (enrollment) {
      userData.enrollment = enrollment;
    }
    if (email) {
      userData.email = email;
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      userData.password = hashedPassword;
    }

    const newUser = new users(userData);

    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await users.findByIdAndUpdate(
      id,
      { status: "Inactive", deleted_at: Date.now() },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json({ message: "User soft deleted successfully" });
  } catch (error) {
    console.error("Error soft deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const restoreUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await users.findByIdAndUpdate(
      id,
      { status: "Active", deleted_at: null },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User restored successfully", user });
  } catch (error) {
    console.error("Error restoring user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!updates || Object.keys(updates).length === 0) {
    return res.status(400).json({ message: "No updates provided" });
  }

  const updateCourse = {
    ...updates,
    updated_at: Date.now(),
    student_ids: updates.enrollment || undefined,
  };

  try {
    const user = await users.findByIdAndUpdate(id, updateCourse, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const user = await users.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
