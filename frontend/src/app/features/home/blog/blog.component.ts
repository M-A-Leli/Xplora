import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
   // Static data for blog posts
   blogPosts = [
    {
      id: 1,
      title: 'Exploring Wildlife in Kenya',
      author: 'John Doe',
      date: 'June 10, 2023',
      image: 'assets/blog1.jpg',
      excerpt: 'Discover the diverse wildlife Kenya has to offer, from safaris to birdwatching.'
    },
    {
      id: 2,
      title: 'Cultural Experiences in Nairobi',
      author: 'Jane Smith',
      date: 'July 5, 2023',
      image: 'assets/blog2.jpg',
      excerpt: 'Explore Nairobi\'s rich culture through food, art, and local traditions.'
    },
    {
      id: 3,
      title: 'Hiking Adventures in Mount Kenya',
      author: 'Mike Johnson',
      date: 'August 20, 2023',
      image: 'assets/blog3.jpg',
      excerpt: 'Embark on an unforgettable hiking journey to the summit of Mount Kenya.'
    }
    // Add more blog posts as needed
  ];
}
