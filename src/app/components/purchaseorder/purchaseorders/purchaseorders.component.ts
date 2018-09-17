import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { first } from 'rxjs/operators';

import { PurchaseorderService } from '../../../services/purchaseorder.service';
import { PurchaseOrder } from '../../../models/purchaseorder.model';
import { ExportPdfService } from '../../../services/export-pdf.service';
import { AddPoDialogComponent } from '../add-po-dialog/add-po-dialog.component';
import { UpdatePoDialogComponent } from '../update-po-dialog/update-po-dialog.component';

@Component({
  selector: 'app-purchaseorders',
  templateUrl: './purchaseorders.component.html',
  styleUrls: ['./purchaseorders.component.scss']
})
export class PurchaseordersComponent {
  displayedColumns = ['orderNumber', 'orderStatus', 'productName', 'supplierName', 'orderQuantity', 'actions'];
  dataSource: MatTableDataSource<PurchaseOrder>;
  PurchaseOrders: PurchaseOrder[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private poService: PurchaseorderService,
    public dialog: MatDialog,
    private exportPdfService: ExportPdfService
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
    this.poService.getPOs().pipe(first()).subscribe(orders => {
      this.dataSource = new MatTableDataSource(orders);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  addPO() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AddPoDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(form => {
      if (form) {
        this.poService.createPO(form).add(() => {
          this.loadOrders();
        })
      }
    })
  }

  updatePO(updatedOrder: PurchaseOrder) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: updatedOrder.id,
      orderNumber: updatedOrder.orderNumber,
      orderStatus: updatedOrder.orderStatus,
      productCategory: updatedOrder.productCategory,
      productBrand: updatedOrder.productBrand,
      productName: updatedOrder.productName,
      supplierName: updatedOrder.supplierName,
      orderQuantity: updatedOrder.orderQuantity,
      deliveryDate: updatedOrder.deliveryDate
    }

    const dialogRef = this.dialog.open(UpdatePoDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(form => {
      if (form) {
        this.poService.updatePO(form).add(() => {
          this.loadOrders();
        });
      }
    })
  }

  deletePO(orderToDelete: PurchaseOrder) {
    this.poService.deletePO(orderToDelete).add(() => {
      this.loadOrders();
    });
  }

  downloadPDF() {
    let columns = ["No", "Order Number", "Order Status", "Product", "Supplier", "Quantity"];
    let rows = [];
    let itemName = "PURCHASE ORDERS";
    let counter = 1;

    this.poService.getPOs().pipe(first()).subscribe(orders => {
      for (var order of orders) {
        let orderArray = [
          counter++,
          order.orderNumber,
          order.orderStatus,
          order.productName,
          order.supplierName,
          order.orderQuantity
        ];
        rows.push(orderArray);
      }
      this.exportPdfService.exportToPdf(columns, rows, itemName);
    })
  }
}
