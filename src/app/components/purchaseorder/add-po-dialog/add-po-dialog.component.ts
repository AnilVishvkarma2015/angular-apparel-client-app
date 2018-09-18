import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'underscore';

import { CommonSelectDropdownService } from '../../../services/common-select-dropdown.service';

@Component({
  selector: 'app-add-po-dialog',
  templateUrl: './add-po-dialog.component.html',
  styleUrls: ['./add-po-dialog.component.scss']
})
export class AddPoDialogComponent {
  public supplierNames: string[] = [];
  public productCategories: string[] = [];
  public productBrands: {};
  public productNames: {};

  form: FormGroup;
  id: string;
  orderNumber: string;
  orderStatus: string;
  productCategory: string;
  productBrand: string;
  productName: string;
  supplierName: string;
  orderQuantity: Number;
  deliveryDate: Date;
  purchasedPrice: Number

  constructor(private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddPoDialogComponent>,
    private dropdownService: CommonSelectDropdownService) {

    this.form = this.formBuilder.group({
      id: [""],
      orderNumber: [Date.now(), Validators.required],
      orderStatus: ['Pending', Validators.required],
      productCategory: ["", Validators.required],
      productBrand: ["", Validators.required],
      productName: ["", Validators.required],
      supplierName: ["", Validators.required],
      orderQuantity: ["", Validators.required],
      deliveryDate: [Date.now(), Validators.required],
      purchasedPrice: [0],
    })

    this.setProductCategoryOptions();
    this.setSupplierOptions();
  }

  setSupplierOptions() {
    this.dropdownService.setSupplierOptions().then(suppliers => {
      Array.prototype.push.apply(this.supplierNames, suppliers);
    })
  }

  setProductCategoryOptions() {
    this.dropdownService.setProductCategoryOptions().then(categories => {
      Array.prototype.push.apply(this.productCategories, categories);
    });
  }

  setProductBrandOptions(categorySelected) {
    this.dropdownService.setProductBrandOptions(categorySelected).then(brands => {
      this.productBrands = (brands);
    });
  }

  setProductNameOptions(brandSelected) {
    this.dropdownService.setProductNameOptions(brandSelected).then(names => {
      this.productNames = names;
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
}
