import React from 'react';
import { Document, Page } from '@react-pdf/renderer';

const PDFViewer = ({ documentUrl }) => {
  return (
    <Document file={documentUrl}>
      <Page pageNumber={1} />
    </Document>
  );
};

export default PDFViewer;
