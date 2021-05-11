const router = require("express").Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

const User = require("../models/UserModel");
const UserService = require("../services/user.services");
const JWT_SECRET = process.env.JWT_SECRET; // || config.get("jwtSecret")

/**
 * @route   POST /auth/login
 * @desc    Login user
 * @access  Public
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // validation
  if (!email || !password) {
    res.status(400).json({ msg: "Please enter all fields" });
  }

  // check for existing user
  try {
    const user = await UserService.findUserByEmail({ email });
    console.log("user from db", user);
    if (!user) throw Error("User does not exist");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error("Invalid credentials");

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 3600 });
    if (!token) throw Error("Could not sign the token");

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      msg: "user is logged in"
    });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

/**
 * @route   POST /auth/register
 * @desc    Register new user
 * @access  Public
 */
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    const user = await User.findOne({ email });
    if (user) throw Error("User already exists");

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error("Something went wrong with bcrypt");

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error("Something went wrong hashing the password");

    const newUser = new User({
      name,
      email,
      password: hash
    });

    const savedUser = await newUser.save();
    if (!savedUser) throw Error("Something went wrong saving the user");

    const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, {
      expiresIn: 3600
    });

    res.status(200).json({
      token,
      user: {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email
      },
      msg: "user has been registered successfully"
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @route   GET /auth/user
 * @desc    Get user data
 * @access  Private
 */
router.get("/user/:id", auth, async (req, res) => {
  const { id } = req.params;
  if (!id) throw Error("no id was found on req.params");
  try {
    const user = await UserService.findUserById(id);
    console.log("user from db by id", user);
    if (!user) throw Error("User does not exist");

    res.status(200).json({
      user: user,
      msg: "user has been successfully found"
    });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

module.exports = router;
