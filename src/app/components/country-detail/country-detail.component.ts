import { Component, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CountryDetailsService } from '../../services/country-details.service';
import { CountryDetailInfo } from '../../interfaces/country-info';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [CommonModule, ButtonComponent, RouterLink],
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.scss'
})
export class CountryDetailComponent implements OnInit {
  // variable getting country ID 
  countryId!: string;

  // country details
  countryDetails: CountryDetailInfo | null = null;
  borderCountryDetails: CountryDetailInfo[] = [];

  // error messages
  error: string | null = null;
  errorBorder: string | null = null;

  constructor(
    public route: ActivatedRoute,
    public countriesService: CountryDetailsService
  ) {
    // use effects to track and respond to changes in signals
    effect(() => {
      this.countryDetails = this.countriesService.countryDetailList();
    });

    effect(() => {
      this.borderCountryDetails = this.countriesService.borderCountryDetailList();
    })

    effect(() => {
      this.error = this.countriesService.error();
      this.errorBorder = this.countriesService.errorBorders();
    })
  }

  ngOnInit(): void {
    this.countryId = this.route.snapshot.params['id']; // assign the id (cca3) of a country to the variable

    this.countriesService.setCountryCode(this.countryId); // share the id with the Country Details Service
    this.countriesService.loadCountryDetails(); // load country details

  }

  getLanguages(languages: CountryDetailInfo['languages']) {
    return Object.values(languages).join(', ')
  }

  getCurrencyNames(currencies: CountryDetailInfo['currencies']): string {
    return Object.values(currencies)
      .map((currency) => currency.name)
      .join(', ');
  }
}
