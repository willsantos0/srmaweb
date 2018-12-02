import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService extends GenericService {

  constructor(private http: HttpClient) {
    super();
  }

  getAddressByLatLng(lat: number, lng: number): Observable<any> {
    const params = new HttpParams()
    .set('latlng', lat + ',' + lng)
    .set('key', this.getApiKeyGoogleMaps());

    return this.http.get<any>(this.getUrlApiGoogleMaps(), { params: params });
  }
}
