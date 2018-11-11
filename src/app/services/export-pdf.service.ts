import { Injectable } from '@angular/core';
declare var jsPDF: any;

@Injectable({
  providedIn: 'root'
})
export class ExportPdfService {

  constructor() { }

  exportToPdf(columns, rows, item) {
    var doc = new jsPDF('p', 'pt');
    doc.autoTable(columns, rows, {
      margin: { top: 150 },
      addPageContent: function (data) {
        doc.setFontSize(14);
        doc.setFontStyle('bold');
        doc.text("RSHOP", 40, 40);
        doc.setFontSize(10);
        doc.setFontStyle('bold');
        doc.text("4th Floor, Building No 2, Commerzone IT Park", 40, 55);
        doc.text("Yerwada, Pune-411006", 40, 70);
        doc.text("Email: anil.vishvkarma@jci.com", 40, 85);
        doc.text("Phone: +91 9713448164", 40, 100);
        doc.setLineWidth(2);
        doc.line(40, 115, 555, 115);

        doc.setFontSize(11);
        doc.setFontStyle('bold');
        doc.text(item, 240, 135);
      },
    });
    doc.save(item + '.pdf');
  }

  exportBillPdf(columns, rows, lineHeight, item, invoiceDetails) {
    var doc = new jsPDF('p', 'pt');
    doc.autoTable(columns, rows, {
      margin: { top: 185 },
      addPageContent: function () {
        doc.setFontSize(14);
        doc.setFontStyle('bold');
        doc.text("RSHOP", 40, 40);
        doc.setFontSize(10);
        doc.setFontStyle('bold');
        doc.text("4th Floor, Building No 2, Commerzone IT Park", 40, 55);
        doc.text("Yerwada, Pune-411006", 40, 70);
        doc.text("Email: anil.vishvkarma@jci.com", 40, 85);
        doc.text("Phone: +91 9713448164", 40, 100);
        doc.setLineWidth(2);
        doc.line(40, 115, 555, 115);

        doc.setFontSize(11);
        doc.setFontStyle('bold');
        doc.text(item, 270, 135);

        doc.setFontSize(10);
        doc.text("Bill Number : " + invoiceDetails.billNumber, 40, 155);
        doc.text("Bill Date : " + invoiceDetails.billDate, 400, 155);
        doc.text("Customer Phone : " + invoiceDetails.customerPhone, 40, 172);
        doc.text("Counter : " + invoiceDetails.counter, 400, 172);
      },
    });

    doc.setLineWidth(1);
    doc.line(40, lineHeight, 555, lineHeight);
    doc.line(40, lineHeight + 65, 555, lineHeight + 65);
    doc.save(invoiceDetails.billNumber + '.pdf');
  }
}
