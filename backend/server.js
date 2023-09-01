const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();

app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.post(
  "/upload",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "filename", maxCount: 1 },
  ]),
  (req, res) => {
    // Access uploaded file info via req.files.file (the uploaded file) and req.body.filename (the filename)
    console.log("Uploaded file:", req.files.file[0]);
    console.log("Filename:", req.body.filename);
    res.json({ message: "File uploaded successfully" });
  }
);
