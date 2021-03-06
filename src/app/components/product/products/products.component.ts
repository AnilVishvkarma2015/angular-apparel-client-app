import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { first, finalize } from 'rxjs/operators';

import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component';
import { UpdateProductDialogComponent } from '../update-product-dialog/update-product-dialog.component';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';
import { ExportPdfService } from '../../../services/export-pdf.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent {
  displayedColumns = ['productName', 'productBrand', 'productCategory', 'productBarcode', 'productPrice', 'actions'];
  dataSource: MatTableDataSource<Product>;
  Products: Product[] = [];
  isLoading = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productService: ProductService,
    public dialog: MatDialog,
    private exportPdfService: ExportPdfService,
    private toastService: ToastService
  ) { }

  ngAfterViewInit() {
    this.loadProducts();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  private loadProducts() {
    this.productService.getProducts().pipe(
      finalize(() => this.isLoading = false))
      .subscribe(products => {
        this.dataSource = new MatTableDataSource(products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.toastService.openSnackBar('Data Loading Error: ' + err.status + ' - ' + err.statusText, '', 'error-snackbar');
        throw err;
      });
  }

  addProduct() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AddProductDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(form => {
      if (form) {
        this.productService.createProduct(form).add(() => {
          this.loadProducts();
        })
      }
    });
  }

  updateProduct(product: Product) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: product.id,
      productName: product.productName,
      productBrand: product.productBrand,
      productCategory: product.productCategory,
      productBarcode: product.productBarcode,
      productPrice: product.productPrice
    };

    const dialogRef = this.dialog.open(UpdateProductDialogComponent,
      dialogConfig);

    dialogRef.afterClosed().subscribe(form => {
      if (form) {
        this.productService.updateProduct(form).add(() => {
          this.loadProducts();
        });
      }
    });
  }

  deleteProduct(orderToDelete: Product) {
    this.productService.deleteProduct(orderToDelete).add(() => {
      this.loadProducts();
    });
  }

  downloadPDF() {
    let columns = ["No", "Product Name", "Product Brand", "Product Category", "Product Barcode", "Product Price"];
    let rows = [];
    let itemName = "PRODUCTS REPORT";
    let counter = 1;

    this.productService.getProducts().pipe(first()).subscribe(products => {
      for (var product of products) {
        let productArray = [
          counter++,
          product.productName,
          product.productBrand,
          product.productCategory,
          product.productBarcode,
          product.productPrice
        ];
        rows.push(productArray);
      }
      this.exportPdfService.exportToPdf(columns, rows, itemName);
    })
  }
}
