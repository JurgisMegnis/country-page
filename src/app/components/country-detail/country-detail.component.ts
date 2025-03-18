import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { CountryDetailInfo } from '../../interfaces/country-info';
import { Observable, map, switchMap, forkJoin, of } from 'rxjs';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.scss'
})
export class CountryDetailComponent implements OnInit {
  // Observables for country details
  countryDetails$!: Observable<CountryDetailInfo>;
  borderCountryDetails$!: Observable<CountryDetailInfo[]>;

  // variable getting country ID 
  countryId!: string;

  // error message
  error: string | null = null;

  constructor(
    public route: ActivatedRoute,
    public countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.countryId = this.route.snapshot.params['id'];
    this.countryDetails$ = this.countriesService.getCountryById(this.countryId);
    this.error = this.countriesService.error();
    this.getBorderCountries();

    if (this.error) {
      console.log(this.error);
    }
  }

  getLanguages(languages: CountryDetailInfo['languages']) {
    return Object.values(languages).join(', ')
  }

  getCurrencyNames(currencies: CountryDetailInfo['currencies']): string {
    return Object.values(currencies)
      .map((currency) => currency.name)
      .join(', ');
  }

  // function that gives access to countries bordering the selected country
  private getBorderCountries() {
    // start with countryDetails$ Observable
    this.borderCountryDetails$ = this.countryDetails$.pipe(
      // return only the borders array from the country details
      map((data) => {
        return data.borders;
      }),

      // take the array of borders and transform into an array of country detail Observables
      switchMap((borders) => {
        // check if there are any borders
        if (borders.length > 0) {
          // one Observable for each border
          const borderRequests = borders.map((code) => {
            return this.countriesService.getCountryById(code);
          });
          
          // wait for all of the requests to complete
          return forkJoin(borderRequests);
        } else {
          // if there are no borders return an empty array
          return of([])
        }
      })
    )
  }
}
