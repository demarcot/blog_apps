import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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

    private isLoggedIn: boolean = false;
    private loginSub: Subscription;

    constructor(private loginService: LoginService, private blogsService: BlogsService, private router: Router, private errorDialog: MatDialog) {

    }

    ngOnInit(): void {
        this.loginSub = this.loginService.getLoggedInObs().subscribe(obs => {
            this.isLoggedIn = obs;
        });
        this.blog = history.state.blog;
    }

    ngAfterViewInit(): void {
        // Slight lifecycle issue with floating label on focus
        setTimeout(() => {
            this.titleElement.nativeElement.focus();
        }, 50);
    }

    updateBlog(): void {
        if(!this.blog.title || !this.blog.body || !this.isLoggedIn) {
            const d = this.errorDialog.open(ErrorDialogComponent, { data: { title: "Error Updating Blog", content: "Modify the content and continue."}, autoFocus: true});
          } else {
            this.blogsService.updateBlog(this.blog);
            this.router.navigate(['blogs']);
          }
    }
}