import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CountryItemComponent } from "../country-item/country-item.component";
import { CountryListInfo } from "../../interfaces/country-info";
import { CountriesService } from "../../services/countries.service";
import { ButtonComponent } from "../button/button.component";
import { FiltersComponent } from "../filters/filters.component";
import { SearchComponent } from "../search/search.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    CountryItemComponent,
    ButtonComponent,
    CommonModule,
    FiltersComponent,
    SearchComponent,
  ],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent implements OnInit {
  // arrays with country objects
  countryItemList: CountryListInfo[] = [];
  filteredCountryItemList: CountryListInfo[] = [];

  // error message
  error: string | null = null;

  // variables for filtering & search field
  allRegions: string[] = []; // array to be passed to the filter component
  private sortBySelection: string | null = ""; // value from Sort By filter
  readonly SEARCH_LABEL = "Search by Name, Region, Subregion"; 

  // variable for the searchTerm that will be passed to filter component
  searchTerm: string | null = '';

  constructor(public countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countriesService.loadCountryItems();
    this.countryItemList = this.countriesService.countries();
    this.error = this.countriesService.error();
    this.filteredCountryItemList = this.countryItemList;
    this.allRegions = this.countriesService.getAllRegions();
  }

  /* FILTER LOGIC */

  // get the value of the Sort By filter and assign it to this.sortBySelection variable & call sort() function
  filterSortBy(value: string) {
    this.sortBySelection = value;
    this.sort();
  }

  // sort the list based on the Sort By selection
  sort() {
    if (this.sortBySelection === "Population") {
      this.filteredCountryItemList = this.filteredCountryItemList.sort(
        (a, b) => {
          const numA = parseInt(a.population.replace(/,/g, "")); // remove commas and convert the string to a number for comparison
          const numB = parseInt(b.population.replace(/,/g, ""));
          return numB - numA;
        },
      );
    } else if (this.sortBySelection === "Area") {
      this.filteredCountryItemList = this.filteredCountryItemList.sort(
        (a, b) => {
          const numA = parseInt(a.area.replace(/,/g, "")); // remove commas and convert the string to a number for comparison
          const numB = parseInt(b.area.replace(/,/g, ""));
          return numB - numA;
        },
      );
    } else {
      this.filteredCountryItemList = this.filteredCountryItemList.sort((a, b) =>
        a.name.common.localeCompare(b.name.common),
      );
    }
  }

  // gets the search input from the component and assigns it to the searchTerm variable
  search(value: string | null) {
    this.searchTerm = value;
  }

  // update the this.filteredCountryItemList variable based on the selected filters
  filter(filterProp: Array<(item: CountryListInfo) => boolean>) {
    this.filteredCountryItemList = this.countryItemList.filter(property =>
      filterProp.every(filter => filter(property)));  
    this.sort();
  }

  
}
