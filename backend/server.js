require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { requireAuth } = require("./utils/utils");

const corsOptions = {
  // origin: [
  //   "http://localhost:3000",
  //   "http://localhost:5173",
  //   "https://webdevs-group3-frontend.onrender.com",
  // ],
  origin: "https://webdevs-group3-frontend.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // allow cookies to be sent
};

const port = process.env.PORT || 8080;

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

// Routes
const authRouter = require("./routes/auth");
const questionsRouter = require("./routes/questions");
const surveysRouter = require("./routes/surveys");

app.use("/auth", authRouter);
app.use("/questions", requireAuth, questionsRouter); // added requireAuth
app.use("/surveys", requireAuth, surveysRouter); // added requireAuth

app.listen(port, () => console.log("Server Started"));
