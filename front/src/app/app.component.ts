import { Component } from '@angular/core';
import { AuthService } from './providers/auth.service';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dinuti';
  isConnect: boolean;

  constructor(private auth: AuthService, private router: Router) {
    router.events.subscribe(ev => {
      if (ev instanceof NavigationStart) {
        this.isConnect = auth.isAuthenticated();
      }
    });
  }

  exit() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
