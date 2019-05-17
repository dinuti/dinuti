import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environment/environment';


@Injectable()
export class AuthProvider {

  private baseUrl = `${environment.server}`;

  constructor(public http: HttpClient) {}

  headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getToken());

  async checkAuthentication() {
    return new Promise((resolve, reject) => {
      const value = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + value);
      const url = this.baseUrl + '/user';
      this.http.get(url, { headers }).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      });
    });

  }

  async login(credentials) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/users/login', { user: credentials })
        .subscribe(res => {
          const data = res;
          const token = data['user']['token'];
          localStorage.setItem('token', token);

          resolve(res);
        }, (err) => {
          reject(err);
        });

    });

  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
