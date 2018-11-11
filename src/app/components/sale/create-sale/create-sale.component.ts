import { Component } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'underscore';

import { Sale } from '../../../models/sale.model';
import { Stock } from '../../../models/stock.model';
import { SaleItems } from '../../../models/saleitems.model';
import { CustomerService } from 'src/app/services/customer.service';
import { StockService } from 'src/app/services/stock.service';
import { SaleService } from 'src/app/services/sale.service';
import { ExportPdfService } from 'src/app/services/export-pdf.service';

@Component({
  selector: 'app-create-sale',
  templateUrl: './create-sale.component.html',
  styleUrls: ['./create-sale.component.scss']
})
export class CreateSaleComponent {
  public billingItems: SaleItems[] = [];
  public billing: Sale;
  public customerPhone: string;
  public customerName: string;
  public billNumber: number;
  public billDate: string;

  quantitySold = 0;
  grandTotal = 0;
  discount = 5;
  netAmount = 0;
  paidAmount = 0;
  balanceAmount = 0;
  isItemAlreadyAdded = false;

  formGroup: FormGroup;
  billingDetailFormGroup: FormGroup;
  billingItemsFormGroup: FormGroup;
  billingCheckoutFormGroup: FormGroup;

  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null { return this.formGroup.get('formArray'); }

  constructor(private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private stockService: StockService,
    private saleService: SaleService,
    private exportPdfService: ExportPdfService,
    private router: Router) {

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
          grandTotal: [this.grandTotal],
          discount: [this.discount],
          netAmount: [this.netAmount],
          paidAmount: [this.paidAmount]
        })
      ])
    });
  }

  getCustomerDetail(customerPhone) {
    if (customerPhone.length !== 10) {
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
        billDate: [new Date().toLocaleString()],
        barcode: [""],
        customerPhone: [customerPhone]
      })
    }, err => {
      throw err;
    });
  }

  addCustomer() {
    let custDetailReceived = this.formGroup.value.formArray[0];
    this.customerService.createCustomer(custDetailReceived);
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
    this.netAmount = Math.ceil(this.netAmount);

    let billingDetailReceived = this.formGroup.value.formArray[1];
    this.billNumber = billingDetailReceived.billNumber;
    this.billDate = new Date().toLocaleString();
    this.customerPhone = billingDetailReceived.customerPhone;
    this.balanceAmount = this.netAmount;
  }

  paidAmountDetail(paidAmount) {
    this.paidAmount = paidAmount;
    this.balanceAmount = this.netAmount - paidAmount;
  }

  onSubmit() {
    this.billingItems.forEach(item => {
      this.stockService.getStockByBarcode(item.productBarcode)
        .subscribe(stocksList => {
          let stockToUpdate = new Stock();
          stockToUpdate.id = stocksList[0].id;
          stockToUpdate.stockQuantity = (stocksList[0].stockQuantity) - item.quantity;
          this.stockService.updateStock(stockToUpdate);
        }, err => {
          throw err;
        });
    });

    let newSale = new Sale();
    newSale.billNumber = this.billNumber;
    newSale.billDate = this.billDate;
    newSale.customerPhone = this.customerPhone;
    newSale.grandTotal = this.grandTotal;
    newSale.discount = this.discount;
    newSale.netAmount = this.netAmount;
    newSale.quantitySold = this.quantitySold;
    newSale.billingItems = this.billingItems;
    this.saleService.createSale(newSale).add(() => {
      this.generateBill(newSale);
      location.reload();
    })
  }

  generateBill(billingRecord) {
    let columns = ["Item", "Quantity", "Rate", "Amount"];
    let rows = [];
    let itemName = "TAX INVOICE";
    let billlingItem = billingRecord.billingItems;
    let lineHeight = 208;

    let invoiceDetails = {
      billNumber: this.billNumber,
      billDate: this.billDate,
      customerPhone: this.customerPhone,
      counter: "Counter - D"
    }

    for (var bill of billlingItem) {
      lineHeight = lineHeight + 21;
      let itemsArray = [
        bill.productName,
        bill.quantity,
        bill.sellingPrice,
        bill.totalAmount
      ];
      rows.push(itemsArray);
    }

    rows.push(["", "", "Grand Total (Rs.)", this.grandTotal]);
    rows.push(["", "", "Discount (%)", this.discount]);
    rows.push(["", "", "Net Amount (Rs.)", this.netAmount]);
    this.exportPdfService.exportBillPdf(columns, rows, lineHeight, itemName, invoiceDetails);
  }
}