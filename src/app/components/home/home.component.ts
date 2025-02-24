import { Component } from "@angular/core";
import { CountryItemComponent } from "../country-item/country-item.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CountryItemComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {}
