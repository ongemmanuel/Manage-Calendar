import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AccessCalendarService } from '../app/access-calendar.service';
import { MatCard, MatToolbar, MatButton } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { BookFormComponent } from '../app/book-form/book-form.component';
declare var gapi: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(BookFormComponent, {})
  private bookForm: BookFormComponent;
  @Input() evnt: any;
  constructor(
    private accessCalendar: AccessCalendarService,
    private bookDialog: MatDialog,
  ) { }

  eventList = [];
  isLoaded = false;

  ngOnInit() {
    this.accessCalendar.getAllEvents().subscribe(resp => {
      console.log(resp['items']);
      this.eventList = resp['items'];
      this.isLoaded = true;
    });
   }

   addEvent() {
    const editBookConfig = new MatDialogConfig();
    editBookConfig.disableClose = false;
    editBookConfig.autoFocus = false;
    editBookConfig.data = {
      origin : 'create',
      content : this.eventList,
    }
    const editBookDialog = this.bookDialog.open(BookFormComponent, editBookConfig);
   }
}
