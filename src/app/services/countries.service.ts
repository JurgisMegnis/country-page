import { Injectable, signal, computed, } from '@angular/core';
import { CountryDetailInfo, CountryListInfo } from '../interfaces/country-info';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, catchError, retry, throwError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private readonly URL = 'https://restcountries.com/v3.1/all?sort=population';
  private readonly DETAIL_URL = 'https://restcountries.com/v3.1/alpha/';

  // private writable signals
  private countryListSignal = signal<CountryListInfo[]>([]);
  private errorSignal = signal<string>('');

  // public readonly signals
  public countries = computed(() => this.countryListSignal());
  public error = computed(() => this.errorSignal());

  constructor(private http: HttpClient) {}

  loadCountryItems() {
    this.errorSignal.set('');

    this.getAllCountryListData()
      .subscribe({
        // if there's data, populate the countryListSignal & format the integers 
        next: (data) => {
          this.countryListSignal.set(data.map(item => ({
            ...item,
            population: item.population.toLocaleString(),
            area: item.area.toLocaleString()
          })));
          this.errorSignal.set('');
        },
        // if there's an error, assign the message to the errorSignal 
        error: (error) => {
          this.errorSignal.set(error.message)
        }
      })
  }

  // get an array of all regions to be passed for the multi-select component to filter
  getAllRegions(): string[] {
    const fullRegionsArray = this.countries()
      .map((countryItem) => countryItem.region)
      .filter(Boolean); // get all of the region values and remove any null/undefiend

    return [...new Set(fullRegionsArray)].sort((a, b) =>
      a.localeCompare(b),
    ); // remove all of the duplicate values and sort the array
  }

  // get a detailed info about the country from their id (cca3 code)
  getCountryById(id: string): Observable<CountryDetailInfo> {
    return this.http.get<CountryDetailInfo[]>(this.DETAIL_URL + id).pipe(
      map(response => response[0]), // transform the array in a single object
      retry(2),
      catchError(this.handleError)
    );
  }

  private getAllCountryListData(): Observable<CountryListInfo[]> {
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
