import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

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
        console.log(err);
      });
    });
  }

  async get(url) {
    return new Promise(resolve => {
      this.http.get(url, { headers: this.headers }).subscribe(data => {
      resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  async put(url, json) {
    return new Promise(resolve => {
      this.http.put(url, { article: json }, { headers: this.headers }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  async delete(url) {
    return new Promise(resolve => {
      this.http.delete(url, { headers: this.headers }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

}
