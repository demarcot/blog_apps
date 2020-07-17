import { Component, OnInit } from '@angular/core';
import { Blog } from '../blog.model';
import { BlogsService } from 'src/app/blogs.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {
  public blog: Blog;

  constructor(private blogsService: BlogsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.blog = this.blogsService.getBlog(id);
    this.route.params.subscribe((params: Params) => {
      this.blog = this.blogsService.getBlog(+params['id']);
    });
  }

}
