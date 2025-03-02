const express = require('express');
const Destination = require('../models/destination');

const router = express.Router();

// Fetch a random destination
router.get('/random', async (req, res) => {
  const count = await Destination.countDocuments();
  const random = Math.floor(Math.random() * count);
  const destination = await Destination.findOne().skip(random);
  res.json(destination);
});

// Submit answer
router.post('/submit', async (req, res) => {
  const { answer, destinationId } = req.body;
  const destination = await Destination.findById(destinationId);
  const isCorrect = destination.name.toLowerCase() === answer.toLowerCase();
  res.json({ isCorrect, funFact: destination.funFacts[0] });
});

module.exports = router;