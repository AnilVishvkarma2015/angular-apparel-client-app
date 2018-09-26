import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { first, finalize } from 'rxjs/operators';

import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { ExportPdfService } from '../../../services/export-pdf.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'users.component',
  templateUrl: 'users.component.html',
})

export class UsersComponent {
  displayedColumns = ['firstName', 'lastName', 'email', 'actions'];
  dataSource: MatTableDataSource<User>;
  Users: User[] = [];
  isLoading = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  api_root: string;

  constructor(private userService: UserService,
    private exportPdfService: ExportPdfService,
    private toastService: ToastService) { }

  ngAfterViewInit() {
    this.loadUserRecords();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  private loadUserRecords() {
    this.userService.getUsers().pipe(
      finalize(() => this.isLoading = false))
      .subscribe(users => {
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.toastService.openSnackBar('Data Loading Error: ' + err.status + ' - ' + err.statusText, '', 'error-snackbar');
        throw err;
      });
  }

  downloadPDF() {
    let columns = ["No", "First Name", " Last Name", "Email"];
    let rows = [];
    let item = "USERS REPORT";
    let counter = 1;

    this.userService.getUsers().pipe(first()).subscribe(users => {
      for (var user of users) {
        let userArray = [
          counter++,
          user.firstName,
          user.lastName,
          user.email
        ];
        rows.push(userArray);
      }
      this.exportPdfService.exportToPdf(columns, rows, item);
    });
  }
}