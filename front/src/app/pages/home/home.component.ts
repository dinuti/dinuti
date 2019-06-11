import { Component, OnInit, ViewChild } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AuthService } from 'src/app/providers/auth.service';
import { User } from 'src/app/model/user';
import { ServiceService } from 'src/app/providers/service.service';
import { CountdownComponent } from 'ngx-countdown';
import { environment } from 'src/app/environment/environment';

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

  // Timer
  private time = environment.timerSecond;
  private array = Array.from({length: this.time - 1}, (x, i) => i + 1);
  public config: any = {
    leftTime: this.time,
    notify: this.array
  };
  public color = 'green';


  constructor(private socket: Socket, private auth: AuthService, private service: ServiceService) {
  }

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

  notify(ev: any) {
    // ev.left is in ms and this.time is in sec
    const percent = ev.left / (this.time * 10);
    this.color = this.hsl_col_perc(percent);
  }

  hsl_col_perc(percent: number) {
    const red = 0;
    const green = 120;
    const color = (((green - red) * percent) / 100) + red;
    return 'hsl(' + color + ', 100%, 50%)';
  }
}
