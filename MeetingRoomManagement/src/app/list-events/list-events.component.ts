import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.css']
})
export class ListEventsComponent implements OnInit {
  @Input() evnt: any;
  constructor() { }

  ngOnInit() {
  }


  formatDateTime(timeString) {
    const parseDate = Date.parse(timeString);
    return parseDate;
  }


}
