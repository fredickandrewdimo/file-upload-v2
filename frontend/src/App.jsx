import React from "react";
import FileUpload from "./FileUpload";
import PDFList from "./PDFList";

function App() {
  const pdfs = [
    { filename: "sample1.pdf", originalname: "Sample PDF 1" },
    { filename: "sample2.pdf", originalname: "Sample PDF 2" },
    // Add more PDFs as needed
  ];
  return (
    <div className="App">
      <h1>MERN Stack PDF File Upload and Download</h1>

      {/* Component for uploading PDF files */}
      <FileUpload />

      {/* Component for listing and downloading PDF files */}
      <PDFList pdfs={pdfs} />
    </div>
  );
}

export default App;
