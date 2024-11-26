const express = require('express');
const router = express.Router();
const Question = require('../models/question');

// Getting All questions that match survey_id
router.post('/', async (req, res) => {
  try {
    const questions = await Question.find(req.body);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Creating One question
router.post('/add', async (req, res) => {
  const question = new Question({
    question: req.body.question,
    surveyid: req.body.surveyid,
  });
  try {
    const newQuestion = await question.save();
    res.status(201).json(newQuestion);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
});

// Updating One question
router.put('/update', async (req, res) => {
  const questions = await Question.findById(req.body._id);
  if (req.body.question != null) {
    let update = { $set: { question: req.body.question } };
    try {
      await Question.updateOne(questions, update);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
  try {
    const updatedQuestion = await Question.findById(req.body._id);
    res.json(updatedQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting One Question
router.delete('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted Question' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Deleting All questions with survey_id
router.delete('/', async (req, res) => {
  try {
    await Question.deleteMany(req.body);
    res.json({ message: 'Deleted Questions' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
