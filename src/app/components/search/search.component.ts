import { Component, Input, Output, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  @Input() label!: string;
  @Output() searchInput!: string;

  inputControl = new FormControl<string>('');

  ngOnInit(): void {
    this.getValue();
  }

  private getValue() {
    this.inputControl.valueChanges.subscribe(val => {
      console.log(val);
    })
  }


}
