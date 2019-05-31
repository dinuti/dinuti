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
  public user: User;
  public usersNeedHelp: any[];

  // Timer
  private time = 300;
  private array = Array.from({length: 300 - 1}, (x, i) => i + 1);
  public config: any = {
    leftTime: this.time,
    notify: this.array
  };
  public color = 'green';

  @ViewChild(CountdownComponent) counter: CountdownComponent;


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
      this.counter.restart();
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

  notify(ev) {
    const percent = ev.left / (this.time * 10);
    this.color = this.hsl_col_perc(percent);
  }

  hsl_col_perc(percent) {
    const red = 0;
    const green = 120;
    const a = percent / 100;
    const b = (green - red) * a;
    const c = b + red;
    return 'hsl(' + c + ', 100%, 50%)';
  }
}
