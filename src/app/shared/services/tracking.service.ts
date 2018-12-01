import { Tracking } from './../models/tracking.model';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrackingService extends GenericService {

  constructor(private http: HttpClient) {
    super();
  }

  get(srmaCode: string) {
    return this.http.get(this.getUrlApi() + this.getEndpointTracking() + '?srmaCode=' + srmaCode,
      { headers: this.getHeadersWithUserAuthorization() });
  }

  getAll(): Observable<Tracking> {
    return this.http.get<Tracking>(this.getUrlApi() + this.getEndpointTracking(), { headers: this.getHeadersWithUserAuthorization() });
  }

}
