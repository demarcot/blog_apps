import { Injectable } from '@angular/core';
import { Blog } from './blog.model';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable()
export class BlogsService {
    private blogs: Blog[] = [
        new Blog("1", "hello, bloggers!", "this is the body", "tom", 1),
        new Blog("2", "apology for previous blog", "i will be better", "tom", 3)
    ];

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
            this.http.get<Blog[]>('http://127.0.0.1:8001/api/public/blogs').subscribe(blgs => {
                this.blogs = blgs;
            });
        }
        
        return this.blogs;
    }

    getBlog(id: string) {
        const blog = this.blogs.find(
            (b) => {
                return b.id === id;
            }
        );
        return blog;
    }

    createBlog(blog: Blog)
    {
        /*
        let id = 1;
        for(let i = 0; i < this.blogs.length && i < this.blogs[i].id; i++, id++){}
        blog.id = id;
        */
       if(localStorage.jwt)
       {
           this.http.post('http://127.0.0.1:8001/api/blogs', blog, {headers: new HttpHeaders({
           'Content-Type': 'application/json',
           'Authorization': localStorage.jwt
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