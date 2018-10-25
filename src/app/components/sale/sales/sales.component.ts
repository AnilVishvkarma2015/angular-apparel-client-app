import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { first, finalize } from 'rxjs/operators';
import * as $ from 'jquery';

import { SaleService } from '../../../services/sale.service';
import { Sale } from '../../../models/sale.model';
import { ExportPdfService } from '../../../services/export-pdf.service';
import { ToastService } from '../../../services/toast.service';
import { AddSaleDialogComponent } from '../add-sale-dialog/add-sale-dialog.component';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent {
  displayedColumns = ['billNumber', 'quantity', 'billAmount', 'discount', 'netAmount', 'customerName', 'customerPhone'];
  dataSource: MatTableDataSource<Sale>;
  Sales: Sale[] = [];
  isLoading = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private salesService: SaleService,
    public dialog: MatDialog,
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
        this.dataSource = new MatTableDataSource(sales);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.toastService.openSnackBar('Data Loading Error: ' + err.status + ' - ' + err.statusText, '', 'error-snackbar');
        throw err;
      });
  }

  newBill() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AddSaleDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(form => {
      if (form) {
        this.salesService.createSale(form).add(() => {
          this.loadSales();
        })
      }
    })
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
          sale.customerName,
          sale.quantity,
          sale.billAmount,
          sale.discount,
          sale.netAmount
        ];
        rows.push(salesArray);
      }
      this.exportPdfService.exportToPdf(columns, rows, itemName);
    })
  }
}
