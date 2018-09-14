import { Component, OnInit, Injectable } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ToastService } from '../../../services/toast.service';
import { Product } from '../../../models/product.model';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-products-crud-operations',
  templateUrl: './products-crud-operations.component.html',
  styleUrls: ['./products-crud-operations.component.scss']
})
export class ProductsCrudOperations implements OnInit {

  constructor(public toast: ToastService, private productService: ProductService) { }

  ngOnInit() {
  }

  updateProduct(product: Product) {
    return this.productService.updateProduct(product)
      .subscribe(
        data => {
          this.toast.openSnackBar('Product Updated Successfully', '', 'success-snackbar');
          return data;
        },
        error => {
          this.toast.openSnackBar('Product Cannot Updated', '', 'error-snackbar');
        });
  }

  saveProduct(product: Product) {
    return this.productService.createProduct(product)
      .subscribe(
        data => {
          this.toast.openSnackBar('Product Created Successfully', '', 'success-snackbar');
          return data;
        },
        error => {
          this.toast.openSnackBar('Product Cannot Created', '', 'error-snackbar');
        });
  }

  deleteProduct(product: Product) {
    return this.productService.deleteProduct(product)
      .subscribe(
        data => {
          this.toast.openSnackBar('Product Removed Successfully', '', 'success-snackbar');
        },
        error => {
          this.toast.openSnackBar('Product Cannot Deleted', '', 'error-snackbar');
        });
  }
}
