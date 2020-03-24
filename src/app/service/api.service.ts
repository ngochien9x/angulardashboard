import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const apiKompa = "https://corona-api.kompa.ai/graphql";
const httpOptions = {
  headers: new HttpHeaders({
    "origin": "https://corona.kompa.ai",
    "authority": "corona-api.kompa.ai",
    "accept": "*/*",
    "content-type": "application/json",
    "referer": "https://corona.kompa.ai/",
    "sec-fetch-mode": "cors",
    "Sec-Fetch-Dest": "empty",
    "hien": "hien"
  }
)};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operations', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

  getData(body): Observable<any> {
    return this.http.post(apiKompa, body, httpOptions)
      .pipe(
        catchError(this.handleError('get data failed'))
      );
  }


}
