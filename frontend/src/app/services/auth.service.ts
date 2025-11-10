import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/auth'; // el proxy lo redirige al backend

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  register(data: { email: string; password: string; nombre: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }
  
  logout() {
    localStorage.removeItem('token');
  }

}
