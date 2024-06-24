import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL: string = 'http://localhost:3000/api/v1/auth';
  private tokenKey: string = 'authToken';

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<{ token: string; redirectUrl: string }> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<{ token: string; redirectUrl: string }>(`${this.baseURL}/login`, { email, password }, { headers });
  }

  logout(): void {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.post(`${this.baseURL}/logout`, {}, { headers })
      .subscribe(response => {
        this.clearToken();
        this.router.navigate(['/login']);
      });
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
