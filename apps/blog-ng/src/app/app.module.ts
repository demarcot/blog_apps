import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from 
    '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { APP_BASE_HREF } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { BlogListComponent } from './blogs/blog-list/blog-list.component';
import { BlogPostComponent } from './blogs/blog-post/blog-post.component';
import { BlogsService } from './blogs/blogs.service';
import { BlogCreateComponent } from './blogs/blog-create/blog-create.component';
import { LoginService } from './login/login.service';
import { HttpClientModule } from '@angular/common/http';
import { MockBlogsService } from './blogs/blogs.service.mock';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    BlogListComponent,
    BlogPostComponent,
    LoginComponent,
    BlogCreateComponent
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
    MatCardModule
  ],
  providers: [BlogsService, LoginService, MockBlogsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
