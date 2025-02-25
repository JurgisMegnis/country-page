import { Component, inject, OnInit } from "@angular/core";
import { CountryItemComponent } from "../country-item/country-item.component";
import { CountryListInfo } from "../../interfaces/country-info";
import { CountriesService } from "../../services/countries.service";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CountryItemComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent implements OnInit {
  countryItemList: CountryListInfo[] = [];
  countriesService: CountriesService = inject(CountriesService);

  ngOnInit(): void {
    this.loadCountryItems();
  }

  loadCountryItems(): void {
    this.countryItemList = this.countriesService.getAllCountryListData()
  }
}
