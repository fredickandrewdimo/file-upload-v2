const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

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

// Serve uploaded PDFs as static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/download/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "uploads", filename);

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    // Set the response headers to indicate a PDF file
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);

    // Stream the file as the response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } else {
    res.status(404).json({ message: "File not found" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.post("/upload", upload.single("file"), (req, res) => {
  // Access uploaded file info via req.file
  console.log(req.file);
  res.json({ message: "File uploaded successfully" });
});
