import { Component, Output, EventEmitter, Input } from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { MultiSelectComponent } from '../multi-select/multi-select.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';

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
  
  // output all of the received values to home componenet
  @Output() sortByValue = new EventEmitter<string>();
  @Output() region = new EventEmitter<string[]>();
  @Output() statusUn = new EventEmitter<boolean>();
  @Output() statusIndependent = new EventEmitter<boolean>();

  getSortByValue(value: string) {
    this.sortByValue.emit(value)
  }

  getRegionValue(value: string[]) {
    this.region.emit(value);
  }

  getStatusUnValue (value: boolean) {
    this.statusUn.emit(value);
  }

  getStatusIndependentValue(value: boolean) {
    this.statusIndependent.emit(value);
  }

}
