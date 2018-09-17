import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'underscore';

import { SupplierService } from '../../../services/supplier.service';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-add-po-dialog',
  templateUrl: './add-po-dialog.component.html',
  styleUrls: ['./add-po-dialog.component.scss']
})
export class AddPoDialogComponent {
  public suppliers: Array<any> = [];
  public productCategories: Array<string> = [];
  public productBrands: Array<string> = [];
  public productNames: Array<string> = [];

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
    private supplierService: SupplierService,
    private productService: ProductService) {

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

    this.setSupplierOptions();
    this.setProductCategoryOptions();
  }

  setSupplierOptions() {
    this.supplierService.getSuppliers().subscribe(suppliers => {
      this.suppliers = suppliers;
    })
  }

  setProductCategoryOptions() {
    return this.productService.getProducts().subscribe(products => {
      let productCategory = [];
      _.each(products, function (product) {
        productCategory.push(product.productCategory);
      });
      this.productCategories = _.uniq(productCategory);
    })
  }

  setProductBrandOptions(categorySelected: String) {
    this.productService.getProducts().subscribe(products => {
      let productBrand = [];
      _.each(_.filter(products, function (product) {
        return product.productCategory == categorySelected;
      }), function (product) {
        productBrand.push(product.productBrand);
      });

      this.productBrands = _.uniq(productBrand);
    })
  }

  setProductNameOptions(brandSelected: String) {
    this.productService.getProducts().subscribe(products => {
      let productName = [];
      _.each(_.filter(products, function (product) {
        return product.productBrand == brandSelected;
      }), function (product) {
        productName.push(product.productName);
      });

      this.productNames = _.uniq(productName);
    })
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
