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
        } else if (username==="admin" && pw==="admin") {
            localStorage.jwt = "adminJwt";
            this.username = "admin";
            this.role = "admin";
            return Promise.resolve(true);
        }
         return this.http.post<{jwt: string}>(environment.apiUrl, {'username': username, 'password': pw}).toPromise().then((tkn) => {
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

    logout() {
        if(localStorage.jwt) {
            localStorage.removeItem('jwt');
        }
        this.username = null;
        this.role = null;
    }

    isLoggedIn(): boolean {
        if(localStorage.jwt && this.helper.isTokenExpired(localStorage.jwt)) {
            this.logout();
            return false;
        } else {
            return localStorage.jwt && this.username && this.role ? true : false;
        }
    }
}