import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { MultiSelectComponent } from '../multi-select/multi-select.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [DropdownComponent, MultiSelectComponent],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent implements OnInit {
  // dropdown properties
  readonly DROPDOWN_LABEL = "Sorty by";
  readonly DROPDOWN_ID = "sort";
  readonly DROPDOWN_OPTIONS= ["Name", "Area", "Population"];
  
  // multiselect properties
  @Input() multiselectOptions!: string[];
  readonly MULTISELECT_LABEL = "Region";
  readonly MULTISELECT_ID ="region";
  
  @Output() filterChange = new EventEmitter<string | null>();

  filtersInputGroup = new FormGroup({
    sortby: new FormControl('Population')
  })

  ngOnInit(): void {
    // emit initial value
    this.filterChange.emit(this.filtersInputGroup.get('sortby')?.value);
    
    // subscribe to changes
    this.filtersInputGroup.controls.sortby.valueChanges.subscribe(val => {
      this.filterChange.emit(val);
    }) 
  }
}
