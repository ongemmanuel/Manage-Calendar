import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { BookFormComponent } from '../book-form/book-form.component';


@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.css']
})
export class ListEventsComponent implements OnInit {
  @ViewChild(BookFormComponent, {})
  private bookForm: BookFormComponent;
  @Input() evnt: any;
  @Input() evntList: any;
  constructor(
    private bookDialog: MatDialog,
  ) { }

  ngOnInit() {
  }


  formatDateTime(timeString) {
    const parseDate = Date.parse(timeString);
    return parseDate;
  }

  openDialog(ev) {
    const editBookConfig = new MatDialogConfig();
    editBookConfig.disableClose = false;
    editBookConfig.autoFocus = false;
    editBookConfig.data = {
      content: this.evntList,
      selected: this.evnt,
      origin: 'list'
    };
    const editBookDialog = this.bookDialog.open(BookFormComponent, editBookConfig);
  }
}
