import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { first, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

import { PurchaseOrder } from '../../../models/purchaseorder.model';
import { Stock } from '../../../models/stock.model';
import { PurchaseorderService } from '../../../services/purchaseorder.service';
import { ExportPdfService } from '../../../services/export-pdf.service';
import { ToastService } from '../../../services/toast.service';
import { ProductService } from '../../../services/product.service';
import { UpdatePoDialogComponent } from '../update-po-dialog/update-po-dialog.component';
import { StocksComponent } from '../../stock/stocks/stocks.component';
import { DisplayPoItemsComponent } from '../display-po-items/display-po-items.component';

@Component({
  selector: 'app-purchaseorders',
  templateUrl: './purchaseorders.component.html'
})
export class PurchaseordersComponent {
  displayedColumns = ['orderNumber', 'orderStatus', 'supplierName', 'quantityOrdered', 'billingAmount', 'actions'];
  dataSource: MatTableDataSource<PurchaseOrder>;
  PurchaseOrders: PurchaseOrder[] = [];
  Stocks: Stock[] = [];
  isLoading = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private poService: PurchaseorderService,
    private router: Router,
    public dialog: MatDialog,
    private exportPdfService: ExportPdfService,
    private toastService: ToastService,
    private stock: StocksComponent,
    private productService: ProductService
  ) { }

  ngAfterViewInit() {
    this.loadOrders();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  private loadOrders() {
    this.poService.getPOs().pipe(
      finalize(() => this.isLoading = false))
      .subscribe(orders => {
        this.dataSource = new MatTableDataSource(orders);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.toastService.openSnackBar('Data Loading Error: ' + err.status + ' - ' + err.statusText, '', 'error-snackbar');
        throw err;
      });
  }

  createOrder() {
    this.router.navigate(['create-po']);
  }

  updateOrder(updatedOrder: PurchaseOrder) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: updatedOrder.id,
      orderNumber: updatedOrder.orderNumber,
      orderStatus: updatedOrder.orderStatus,
      supplierName: updatedOrder.supplierName,
      quantityOrdered: updatedOrder.quantityOrdered,
      billingAmount: updatedOrder.billingAmount,
      deliveryDate: updatedOrder.deliveryDate
    }

    const dialogRef = this.dialog.open(UpdatePoDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(form => {
      if (form) {
        this.poService.updatePO(form).add(() => {
          this.loadOrders();
          if (form.orderStatus === "Completed") {
            this.prepareStockPayload(updatedOrder);
          }
        });
      }
    })
  }

  private prepareStockPayload(orderCompleted) {
    this.poService.getPOById(orderCompleted.id)
      .subscribe(orderRetrieved => {
        // TODO: Should use insertMany to insert bulk records in one shot.
        orderRetrieved.poItems.forEach(element => {
          element.orderStatus = 'Completed';
          this.addStock(element);
        });
      }, err => {
        this.toastService.openSnackBar('Data Loading Error: ' + err.status + ' - ' + err.statusText, '', 'error-snackbar');
        throw err;
      });
  }

  private addStock(product) {
    this.productService.getBarcodeByProduct({ productName: product.productName, productBrand: product.productBrand })
      .subscribe(productDetail => {
        product.productBarcode = productDetail[0].productBarcode;
        this.stock.addStock(product);
      }, err => {
        throw err;
      });
  }

  deleteOrder(orderToDelete: PurchaseOrder) {
    this.poService.deletePO(orderToDelete).add(() => {
      this.loadOrders();
    });
  }


  selectedOrder(orderToDisplay) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.data = orderToDisplay.poItems;

    this.dialog.open(DisplayPoItemsComponent, dialogConfig);
  }

  downloadPDF() {
    let columns = ["No", "Order Number", "Order Status", "Order Quantity", "Supplier", "Amount"];
    let rows = [];
    let itemName = "PURCHASE ORDERS";
    let counter = 1;

    this.poService.getPOs().pipe(first()).subscribe(orders => {
      for (var order of orders) {
        let orderArray = [
          counter++,
          order.orderNumber,
          order.orderStatus,
          order.quantityOrdered,
          order.supplierName,
          order.billingAmount
        ];
        rows.push(orderArray);
      }
      this.exportPdfService.exportToPdf(columns, rows, itemName);
    })
  }
}
