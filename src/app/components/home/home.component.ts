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
  filteredCountryItemList: CountryListInfo[] = [];
  error: string | null = null;
  countriesService: CountriesService = inject(CountriesService);

  sortBySelection: string | null = '';

  ngOnInit(): void {
    this.loadCountryItems();
    /* this.filterSortBy; */
  }

  loadCountryItems() {
    this.countriesService.getAllCountryListData()
      .subscribe({
        next: (data) => {
          this.countryItemList = data.map(item => ({
            ...item,
            population: item.population.toLocaleString(),
            area: item.area.toLocaleString()
          }));;
         /*  this.countryItemList = data; */
          this.filteredCountryItemList = this.countryItemList; // if there's data, populating the countryItemList array & formatting the integers 
        },
        error: (error) => {
          this.error = error.message; // if error, assigns the message to error variable that will be printed out to users
        }
      })
    
  }

  /* FILTER LOGIC */

  // get the value of the Sort By filter and assign it to this.sortBySelection variable & call sort() function
  filterSortBy(value: string | null) {
    this.sortBySelection = value;
    this.sort();
  }

  sort() {
    if (this.sortBySelection === 'Population') {
      this.filteredCountryItemList = this.filteredCountryItemList.sort((a, b) => {
        const numA = parseInt(a.population.replace(/,/g, '')); // remove commas and convert the string to a number for comparison
        const numB = parseInt(b.population.replace(/,/g, ''));
        return numB - numA;
      });
    } else if (this.sortBySelection === 'Area') {
      this.filteredCountryItemList = this.filteredCountryItemList.sort((a, b) => {
        const numA = parseInt(a.area.replace(/,/g, '')); // remove commas and convert the string to a number for comparison
        const numB = parseInt(b.area.replace(/,/g, ''));
        return numB - numA;
      });
    } else {
      this.filteredCountryItemList = this.filteredCountryItemList.sort((a, b) => a.name.common.localeCompare(b.name.common))
    }
  }
}
