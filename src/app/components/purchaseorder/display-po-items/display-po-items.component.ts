import { Component, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { finalize } from 'rxjs/operators';

import { PoItems } from '../../../models/poitems.model';
import { ExportPdfService } from 'src/app/services/export-pdf.service';

@Component({
  selector: 'app-display-po-items',
  templateUrl: './display-po-items.component.html',
  styleUrls: ['./display-po-items.component.scss']
})
export class DisplayPoItemsComponent {
  displayedColumns = ['productCategory', 'productBrand', 'productName', 'orderQuantity', 'productPrice', 'productsOrderPrice'];
  dataSource: MatTableDataSource<PoItems>;
  PoItems: PoItems[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private exportPdfService: ExportPdfService,
    private dialogRef: MatDialogRef<DisplayPoItemsComponent>,
    @Inject(MAT_DIALOG_DATA) poItems: PoItems[]) {
    this.PoItems = poItems;
    this.loadItems(poItems);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  private loadItems(poItems) {
    this.dataSource = new MatTableDataSource(poItems);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  downloadPDF() {
    let columns = ["No", "Category", "Brand", "Product", "Quantity", "Rate", "Amount"];
    let rows = [];
    let itemName = "PURCHASE ORDERS";
    let counter = 1;

    for (var poItem of this.PoItems) {
      let itemArray = [
        counter++,
        poItem.productCategory,
        poItem.productBrand,
        poItem.productName,
        poItem.orderQuantity,
        poItem.productPrice,
        poItem.productsOrderPrice
      ];
      rows.push(itemArray);
    }
    this.exportPdfService.exportToPdf(columns, rows, itemName);
  }
}
