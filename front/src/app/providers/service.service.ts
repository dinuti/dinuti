import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { FormSession } from '../model/form';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private baseUrl = `${environment.server}`;

  constructor(public http: HttpClient, private general: GeneralService) { }

  async createSession(json: FormSession) {
    return this.general.post(`${this.baseUrl}/session`, { session: json });
  }
  async updateSession(json: any) {
    return this.general.put(`${this.baseUrl}/session`, { session: json });
  }
}
