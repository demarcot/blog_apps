import { Injectable } from '@angular/core';
import { Blog } from './blog.model';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import {Schema} from 'mongoose';

@Injectable()
export class MockBlogsService {
    private blogs: Blog[] = [
        new Blog("hello, bloggers!", "this is the body", "tom", 1),
        new Blog("apology for previous blog", "i will be better", "tom", 3)
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
        return this.blogs;
    }

    getBlog(id: string) {
        const blog = this.blogs.find(
            (b) => {
                return b.id === (new Schema.Types.ObjectId(id))['path'];
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
       if(true || localStorage.jwt)
       {
           blog.id = (new Schema.Types.ObjectId((this.blogs.length+1).toString()))['path'];
           this.blogs.push(blog);
       }
    }

    deleteBlog(id: string)
    {
        let index = this.blogs.indexOf(this.getBlog(id));
        this.blogs.splice(index, 1);
    }
}