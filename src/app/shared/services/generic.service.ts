import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  _environment: any;

  constructor() {
    this._environment = environment;
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'No-Auth': 'True',
    });
  }

  getHeadersWithUserAuthorization(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, PUT, GET, DELETE, OPTIONS, HEAD',
      'Access-Control-Allow-Headers': 'Origin, Content-Type',
    });
  }

  getApiKeyGoogleMaps(): string {
    return this._environment.API_KEY;
  }

  getUrlApi(): string {
    return this._environment.URL_API;
  }

  getUrlApiTeste(): string {
    return this._environment.URL_API_LOGIN;
  }

  getUrlApiGoogleMaps(): string {
    return this._environment.URL_API_GOOGLE_MAPS;
  }

  getEndpointLogin(): string {
    return this._environment.LOGIN;
  }

  getEndpointDevice(): string {
    return this._environment.DEVICE;
  }

  getEndpointUser(): string {
    return this._environment.USER;
  }

  getEndpointTracking(): string {
    return this._environment.TRACKING;
  }
}
