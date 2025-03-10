import { Component, Output, EventEmitter, Input } from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { MultiSelectComponent } from '../multi-select/multi-select.component';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [DropdownComponent, MultiSelectComponent],
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
  
  @Output() sortByValue = new EventEmitter<string>();
  @Output() region = new EventEmitter<string[]>();

  getSortByValue(value: string) {
    this.sortByValue.emit(value)
  }

  getRegionValue(value: string[]) {
    this.region.emit(value);
  }

}
