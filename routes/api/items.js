const express = require("express");
const auth = require("../../middleware/auth");

const router = express.Router();

// Item Model
const Item = require("../../models/Item");

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get("/", (req, res) => {
	Item.find()
		.sort({ date: -1 })
		.then(items => res.json(items));
});

// @route   POST api/items
// @desc    Create an Item
// @access  Private
router.post("/", auth, (req, res) => {
	const newItem = new Item({
		name: req.body.name,
	});

	newItem
		.save()
		.then(item => res.json(item))
		.catch(err => res.status(404).json({ message: "Item was not saved." }));
});

// @route   DELETE api/items/:id
// @desc    Delete an Item
// @access  Private
router.delete("/:id", auth, (req, res) => {
	Item.findById(req.params.id)
		.then(item => {
			item
				.remove()
				.then(() => res.json({ success: true, message: "Item was deleted successfully." }))
				.catch(err => res.status(404).json({ message: "Item not deleted." }));
		})
		.catch(err => res.status(404).json({ success: false, message: "Item was not found." }));
});

module.exports = router;
