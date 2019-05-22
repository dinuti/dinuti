import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private baseUrl = `${environment.server}`;

  constructor(public http: HttpClient, private general: GeneralService) { }

  async createLocation(json) {
    json = { location: json };
    return this.general.post(`${this.baseUrl}/location`, json);
  }
}
