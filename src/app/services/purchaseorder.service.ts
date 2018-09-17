import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { PurchaseOrder } from '../models/purchaseorder.model';
import { ToastService } from './toast.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const baseURL = 'http://localhost:4000/purchaseorders';

@Injectable({
  providedIn: 'root'
})
export class PurchaseorderService {

  constructor(private http: HttpClient, private toastService: ToastService) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };

  createPO(newOrder: PurchaseOrder) {
    return this.http.post(baseURL + '/create', newOrder, httpOptions)
      .subscribe(
        data => {
          this.toastService.openSnackBar('Order Placed Successfully', '', 'success-snackbar');
          return data;
        },
        error => {
          catchError(this.handleError);
          this.toastService.openSnackBar('Order Cannot Created', '', 'error-snackbar');
        });
  }

  getPOs() {
    return this.http.get<PurchaseOrder[]>(baseURL + '/');
  }

  updatePO(updatedOrder: PurchaseOrder) {
    return this.http.put(baseURL + '/' + updatedOrder.id, updatedOrder)
      .subscribe(
        data => {
          this.toastService.openSnackBar('Order Updated Successfully', '', 'success-snackbar');
          return data;
        },
        error => {
          this.toastService.openSnackBar('Order Cannot Updated', '', 'error-snackbar');
        });
  }

  deletePO(deleteOrder: PurchaseOrder) {
    return this.http.delete(baseURL + '/' + deleteOrder.id)
      .subscribe(
        data => {
          this.toastService.openSnackBar('Order Deleted Successfully', '', 'success-snackbar');
        },
        error => {
          this.toastService.openSnackBar('Order Cannot Deleted', '', 'error-snackbar');
        });
  }
}
