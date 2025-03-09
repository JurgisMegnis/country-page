import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-multi-select',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.scss'
})
export class MultiSelectComponent implements OnInit {
  @Input() selections!: string[];
  @Input() label!: string;
  @Input() id!: string;

  @Output() selectionChange = new EventEmitter<string[]>();

  multiSelectForm = new FormGroup({
    items: new FormArray([])
  })

  ngOnInit(): void {
    this.initializeRegionControls();
    this.getValues();
  }

  private initializeRegionControls() {
    const regionArray = this.multiSelectForm.get('items') as FormArray;
    
    // clear existing controls
    regionArray.clear(); 

    // add FormControl for each region option
    this.selections.forEach(item => {
      regionArray.push(new FormControl(false));
    })
  }

  private getValues() {
    this.multiSelectForm.get('items')?.valueChanges.subscribe(value => {
      
      // create an object from options and it's boolean value
      const selectedItemObj = this.selections.reduce<{[key: string]: boolean}>((obj, key, index) => {
        obj[key] = value[index];
        return obj
      }, {});
      
      // reduce the object to an array of only selected regions
      const selectedItems = Object.keys(selectedItemObj).filter(key => selectedItemObj[key]);

      // emit the array
      this.selectionChange.emit(selectedItems);
    })
  }



  /* @Input() multiSelectControls: FormControl<boolean[] | null> = new FormControl(); */
}
