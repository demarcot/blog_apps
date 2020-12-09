import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
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
export class BlogUpdateComponent implements OnInit, AfterViewInit {
    @Input() blog: Blog;

    @ViewChild('title') titleElement: ElementRef;

    constructor(private loginService: LoginService, private blogsService: BlogsService, private router: Router, private errorDialog: MatDialog) {

    }

    ngOnInit(): void {
        this.blog = history.state.blog;
    }

    ngAfterViewInit(): void {
        // Slight lifecycle issue with floating label on focus
        setTimeout(() => {
            this.titleElement.nativeElement.focus();
        }, 50);
    }

    updateBlog(): void {
        if(!this.blog.title || !this.blog.body || !this.loginService.isLoggedIn()) {
            const d = this.errorDialog.open(ErrorDialogComponent, { data: { title: "Error Updating Blog", content: "Modify the content and continue."}, autoFocus: true});
          } else {
            this.blogsService.updateBlog(this.blog);
            this.router.navigate(['blogs']);
      
          }
    }
}