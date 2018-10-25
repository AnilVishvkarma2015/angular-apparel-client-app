import { Component } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'underscore';
import { Router } from '@angular/router';

import { PurchaseOrder } from '../../../models/purchaseorder.model';
import { PoItems } from '../../../models/poitems.model';
import { CommonSelectDropdownService } from '../../../services/common-select-dropdown.service';
import { PurchaseorderService } from '../../../services/purchaseorder.service';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-create-po',
  templateUrl: './create-po.component.html',
  styleUrls: ['./create-po.component.scss']
})
export class CreatePoComponent {
  public poItems: PoItems[] = [];
  public purchaseOrder: PurchaseOrder;
  public supplierNames: string[] = [];
  public productCategories: string[] = [];
  public productBrands: {};
  public productNames: {};
  productsCount = 0;
  billingAmount = 0;

  formGroup: FormGroup;
  poDetailFormGroup: FormGroup;
  poItemsFormGroup: FormGroup;

  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null { return this.formGroup.get('formArray'); }

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private poService: PurchaseorderService,
    private productService: ProductService,
    private dropdownService: CommonSelectDropdownService) {
    this.formGroup = this.formBuilder.group({

      formArray: this.formBuilder.array([
        this.formBuilder.group({
          id: [""],
          orderNumber: [Date.now(), Validators.required],
          orderStatus: ['Pending', Validators.required],
          supplierName: ["", Validators.required],
          deliveryDate: [Date.now(), Validators.required]
        }),
        this.formBuilder.group({
          productCategory: ["", Validators.required],
          productBrand: ["", Validators.required],
          productName: ["", Validators.required],
          orderQuantity: ["", Validators.required]
        })
      ])
    });

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

  addItem() {
    let poReceived = this.formGroup.value.formArray[0];
    let itemReceived = this.formGroup.value.formArray[1];
    let poItem = new PoItems;
    poItem.id = poReceived.id;
    poItem.orderNumber = poReceived.orderNumber;
    poItem.orderStatus = poReceived.orderStatus;
    poItem.supplierName = poReceived.supplierName;
    poItem.productCategory = itemReceived.productCategory;
    poItem.productBrand = itemReceived.productBrand;
    poItem.productName = itemReceived.productName;
    poItem.orderQuantity = itemReceived.orderQuantity;

    this.productService.getBarcodeByProduct({ productName: itemReceived.productName, productBrand: itemReceived.productBrand })
      .subscribe(productDetail => {
        let productPrice = productDetail[0].productPrice;
        poItem.productPrice = productPrice;
        poItem.productsOrderPrice = (itemReceived.orderQuantity) * (productPrice);
        this.poItems.push(poItem);

        this.productsCount = (this.productsCount) + parseInt(itemReceived.orderQuantity);
        this.billingAmount = (this.billingAmount) + (itemReceived.orderQuantity * productPrice)
      }, err => {
        throw err;
      });
  }

  onSubmit() {
    let po = this.formGroup.value.formArray[0];
    this.purchaseOrder = {
      id: po.id,
      orderNumber: po.orderNumber,
      orderStatus: po.orderStatus,
      supplierName: po.supplierName,
      quantityOrdered: this.productsCount,
      deliveryDate: po.deliveryDate,
      billingAmount: this.billingAmount,
      poItems: this.poItems
    };

    if (this.purchaseOrder) {
      this.poService.createPO(this.purchaseOrder).add(() => {
        this.router.navigate(['purchaseorders']);
      })
    }
  }
}