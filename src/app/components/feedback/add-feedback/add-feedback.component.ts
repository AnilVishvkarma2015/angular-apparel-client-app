import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.scss']
})

export class AddFeedbackComponent {

  form: FormGroup;
  id: string;
  feedbackUser: string;
  feedbackMessage: string;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddFeedbackComponent>) {
    this.form = this.formBuilder.group({
      id: [""],
      feedbackUser: [this.currentUser.firstName + ' ' + this.currentUser.lastName],
      feedbackMessage: ["", Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched)
    );
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
