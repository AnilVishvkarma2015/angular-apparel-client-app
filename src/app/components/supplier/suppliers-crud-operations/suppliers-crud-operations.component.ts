import { Component, Injectable } from '@angular/core';

import { SupplierService } from '../../../services/supplier.service';
import { ToastService } from '../../../services/toast.service';
import { Supplier } from '../../../models/supplier.model';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-suppliers-crud-operations',
  templateUrl: './suppliers-crud-operations.component.html',
  styleUrls: ['./suppliers-crud-operations.component.scss']
})
export class SuppliersCrudOperationsComponent {

  constructor(private supplierService: SupplierService, private toastService: ToastService) { }

  saveSupplier(supplier: Supplier) {
    return this.supplierService.createSupplier(supplier).subscribe(
      data => {
        this.toastService.openSnackBar('Supplier Created Successfully', '', 'success-snackbar');
        return data;
      },
      error => {
        this.toastService.openSnackBar('Supplier can not created', '', 'error-snackbar');
      }
    )
  }

  updateSupplier(supplier: Supplier) {
    return this.supplierService.updateSupplier(supplier).subscribe(
      data => {
        this.toastService.openSnackBar('Supplier Updated Successfully', '', 'success-snackbar');
        return data;
      },
      error => {
        this.toastService.openSnackBar('Supplier can not updated', '', 'error-snackbar');
      }
    )
  }

  deleteSupplier(supplier: Supplier) {
    return this.supplierService.deleteSupplier(supplier)
      .subscribe(
        data => {
          this.toastService.openSnackBar('Supplier Removed Successfully', '', 'success-snackbar');
        },
        error => {
          this.toastService.openSnackBar('Supplier Cannot Deleted', '', 'error-snackbar');
        });
  }
}
