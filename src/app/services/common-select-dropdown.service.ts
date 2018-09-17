import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as _ from 'underscore';

import { ProductService } from './product.service';
import { SupplierService } from './supplier.service';

@Injectable({
  providedIn: 'root'
})
export class CommonSelectDropdownService {

  constructor(private productService: ProductService, private supplierService: SupplierService) { }

  returnData(): string[] {
    let data: Array<string> = ['Data1', 'Data2', 'Data3', 'Data4', 'Data5'];
    return data;
  }

  setProductCategoryOptions() {
    console.log("category called ");
    let productCategory: string[] = [];
    return this.productService.getProducts().subscribe(products => {
      /*  _.each(products, function (product) {
         productCategory.push(product.productCategory);
       });
       console.log("category called juniq ---", _.uniq(productCategory));
       return _.uniq(productCategory); */
      return products;
    })
  }

  setProductBrandOptions(categorySelected) {
    console.log("Category Selected ----", categorySelected);
    this.productService.getProducts().subscribe(products => {
      console.log("Products Selected ----", products);
      let productBrand = [];
      /*  _.each(_.filter(products, function (product) {
         product.productCategory == categorySelected;
       }), function (product) {
         productBrand.push(product.productBrand);
       });
       return _.uniq(productBrand); */
    })
  }
}
