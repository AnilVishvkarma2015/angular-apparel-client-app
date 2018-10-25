import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Customer } from '../models/customer.model';
import { ToastService } from './toast.service';
import { UtilityService } from './utility.service';
import { AppConfig } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiBaseURL = AppConfig.settings.apiServer.baseURL;

  constructor(private http: HttpClient, private toastService: ToastService, private utility: UtilityService) { }

  createCustomer(newCustomer: Customer) {
    return this.http.post(this.apiBaseURL + 'customers/create', newCustomer, this.utility.requestHeaders())
      .subscribe(res => {
        this.toastService.openSnackBar('Customer Created Successfully', '', 'success-snackbar');
        return res;
      }, error => { throw error; });
  }

  getCustomers() {
    return this.http.get<Customer[]>(this.apiBaseURL + 'customers/').pipe(map(res => {
      return res;
    }));
  }

  updateCustomer(updatedCustomer: Customer) {
    return this.http.put(this.apiBaseURL + 'customers/' + updatedCustomer.id, updatedCustomer)
      .subscribe(res => {
        this.toastService.openSnackBar('Customer Updated Successfully', '', 'success-snackbar');
        return res;
      }, error => { throw error; });

  }

  deleteCustomer(deleteCustomer: Customer) {
    return this.http.delete(this.apiBaseURL + 'customers/' + deleteCustomer.id)
      .subscribe(res => {
        this.toastService.openSnackBar('Customer Deleted Successfully', '', 'success-snackbar');
        return res;
      }, error => { throw error; });
  }
}
