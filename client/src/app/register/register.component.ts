import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService, private errorDialog: MatDialog) { }

  ngOnInit(): void {
  }

  async register(username: string, pw: string, pw2: string): Promise<void> {
    if(pw!==pw2) {
      this.errorDialog.open(ErrorDialogComponent, {data: {title: "Registration Error", content: "The provided passwords did not match."}});
      return;
    } else {
      let b: boolean = await this.loginService.register(username, pw, pw2);
      if(!b) {
        this.errorDialog.open(ErrorDialogComponent, {data: {title: "Registration Error", content: "There was a problem with registration. Please try again."}});
      } else {
        this.router.navigate(['login']);
      }
    }
  }
}
