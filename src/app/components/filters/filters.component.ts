import { Component } from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [DropdownComponent],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {
  readonly DROPDOWN_LABEL = "Sorty by";
  readonly DROPDOWN_ID = "sort";
  readonly DROPDOWN_OPTIONS= ["Alphabetical", "Area", "Population"];


  filtersInputGroup = new FormGroup({
    sortby: new FormControl('Population')
  })

  constructor() {
    this.filtersInputGroup.valueChanges.subscribe((val) => console.log(val));
  }
}
