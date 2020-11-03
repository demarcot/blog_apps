import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
  private blogsPage: Blog[];
  
  public length: number = 0;
  public pageSize: number = 2;
  public pageEvent: PageEvent;

  // constructor(private blogsService: BlogsService) { }
  constructor(private blogsService: MockBlogsService) {}

  ngOnInit(): void {
    this.reloadBlogs()
  }

  getBlogs(): Blog[] {
    return this.blogs;
  }

  getBlogsPage(): Blog[] {
    return this.blogsPage;
  }

  reloadBlogs() {
    this.blogs = this.blogsService.getBlogs();
    this.length = this.blogs.length;
    this.blogsPage = this.blogs.slice(0, this.pageSize);
  }

  handlePageEvent(event: PageEvent) {
    this.blogsPage = this.blogs.slice(this.pageSize*event.pageIndex, (this.pageSize*event.pageIndex)+this.pageSize);
  }
}
