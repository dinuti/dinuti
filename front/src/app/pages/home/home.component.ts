import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AuthService } from 'src/app/providers/auth.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private user: User;

  constructor(private socket: Socket, private auth: AuthService) { }

  ngOnInit() {
    this.auth.checkAuthentication().then((user: User) => {
      this.user = user;
    });
  }

  startSession(start: boolean) {
    if (this.user && start) {
      this.socket.emit('auth', this.user);
      this.socket.on('message', (msg: any) => {
        console.log(msg);
      });
    }
  }
}
