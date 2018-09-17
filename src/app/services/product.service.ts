import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { ToastService } from './toast.service';
import { UtilityService } from './utility.service';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private toastService: ToastService, private utility: UtilityService) { }

  createProduct(newProduct: Product) {
    return this.http.post(this.utility.requestUrl() + 'products/create', newProduct, this.utility.requestHeaders())
      .subscribe(
        data => {
          this.toastService.openSnackBar('Product Created Successfully', '', 'success-snackbar');
          return data;
        },
        error => {
          catchError(this.utility.handleError);
          this.toastService.openSnackBar('Product Cannot Created', '', 'error-snackbar');
        });
  }

  getProducts() {
    return this.http.get<Product[]>(this.utility.requestUrl() + 'products/');
  }

  updateProduct(updatedProduct: Product) {
    return this.http.put(this.utility.requestUrl() + 'products/' + updatedProduct.id, updatedProduct)
      .subscribe(
        data => {
          this.toastService.openSnackBar('Product Updated Successfully', '', 'success-snackbar');
          return data;
        },
        error => {
          catchError(this.utility.handleError);
          this.toastService.openSnackBar('Product Cannot Updated', '', 'error-snackbar');
        });
  }

  deleteProduct(deleteProduct: Product) {
    return this.http.delete(this.utility.requestUrl() + 'products/' + deleteProduct.id)
      .subscribe(
        data => {
          this.toastService.openSnackBar('Product Deleted Successfully', '', 'success-snackbar');
        },
        error => {
          catchError(this.utility.handleError);
          this.toastService.openSnackBar('Product Cannot Deleted', '', 'error-snackbar');
        });
  }
}
