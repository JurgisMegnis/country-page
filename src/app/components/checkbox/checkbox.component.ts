import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent implements OnInit {
  @Input() option!: string;
  @Output() checkboxValue = new EventEmitter<boolean>();

  checkboxControl = new FormControl<boolean>(false);

  ngOnInit(): void {
    this.getValue();
  }

  private getValue() {
    this.checkboxControl.valueChanges.subscribe(val => {
      if(val) {
        this.checkboxValue.emit(val);
      }
    })
  }
}
