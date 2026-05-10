import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('https://fakestoreapi.com/auth/login', {
      username,
      password,
    });
  }

  getAllUsers(): Observable<any> {
    return this.http.get('https://fakestoreapi.com/users');
  }
}
