require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true, // allow cookies to be sent
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

// Routes
const authRouter = require('./routes/auth');
const questionsRouter = require('./routes/questions');
const surveysRouter = require('./routes/surveys');

app.use('/auth', authRouter);
app.use('/questions', questionsRouter);
app.use('/surveys', surveysRouter);

app.listen(8080, () => console.log('Server Started'));
