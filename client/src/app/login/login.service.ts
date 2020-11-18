import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import { environment } from './../../environments/environment';

@Injectable()
export class LoginService {
    private username: string;
    private role: string;

    private helper = new JwtHelperService()

    constructor(private http: HttpClient){
    }

    login(username: string, pw: string): Promise<boolean>
    {
        if(!username || !pw) {
            console.log("Username or PW was not provided.");
            return Promise.resolve(false);
        }

         return this.http.post<{jwt: string}>(environment.apiUrl + environment.pub.loginOp, {'username': username, 'password': pw}).toPromise().then((tkn) => {
            if(tkn && tkn.jwt) {
                localStorage.jwt = tkn.jwt;
                
                const decoded = this.helper.decodeToken(tkn.jwt);
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

    register(username: string, pw: string, pw2: string): Promise<boolean> {
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

    verify(): Promise<boolean> {
        if(!localStorage.getItem('jwt')) {
            return Promise.resolve(false);
        } else {
            this.http.get(environment.apiUrl + environment.pub.verifyOp , {headers: {'Authorization': 'Bearer ' + localStorage.getItem('jwt')}, observe: 'response'}).toPromise().then((res) => {
                if(res.ok) {
                    return true;
                } else {
                    this.logout();
                    return false;
                }
            }).catch((reason) => {
                console.log("Could not verify user: ", reason);
                this.logout();
                return false;
            });
        }
    }

    logout(): void {
        if(localStorage.jwt) {
            localStorage.removeItem('jwt');
        }
        this.username = null;
        this.role = null;
    }

    isLoggedIn(): boolean {
        try {
            if(localStorage.jwt && this.helper.isTokenExpired(localStorage.jwt)) {
                this.logout();
                return false;
            } else {
                return localStorage.jwt && this.username && this.role ? true : false;
            }
        } catch(e) {
            console.error("Problem verifying login: ", e);
            this.logout();
        }
        return false;
    }

    getUser(): string {
        if(this.username) {
            return this.username;
        } else {
            return "";
        }
    }
}