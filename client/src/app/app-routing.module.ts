import { NgModule } from "@angular/core";

import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { BlogListComponent } from './blogs/blog-list/blog-list.component';
import { BlogPostComponent } from './blogs/blog-post/blog-post.component';
import { BlogCreateComponent } from './blogs/blog-create/blog-create.component';
import { LandingComponent } from './landing/landing.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { BlogUpdateComponent } from './blogs/blog-update/blog-update.component';

const appRoutes: Routes = [
    {path: '', component: LandingComponent, pathMatch: 'full'},
    {path: 'about', component: AboutComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'blogs/create', component: BlogCreateComponent},
    {path: 'blogs/:id', component: BlogPostComponent},
    {path: 'blogs/edit/:id', component: BlogUpdateComponent},
    {path: 'blogs', component: BlogListComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}