import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {

  user: User = new User();

  constructor() { }

  ngOnInit() {
  }

  connect(): void {
    console.log(this.user);
  }

}
