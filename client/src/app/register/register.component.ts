import { viewClassName } from '@angular/compiler';
import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {

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

  async register(username: string, pw: string, pw2: string): Promise<void> {
    if(pw!==pw2) {
      let ref = this.errorDialog.open(ErrorDialogComponent, {data: {title: "Registration Error", content: "The provided passwords did not match."}, autoFocus: true});
      return;
    } else {
      let b: boolean = await this.loginService.register(username, pw, pw2);
      if(!b) {
        let ref = this.errorDialog.open(ErrorDialogComponent, {data: {title: "Registration Error", content: "There was a problem with registration. Please try again."}, autoFocus: true});
        return;
      } else {
        this.router.navigate(['login']);
      }
    }
  }
}
