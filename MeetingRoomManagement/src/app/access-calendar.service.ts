import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, forkJoin } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccessCalendarService {
  googleURL = 'https://www.googleapis.com/calendar/v3/calendars/';
  calendarId = 'samplecalendarid@gmail.com/events';
  keyURL = '?key=AIzaSyB-paQH9MT7_ZPnnu1ItjeYrJ90vH8PD6E';
  authURL = 'https://oauth2.googleapis.com/token';

  // tslint:disable-next-line: max-line-length
  // Sample
  bearerId = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib29rc2VydmljZUBib29raW5nLTI1NjIwNi5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInNjb3BlIjoiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9jYWxlbmRhciIsImF1ZCI6Imh0dHBzOi8vb2F1dGgyLmdvb2dsZWFwaXMuY29tL3Rva2VuIiwiZXhwIjoxNjA1Njk5OTk5OTk5LCJpYXQiOjE1NzEzMDUxODA2NTB9.Og2B2gdu6b8jUk6akb6d2ucpdHE-wn7KDLqeW1LjWIHNzRs5n9VLLymYtmMysR332LKe3e9_dtKoTRlaEENhe5AUQV64-LXCpApbyVmtgIAX8zTpo1V-3gLQ0Q4oAd1MRzeGhRVGbw-u9FIbfakUn7U2ygvSlvf-qiseqEheSsLKnNYHUgfDD4uiZ19E9ABHxUIk2VWNrV6WBblhcE0cjlduryA3eaQVS2eyQdAPlHwO55YYIbrpvUZGh_GJcKo9G7_AVhPZv9kiBseumUJdEMCiW-2cEe3TkwWs1LHLsvYNv_sBMYcXX0s8AczE9tTnZ5uNJJK3VhvckL3KmQDWNw';
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: this.bearerId
    }),
    observe: 'response' as 'response'
  };

  getAllEvents() {
    return this.http.get(this.googleURL + this.calendarId + this.keyURL).pipe(
      catchError(this.handleError)
    );
  }

  getSpecificEvent(id) {
    return this.http.get(this.googleURL + this.calendarId + '/' + id + this.keyURL).pipe(
      catchError(this.handleError)
    );
  }

  addEvent() {
    return this.http.post(this.googleURL + this.calendarId + '/quickAdd' + this.keyURL, { text: 'samp' }, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteEvent(eventId) {
    return this.http.delete(this.googleURL + this.calendarId + '/' + eventId + this.keyURL, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateEvent(eventId, data) {
    return this.http.put(this.googleURL + this.calendarId + '/' + eventId + this.keyURL, data, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  createEvent(data) {
    return this.http.post(this.googleURL + this.calendarId + this.keyURL, data, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(errorVal: HttpErrorResponse) {
    return throwError(errorVal);
  }




}
