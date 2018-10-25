import { Component, ViewChild, Injectable } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { first, finalize } from 'rxjs/operators';

import { StockService } from '../../../services/stock.service';
import { Stock } from '../../../models/stock.model';
import { ExportPdfService } from '../../../services/export-pdf.service';
import { UpdateStockDialogComponent } from '../update-stock-dialog/update-stock-dialog.component';
import { ToastService } from '../../../services/toast.service';
import { AppConfig } from '../../../config/app.config';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html'
})
export class StocksComponent {
  displayedColumns = ['productName', 'productBrand', 'stockQuantity', 'stockStatus', 'sellingPrice', 'marginPercent', 'actions'];
  dataSource: MatTableDataSource<Stock>;
  Stocks: Stock[] = [];
  isLoading = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private stockService: StockService,
    public dialog: MatDialog,
    private exportPdfService: ExportPdfService,
    private toastService: ToastService
  ) { }

  ngAfterViewInit() {
    this.loadStocks();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  private loadStocks() {
    this.stockService.getStocks().pipe(
      finalize(() => this.isLoading = false))
      .subscribe(stocks => {
        this.dataSource = new MatTableDataSource(stocks);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.toastService.openSnackBar('Data Loading Error: ' + err.status + ' - ' + err.statusText, '', 'error-snackbar');
        throw err;
      });
  }

  private calculateSellingPrice(productPrice, margin) {
    productPrice = parseInt(productPrice);
    let profit = (productPrice / 100) * margin;
    return (productPrice + profit);
  }

  addStock(poReceived) {
    this.stockService.getStockByBarcode(poReceived.productBarcode)
      .subscribe(stocks => {
        if (stocks.length > 0) {
          let existingStock = stocks[0];
          existingStock.stockQuantity = existingStock.stockQuantity + parseInt(poReceived.orderQuantity);
          existingStock.productPrice = poReceived.productPrice;
          existingStock.sellingPrice = this.calculateSellingPrice(poReceived.productPrice, existingStock.marginPercent);
          this.stockService.updateStock(existingStock);
          return;
        }

        let newStock = new Stock();
        newStock.productName = poReceived.productName;
        newStock.productBrand = poReceived.productBrand;
        newStock.productCategory = poReceived.productCategory;
        newStock.productBarcode = poReceived.productBarcode;
        newStock.stockQuantity = poReceived.orderQuantity;
        newStock.sellingPrice = this.calculateSellingPrice(poReceived.productPrice, AppConfig.settings.defaultMarginPercent);
        newStock.productPrice = poReceived.productPrice;
        newStock.stockStatus = "Inactive";
        newStock.marginPercent = AppConfig.settings.defaultMarginPercent;
        this.stockService.createStock(newStock);
      }, err => {
        throw err;
      });
  }

  updateStock(updatedStock: Stock) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: updatedStock.id,
      productName: updatedStock.productName,
      productBrand: updatedStock.productBrand,
      productCategory: updatedStock.productCategory,
      productBarcode: updatedStock.productBarcode,
      stockQuantity: updatedStock.stockQuantity,
      stockStatus: updatedStock.stockStatus,
      sellingPrice: updatedStock.sellingPrice,
      marginPercent: updatedStock.marginPercent
    }

    const dialogRef = this.dialog.open(UpdateStockDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(form => {
      if (form) {
        form.sellingPrice = this.calculateSellingPrice(updatedStock.productPrice, form.marginPercent);
        this.stockService.updateStock(form).add(() => {
          this.loadStocks();
        });
      }
    })
  }

  downloadPDF() {
    let columns = ["No", "Product", "Brand", "Quantity", "Selling Price", "Margin Percent"];
    let rows = [];
    let itemName = "STOCKS RECORDS";
    let counter = 1;

    this.stockService.getStocks().pipe(first()).subscribe(stocks => {
      for (var stock of stocks) {
        let stockArray = [
          counter++,
          stock.productName,
          stock.productBrand,
          stock.stockQuantity,
          stock.sellingPrice,
          stock.marginPercent
        ];
        rows.push(stockArray);
      }
      this.exportPdfService.exportToPdf(columns, rows, itemName);
    })
  }
}
