import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  private baseUrl = 'http://localhost:3000/api/v1/tours';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    return this.authService.getAuthHeaders();
  }

  getAllTours(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  getTourById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  createTour(tourFormData: FormData): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(this.baseUrl, tourFormData, { headers });
  }

  updateTour(id: string, tour: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put<any>(`${this.baseUrl}/${id}`, tour, { headers });
  }

  deleteTour(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete<any>(`${this.baseUrl}/${id}`, { headers });
  }

  getToursByCategoryId(categoryId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/category/${categoryId}`);
  }

  searchTours(queryParams: any): Observable<any> {
    let params = new HttpParams();
    for (const key in queryParams) {
      if (queryParams.hasOwnProperty(key)) {
        params = params.set(key, queryParams[key]);
      }
    }
    return this.http.get<any>(`${this.baseUrl}/search`, { params });
  }
}
