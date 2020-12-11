import { Injectable } from '@angular/core';
import { Blog } from './blog.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class BlogsService {
    //Time to do some shit
    private blogsSub: BehaviorSubject<Blog[]> = new BehaviorSubject<Blog[]>([]);
    private blogsObs: Observable<Blog[]> = this.blogsSub.asObservable();
    
    //private blogs: Blog[];

    constructor(private http: HttpClient)
    {
        this.reloadBlogs();
    }

    getBlogsObs() {
        return this.blogsObs;
    }

    reloadBlogs() {
        this.http.get<Blog[]>(environment.apiUrl + environment.pub.blogsOp).toPromise().then(blgs => {
            this.blogsSub.next(blgs);
        });
    }

    /*
    getBlog(id: string) {
        const blog = this.blogs.find(
            (b) => {
                return b.id === id;
            }
        );
        return blog;
    }
    */

    createBlog(blog: Blog)
    {
       if(localStorage.jwt)
       {
           this.http.post(environment.apiUrl + environment.priv.blogsOp, blog, {headers: new HttpHeaders({
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + localStorage.jwt
           })}).toPromise().then(resp => {
               this.reloadBlogs();
           });
       }
    }

    deleteBlog(blog: Blog)
    {
       if(localStorage.jwt) {
            this.http.delete(environment.apiUrl + environment.priv.blogsOp + `/${blog.id}`, {headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.jwt
                })}).toPromise().then(resp => {
                    this.reloadBlogs();
                });
       }
    }

    likeBlog(blog: Blog) {
        if(localStorage.jwt)
       {
           this.http.put(environment.apiUrl + environment.priv.blogsLikeOp+`/${blog.id}`, {}, {headers: new HttpHeaders({
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + localStorage.jwt
           })}).toPromise().then(resp => {
               this.reloadBlogs();
           });
       }
    }

    updateBlog(blog: Blog) {
        if(localStorage.jwt) {
            this.http.post(environment.apiUrl + environment.priv.blogsOp + `/${blog.id}`, blog, {headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.jwt
                })}).toPromise().then(resp => {
                    this.reloadBlogs();
                });
        }
    }
}