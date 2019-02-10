import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ReportService } from 'src/app/services/report.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
  reportForm: FormGroup;
  subscriberEmail: FormControl;
  isRequestCompleted: Boolean = false;

  constructor(private formBuilder: FormBuilder, private reportService: ReportService, private toastService: ToastService) {
    this.subscriberEmail = new FormControl('', [
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*")
    ]);

    this.reportForm = new FormGroup({
      subscriberEmail: this.subscriberEmail
    });
  }

  onSubmit() {
    this.reportService.createReport(this.reportForm.value).add(() => {
      this.toastService.openSnackBar('Subscribed Successfully', '', 'success-snackbar');
      this.reportForm.reset();
    });
  }
}
