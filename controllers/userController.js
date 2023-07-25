const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { generateToken } = require("../config/jwt");

const signUp = async (req, res) => {
  const { full_name, email, password, experience_level, technology_stack, business_unit } = req.body;

  try {
    // validate password
    const minLength = 8;
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);

    if (password.length < minLength || !hasLowerCase || !hasUpperCase || !hasDigit) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.",
      });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      full_name,
      email,
      password: hashedPassword,
      experience_level,
      technology_stack,
      business_unit,
    });

    const token = generateToken({ id: newUser.id });

    res.json({ message: "User registered successfully", token, user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken({ id: user.id });

    res.json({ message: "User loggedin successful", token, user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ message: "Users found", data: users });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  signUp,
  signIn,
  getAllUsers,
};
