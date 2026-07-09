require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");

const pool = require("./config/db");
const snippetRoutes = require("./routes/snippet");

pool.connect()
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => console.error("Database Connection Error:", err));

const app = express();
app.use(cors());

app.use(express.json());

const PORT = 5000;
app.use("/api/auth", authRoutes);
app.use("/api/snippets", snippetRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});