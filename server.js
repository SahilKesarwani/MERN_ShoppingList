const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

// DB Config
const db = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
	.connect(db, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => console.log("MongoDB Connected"))
	.catch(err => console.log(err));

// Use Routes
const items = require("./routes/api/items");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");
app.use("/api/items", items);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

/*
// Serve static assets if in production
if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {
	// Set static folder
	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}
*/

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
