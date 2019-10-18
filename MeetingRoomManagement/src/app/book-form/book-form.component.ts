import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepicker, MatSelect } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, AbstractControl, ValidatorFn } from '@angular/forms';
import { AccessCalendarService } from '../access-calendar.service';
import {MatIconRegistry} from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  editEventFormGroup: FormGroup;
  minDate = new Date();
  minDateEnd = new Date();
  enableEndDate = false;
  hourList = [];
  errorMsg: string;
  hasConflicts = false;
  headerMsg = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<BookFormComponent>,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private accessCalendarService: AccessCalendarService,
    private sb: MatSnackBar,
  ) { }


  ngOnInit() {
    if(this.data.origin === 'create') {
      this.headerMsg = 'Create Event'
      this.editEventFormGroup = this.fb.group({
        startDate: new FormControl({ value: '', disabled: true }, Validators.required),
        startHour: new FormControl({ value: '', disabled: false }, Validators.required),
        startMin: new FormControl({ value: '', disabled: false }, Validators.required),
        endDate: new FormControl({ value: '', disabled: true }, Validators.required),
        endHour: new FormControl({ value: '', disabled: false }, Validators.required),
        endMin: new FormControl({ value: '', disabled: false }, Validators.required),
      });
    } else {
      this.headerMsg = 'Edit Event: ' + this.data.selected.id
      console.log(this.data.selected)
      this.editEventFormGroup = this.fb.group({
        startDate: new FormControl({ value: this.getDate(this.data.selected.start.dateTime), disabled: true }, Validators.required),
        startHour: new FormControl({ value: this.getHrs(this.data.selected.start.dateTime), disabled: false }, Validators.required),
        startMin: new FormControl({ value: this.getMins(this.data.selected.start.dateTime), disabled: false }, Validators.required),
        endDate: new FormControl({ value: this.getDate(this.data.selected.end.dateTime), disabled: true }, Validators.required),
        endHour: new FormControl({ value: this.getHrs(this.data.selected.end.dateTime), disabled: false }, Validators.required),
        endMin: new FormControl({ value: this.getMins(this.data.selected.end.dateTime), disabled: false }, Validators.required),
      });
    }
    for (let i = 0; i <= 23; i++) {
      if (i < 10) {
        const val = '0' + JSON.stringify(i);
        this.hourList.push(val);
      } else {
        this.hourList.push(JSON.stringify(i));
      }
    }
    console.log(this.editEventFormGroup)
  }

  getDate(date){
    return new Date(date);
  }

  getHrs(date) {
    console.log(new Date(date).getHours());
    let patchHr = new Date(date).getHours();
    if(patchHr < 10) {
      return '0' + JSON.stringify(patchHr);
    } else {
      return JSON.stringify(patchHr);
    }
  }

  getMins(date) {
    console.log(new Date(date).getMinutes());
    let patchMin = new Date(date).getMinutes();
    if(patchMin === 0) {
      return '00';
    } else {
      return '30';
    }
  }

  submitVals(val) {
    this.hasConflicts = false;
    console.log(val)
    // console.log(this.data.selected.start.dateTime);
    let startDateString = JSON.stringify(val.startDate.getFullYear()) + '-' + JSON.stringify((val.startDate.getMonth() + 1)) + '-' + JSON.stringify((val.startDate.getDate()))
      + 'T' + val.startHour + ':' + val.startMin + ':00+08:00';
    let endDateString = JSON.stringify(val.endDate.getFullYear()) + '-' + JSON.stringify((val.endDate.getMonth() + 1)) + '-' + JSON.stringify((val.endDate.getDate()))
      + 'T' + val.endHour + ':' + val.endMin + ':00+08:00';
    const startCreate = Date.parse(startDateString);
    const endCreate = Date.parse(endDateString);

    let conflicts = 0;

    if (this.data.origin === 'create') {
      for (let datum of this.data.content) {
        const startEvent = Date.parse(datum.start.dateTime);
        const endEvent = Date.parse(datum.end.dateTime);
        console.log(startCreate < endEvent && startEvent < endCreate);
        console.log(startCreate === endCreate);
        if (startCreate < endEvent && startEvent < endCreate || startCreate === endCreate || startCreate > endCreate) {
          conflicts++;
        }
      }
      if (conflicts > 0) {
        this.hasConflicts = true;
      } else {
        this.hasConflicts = false;
        //PROCEED TO BACKEND CALL
        this.closeDialog();
        this.openSnackBar('Event was successfully added.', 'CLOSE');
      }
    } else if (this.data.origin === 'list') {
      console.log();
      for (let datum of this.data.content) {
        const startEvent = Date.parse(datum.start.dateTime);
        const endEvent = Date.parse(datum.end.dateTime);
        console.log(startCreate < endEvent && startEvent < endCreate);
        console.log(startCreate === endCreate);
        if (startCreate < endEvent && startEvent < endCreate || startCreate === endCreate || startCreate > endCreate) {
          conflicts++;
        }
      }
      if (conflicts > 0) {
        this.hasConflicts = true;
      } else {
        this.hasConflicts = false;
        //PROCEED TO BACKEND CALL
        this.closeDialog();
        this.openSnackBar('EventId ' + this.data.selected.id + ' was successfully added.', 'CLOSE');
      }
    }
  }

  changedStart(e) {
    this.hasConflicts = false;
    this.enableEndDate = true;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    this.sb.open(message, action , {
      panelClass: ['snackbar-design-global']
    });
  }


}
