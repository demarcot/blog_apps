import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('uname') unameElement: ElementRef;

  constructor(private router: Router, private loginService: LoginService, private errorDialog: MatDialog) { }

  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void {
    // Slight lifecycle issue with floating label on focus
    setTimeout(() => {
      this.unameElement.nativeElement.focus();
    }, 50);
  }

  async login(username: string, pw: string)
  {
    let b: boolean = await this.loginService.login(username, pw);
    if(!b) {
      this.errorDialog.open(ErrorDialogComponent, {data: {title: "Login Error", content: "There was a problem logging in. Please try again."}, autoFocus: true});
    } else {
      this.router.navigate(['blogs']);
    }
  }

}
