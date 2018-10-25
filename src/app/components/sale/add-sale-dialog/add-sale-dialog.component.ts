import { Component } from '@angular/core';
import { MatDialogRef, MatTableDataSource } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { Sale } from '../../../models/sale.model';
import { SaleService } from '../../../services/sale.service';

@Component({
  selector: 'app-add-sale-dialog',
  templateUrl: './add-sale-dialog.component.html',
  styleUrls: ['./add-sale-dialog.component.scss']
})
export class AddSaleDialogComponent {
  displayedColumns = ['billNumber', 'quantity'];
  dataSource: MatTableDataSource<Sale>;
  Sales: Sale[] = [];

  form: FormGroup;
  id: string;
  customerPhone: string;
  customerName: string;
  billNumber: Number;
  billDate: Date;
  productBarcode: string;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddSaleDialogComponent>,
    private salesService: SaleService) {

    this.form = this.formBuilder.group({
      id: [""],
      customerPhone: ["", Validators.required],
      customerName: ["", Validators.required],
      billNumber: [Date.now(), Validators.required],
      billDate: [Date.now(), Validators.required],
      productBarcode: ["", Validators.required]
    });

    this.salesService.getSales()
      .subscribe(sales => {
        this.dataSource = new MatTableDataSource(sales);
      }, err => {
        throw err;
      });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched)
    );
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
  sendProduct() {
    $.ajax({
      type: "GET",
      url: "http://localhost:3000/suppliers/",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YmEzZTE0MjEwOThlMzQyYWM5YjE0OTkiLCJpYXQiOjE1NDAwNTA4NzQsImV4cCI6MTU0MDA1MTQ3NH0.qTc33ivRqdp0kaTk4t8u5nn4Cb7Hr2P20bw8v89srCM'
      },
      dataType: 'json',
      success: function (response, responseStatus) {
        if (responseStatus == 'success') {
          console.log("response received");
          console.log("response -----", response);
        }
      },
      error: function (responseData) {
        alert("Error in send product" + JSON.stringify(responseData));
      }
    });
  }
}
