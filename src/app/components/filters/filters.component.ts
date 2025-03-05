import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [DropdownComponent],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent implements OnInit {
  readonly DROPDOWN_LABEL = "Sorty by";
  readonly DROPDOWN_ID = "sort";
  readonly DROPDOWN_OPTIONS= ["Name", "Area", "Population"];
  
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
