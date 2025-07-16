import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import router from "./routes/routes.js";
import cors from "cors";

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/gatefold-assessment";

app.use("/api/gf-assessment", router);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
