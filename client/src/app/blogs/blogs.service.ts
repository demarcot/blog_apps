import { Injectable } from '@angular/core';
import { Blog } from './blog.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class BlogsService {
    private blogs: Blog[];

    constructor(private http: HttpClient)
    {
        this.reloadBlogs();
    }

    getBlogs() {
        return this.blogs;
    }
    
    /*
    getBlogsFromServer(): Observable<Blog[]> {

        return this.http.get<Blog[]>(environment.apiUrl + environment.pub.blogsOp);
    }
    */

    async reloadBlogs() {
        await this.http.get<Blog[]>(environment.apiUrl + environment.pub.blogsOp).toPromise().then(blgs => {
            this.blogs = blgs;
        });
    }

    getBlog(id: string) {
        const blog = this.blogs.find(
            (b) => {
                return b.id === id;
            }
        );
        return blog;
    }

    async createBlog(blog: Blog)
    {
       if(localStorage.jwt)
       {
           await this.http.post(environment.apiUrl + environment.priv.blogsOp, blog, {headers: new HttpHeaders({
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + localStorage.jwt
           })}).toPromise().then(async resp => {
               await this.reloadBlogs();
           });
       }
    }

    async deleteBlog(blog: Blog)
    {
       if(localStorage.jwt) {
            await this.http.delete(environment.apiUrl + environment.priv.blogsOp + `/${blog.id}`, {headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.jwt
                })}).toPromise().then(async resp => {
                    await this.reloadBlogs();
                });
       }
    }

    async likeBlog(blog: Blog) {
        if(localStorage.jwt)
       {
           await this.http.put(environment.apiUrl + environment.priv.blogsLikeOp+`/${blog.id}`, {}, {headers: new HttpHeaders({
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + localStorage.jwt
           })}).toPromise().then(async resp => {
               await this.reloadBlogs();
           });
       }
    }

    async updateBlog(blog: Blog) {
        if(localStorage.jwt) {
            await this.http.post(environment.apiUrl + environment.priv.blogsOp + `/${blog.id}`, blog, {headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.jwt
                })}).toPromise().then(async resp => {
                    await this.reloadBlogs();
                });
        }
    }
}