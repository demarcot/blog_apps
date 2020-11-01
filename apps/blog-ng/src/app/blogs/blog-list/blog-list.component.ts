import { Component, OnInit } from '@angular/core';
import { Blog } from '../blog.model';
import { BlogsService } from '../blogs.service';
import { MockBlogsService } from '../blogs.service.mock';


@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  private blogs: Blog[];

  // constructor(private blogsService: BlogsService) { }
  constructor(private blogsService: MockBlogsService) {}

  ngOnInit(): void {
    this.reloadBlogs()
  }

  getBlogs()
  {
    return this.blogs;
  }

  reloadBlogs()
  {
    this.blogs = this.blogsService.getBlogs();
  }
}
