import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class LoginService {


    constructor(private http: HttpClient){}

    login(username: string, pw: string)
    {
        this.http.post<{jwt: string}>('http://127.0.0.1:8001/api/public/login', {'username': username, 'password': pw}).subscribe(tkn => { 
            if(tkn.jwt) {
                localStorage.jwt = tkn.jwt;
            } else {
                console.log("Login gave no JWT.");
            }
        })
    }

    logout() {
        if(localStorage.jwt) {
            localStorage.jwt = null;
        }
    }

    isLoggedIn(): boolean {
        return localStorage.jwt ? true : false;
    }
}