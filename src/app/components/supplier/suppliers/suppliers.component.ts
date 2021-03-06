import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { first, finalize } from 'rxjs/operators';

import { AddSupplierDialogComponent } from '../add-supplier-dialog/add-supplier-dialog.component';
import { UpdateSupplierDialogComponent } from '../update-supplier-dialog/update-supplier-dialog.component';
import { Supplier } from '../../../models/supplier.model';
import { SupplierService } from '../../../services/supplier.service';
import { ExportPdfService } from '../../../services/export-pdf.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html'
})
export class SuppliersComponent {
  displayedColumns = ['supplierName', 'supplierEmail', 'supplierPhone', 'supplierCity', 'actions'];
  dataSource: MatTableDataSource<Supplier>;
  Suppliers: Supplier[] = [];
  isLoading = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,
    private supplierService: SupplierService,
    private exportPdfService: ExportPdfService,
    private toastService: ToastService) { }

  ngAfterViewInit() {
    this.loadSuppliers();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  private loadSuppliers() {
    this.supplierService.getSuppliers().pipe(
      finalize(() => this.isLoading = false))
      .subscribe(suppliers => {
        this.dataSource = new MatTableDataSource(suppliers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.toastService.openSnackBar('Data Loading Error: ' + err.status + ' - ' + err.statusText, '', 'error-snackbar');
        throw err;
      });
  }

  addSupplier() {
    const dialofConfig = new MatDialogConfig();

    dialofConfig.disableClose = true;
    dialofConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AddSupplierDialogComponent, dialofConfig);

    dialogRef.afterClosed().subscribe(form => {
      if (form) {
        this.supplierService.createSupplier(form).add(() => {
          this.loadSuppliers();
        });
      }
    });
  }

  updateSupplier(supplier: Supplier) {
    const dialofConfig = new MatDialogConfig();

    dialofConfig.disableClose = true;
    dialofConfig.autoFocus = true;

    dialofConfig.data = {
      id: supplier.id,
      supplierName: supplier.supplierName,
      supplierCode: supplier.supplierCode,
      supplierEmail: supplier.supplierEmail,
      supplierPhone: supplier.supplierPhone,
      supplierCountry: supplier.supplierCountry,
      supplierState: supplier.supplierState,
      supplierCity: supplier.supplierCity,
      supplierAddress: supplier.supplierAddress
    };

    const dialogRef = this.dialog.open(UpdateSupplierDialogComponent, dialofConfig);

    dialogRef.afterClosed().subscribe(form => {
      if (form) {
        this.supplierService.updateSupplier(form).add(() => {
          this.loadSuppliers();
        })
      }
    });
  }

  deleteSupplier(supplier: Supplier) {
    this.supplierService.deleteSupplier(supplier).add(() => {
      this.loadSuppliers();
    })
  }

  downloadPDF() {
    let columns = ["No", "Supplier Name", "Supplier Email", "Supplier Phone", "Supplier City"];
    let rows = [];
    let itemName = "SUPPLIERS REPORT";
    let counter = 1;

    this.supplierService.getSuppliers().pipe(first()).subscribe(suppliers => {
      for (var supplier of suppliers) {
        let supplierArray = [
          counter++,
          supplier.supplierName,
          supplier.supplierEmail,
          supplier.supplierPhone,
          supplier.supplierCity
        ];
        rows.push(supplierArray);
      }
      this.exportPdfService.exportToPdf(columns, rows, itemName);
    })
  }
}
