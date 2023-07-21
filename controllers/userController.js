const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateToken } = require('../config/jwt');

const signUp = async (req, res) => {
  const { full_name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      full_name,
      email,
      password: hashedPassword,
    });

    // Generate a JWT token for the new user
    const token = generateToken({ id: newUser.id });

    // Return the token and user data as the response
    res.json({ message: 'User registered successfully', token, user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the entered password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token for the authenticated user
    const token = generateToken({ id: user.id });

    // Return the token and user data as the response
    res.json({ message: 'User loggedin successful', token, user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  signUp,
  signIn,
};
