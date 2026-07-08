require("dotenv").config();

const express = require("express");

const authRoutes = require("./routes/auth");

const pool = require("./config/db");

pool.connect()
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => console.error("Database Connection Error:", err));

const app = express();

app.use(express.json());

const PORT = 5000;
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});