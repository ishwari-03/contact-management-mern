const express = require('express');
const router = express.Router();
const Contact = require('../models/contact').default;


router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Basic validation
    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'Name, email, and phone are required' });
    }

    const newContact = new Contact({
      name,
      email,
      phone,
      message,
    });

    const savedContact = await newContact.save();
    res.status(201).json(savedContact);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;
