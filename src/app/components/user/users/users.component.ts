import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { first } from 'rxjs/operators';

declare var jsPDF: any
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

  constructor(private userService: UserService) { }

  ngAfterViewInit() {
    this.loadUserRecords();
  }

  downloadPDF() {
    let columns = ["No", "First Name", " Last Name", "Email"];
    let rows = [];
    var doc = new jsPDF('p', 'pt');

    let counter = 1;
    console.log(doc.getFontList());

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
      doc.autoTable(columns, rows, {
        margin: { top: 60 },
        addPageContent: function (data) {
          doc.setFontSize(12);
          doc.setFontStyle('bold');
          doc.text("PRODUCTS REPORT", 240, 40);
        }
      }); // typescript compile time error
      doc.save('Users.pdf');
    });

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
}