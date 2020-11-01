import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../blogs.service';
import { Blog } from '../blog.model';
import { MockBlogsService } from '../blogs.service.mock';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css']
})
export class BlogCreateComponent implements OnInit {

  // constructor(private blogsService: BlogsService) { }
  constructor(private blogsService: MockBlogsService) {}

  ngOnInit(): void {
  }

  createBlog(title: string, body: string)
  {
    this.blogsService.createBlog(new Blog("0", title, body, "tom", 0));
  }
}
