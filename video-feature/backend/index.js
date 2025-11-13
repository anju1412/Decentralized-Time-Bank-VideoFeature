const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "uploads")),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

app.get("/", (req, res) => res.send("Backend is running"));

let videos = [];

// Upload video route
app.post("/upload", upload.single("video"), (req, res) => {
  const videoUrl = `http://localhost:5001/uploads/${req.file.filename}`;
  res.json({ success: true, videoUrl });
});

// Save video details route
app.post("/save", (req, res) => {
  const { title, desc, videoUrl } = req.body;
  videos.push({ title, desc, videoUrl });
  res.json({ success: true });
});

// Get all videos
app.get("/videos", (req, res) => {
  res.json(videos);
});

app.get("/", (req, res) => {
  res.send("Video Upload Backend is Running Successfully!");
});

app.listen(5001, () => console.log("Backend running on port 5001"));
