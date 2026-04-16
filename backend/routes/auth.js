import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

const createToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      fullName: user.fullName
    },
    process.env.JWT_SECRET || "vehiclevault_secret",
    { expiresIn: "12h" }
  );
};

router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ fullName, email, password: hashedPassword });
    const token = createToken(user);

    res.status(201).json({
      message: "Signup successful",
      user: { id: user._id, fullName: user.fullName, email: user.email },
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to create account." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = createToken(user);
    res.json({
      message: "Login successful",
      user: { id: user._id, fullName: user.fullName, email: user.email },
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to login." });
  }
});

export default router;
