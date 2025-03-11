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
  // arrays with country objects
  countryItemList: CountryListInfo[] = [];
  filteredCountryItemList: CountryListInfo[] = [];

  // error message
  error: string | null = null;

  // variables for filtering
  allRegions: string[] = []; // array to be passed to the filter component
  private sortBySelection: string | null = ''; // value from Sort By filter 
  private regionSelection: string[] = []; // value from Region filter
  private statusUnSelection: boolean = false; // value from Status filter / Member of UN
  private statusIndependentSelection: boolean = false; // value from Status filter / Independent

  constructor(public countriesService: CountriesService) {}

  ngOnInit(): void {
     this.countriesService.loadCountryItems() 
     this.countryItemList = this.countriesService.countries();
     this.error = this.countriesService.error();
     this.filteredCountryItemList = this.countryItemList;
     this.getAllRegions();
  }

  // get an array of all of the regions to pass down to filters component so it can be used for the region filter
  private getAllRegions() {
    const fullRegionsArray = this.countryItemList
      .map(countryItem => countryItem.region)
      .filter(Boolean); // get all of the region values and remove any null/undefiend 

    this.allRegions = [...new Set(fullRegionsArray)]
      .sort((a, b) => a.localeCompare(b)); // remove all of the duplicate values and sort the array
  }

  /* FILTER LOGIC */

  // get the value of the Sort By filter and assign it to this.sortBySelection variable & call sort() function
  filterSortBy(value: string) {
    this.sortBySelection = value;
    this.sort();
    console.log(value);
  }

  // get the value of the Region filter and assign it to a variable
  filterRegion(value: string[]) {
    this.regionSelection = value;
    console.log(value);
  }

  // get the value of the Status filter/Member of UN and assign to a variable
  filterUn(value: boolean) {
    this.statusUnSelection = value;
    console.log(value);
  }

  // get the value of the Status filter/Independent and assign to a variable
  filterIndependent(value: boolean) {
    this.statusIndependentSelection = value;
    console.log(value);
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
