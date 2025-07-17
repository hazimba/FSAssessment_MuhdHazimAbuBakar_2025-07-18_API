import users from "../models/users.js";

export const getUsers = async (req, res) => {
  try {
    const usersList = await users.find({ deleted_at: null });

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
  const { role, name, identification } = req.body;

  if (!role || !name || !identification) {
    console.error("Role, name, and identification are required");
    return res.status(400).json({ message: "Role and name are required" });
  }

  try {
    const existingUser = await users.findOne({ identification });
    if (existingUser) {
      console.error("User with this identification already exists");
      return res
        .status(400)
        .json({ message: "User with this identification already exists" });
    }
    const newUser = new users({
      role,
      name,
      identification,
      status: "Active",
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
