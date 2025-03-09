import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { MultiSelectComponent } from '../multi-select/multi-select.component';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [DropdownComponent, MultiSelectComponent],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent implements OnInit {
  // sort by properties (dropdown comp)
  readonly DROPDOWN_LABEL = "Sorty by";
  readonly DROPDOWN_ID = "sort";
  readonly DROPDOWN_OPTIONS= ["Name", "Area", "Population"];
  
  // region filter properties (multi-select comp)
  @Input() multiselectOptions!: string[];
  readonly MULTISELECT_LABEL = "Region";
  readonly MULTISELECT_ID ="region";
  
  @Output() filterChange = new EventEmitter<string | null>();

  filtersInputGroup = new FormGroup({
    sortby: new FormControl('Population'),
    region: new FormControl([])
  })

  ngOnInit(): void {
    // emit initial value
    this.filterChange.emit(this.filtersInputGroup.get('sortby')?.value);
    
    // subscribe to changes
    this.filtersInputGroup.controls.sortby.valueChanges.subscribe(val => {
      this.filterChange.emit(val);
    });
    /* this.test(); */
  }

  test(value: string[]) {
    console.log(value);
  }

  /* test() {
    console.log(this.filtersInputGroup.get('region')?.value);

    this.filtersInputGroup.controls.region.valueChanges.subscribe(val => {
      console.log(val);
    })
  } */
}
