import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { CountryDetailInfo } from '../../interfaces/country-info';
import { Observable, map, switchMap, forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.scss'
})
export class CountryDetailComponent implements OnInit {
  countryDetails$!: Observable<CountryDetailInfo>;
  borderCountryDetails$!: Observable<CountryDetailInfo[]>;

  constructor(
    public route: ActivatedRoute,
    public countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    const countryId = this.route.snapshot.params['id'];
    this.countryDetails$ = this.countriesService.getCountryById(countryId);
    this.getBorderCountries();
  }

  getLanguages(languages: CountryDetailInfo['languages']) {
    return Object.values(languages).join(', ')
  }

  getCurrencyNames(currencies: CountryDetailInfo['currencies']): string {
    return Object.values(currencies)
      .map((currency) => currency.name)
      .join(', ');
  }

  /* private getBorderCountries() {
    this.borderCountryDetails$ = this.countryDetails$.pipe(
      map(data => data.borders),
      switchMap(borders =>
        borders.length ?
        forkJoin(
          borders.map(code => this.countriesService.getCountryById(code))
        ) :
        of([])
      )
    )
  } */

  private getBorderCountries() {
    this.borderCountryDetails$ = this.countryDetails$.pipe(
      map((data) => {
        return data.borders;
      }),

      switchMap((borders) => {
        
        if (borders.length > 0) {
          const borderRequests = borders.map((code) => {
            return this.countriesService.getCountryById(code);
          });
          
          return forkJoin(borderRequests);
        } else {
          return of([])
        }
      })
    )
  }
}
