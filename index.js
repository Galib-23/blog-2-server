import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

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
