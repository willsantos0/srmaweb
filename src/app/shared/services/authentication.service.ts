import { Login } from './../models/login.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

export const TOKEN_NAME = 'access_token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends GenericService {

  constructor(private http: HttpClient, private router: Router) {
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
    localStorage.removeItem(TOKEN_NAME);
    this.router.navigate(['login']);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  public setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) {
      return null;
    }
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isAuthenticated(token?: string): boolean {
    if (!token) {
      token = this.getToken();
    }
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }

    const result = !(date.valueOf() > new Date().valueOf());
    if (result) {
      this.logout();
    }
    return result;
  }
}
