import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-multi-select',
  standalone: true,
  imports: [],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.scss'
})
export class MultiSelectComponent {
  @Input() selections!: string[];
  @Input() label!: string;
  @Input() id!: string;
}
