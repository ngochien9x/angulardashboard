import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const apiBE = "http://localhost:3000";

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

  getOverViewData(): Observable<any> {
    return this.http.get(`${apiBE}/ncovid/overview`)
      .pipe(
        catchError(this.handleError('get data failed'))
      );
  }

  getDeadData(): Observable<any> {
    return this.http.get(`${apiBE}/ncovid/dead`)
      .pipe(
        catchError(this.handleError('get data failed'))
      );
  }
  
  getRecoveredData(): Observable<any> {
    return this.http.get(`${apiBE}/ncovid/recovered`)
      .pipe(
        catchError(this.handleError('get data failed'))
      );
  }

  getCountriesProvinces(): Observable<any> {
    return this.http.get(`${apiBE}/ncovid/countries`)
      .pipe(
        catchError(this.handleError('get data failed'))
      );
  }
}
