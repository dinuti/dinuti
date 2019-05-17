import { Injectable } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { GeneralProvider } from './general.service';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private baseUrl = `${environment.server}`;

  constructor(public http: HttpClient, private general: GeneralProvider) { }

  async createLocation(json) {
    json = { location: json };
    return this.general.post(`${this.baseUrl}/location`, json);
  }
}
