import { Component } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'underscore';
import { Router } from '@angular/router';

import { Sale } from '../../../models/sale.model';
import { SaleItems } from '../../../models/saleitems.model';
import { CustomerService } from 'src/app/services/customer.service';
import { StockService } from 'src/app/services/stock.service';


import { CommonSelectDropdownService } from '../../../services/common-select-dropdown.service';
import { PurchaseorderService } from '../../../services/purchaseorder.service';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-create-sale',
  templateUrl: './create-sale.component.html',
  styleUrls: ['./create-sale.component.scss']
})
export class CreateSaleComponent {
  public billingItems: SaleItems[] = [];
  public billing: Sale;
  public customerPhone: String;
  public customerName: String;

  quantitySold = 0;
  grandTotal = 0;
  discount = 5;
  netAmount = 0;
  isItemAlreadyAdded = false;

  formGroup: FormGroup;
  billingDetailFormGroup: FormGroup;
  billingItemsFormGroup: FormGroup;
  billingCheckoutFormGroup: FormGroup;

  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null { return this.formGroup.get('formArray'); }

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private customerService: CustomerService,
    private stockService: StockService) {

    this.formGroup = this.formBuilder.group({
      formArray: this.formBuilder.array([
        this.formBuilder.group({
          id: [""],
          customerPhone: ["", Validators.required],
          customerName: ["", Validators.required]
        }),
        this.formBuilder.group({
          billNumber: [Date.now()],
          billDate: [Date.now()],
          barcode: [""],
          customerPhone: ["", Validators.required]
        }),
        this.formBuilder.group({
          totalItems: [0],
          grandTotal: [0],
          discount: [0],
          netAmount: [0]
        })
      ])
    });
  }

  getCustomerDetail(customerPhone) {
    if (customerPhone.length !== 10) {
      console.log("Customer phone length is not correct.");
      return;
    }

    let billingDetailReceived = this.formGroup.value.formArray[0];
    this.customerService.getCustomerByPhone(customerPhone).subscribe(customer => {
      this.formArray.get([0]).setValue({
        id: [billingDetailReceived.id],
        customerPhone: [customerPhone],
        customerName: [customer[0].customerName]
      });
      this.formArray.get([1]).setValue({
        billNumber: [Date.now()],
        billDate: [Date.now()],
        barcode: [""],
        customerPhone: [customerPhone]
      })
    }, err => {
      throw err;
    });
  }

  itemScanned(barcode) {
    this.isItemAlreadyAdded = false;
    let billingItemReceived = this.formGroup.value.formArray[1];
    if (barcode.length === 5) {
      for (let i = 0; i < this.billingItems.length; i++) {
        let item = this.billingItems[i];
        if (item.productBarcode === barcode) {
          item.quantity = item.quantity + 1;
          item.totalAmount = item.totalAmount + item.sellingPrice;
          this.grandTotal = this.grandTotal + item.sellingPrice;
          this.quantitySold = this.quantitySold + 1;
          this.isItemAlreadyAdded = true;
          break;
        }
      }

      if (!this.isItemAlreadyAdded) {
        this.stockService.getStockByBarcode(billingItemReceived.barcode)
          .subscribe(stocksList => {
            let stock = stocksList[0];
            let billingItem = new SaleItems;
            billingItem.productCategory = stock.productCategory;
            billingItem.productBrand = stock.productBrand;
            billingItem.productName = stock.productName;
            billingItem.productBarcode = stock.productBarcode;
            billingItem.quantity = 1;
            billingItem.sellingPrice = stock.sellingPrice;
            billingItem.totalAmount = stock.sellingPrice;
            this.billingItems.push(billingItem);
            this.grandTotal = this.grandTotal + stock.sellingPrice;
            this.quantitySold = this.quantitySold + 1;
          }, err => {
            throw err;
          });
      }
    }
  }

  checkoutDetail() {
    let discountAmount = ((this.grandTotal) * (this.discount)) / 100;
    this.netAmount = this.grandTotal - discountAmount;
    console.log("-----", this.netAmount);
  }



  /* onSubmit() {
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
  } */
}