import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { first, finalize } from 'rxjs/operators';

import { AddFeedbackComponent } from '../add-feedback/add-feedback.component';
import { ToastService } from '../../../services/toast.service';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.scss']
})
export class FeedbacksComponent {
  isLoading = true;
  public feedbacks;

  constructor(private feedbackService: FeedbackService,
    private toastService: ToastService,
    public dialog: MatDialog
  ) { }

  ngAfterViewInit() {
    this.loadFeedbacks();
  }

  private loadFeedbacks() {
    this.feedbackService.getFeedbacks().pipe(
      finalize(() => this.isLoading = false))
      .subscribe(feedbacks => {
        this.feedbacks = feedbacks;
      }, err => {
        this.toastService.openSnackBar('Data Loading Error: ' + err.status + ' - ' + err.statusText, '', 'error-snackbar');
        throw err;
      });
  }


  addFeedback() {
    const dialofConfig = new MatDialogConfig();

    dialofConfig.disableClose = true;
    dialofConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AddFeedbackComponent, dialofConfig);

    dialogRef.afterClosed().subscribe(form => {
      if (form) {
        this.feedbackService.createFeedback(form).add(() => {
          this.loadFeedbacks();
        });
      }
    });
  }
}