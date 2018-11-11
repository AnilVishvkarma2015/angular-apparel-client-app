import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { first, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

import { SaleService } from '../../../services/sale.service';
import { Sale } from '../../../models/sale.model';
import { ExportPdfService } from '../../../services/export-pdf.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent {
  displayedColumns = ['billNumber', 'quantitySold', 'grandTotal', 'discount', 'netAmount', 'customerPhone', 'action'];
  dataSource: MatTableDataSource<Sale>;
  Sales: Sale[] = [];
  isLoading = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private salesService: SaleService,
    public dialog: MatDialog,
    private router: Router,
    private exportPdfService: ExportPdfService,
    private toastService: ToastService
  ) { }

  ngAfterViewInit() {
    this.loadSales();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  private loadSales() {
    this.salesService.getSales().pipe(
      finalize(() => this.isLoading = false))
      .subscribe(sales => {
        console.log("Sales records ---", sales);
        this.dataSource = new MatTableDataSource(sales);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.toastService.openSnackBar('Data Loading Error: ' + err.status + ' - ' + err.statusText, '', 'error-snackbar');
        throw err;
      });
  }

  newBill() {
    this.router.navigate(['create-sale']);
  }

  downloadPDF() {
    let columns = ["No", "Bill Number", "Customer", "Quantity", "Bill Amount", "Discount", "Net Amount"];
    let rows = [];
    let itemName = "SALES REPORTS";
    let counter = 1;

    this.salesService.getSales().pipe(first()).subscribe(sales => {
      for (var sale of sales) {
        let salesArray = [
          counter++,
          sale.billNumber,
          sale.customerPhone,
          sale.quantitySold,
          sale.grandTotal,
          sale.discount,
          sale.netAmount
        ];
        rows.push(salesArray);
      }
      this.exportPdfService.exportToPdf(columns, rows, itemName);
    })
  }

  showBill(billingRecord) {
    let columns = ["Item", "Quantity", "Rate", "Amount"];
    let rows = [];
    let itemName = "TAX INVOICE";
    let billlingItem = billingRecord.billingItems;
    let lineHeight = 208;

    let invoiceDetails = {
      billNumber: billingRecord.billNumber,
      billDate: billingRecord.billDate,
      customerPhone: billingRecord.customerPhone,
      counter: "Counter - D"
    }

    for (var bill of billlingItem) {
      lineHeight = lineHeight + 21;
      let itemsArray = [
        bill.productName,
        bill.quantity,
        bill.sellingPrice,
        bill.totalAmount
      ];
      rows.push(itemsArray);
    }

    rows.push(["", "", "Grand Total (Rs.)", billingRecord.grandTotal]);
    rows.push(["", "", "Discount (%)", billingRecord.discount]);
    rows.push(["", "", "Net Amount (Rs.)", billingRecord.netAmount]);
    this.exportPdfService.exportBillPdf(columns, rows, lineHeight, itemName, invoiceDetails);
  }
}
