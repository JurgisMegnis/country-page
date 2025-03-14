import { Component, Input } from '@angular/core';
import { CountryListInfo } from '../../interfaces/country-info';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-country-item',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './country-item.component.html',
  styleUrl: './country-item.component.scss'
})
export class CountryItemComponent {
  @Input() countryItem!:CountryListInfo;
}
