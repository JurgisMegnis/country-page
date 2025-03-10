import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent implements OnInit {
  @Input() label!: string;
  @Input() options!: string[];
  @Input() id!: string;

  @Output() dropdownSelectedValue = new EventEmitter<string>();

  dropdownControl = new FormControl<string>('Population');

  ngOnInit(): void {
    this.getValues();
  }

  private getValues() {
    // emit initial value
    const initialValue = this.dropdownControl.value;
    if (initialValue) {
      this.dropdownSelectedValue.emit(initialValue);
    }

    // subscribe to change
    this.dropdownControl.valueChanges.subscribe(val => {
      if (val) {
        this.dropdownSelectedValue.emit(val);
      }
    })
  }
}
