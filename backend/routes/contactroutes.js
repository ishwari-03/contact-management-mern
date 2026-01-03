import express from 'express';
import Contact from '../models/contact.js';

const router = express.Router();

// POST: Create new contact
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        message: 'Name, email, and phone are required',
      });
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
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
});

// GET: Fetch all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
});

// DELETE: Delete a contact
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await Contact.findByIdAndDelete(id);
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
}

);

export default router;
