import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthProvider } from './auth.service';

@Injectable()
export class GeneralProvider {

  headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getToken());

  constructor(public http: HttpClient, private authProvider: AuthProvider) {
    console.log('Hello GeneralProvider Provider');
    this.headers.set('Authorization', 'Bearer ' + authProvider.getToken());
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
