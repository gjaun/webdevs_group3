require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5173'],
};

app.use(cors(corsOptions));

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());

const questionsRouter = require('./routes/questions');
app.use('/questions', questionsRouter);

const surveysRouter = require('./routes/surveys');
app.use('/surveys', surveysRouter);

app.listen(8080, () => console.log('Server Started'));
