import Admin from "../models/adminModel.js";
import jwt from "jsonwebtoken";

export const verifyAdmin = async (req, res) => {
  res.json({ success: true, admin: req.admin })
}

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const adminSignup = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Signup attempt:", { name, email, password }) 
  try {
    const exists = await Admin.findOne({ email });
    if (exists) return res.status(400).json({ message: "Admin already exists" });

    const admin = await Admin.create({ name, email, password });
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } catch (error) {
    console.log("Signup error:", error.message) 
    res.status(500).json({ message: error.message });
  }
};

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", { email }) 
  try {
    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } catch (error) {
    console.log("Login error:", error.message) 
    res.status(500).json({ message: error.message });
  }
};