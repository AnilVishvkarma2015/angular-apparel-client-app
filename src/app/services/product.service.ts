import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

import { ToastService } from './toast.service';
import { UtilityService } from './utility.service';
import { Product } from '../models/product.model';
import { AppConfig } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiBaseURL = AppConfig.settings.apiServer.baseURL;

  constructor(private http: HttpClient, private toastService: ToastService, private utility: UtilityService) { }

  createProduct(newProduct: Product) {
    return this.http.post(this.apiBaseURL + 'products/create', newProduct, this.utility.requestHeaders())
      .subscribe(res => {
        this.toastService.openSnackBar('Product Created Successfully', '', 'success-snackbar');
        return res;
      }, error => { throw error; });
  }

  getProducts() {
    return this.http.get<Product[]>(this.apiBaseURL + 'products/').pipe(map(res => {
      return res;
    }));
  }

  getBarcodeByProduct(productParams) {
    return this.http.post(this.apiBaseURL + 'products/getBarcode', productParams, this.utility.requestHeaders()).pipe(map(res => {
      return res;
    }));
  }

  updateProduct(updatedProduct: Product) {
    return this.http.put(this.apiBaseURL + 'products/' + updatedProduct.id, updatedProduct)
      .subscribe(res => {
        this.toastService.openSnackBar('Product Updated Successfully', '', 'success-snackbar');
        return res;
      }, error => { throw error; });
  }

  deleteProduct(deleteProduct: Product) {
    return this.http.delete(this.apiBaseURL + 'products/' + deleteProduct.id)
      .subscribe(res => {
        this.toastService.openSnackBar('Product Deleted Successfully', '', 'success-snackbar');
        return res;
      }, error => { throw error; });
  }
}
