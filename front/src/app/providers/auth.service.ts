import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environment/environment';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = `${environment.server}`;

  constructor(public http: HttpClient, public jwtHelper: JwtHelperService) {}

  headers = new HttpHeaders();

  async checkAuthentication() {
    return new Promise((resolve, reject) => {
      const url = this.baseUrl + '/user';
      this.http.get(url, { headers: this.headers.set('Authorization', 'Token ' + this.getToken()) }).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      });
    });

  }

  async login(credentials) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/users/login', { user: credentials })
        .subscribe((res: any) => {
          localStorage.setItem('token', res.user.token);
          resolve(res);
        }, (err) => {
          reject(err);
        });

    });

  }

  public isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired(this.getToken());
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

}
