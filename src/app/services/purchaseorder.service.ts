import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

import { PurchaseOrder } from '../models/purchaseorder.model';
import { ToastService } from './toast.service';
import { UtilityService } from './utility.service';
import { AppConfig } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class PurchaseorderService {
  apiBaseURL = AppConfig.settings.apiServer.baseURL;

  constructor(private http: HttpClient, private toastService: ToastService, private utility: UtilityService) { }

  createPO(newOrder: PurchaseOrder) {
    return this.http.post(this.apiBaseURL + 'purchaseorders/create', newOrder, this.utility.requestHeaders())
      .subscribe(res => {
        this.toastService.openSnackBar('Order Created Successfully', '', 'success-snackbar');
        return res;
      }, error => { throw error; });
  }

  getPOs() {
    return this.http.get<PurchaseOrder[]>(this.apiBaseURL + 'purchaseorders/').pipe(map(res => {
      return res;
    }));
  }

  getPOById(id) {
    return this.http.get<PurchaseOrder>(this.apiBaseURL + 'purchaseorders/' + id).pipe(map(res => {
      return res;
    }));
  }

  updatePO(updatedOrder: PurchaseOrder) {
    return this.http.put(this.apiBaseURL + 'purchaseorders/' + updatedOrder.id, updatedOrder)
      .subscribe(res => {
        this.toastService.openSnackBar('Order Updated Successfully', '', 'success-snackbar');
        return res;
      }, error => { throw error; });
  }

  deletePO(deleteOrder: PurchaseOrder) {
    return this.http.delete(this.apiBaseURL + 'purchaseorders/' + deleteOrder.id)
      .subscribe(res => {
        this.toastService.openSnackBar('Order Deleted Successfully', '', 'success-snackbar');
        return res;
      }, error => { throw error; });
  }
}
