import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { CountryDetailInfo } from '../../interfaces/country-info';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.scss'
})
export class CountryDetailComponent implements OnInit {
  countryDetails$!: Observable<CountryDetailInfo>;

  constructor(
    public route: ActivatedRoute,
    public countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    const countryId = this.route.snapshot.params['id'];
    this.countryDetails$ = this.countriesService.getCountryById(countryId);
  }
}
