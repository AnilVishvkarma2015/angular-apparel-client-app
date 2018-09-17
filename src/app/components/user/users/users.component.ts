import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { first } from 'rxjs/operators';

import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { ExportPdfService } from '../../../services/export-pdf.service';

@Component({
  selector: 'users.component',
  styleUrls: ['users.component.scss'],
  templateUrl: 'users.component.html',
})

export class UsersComponent {
  displayedColumns = ['firstName', 'lastName', 'email', 'actions'];
  dataSource: MatTableDataSource<User>;
  Users: User[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService, private exportPdfService: ExportPdfService) { }

  ngAfterViewInit() {
    this.loadUserRecords();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  private loadUserRecords() {
    this.userService.getUsers().pipe(first()).subscribe(users => {
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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