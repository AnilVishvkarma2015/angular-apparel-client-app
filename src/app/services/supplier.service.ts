import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

import { Supplier } from '../models/supplier.model';
import { ToastService } from './toast.service';
import { UtilityService } from './utility.service';
import { AppConfig } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  apiBaseURL = AppConfig.settings.apiServer.baseURL;

  constructor(private http: HttpClient, private toastService: ToastService, private utility: UtilityService) { }

  createSupplier(newSupplier: Supplier) {
    return this.http.post(this.apiBaseURL + 'suppliers/create', newSupplier, this.utility.requestHeaders())
      .subscribe(res => {
        this.toastService.openSnackBar('Supplier Created Successfully', '', 'success-snackbar');
        return res;
      }, error => { throw error; });
  }

  getSuppliers() {
    return this.http.get<Supplier[]>(this.apiBaseURL + 'suppliers/').pipe(map(res => {
      return res;
    }));
  }

  updateSupplier(updatedSupplier: Supplier) {
    return this.http.put(this.apiBaseURL + 'suppliers/' + updatedSupplier.id, updatedSupplier)
      .subscribe(res => {
        this.toastService.openSnackBar('Supplier Updated Successfully', '', 'success-snackbar');
        return res;
      }, error => { throw error; });

  }

  deleteSupplier(deleteSupplier: Supplier) {
    return this.http.delete(this.apiBaseURL + 'suppliers/' + deleteSupplier.id)
      .subscribe(res => {
        this.toastService.openSnackBar('Supplier Deleted Successfully', '', 'success-snackbar');
        return res;
      }, error => { throw error; });
  }
}
