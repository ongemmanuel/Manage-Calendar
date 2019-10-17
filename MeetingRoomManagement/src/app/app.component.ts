import { Component, OnInit } from '@angular/core';
import { AccessCalendarService } from '../app/access-calendar.service';
import { MatCard, MatToolbar, MatButton } from '@angular/material';
import { } from '@angular/material';
declare var gapi: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private accessCalendar: AccessCalendarService,
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
}
