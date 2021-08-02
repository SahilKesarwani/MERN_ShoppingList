const jwt = require("jsonwebtoken");
const config = require("config");

function auth(req, res, next) {
	const token = req.header("x-auth-token");

	// Check for token
	if (!token) {
		return res.status(401).json({ message: "No token, authorization denied." });
	}

	try {
		// Verify token
		const decoded = jwt.verify(token, config.get("jwtSecret"));
		// Add user from payload
		req.user = decoded;
		next();
	} catch (err) {
		res.status(400).json({ message: "Token is not valid." });
	}
}

module.exports = auth;
