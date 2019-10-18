import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepicker, MatSelect } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, AbstractControl, ValidatorFn } from '@angular/forms';
import { AccessCalendarService } from '../access-calendar.service';

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
    private accessCalendarService: AccessCalendarService
  ) { }


  ngOnInit() {
    if(this.data.origin === 'create') {
      this.headerMsg = 'Create Event'
    } else {
      this.headerMsg = 'Edit Event: ' + this.data.selected.id
    }
    for (let i = 0; i <= 23; i++) {
      if (i < 10) {
        const val = '0' + JSON.stringify(i);
        this.hourList.push(val);
      } else {
        this.hourList.push(JSON.stringify(i));
      }
    }

    this.editEventFormGroup = this.fb.group({
      startDate: new FormControl({ value: '', disabled: true }, Validators.required),
      startHour: new FormControl({ value: '', disabled: false }, Validators.required),
      startMin: new FormControl({ value: '', disabled: false }, Validators.required),
      endDate: new FormControl({ value: '', disabled: true }, Validators.required),
      endHour: new FormControl({ value: '', disabled: false }, Validators.required),
      endMin: new FormControl({ value: '', disabled: false }, Validators.required),
    });
  }

  sendEdit(val) {
    this.hasConflicts = false;
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
      }
    } else if (this.data.origin === 'list') {
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
      }
    }
  }

  changedStart(e) {
    this.hasConflicts = false;
    this.enableEndDate = true;
  }


}
