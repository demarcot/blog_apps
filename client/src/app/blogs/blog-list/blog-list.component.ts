import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/login/login.service';
import { Blog } from '../blog.model';
import { BlogsService } from '../blogs.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit, OnDestroy {
  private blogs: Blog[];
  private blogsPage: Blog[];
  private blogsSub: Subscription;
  
  public length: number = 0;
  public pageSize: number = 10;
  public pageEvent: PageEvent;

  loggedIn: boolean = false;
  private loginSub: Subscription;

  constructor(private blogsService: BlogsService, private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.loginSub = this.loginService.getLoggedInObs().subscribe(obs => {
      this.loggedIn = obs;
    });

    this.blogsSub = this.blogsService.getBlogsObs().subscribe(obs => {
      this.blogs = obs;
      this.length = this.blogs.length;
      this.blogsPage = this.blogs.slice(0, this.pageSize);
    });
  }

  ngOnDestroy(): void {
    this.loginSub.unsubscribe();
    this.blogsSub.unsubscribe();
  }

  getBlogs(): Blog[] {
    return this.blogs;
  }

  getBlogsPage(): Blog[] {
    return this.blogsPage;
  }

  navToBlog(blog: Blog) {
    this.router.navigate(['/blogs', blog.id]);
  }

  navToBlogEdit(blog: Blog) {
    this.router.navigate(['/blogs/edit', blog.id]);
  }

  likeBlog(blog: Blog) {
    this.blogsService.likeBlog(blog);
  }

  deleteBlog(blog: Blog) {
    this.blogsService.deleteBlog(blog);
  }

  handlePageEvent(event: PageEvent) {
    this.blogsPage = this.blogs.slice(this.pageSize*event.pageIndex, (this.pageSize*event.pageIndex)+this.pageSize);
  }

  isAuthor(blog: Blog): boolean {
    if(this.loggedIn && this.loginService.getUser() === blog.author) {
      return true;
    } else {
      return false;
    }
  }
}
