import { Injectable, signal, computed, Signal, } from '@angular/core';
import { CountryDetailInfo } from '../interfaces/country-info';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, retry, throwError, map, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryDetailsService {
  private readonly DETAIL_URL = 'https://restcountries.com/v3.1/alpha/';

  // private writable signals
  private errorSignal = signal<string>('');
  private errorBordersSignal = signal<string>('');
  private countryCodeSignal = signal<string>('');
  private countryDetailListSignal = signal<CountryDetailInfo | null>(null)
  private borderCountrySignal = signal<CountryDetailInfo[]>([]);

  // public readonly signals
  public error = computed(() => this.errorSignal());
  public errorBorders = computed(() => this.errorBordersSignal());
  public countryCode = computed(() => this.countryCodeSignal());
  public countryDetailList = computed(() => this.countryDetailListSignal());
  public borderCountryDetailList = computed(() => this.borderCountrySignal());

  constructor(private http: HttpClient) {}

  setCountryCode(code: string) {
    this.countryCodeSignal.set(code);
  }

  loadCountryDetails() {
    this.errorSignal.set('');
    this.countryDetailListSignal.set(null);

    this.getCountryById(this.countryCode())
      .subscribe({
        next: (data) => {
          this.countryDetailListSignal.set(data);
          this.getBorderCountries(data.borders);

          this.errorSignal.set('');
        },

        error: (error) => {
          this.errorSignal.set(error.message);
        }
      })
  }

  getBorderCountries(borderCodes: string[]) {
    // if no border codes, set empty array
    if (!borderCodes || borderCodes.length === 0) {
      this.borderCountrySignal.set([]);
      return;
    }

    // create an Observable for each border country
    const borderRequests = borderCodes.map(code =>
      this.getCountryById(code)
    );

    // use forkJoin to wait for all requests to complete
    forkJoin(borderRequests).subscribe({
      next: (countries) => {
        this.borderCountrySignal.set(countries);
      },
      error: (error) => {
        console.error('Error fetching border countries:', error);
        this.errorBordersSignal.set('Failed to load border countries');
        this.borderCountrySignal.set([]);
      }
    })
  }

  // get a detailed info about the country from their id (cca3 code)
  private getCountryById(id: string): Observable<CountryDetailInfo> {
    return this.http.get<CountryDetailInfo[]>(this.DETAIL_URL + id).pipe(
      map(response => response[0]), // transform the array in a single object
      retry(2),
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
      errorMessage = 'Network error: Please check your internet connection';
    } else {
      // server side error
      errorMessage = `Server side error: ${error.status} ${error.statusText}`;
    }

    console.error('Countries API error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
