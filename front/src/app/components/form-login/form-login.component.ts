import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/providers/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {

  user: User = new User();

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  connect(): void {
    const credentials = {
      email: this.user.username,
      password: this.user.password
    };
    this.auth.login(credentials).then((res: any) => {
      if (res.user.token) {
        this.router.navigateByUrl('/');
      }
    });
  }

}
