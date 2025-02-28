import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CountryItemComponent } from "../country-item/country-item.component";
import { CountryListInfo } from "../../interfaces/country-info";
import { CountriesService } from "../../services/countries.service";
import { ButtonComponent } from "../button/button.component";
import { FiltersComponent } from "../filters/filters.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CountryItemComponent, ButtonComponent, CommonModule, FiltersComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent implements OnInit {
  countryItemList: CountryListInfo[] = [];
  error: string | null = null;
  countriesService: CountriesService = inject(CountriesService);

  ngOnInit(): void {
    this.loadCountryItems();
  }

  loadCountryItems() {
    this.countriesService.getAllCountryListData()
      .subscribe({
        next: (data) => {
          this.countryItemList = data.map(item => ({
            ...item,
            population: item.population.toLocaleString(),
            area: item.area.toLocaleString()
          }));; // if there's data, populating the countryItemList array
        },
        error: (error) => {
          this.error = error.message; // if error, assigns the message to error variable that will be printed out to users
        }
      })

  }
}
