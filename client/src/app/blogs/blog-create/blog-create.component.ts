import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BlogsService } from '../blogs.service';
import { Blog } from '../blog.model';
import { MockBlogsService } from '../blogs.service.mock';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent, ErrorDialogData } from '../../error-dialog/error-dialog.component';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css']
})
export class BlogCreateComponent implements OnInit, AfterViewInit {

  @ViewChild('title') titleElement: ElementRef;

  constructor(private router: Router, private blogsService: BlogsService, private loginService: LoginService, private errorDialog: MatDialog) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // Slight lifecycle issue with floating label on focus
    setTimeout(() => {
      this.titleElement.nativeElement.focus();
    }, 50);
  }

  createBlog(title: string, body: string)
  {
    if(!title || !body || !this.loginService.isLoggedIn()) {
      const d = this.errorDialog.open(ErrorDialogComponent, { data: { title: "Error Creating Blog", content: "Provide a Title and a Body."}, autoFocus: true});
    } else {
      this.blogsService.createBlog(new Blog(title, body, this.loginService.getUser(), 0));
      this.router.navigate(['blogs']);

    }
  }
}
