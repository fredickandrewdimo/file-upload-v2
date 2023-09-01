const express = require("express");
const multer = require("multer");
const cors = require("cors");
const mongoose = require("mongoose");
const { GridFSBucket } = require("mongodb"); // Import GridFSBucket from mongodb
const Readable = require("stream").Readable; // Import Readable stream
const Upload = require("./models/upload");

const app = express();

// Middleware
app.use(cors());

// Multer
const storage = multer.memoryStorage(); // Use memory storage to handle file as Buffer
const upload = multer({ storage });

// MongoDB Connection URL
const mongoUrl = "mongodb://localhost:27017/pdf";

// Connect to MongoDB using Mongoose
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    // Start your Express.js server here
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Create GridFSBucket
let gfs;
const conn = mongoose.connection;
conn.once("open", () => {
  gfs = new GridFSBucket(conn.db, {
    bucketName: "uploads", // Set the GridFS collection name
  });
  console.log("GridFS connected");
});

// Endpoints
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    // Get the uploaded file and filename from the request
    const uploadedFile = req.file;
    const filename = req.body.filename;

    // Create a readable stream from the file buffer
    const readableStream = new Readable();
    readableStream.push(uploadedFile.buffer);
    readableStream.push(null);

    // Create a write stream to store the file in GridFS
    const writeStream = gfs.openUploadStream(filename);

    // Pipe the readable stream (file data) to the write stream (GridFS)
    readableStream.pipe(writeStream);

    // When the write stream is closed, it means the file has been successfully uploaded
    writeStream.on("close", (file) => {
      // Create a document in your Upload collection to store metadata
      const upload = new Upload({
        filename: file.filename,
        fileId: file._id, // Store the GridFS file ID
      });

      // Save the metadata document to MongoDB
      upload.save();

      console.log("File uploaded successfully");
      res.json({ message: "File uploaded successfully" });
    });
  } catch (error) {
    console.error("Error uploading file: ", error);
    res
      .status(500)
      .json({ error: "An error occurred while uploading the file" });
  }
});
