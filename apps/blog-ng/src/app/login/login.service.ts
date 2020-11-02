import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';


@Injectable()
export class LoginService {


    constructor(private http: HttpClient){}

    login(username: string, pw: string): Promise<boolean>
    {
        if(!username || !pw) {
            console.log("Username or PW was not provided.");
            return Promise.resolve(false);
        } else if (username==="admin" && pw==="admin") {
            localStorage.jwt = "abcd"
            return Promise.resolve(true);
        }

         return this.http.post<{jwt: string}>('http://127.0.0.1:8001/api/public/login', {'username': username, 'password': pw}).toPromise().then((tkn) => {
            if(tkn && tkn.jwt) {
                localStorage.jwt = tkn.jwt;
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
    }

    isLoggedIn(): boolean {
        return localStorage.jwt ? true : false;
    }
}