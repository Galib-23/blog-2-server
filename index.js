import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json()); // body parser
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB is connected!");
  })
  .catch((error) => {
    console.log("Error in mongo connection: ", error);
  });

app.get("/", (req, res) => {
  res.send("Blog server is running...");
});1024

app.listen(PORT, () => {
  console.log(`Blog server running on port ${PORT}`);
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

//Error handling middleware have default 4 parameters
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
})