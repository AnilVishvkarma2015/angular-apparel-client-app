import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Product } from '../models/product.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const baseURL = 'http://localhost:4000/products';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  
  constructor(private http: HttpClient) { }

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

  createProduct(product: Product) {
    return this.http.post(baseURL + '/create', product, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getProducts() {
    return this.http.get<Product[]>(baseURL + '/');
  }

  updateProduct(product: Product) {
    return this.http.put(baseURL + '/' + product.id, product);
  }

  deleteProduct(product: Product) {
    return this.http.delete(baseURL + '/' + product.id);
  }
}
