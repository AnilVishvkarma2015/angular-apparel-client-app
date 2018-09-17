import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { Supplier } from '../models/supplier.model';
import { ToastService } from './toast.service';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient, private toastService: ToastService, private utility: UtilityService) { }

  createSupplier(newSupplier: Supplier) {
    return this.http.post(this.utility.requestUrl() + 'suppliers/create', newSupplier, this.utility.requestHeaders())
      .subscribe(
        data => {
          this.toastService.openSnackBar('Supplier Created Successfully', '', 'success-snackbar');
          return data;
        },
        error => {
          catchError(this.utility.handleError);
          this.toastService.openSnackBar('Supplier Cannot Created', '', 'error-snackbar');
        });
  }

  getSuppliers() {
    return this.http.get<Supplier[]>(this.utility.requestUrl() + 'suppliers/');
  }

  updateSupplier(updatedSupplier: Supplier) {
    return this.http.put(this.utility.requestUrl() + 'suppliers/' + updatedSupplier.id, updatedSupplier)
      .subscribe(
        data => {
          this.toastService.openSnackBar('Supplier Updated Successfully', '', 'success-snackbar');
          return data;
        },
        error => {
          catchError(this.utility.handleError);
          this.toastService.openSnackBar('Supplier Cannot Updated', '', 'error-snackbar');
        });
  }

  deleteSupplier(deleteSupplier: Supplier) {
    return this.http.delete(this.utility.requestUrl() + 'suppliers/' + deleteSupplier.id)
      .subscribe(
        data => {
          this.toastService.openSnackBar('Supplier Deleted Successfully', '', 'success-snackbar');
        },
        error => {
          catchError(this.utility.handleError);
          this.toastService.openSnackBar('Supplier Cannot Deleted', '', 'error-snackbar');
        });
  }
}
