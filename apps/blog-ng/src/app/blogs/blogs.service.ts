import { Injectable } from '@angular/core';
import { Blog } from './blog.model';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable()
export class BlogsService {
    private blogs: Blog[] = [];

    constructor(private http: HttpClient)
    {
        this.reloadBlogs();
    }

    getBlogs() {
        this.reloadBlogs();
        return this.blogs;
    }

    reloadBlogs() {
        if(localStorage.jwt)
        {
            this.http.get<Blog[]>(environment.apiUrl + environment.pub.blogsOp).subscribe(blgs => {
                this.blogs = blgs;
            });
        }
        
        return this.blogs;
    }

    getBlog(id: string) {
        const blog = this.blogs.find(
            (b) => {
                return b._id === id;
            }
        );
        return blog;
    }

    createBlog(blog: Blog)
    {
       if(localStorage.jwt)
       {
           this.http.post(environment.apiUrl + environment.priv.blogsOp, blog, {headers: new HttpHeaders({
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + localStorage.jwt
           })}).subscribe(resp => {
               this.blogs = this.reloadBlogs();
           });
       }
    }

    deleteBlog(id: string)
    {
        let index = this.blogs.indexOf(this.getBlog(id));
        this.blogs.splice(index, 1);
    }
}