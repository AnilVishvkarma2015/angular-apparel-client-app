import { Injectable } from '@angular/core';
import * as _ from 'underscore';

import { ProductService } from './product.service';
import { SupplierService } from './supplier.service';

@Injectable({
  providedIn: 'root'
})
export class CommonSelectDropdownService {

  constructor(private productService: ProductService, private supplierService: SupplierService) { }

  setSupplierOptions() {
    return new Promise((resolve, reject) => {
      let suppliersList: string[] = [];
      return this.supplierService.getSuppliers().subscribe(suppliers => {
        _.each(suppliers, function (supplier) {
          suppliersList.push(supplier.supplierName);
        })
        resolve(_.uniq(suppliersList));
        reject(new Error(`Cannot load Product Category`));
      });
    });
  }

  setProductCategoryOptions() {
    return new Promise((resolve, reject) => {
      let productCategpryList: string[] = [];
      return this.productService.getProducts().subscribe(products => {
        _.each(products, function (product) {
          productCategpryList.push(product.productCategory);
        })
        resolve(_.uniq(productCategpryList));
        reject(new Error(`Cannot load Product Category`));
      });
    });
  }

  setProductBrandOptions(categorySelected) {
    return new Promise((resolve, reject) => {
      let productBrandList: string[] = [];
      return this.productService.getProducts().subscribe(products => {
        _.each(products, function (product) {
          if (product.productCategory === categorySelected) {
            productBrandList.push(product.productBrand);
          }
        });
        resolve(_.uniq(productBrandList));
        reject(new Error(`Cannot load Product Brand`));
      });
    });
  }

  setProductNameOptions(brandSelected) {
    return new Promise((resolve, reject) => {
      let productNameList: string[] = [];
      return this.productService.getProducts().subscribe(products => {
        _.each(products, function (product) {
          if (product.productBrand === brandSelected) {
            productNameList.push(product.productName);
          }
        });
        resolve(_.uniq(productNameList));
        reject(new Error(`Cannot load Product Name`));
      });
    });
  }
}
