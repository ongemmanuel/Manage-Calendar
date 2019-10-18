import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-notify-user',
  templateUrl: './notify-user.component.html',
  styleUrls: ['./notify-user.component.css']
})
export class NotifyUserComponent {

  constructor(
    private dialogRef: MatDialogRef<NotifyUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }


  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.dialogRef.close(true);
   }




}