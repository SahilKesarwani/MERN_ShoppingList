const express = require("express");
const auth = require("../../middleware/auth");

const router = express.Router();

// Item Model
const Item = require("../../models/Item");

// @route   GET api/items/:userId
// @desc    Get All Items
// @access  Private
router.get("/:userId", auth, (req, res) => {
	const userId = req.params.userId;
	Item.find({ userId })
		.sort({ date: -1 })
		.then(items => res.json(items));
});

// @route   POST api/items
// @desc    Create an Item
// @access  Private
router.post("/", auth, (req, res) => {
	const newItem = new Item({
		name: req.body.name,
		userId: req.body.userId,
	});

	newItem
		.save()
		.then(item => res.json(item))
		.catch(err => res.status(404).json({ message: "Item was not saved." }));
});

// @route   PATCH api/items/:userId
// @desc    Edit an Item
// @access  Private
router.patch("/:id", auth, (req, res) => {
	Item.findByIdAndUpdate(
		req.params.id,
		{
			name: req.body.name,
		},
		{ new: true }
	)
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
