const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  /* Checking if the username or password is empty. */
  if (!username || !password) {
    return res.status(400).json("Please add all fields");
  }

  /* Checking if the username already exists in the database. */
  const userExists = await User.findOne({ username });
  if (userExists) {
    res.status(400).json("User already exists");
  }

  /* Hashing the password. */
  const hashedPassword = await bcrypt.hash(password, 10);

  /* Creating a new user in the database. */
  const user = await User.create({
    username,
    password: hashedPassword,
  });

  /* Creating a token for the user. */
  const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  /* Checking if the user is created and then sending the user and token back to the client. */
  if (user) {
    res.status(201).json({ user, token });
  } else {
    res.status(400).json("Invalid user data");
  }
});

/* This is a function that is used to authenticate the user. */
const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  /* Checking if the username already exists in the database. */
  const user = await User.findOne({ username });

  /* This is checking if the user exists in the database. */
  if (!user) {
    return res.status(500).json("Invalid username");
  }

  /* Comparing the password that the user entered with the password that is stored in the database. */
  const validPassword = await bcrypt.compare(password, user.password);

  /* Checking if the password is valid and if the user exists. */
  if (validPassword && user) {
    /* This is creating a token for the user and then sending the user and token back to the client. */
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res.status(200).json({ user, token });
  } else {
    return res.status(400).json("Email or Password incorrect");
  }
});

module.exports = { registerUser, authUser };
