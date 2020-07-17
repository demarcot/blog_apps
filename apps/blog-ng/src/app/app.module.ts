import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { APP_BASE_HREF } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { BlogListComponent } from './blogs/blog-list/blog-list.component';
import { BlogPostComponent } from './blogs/blog-post/blog-post.component';
import { BlogsService } from './blogs/blogs.service';
import { BlogCreateComponent } from './blogs/blog-create/blog-create.component';

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
    AppRoutingModule
  ],
  providers: [BlogsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
