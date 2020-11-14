import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { LoginComponent } from './login/login.component';
import { BlogListComponent } from './blogs/blog-list/blog-list.component';
import { BlogPostComponent } from './blogs/blog-post/blog-post.component';
import { BlogCreateComponent } from './blogs/blog-create/blog-create.component';

import { BlogsService } from './blogs/blogs.service';
import { LoginService } from './login/login.service';
import { MockBlogsService } from './blogs/blogs.service.mock';

import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import { LandingComponent } from './landing/landing.component';
import { AboutComponent } from './about/about.component';
import { RestPickerComponent } from './rest-picker/rest-picker.component';


@NgModule({
  declarations: [
    AppComponent,
    BlogListComponent,
    BlogPostComponent,
    LoginComponent,
    BlogCreateComponent,
    ErrorDialogComponent,
    LandingComponent,
    AboutComponent,
    RestPickerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatCardModule,
    MatDialogModule,
    MatPaginatorModule,
    MatListModule,
    MatIconModule
  ],
  providers: [BlogsService, LoginService,  {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
