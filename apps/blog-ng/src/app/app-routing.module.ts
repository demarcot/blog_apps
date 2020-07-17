import { NgModule } from "@angular/core";

import { Routes, RouterModule } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogPostComponent } from './blog-list/blog-post/blog-post.component';


/*
const appRoutes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'users', component: UsersComponent, children: [
    {path: ':id/:name', component: UserComponent}
  ]},
  {path: 'servers', canActivateChild: [AuthGuard], component: ServersComponent, children: [
    {path: ':id', component: ServerComponent},
    {path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard]}
  ]},
  {path: 'not-found', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/not-found'}
];
*/

const appRoutes: Routes = [
    {path: '', component: BlogListComponent, pathMatch: 'full'},
    {path: 'blogs', component: BlogListComponent, children: [
      {path: ':id', component: BlogPostComponent}
    ]}
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