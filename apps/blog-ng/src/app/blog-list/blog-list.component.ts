import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../blogs.service';
import { Blog } from './blog.model';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  public blogs: Blog[];

  constructor(private blogsService: BlogsService) { }

  ngOnInit(): void {
    this.blogs = this.blogsService.getBlogs();
  }

}
