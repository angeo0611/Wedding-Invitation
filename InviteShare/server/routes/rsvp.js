const express = require('express');
const router = express.Router();
const RSVP = require('../models/RSVP');

router.post('/', async (req, res) => {
  try {
    const rsvp = await RSVP.create(req.body);
    res.status(201).json(rsvp);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/invitation/:id', async (req, res) => {
  try {
    const rsvps = await RSVP.find({ invitationId: req.params.id });
    res.json(rsvps);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
