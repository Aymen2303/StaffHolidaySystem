import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import VacationPDF from "./VacationPdf";

const PrintVacationPDF = ({ formData }) => {
  return (
    <div>
      <PDFDownloadLink document={<VacationPDF formData={formData} />} fileName="Vacation_Form.pdf">
        {({ loading }) => (loading ? "Loading document..." : "Download PDF")}
      </PDFDownloadLink>
    </div>
  );
};

export default PrintVacationPDF;
