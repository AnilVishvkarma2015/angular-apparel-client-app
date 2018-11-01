import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Sale } from '../models/sale.model';
import { ToastService } from './toast.service';
import { UtilityService } from './utility.service';
import { AppConfig } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  apiBaseURL = AppConfig.settings.apiServer.baseURL;

  constructor(private http: HttpClient, private toastService: ToastService, private utility: UtilityService) { }

  createSale(newSale: Sale) {
    return this.http.post(this.apiBaseURL + 'sales/create', newSale, this.utility.requestHeaders())
      .subscribe(res => {
        this.toastService.openSnackBar('Bill Created Successfully', '', 'success-snackbar');
        return res;
      }, error => { throw error; });
  }

  getSales() {
    return this.http.get<Sale[]>(this.apiBaseURL + 'sales/').pipe(map(res => {
      return res;
    }));
  }

  updateSale(updatedSale: Sale) {
    return this.http.put(this.apiBaseURL + 'sales/' + updatedSale.id, updatedSale)
      .subscribe(res => {
        this.toastService.openSnackBar('Bill Updated Successfully', '', 'success-snackbar');
        return res;
      }, error => { throw error; });

  }

  deleteSale(deleteSale: Sale) {
    return this.http.delete(this.apiBaseURL + 'sales/' + deleteSale.id)
      .subscribe(res => {
        this.toastService.openSnackBar('Bill Deleted Successfully', '', 'success-snackbar');
        return res;
      }, error => { throw error; });
  }
}
