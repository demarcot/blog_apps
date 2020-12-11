import { Component, OnDestroy, OnInit } from '@angular/core';
import { Blog } from '../blog.model';
import { ActivatedRoute, Params } from '@angular/router';
import { BlogsService } from '../blogs.service';
import { MockBlogsService } from '../blogs.service.mock';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit, OnDestroy {
  public blog: Blog;
  private blogSub: Subscription;

  constructor(private blogsService: BlogsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.blogSub = this.blogsService.getBlogsObs().subscribe(obs => {
      this.blog = obs.find((v) => v.id == id);
    });
  }

  ngOnDestroy(): void {
    this.blogSub.unsubscribe();
  }
}
