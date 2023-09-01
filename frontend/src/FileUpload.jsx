import { useState } from "react";
import axios from "axios";

function FileUpload() {
  const [filename, setFilename] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData();
    formData.append("file", file);
    formData.append("filename", filename);

    try {
      const response = await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("File uploaded successfully");
      console.log("Server Response:", response.data);
    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  };

  return (
    <>
      <form onSubmit={handleUpload}>
        <input type="text" onChange={(e) => setFilename(e.target.value)} />
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </>
  );
}

export default FileUpload;
