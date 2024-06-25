import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { BookingComponent } from './booking/booking.component';
import { LogoutComponent } from './logout/logout.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  // !
  imports: [RouterOutlet, HeaderComponent, BookingComponent, LogoutComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {

}
