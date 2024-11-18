const express = require('express');
const User = require('../models/Users');

const router = express.Router();


// CREATE a new user
router.post('/', async (req, res) => {
  try {
      const { name, email, age } = req.body;
      const newUser = new User({ name, email, age });
      await newUser.save();
      res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
      res.status(400).json({ error: err.message });
  }
});

// READ all users
router.get('/', async (req, res) => {
  try {
      const users = await User.find();
      res.status(200).json(users);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// READ a user by ID
router.get('/:id', async (req, res) => {
  try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.status(200).json(user);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// UPDATE a user by ID
router.put('/:id', async (req, res) => {
  try {
      const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true, runValidators: true }
      );
      if (!updatedUser) return res.status(404).json({ error: 'User not found' });
      res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (err) {
      res.status(400).json({ error: err.message });
  }
});

// DELETE a user by ID
router.delete('/:id', async (req, res) => {
  try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) return res.status(404).json({ error: 'User not found' });
      res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

module.exports = router;