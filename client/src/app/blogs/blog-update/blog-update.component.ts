import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorDialogComponent } from 'src/app/error-dialog/error-dialog.component';
import { LoginService } from 'src/app/login/login.service';
import { Blog } from '../blog.model';
import { BlogsService } from '../blogs.service';

@Component({
    selector: "app-blog-update",
    templateUrl: "./blog-update.component.html",
    styleUrls: ["./blog-update.component.css"]
})
export class BlogUpdateComponent implements OnInit {
    @Input() blog: Blog;

    constructor(private loginService: LoginService, private blogsService: BlogsService, private router: Router, private errorDialog: MatDialog) {

    }

    ngOnInit(): void {
        this.blog = history.state.blog;
    }

    updateBlog(): void {
        if(!this.blog.title || !this.blog.body || !this.loginService.isLoggedIn()) {
            const d = this.errorDialog.open(ErrorDialogComponent, { data: { title: "Error Updating Blog", content: "Modify the content and continue."}});
          } else {
            this.blogsService.updateBlog(this.blog);
            this.router.navigate(['blogs']);
      
          }
    }
}