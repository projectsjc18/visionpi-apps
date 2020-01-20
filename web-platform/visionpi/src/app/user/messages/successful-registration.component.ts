import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {SuccessfulRegistrationData} from '../interfaces/successful-registration-data'

@Component({
  selector: 'successful-registration',
  templateUrl: 'successful-registration.html',
})
export class SuccessfulRegistration {

  constructor(
    public dialogRef: MatDialogRef<SuccessfulRegistration>,
    @Inject(MAT_DIALOG_DATA) public data: SuccessfulRegistrationData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
