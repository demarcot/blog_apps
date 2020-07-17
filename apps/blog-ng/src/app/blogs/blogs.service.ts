import { Injectable } from '@angular/core';
import { Blog } from './blog.model';

@Injectable()
export class BlogsService {
    private blogs: Blog[] = [
        new Blog(1, "hello, bloggers!", "this is the body"),
        new Blog(2, "apology for previous blog", "i will be better")
    ];

    getBlogs() {
        return this.blogs;
    }

    getBlog(id: number) {
        const blog = this.blogs.find(
            (b) => {
                return b.id === id;
            }
        );
        return blog;
    }
}