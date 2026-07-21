const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/User");

const router = express.Router();

router.post("/signup", async function (req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters"
      });
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        message: "An account with this email already exists"
      });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email: email,
      password: hashedPassword
    });

    await newUser.save();

    console.log("New user signed up:", newUser.email);

    res.status(201).json({
      message: "Account created successfully!"
    });

  } catch (error) {
    console.log("Signup error:", error);
    res.status(500).json({ message: "Error creating account" });
  }
});

router.post("/login", async function (req, res) {

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const user = await  User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatches) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("User logged in:", user.email);

    res.json({
      message: "Login Successful!",
      token: token
    });
  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({ message: "Error logging in"});
  }
});

module.exports = router; 
