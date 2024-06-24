import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  name: string = '';
  email: string = '';
  message: string = '';

  onSubmit() {
    // Handle the form submission
    console.log('Form submitted:', { name: this.name, email: this.email, message: this.message });
    // Reset the form
    this.name = '';
    this.email = '';
    this.message = '';
  }
}
