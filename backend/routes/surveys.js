const express = require('express');
const router = express.Router();
const Survey = require('../models/survey');

// Getting all surveys
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id;
    // find matching userId for display only surveys user created
    const surveys = await Survey.find({ creator: userId }).populate(
      'creator',
      'username'
    );
    res.json(surveys);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One survey
router.get('/:id', async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);
    if (!survey) {
      return res.status(404).json({ message: 'Survey not found' });
    }

    res.json(survey);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Creating One survey
router.post('/', async (req, res) => {
  const survey = new Survey({
    name: req.body.name,
    type: req.body.type,
    creator: req.user.id,
    // password: req.body.password,
    // user_pass: req.body.user_pass,
  });
  try {
    const newSurvey = await survey.save();
    res.status(201).json(newSurvey);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating One survey
router.put('/:id', async (req, res) => {
  const surveys = await Survey.findById(req.body._id);
  if (req.body.name != null) {
    let update = { $set: { name: req.body.name } };
    try {
      await Survey.updateOne(surveys, update);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
  if (req.body.type != null) {
    let update = { $set: { type: req.body.type } };
    try {
      await Survey.updateOne(surveys, update);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
  if (req.body.password != null) {
    let update = { $set: { password: req.body.password } };
    try {
      await Survey.updateOne(surveys, update);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
  if (req.body.user_pass != null) {
    let update = { $set: { user_pass: req.body.user_pass } };
    try {
      await Survey.updateOne(surveys, update);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
  try {
    const updatedSurvey = await Survey.findById(req.body._id);
    res.json(updatedSurvey);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting One survey
router.delete('/:id', async (req, res) => {
  try {
    const surveys = await Survey.findById(req.body._id);
    await Survey.deleteOne(surveys);
    res.json({ message: 'Deleted Survey' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
