import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BookingService {

  jsonPath = '../'
  header = {"alg":"RS256","typ":"JWT"};
 
  claimSet = {
    "iss":"book-samp-acc@book-samp.iam.gserviceaccount.com",
    "scope":"https://www.googleapis.com/auth/calendar.events",
    "aud":"https://oauth2.googleapis.com/token",
    "exp":1328554385,
    "iat":1328550785
  }
  calendarId = 'samplecalendarid@gmail.com';
  serviceId = 'book-samp-acc@book-samp.iam.gserviceaccount.com';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem(this.bearerId)
    }),
    observe: 'response' as 'response'
  };

  jsonFile = {
    "type": "service_account",
    "project_id": "book-samp",
    "private_key_id": "1f2c939d27320b423e2fb1ad6cf0b9ed8d1cd423",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC7a9jo68Kb/h7S\nFPtYgjkI6t8adZxnRXxiySAQZd9TKojPTpczbNON9ee5S9gIBva+JM9ntX74M3ob\n9jigIClS5DfG6kwjEwjf6spQJKe1Si6eCu5bLQmsEwCzvtIMhgEY38iyNDL3PzDY\nVbVh+W1i+72c6Q1olZXKXr2uMkPbJOJjKgdq1/TXJzMpDM2vUDUxP0CsU2z1LPJC\nvnLQVqSnZDOZ9cZQ/V10ykHpB0nmsEShhbD2PiPkpKkB+91Z4kLTBethuili3laW\nQh/xejPuqFruKbwjfte+edyW5BdK63vw4jfefFAdVwdTrCf+r9RzfPxUx2NfzCBu\nDxFFSogVAgMBAAECggEABRRl92AmcORpEPAVJN+4rINzIwwzfkANoD7Lwe4E6MPj\nG91JL1FghX0399d0pjkMGHi2b1zlsVPx2A6rF7nvbMn3Mgq5IA08xRbfv17S9dCq\nJUnuDmYQ2EtWjkiaeFDseDBeh+fuxrE9gWuHRD3Gp3Njvvw5Cw/c1LSPJwjBOpAA\nOJ8yuJTnBywJQDc1gQ5lVhE0b9Tp88pQJ0y6KFpJu2T5/N3XeMMeQr73jdU9O1Op\nqytpB66lB5UlBYp5NPMmE6IqfprSThtyahWsric84XxVn/U42pOnXq/wPF/y1FRb\nt6wZEh6rQzTY2Q2JSkWkNojSAgQD6txlhR80UAmnKQKBgQDl06+iO3BtQW+l7QBC\nyub9NraA+ry3sKuQY0/aesZHOeThHh/Nu3rXwTFYA5nTVDnL3m8hAM45Sj+r4jlY\n0hRRcCCO+iYMBZahZYVhimhyZb84yvF55dcg4Vt24DKbrVLFUEAFkO+1Li5vfQ34\n1LLC00h/keORa7MgqRv+2N2WXQKBgQDQw+D2Rw8YBbEmOMallsdY2B5igyqTAj4D\nNAONnxxntM8A7qexzeKmSwnmSTDr/M4r99y0MUujhG0wVVatZpGWVNhMnruCcQZY\nMJ3Kf3Am9z4UFFMzdgrhFDOhcaGixvgUoLt0iFE1BUQKd572qLgkzhFQpaEi7tPx\n5Q6JeJKtGQKBgHe7zBGqA813vNHl4i/qA2NCANy7RFwyl38WrkB1nBz5ZWt+xTTq\ninoi9TEUVyyJAb9bd+vqvoWMUBWdOyEx+VHgJ6Y1XmL++lXFTTLe58FJjtDosds+\nydAgeAU7kkIWjzuqrl/3/VoX4CtHLGNJdIQZjPihKbzWLjFCyQoBM5glAoGBALX9\nzKNllvbuH1yeqi24n9gHr5VZm0fE8KKCOYbAalbN/JdndbE/NpKZX+vtakSPgnw5\n+6DqSHIoA7fa7VEE1W4kUNualQRF264N08CwD+koKGoAvfditGE65zeag7oPkj0J\nUeFo5MI/8OzfEykcNEuBiP6xJSP657E8acvV3KghAoGAQRE5FX4/tAhtEvbEGiBE\nUmJCIROUdE6z6+b60IgGJwUKT3RxzQGxurY43Xys4emGhR9CR4D4/Z2qyR0r/emD\n2UygODHtwNlxC9Y4YKIlKp3h+G3g70YSt3JAIZ7MCz2lEL+VQU7rnFHEbJb+SgTi\nV76VEwHo4wSC9VDXZvndEUA=\n-----END PRIVATE KEY-----\n",
    "client_email": "book-samp-acc@book-samp.iam.gserviceaccount.com",
    "client_id": "111926960600342625075",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/book-samp-acc%40book-samp.iam.gserviceaccount.com"
  };




getToken() {














  
  return this.http.get(
  'https://accounts.google.com/o/oauth2/v2/auth?scope'
  + '=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.metadata.readonly&include_granted_scopes=true&state=state_parameter_passthrough_value&'
  + 'redirect_uri=http%3A%2F%2Foauth2.example.com%2Fcallback&'
  + 'response_type=token&client_id=111926960600342625075', 
  
  ).pipe(
    catchError(this.handleError)
  );


 
}


  oauthSignIn() {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
  
    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);
  
    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {'client_id': '111926960600342625075',
                  'redirect_uri': 'YOUR_REDIRECT_URI',
                  'response_type': 'token',
                  'scope': 'https://www.googleapis.com/auth/calendar.events',
                  'include_granted_scopes': 'true',
                  'state': 'pass-through value'};
  
    // Add form parameters as hidden input values.
    for (var p in params) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', p);
      input.setAttribute('value', params[p]);
      form.appendChild(input);
    }
  
    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
  }



  private handleError(errorVal: HttpErrorResponse) {
    return throwError(errorVal);
  }


}
