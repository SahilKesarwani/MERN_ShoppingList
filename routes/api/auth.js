const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = require("../../middleware/auth");

const router = express.Router();

// User Model
const User = require("../../models/User");

// @route   POST api/auth
// @desc    Auth User
// @access  Public
router.post("/", (req, res) => {
	const { email, password } = req.body;

	// Simple Validation
	if (!email || !password) {
		return res.status(400).json({ message: "All fields are mandatory." });
	}

	// Check for existing user
	User.findOne({ email })
		.then(user => {
			if (!user) return res.status(400).json({ message: "Invalid credentials." });

			// Validate password
			bcrypt
				.compare(password, user.password)
				.then(isMatch => {
					if (!isMatch) return res.status(400).json({ message: "Invalid credentials." });

					jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 604800 }, (err, token) => {
						if (err) throw err;

						res.json({
							token,
							user: {
								id: user.id,
								name: user.name,
								email: user.email,
							},
						});
					});
				})
				.catch(err => console.log(err));
		})
		.catch(err => console.log(err));
});

// @route   GET api/auth/user
// @desc    Get User data
// @access  Private
router.get("/user", auth, (req, res) => {
	User.findById(req.user.id)
		.select("-password")
		.then(user => res.json(user))
		.catch(err => console.log(err));
});

module.exports = router;
