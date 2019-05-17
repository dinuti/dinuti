import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public socket: Socket) { }

  ngOnInit() {
    this.socket.emit('message', 'bonjour');
    this.socket.on('message', (ev: any) => {
      console.log(ev);
    });
  }

}
