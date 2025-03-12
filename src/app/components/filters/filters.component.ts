import { Component, Output, EventEmitter, Input } from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { MultiSelectComponent } from '../multi-select/multi-select.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { CountryListInfo } from '../../interfaces/country-info';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [DropdownComponent, MultiSelectComponent, CheckboxComponent],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {
  // sort by properties (dropdown comp)
  readonly DROPDOWN_LABEL = "Sorty by";
  readonly DROPDOWN_ID = "sort";
  readonly DROPDOWN_OPTIONS= ["Name", "Area", "Population"];
  
  // region filter properties (multi-select comp)
  @Input() multiselectOptions!: string[];
  readonly MULTISELECT_LABEL = "Region";
  readonly MULTISELECT_ID ="region";

  // status filter properties (checkbox comp)
  readonly CHECKBOX_LABEL = "Status";
  readonly CHECKBOX_ONE_LABEL = "Member of the United Nations";
  readonly CHECKBOX_TWO_LABEL = "Independent";
  
  // output selected sorting and filtering values
  @Output() sortByValue = new EventEmitter<string>();
  @Output() filterProp = new EventEmitter<Array<(item: CountryListInfo) => boolean>>()

  // emit the selected sort by value
  getSortByValue(value: string) {
    this.sortByValue.emit(value)
  }

  // filter variables
  private regionFilter: ((property: any) => boolean) | null = null;
  private statusUnFilter: ((property: any) => boolean) | null = null;
  private statusIndependentFilter: ((property: any) => boolean) | null = null;
  filters: Array<(item: CountryListInfo) => boolean> = [];

  // checks the selected region and add it to the filters array
  filterByRegion(value: string[]) {
    if (value.length === 0) {
      this.regionFilter = null;
    } else {
      this.regionFilter = (item) => value.includes(item.region); // filter function checking if the items region is included in the array of selected regions
    }
    this.updateFilters();
  }

  // checks whether the UN filter is enabled and add the result to the filters array
  filterByStatusUn(value: boolean | null) {
    if (value) {
      this.statusUnFilter = (item) => item.unMember === true;
    } else {
      this.statusUnFilter = null;
    }
    this.updateFilters();
  }

  // checks whether the Independent filter is enabled and add the result to the filters array
  filterByStatusIndependent(value: boolean | null) {
    if (value) {
      this.statusIndependentFilter = (item) => item.independent === true;
    } else {
      this.statusIndependentFilter = null;
    }
    this.updateFilters();
  }

  // update the filters variable and emits the value to the home component
  updateFilters() {
    this.filters = [];
    if (this.regionFilter) this.filters.push(this.regionFilter);
    if (this.statusUnFilter) this.filters.push(this.statusUnFilter);
    if (this.statusIndependentFilter) this.filters.push(this.statusIndependentFilter);
    this.filterProp.emit(this.filters);
  }
}
