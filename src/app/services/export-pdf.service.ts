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
}
