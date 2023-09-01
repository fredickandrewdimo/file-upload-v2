import React from "react";
import PDFDownloadLink from "./PDFDowloadLink";

function PDFList({ pdfs }) {
  return (
    <div>
      <h2>List of PDFs</h2>
      <ul>
        {pdfs.map((pdf, index) => (
          <li key={index}>
            <PDFDownloadLink filename={pdf.filename} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PDFList;
