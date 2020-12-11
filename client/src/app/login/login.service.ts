import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import { environment } from './../../environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export class LoginService {
    private loggedInSubj: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private loggedInObs: Observable<boolean> = this.loggedInSubj.asObservable();
    private username: string;
    private role: string;

    private helper = new JwtHelperService()

    constructor(private http: HttpClient){
        if(localStorage.jwt) {
            this.refreshLogin();
        }
    }

    async login(username: string, pw: string): Promise<boolean>
    {
        if(!username || !pw) {
            console.log("Username or PW was not provided.");
            return Promise.resolve(false);
        }

         return this.http.post<{jwt: string}>(environment.apiUrl + environment.pub.loginOp, {'username': username, 'password': pw}).toPromise().then((tkn) => {
            if(tkn && tkn.jwt) {
                localStorage.jwt = tkn.jwt;
                
                const decoded = this.helper.decodeToken(tkn.jwt);
                this.loggedInSubj.next(true);
                this.username = decoded.username;
                this.role = decoded.role;
                
                return true;
            } else {
                console.log("Login gave no JWT.");
            }
            return false;
        }).catch((reason) => {
            console.log("Error logging in: ", reason);
            return false;
        });
    }

    async register(username: string, pw: string, pw2: string): Promise<boolean> {
        if(!username || !pw || !pw2) {
            console.log("Username or PW was not provided.");
            return Promise.resolve(false);
        } else if(pw !== pw2) {
            console.log("Passwords provided were not the same.");
            return Promise.resolve(false);
        }

         return this.http.post(environment.apiUrl + environment.pub.registerOp, {'username': username, 'password': pw}, {observe: 'response'}).toPromise().then((res) => {
            if(res && res.ok) {
                return true;
            } else {
                console.log("Registration failed.");
                return false;
            }
        }).catch((reason) => {
            console.log("Error in registration: ", reason);
            return false;
        });
    }

    logout(): void {
        if(localStorage.jwt) {
            localStorage.removeItem('jwt');
        }
        this.loggedInSubj.next(false);
        this.username = null;
        this.role = null;
    }

    getLoggedInObs(): Observable<boolean> {
        return this.loggedInObs;
    }
    
    refreshLogin(): void {
        try {
            if(localStorage.jwt && this.helper.isTokenExpired(localStorage.jwt)) {
                this.logout();
            } else {
                const decoded = this.helper.decodeToken(localStorage.jwt);
                this.username = decoded.username;
                this.role = decoded.role;

                this.loggedInSubj.next(localStorage.jwt && this.username && this.role ? true : false);                
            }
        } catch(e) {
            console.error("Problem verifying login: ", e);
            this.logout();
        }
    }

    getUser(): string {
        if(this.username) {
            return this.username;
        } else {
            return "";
        }
    }
}