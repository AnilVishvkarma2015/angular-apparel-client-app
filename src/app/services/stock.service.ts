import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

import { Stock } from '../models/stock.model';
import { ToastService } from './toast.service';
import { UtilityService } from './utility.service';
import { AppConfig } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  apiBaseURL = AppConfig.settings.apiServer.baseURL;

  constructor(private http: HttpClient, private toastService: ToastService, private utility: UtilityService) { }

  createStock(newStock: Stock) {
    return this.http.post(this.apiBaseURL + 'stocks/create', newStock, this.utility.requestHeaders())
      .subscribe(res => {
        this.toastService.openSnackBar('Stock Added Successfully', '', 'success-snackbar');
        return res;
      }, error => { throw error; });
  }

  getStocks() {
    return this.http.get<Stock[]>(this.apiBaseURL + 'stocks/').pipe(map(res => {
      return res;
    }));
  }

  getStockByBarcode(barcode) {
    return this.http.get<any[]>(this.apiBaseURL + 'stocks/getByBarcode/' + barcode).pipe(map(res => {
      return res;
    }));
  }

  updateStock(updatedStock: Stock) {
    return this.http.put(this.apiBaseURL + 'stocks/' + updatedStock.id, updatedStock)
      .subscribe(res => {
        this.toastService.openSnackBar('Stock Updated Successfully', '', 'success-snackbar');
        return res;
      }, error => { throw error; });

  }

  deleteSupplier(deleteStock: Stock) {
    return this.http.delete(this.apiBaseURL + 'stocks/' + deleteStock.id)
      .subscribe(res => {
        this.toastService.openSnackBar('Stock Deleted Successfully', '', 'success-snackbar');
        return res;
      }, error => { throw error; });
  }
}
