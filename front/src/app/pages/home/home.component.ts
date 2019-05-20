import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AuthService } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private socket: Socket, private auth: AuthService) { }

  ngOnInit() {
    this.auth.checkAuthentication().then((user) => {
      this.socket.emit('auth', user);
    });
    this.socket.on('message', (ev: any) => {
      console.log(ev);
    });
  }

}
