import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });


export const userSignup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });
    res.status(201).json({
      _id:   user._id,
      name:  user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      _id:   user._id,
      name:  user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleLikeSong = async (req, res) => {

  try {

    const { userId, songId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const alreadyLiked =
      user.likedSongs.includes(songId);

    if (alreadyLiked) {

      user.likedSongs =
        user.likedSongs.filter(
          item => item.toString() !== songId
        );

    } else {

      user.likedSongs.push(songId);
    }

    await user.save();

    res.json({
      success: true,
      likedSongs: user.likedSongs
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getLikedSongs = async (req, res) => {
  try {

    const { userId } = req.params;

    const user = await User.findById(userId).populate("likedSongs");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      likedSongs: user.likedSongs
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};