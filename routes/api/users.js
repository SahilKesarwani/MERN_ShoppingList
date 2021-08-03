const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

// User Model
const User = require("../../models/User");

// @route   POST api/users
// @desc    Register New User
// @access  Public
router.post("/", (req, res) => {
	const { name, email, password } = req.body;

	// Simple Validation
	if (!name || !email || !password) {
		return res.status(400).json({ message: "All fields are mandatory." });
	}

	// Check for existing user
	User.findOne({ email })
		.then(user => {
			if (user) return res.status(400).json({ message: "Already registered." });

			const newUser = new User({ name, email, password });

			// Create salt and hash
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;

					newUser.password = hash;
					newUser
						.save()
						.then(user => {
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
				});
			});
		})
		.catch(err => console.log(err));
});

module.exports = router;
