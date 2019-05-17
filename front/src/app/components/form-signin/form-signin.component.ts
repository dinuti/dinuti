import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-form-signin',
  templateUrl: './form-signin.component.html',
  styleUrls: ['./form-signin.component.scss']
})
export class FormSigninComponent implements OnInit {

  user: User = new User();

  constructor() { }

  ngOnInit() {
  }

  signin(): void {
    console.log(this.user);
  }
}
