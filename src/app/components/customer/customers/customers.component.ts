import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { first, finalize } from 'rxjs/operators';

import { AddCustomerDialogComponent } from '../add-customer-dialog/add-customer-dialog.component';
import { Customer } from '../../../models/customer.model';
import { CustomerService } from '../../../services/customer.service';
import { ExportPdfService } from '../../../services/export-pdf.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html'
})
export class CustomersComponent {
  displayedColumns = ['customerName', 'customerEmail', 'customerPhone', 'customerCity'];
  dataSource: MatTableDataSource<Customer>;
  Customers: Customer[] = [];
  isLoading = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,
    private customerService: CustomerService,
    private exportPdfService: ExportPdfService,
    private toastService: ToastService) { }

  ngAfterViewInit() {
    this.loadCustomers();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  private loadCustomers() {
    this.customerService.getCustomers().pipe(
      finalize(() => this.isLoading = false))
      .subscribe(customers => {
        this.dataSource = new MatTableDataSource(customers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.toastService.openSnackBar('Data Loading Error: ' + err.status + ' - ' + err.statusText, '', 'error-snackbar');
        throw err;
      });
  }

  addCustomer() {
    const dialofConfig = new MatDialogConfig();

    dialofConfig.disableClose = true;
    dialofConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AddCustomerDialogComponent, dialofConfig);

    dialogRef.afterClosed().subscribe(form => {
      if (form) {
        this.customerService.createCustomer(form).add(() => {
          this.loadCustomers();
        });
      }
    });
  }

  downloadPDF() {
    let columns = ["No", "Customer Name", "Customer Email", "Customer Phone", "Customer City"];
    let rows = [];
    let itemName = "CUSTOMERS REPORT";
    let counter = 1;

    this.customerService.getCustomers().pipe(first()).subscribe(customers => {
      for (var customer of customers) {
        let customerArray = [
          counter++,
          customer.customerName,
          customer.customerEmail,
          customer.customerPhone,
          customer.customerCity
        ];
        rows.push(customerArray);
      }
      this.exportPdfService.exportToPdf(columns, rows, itemName);
    })
  }
}
