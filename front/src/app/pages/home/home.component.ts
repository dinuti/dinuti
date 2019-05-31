import { Component, OnInit, ViewChild } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AuthService } from 'src/app/providers/auth.service';
import { User } from 'src/app/model/user';
import { ServiceService } from 'src/app/providers/service.service';
import { CountdownComponent } from 'ngx-countdown';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public start: boolean;
  public isAlertPending = false;
  public user: User;
  public usersNeedHelp: any[];
  @ViewChild('counterIsAlive') counterIsAlive: CountdownComponent;
  @ViewChild('counterPendingAlert') counterPendingAlert: CountdownComponent;

  constructor(private socket: Socket, private auth: AuthService, private service: ServiceService) { }

  ngOnInit() {
    this.auth.checkAuthentication().then((user: User) => {
      this.user = user;
      this.service.getSession().then((res: any) => {
        this.start = res.session && res.session.statut;
        if (this.start) {
          this.startSession();
          this.updateSession();
        }
      });
    });
  }

  startSession() {
    if (this.user) {
      this.start = true;
      this.socket.emit('auth', this.user);
      this.socket.on('message', (msg: any) => {
        if (msg.users) {
          this.usersNeedHelp = msg.users;
        }
      });
    }
  }

  updateSession() {
    this.service.updateSession({}).then((res) => {
      this.counterIsAlive.restart();
    }).catch(next => console.log(next));
  }

  stopSession() {
    this.service.closeSession().then(res => {
      console.log(res);
      this.start = false;
    }).catch(err => {
      console.log(err);
    });
  }

  startAlertCountdown() {
    this.isAlertPending = true;
  }

  sendAlert() {
    this.service.sendAlert({}).then((res) => {
      this.isAlertPending = false;
    }).catch(next => console.log(next));
  }

  cancelAlert() {
    this.isAlertPending = false;
  }

}
