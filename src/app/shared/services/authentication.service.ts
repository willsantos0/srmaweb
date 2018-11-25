import { Login } from './../models/login.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends GenericService {

  constructor(private http: HttpClient) {
    super();
  }

  login(login: Login): Observable<Login> {
    const data = {
      'cnome': login.username,
      'senha': login.password
    };

    return this.http.post<Login>(this.getUrlApi() + this.getEndpointLogin(),
      data, { headers: this.getHeaders() });
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public getToken(): string {
    return localStorage.getItem('access_token');
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    return tokenNotExpired(token);
  }
}
