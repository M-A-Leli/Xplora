import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-tour',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './tour.component.html',
  styleUrl: './tour.component.css'
})
export class TourComponent {

}
