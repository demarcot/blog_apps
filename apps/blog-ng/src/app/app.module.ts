import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { APP_BASE_HREF } from '@angular/common';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogPostComponent } from './blog-list/blog-post/blog-post.component';
import { AppRoutingModule } from './app-routing.module';
import { BlogsService } from './blogs.service';

@NgModule({
  declarations: [
    AppComponent,
    BlogListComponent,
    BlogPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [BlogsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
