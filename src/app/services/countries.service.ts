import { Injectable } from '@angular/core';
import { CountryListInfo } from '../interfaces/country-info';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private readonly URL = 'https://restcountries.com/v3.1/all?sort=population';

  constructor(private http: HttpClient) { }

  getAllCountryListData(): Observable<CountryListInfo[]> {
    return this.http.get<CountryListInfo[]>(this.URL).pipe(
      // retry failed requests 2 times
      retry(2),
      // transform error in to a consistent format
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // client side error
      errorMessage = `Client error: ${error.error.message}`;
    } else if (error.status === 0) {
      // network/connectivity error
      errorMessage = 'Network error: Pleace check your internet connection';
    } else {
      // server side error
      errorMessage = `Server side error: ${error.status} ${error.statusText}`;
    }

    console.error('Countries API error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }

}
