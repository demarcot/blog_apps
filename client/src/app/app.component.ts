import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'blog-ng';
  loggedIn = false;

  private loginSub: Subscription;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginSub = this.loginService.getLoggedInObs().subscribe(obs => {
      this.loggedIn = obs;
    });
  }

  ngOnDestroy(): void {
    this.loginSub.unsubscribe();
  }

  logout() {
    this.loginService.logout();
  }
}
