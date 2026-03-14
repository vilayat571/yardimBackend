const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");          // ← ADD
require("dotenv").config();

const connectDB = require("./config/db");
const newsRoutes    = require("./routes/news");
const galleryRoutes = require("./routes/gallery");

const app = express();

// ← ADD - auto create uploads folder
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/news",    newsRoutes);
app.use("/api/gallery", galleryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));