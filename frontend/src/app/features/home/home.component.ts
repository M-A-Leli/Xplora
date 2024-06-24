import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { BlogComponent } from './blog/blog.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CtaComponent } from './cta/cta.component';
import { FooterComponent } from './footer/footer.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { PopularToursComponent } from './popular-tours/popular-tours.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { WhyChooseUsComponent } from './why-choose-us/why-choose-us.component';
import { RouterOutlet } from '@angular/router';
// import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, HeroComponent, AboutUsComponent, BlogComponent, ContactUsComponent, CtaComponent, FooterComponent, HowItWorksComponent, PopularToursComponent, TestimonialsComponent, WhyChooseUsComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
