import { Component, Input } from '@angular/core';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-multi-select',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.scss'
})
export class MultiSelectComponent {
  @Input() selections!: string[];
  @Input() label!: string;
  @Input() id!: string;

  @Input() multiSelectControls: FormControl<boolean[] | null> = new FormControl();
}
