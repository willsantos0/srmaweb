import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Device } from '../models/device.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService extends GenericService {

  constructor(private http: HttpClient) {
    super();
  }

  save(device: Device): Observable<Device> {
    return this.http.post<Device>(this.getUrlApi() + this.getEndpointDevice(), device, { headers: this.getHeadersWithUserAuthorization() });
  }

  update(device: Device): Observable<Device> {
    return this.http.put<Device>(this.getUrlApi() + this.getEndpointDevice(), device, { headers: this.getHeadersWithUserAuthorization() });
  }

  delete(saferId: string) {
    return this.http.delete(this.getUrlApi() + this.getEndpointDevice() + '/' + saferId,
      { headers: this.getHeadersWithUserAuthorization() });
  }

  getAll(): Observable<Device> {
    return this.http.get<Device>(this.getUrlApi() + this.getEndpointDevice(), { headers: this.getHeadersWithUserAuthorization() });
  }

}

