import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService extends GenericService {

  constructor(private http: HttpClient) {
    super();
  }

  save(user: User): Observable<User> {
    return this.http.post<User>(this.getUrlApi() + this.getEndpointUser(), user, { headers: this.getHeaders() });
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(this.getUrlApi() + this.getEndpointUser(), user, { headers: this.getHeaders() });
  }
}
