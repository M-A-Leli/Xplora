import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private baseUrl = 'http://localhost:3000/api/v1/bookings';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    return this.authService.getAuthHeaders();
  }

  getAllBookings(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(this.baseUrl, { headers });
  }

  getBookingById(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.baseUrl}/${id}`, { headers });
  }

  createBooking(booking: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(this.baseUrl, booking, { headers });
  }

  updateBooking(id: string, booking: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put<any>(`${this.baseUrl}/${id}`, booking, { headers });
  }

  deleteBooking(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete<any>(`${this.baseUrl}/${id}`, { headers });
  }

  getBookingsByUserId(userId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.baseUrl}/user/${userId}`, { headers });
  }

  getBookingsByTourId(tourId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.baseUrl}/tour/${tourId}`, { headers });
  }

  getBookingsByStatus(status: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.baseUrl}/status/${status}`, { headers });
  }

  searchBookings(queryParams: any): Observable<any> {
    const headers = this.getAuthHeaders();
    let params = new HttpParams();
    for (const key in queryParams) {
      if (queryParams.hasOwnProperty(key)) {
        params = params.set(key, queryParams[key]);
      }
    }
    return this.http.get<any>(`${this.baseUrl}/search`, { headers, params });
  }
}
