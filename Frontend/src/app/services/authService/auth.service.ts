import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api'; 
  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    const url = `${this.baseUrl}/register`;
    return this.http.post(url, user);
  }

  login(credentials: any): Observable<any> {
    const url = `${this.baseUrl}/login`; 
    return this.http.post(url, credentials);
  }
  


  isAuthenticated(): boolean {
    const token = localStorage.getItem('token'); 
    if (token) {
      return true; 
    }
    return false; 
  }
}
