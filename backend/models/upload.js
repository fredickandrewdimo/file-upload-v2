const mongoose = require("mongoose");

// Define a schema for your documents with timestamps
const uploadSchema = new mongoose.Schema(
  {
    filename: String,
    fileId: mongoose.Types.ObjectId, // Store the GridFS file ID
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create a model based on the schema
const Upload = mongoose.model("Upload", uploadSchema);

module.exports = Upload;
