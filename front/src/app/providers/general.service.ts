import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { reject } from 'q';

@Injectable({ providedIn: 'root' })
export class GeneralService {

  headers = new HttpHeaders().set('Authorization', 'Token ' + this.authProvider.getToken());

  constructor(public http: HttpClient, private authProvider: AuthService) {
    this.headers.set('Authorization', 'Token ' + authProvider.getToken());
  }

  async post(url, json) {
    return new Promise(resolve => {
      this.http.post(url, json, { headers: this.headers }).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }

  async get(url) {
    return new Promise(resolve => {
      this.http.get(url, { headers: this.headers }).subscribe(data => {
      resolve(data);
      }, err => {
        reject(err);
      });
    });
  }

  async put(url, json) {
    return new Promise(resolve => {
      this.http.put(url, json, { headers: this.headers }).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }

  async delete(url) {
    return new Promise(resolve => {
      this.http.delete(url, { headers: this.headers }).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }

}
