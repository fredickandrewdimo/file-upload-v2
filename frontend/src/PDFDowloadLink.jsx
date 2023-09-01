import React from "react";
import axios from "axios";

function PDFDownloadLink({ filename }) {
  const handleDownload = async () => {
    try {
      const response = await axios.get(`/download/${filename}`, {
        responseType: "blob", // Set the response type to blob
      });

      // Create a Blob object and create a download link
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);

      // Create a hidden <a> element for downloading
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);

      // Trigger a click on the hidden <a> element to start the download
      a.click();

      // Remove the <a> element after the download
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return <button onClick={handleDownload}>Download {filename}</button>;
}

export default PDFDownloadLink;
