import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AuthService } from 'src/app/providers/auth.service';
import { User } from 'src/app/model/user';
import { ServiceService } from 'src/app/providers/service.service';
import { FormSession } from 'src/app/model/form';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public start: boolean;
  public user: User;

  constructor(private socket: Socket, private auth: AuthService, private service: ServiceService) { }

  ngOnInit() {
    this.auth.checkAuthentication().then((user: User) => {
      this.user = user;
    });
  }

  startSession() {
    if (this.user) {
      this.start = true;
      this.socket.emit('auth', this.user);
      this.socket.on('message', (msg: any) => {
        console.log(msg);
      });
    }
  }

  updateSession() {
    this.service.updateSession({}).then((res) => {
      console.log(res);
    }).catch(next => console.log(next));
  }
  stopSession() {
    this.start = false;
  }
}
