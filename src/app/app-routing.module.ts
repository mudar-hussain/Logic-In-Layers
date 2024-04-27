import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SingleCategoryComponent } from './pages/single-category/single-category.component';
import { SinglePostComponent } from './pages/single-post/single-post.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AllPostsComponent } from './pages/all-posts/all-posts.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'category/:categoryName/:categoryId', component: SingleCategoryComponent},
  { path: 'post/:postIdTitle', component: SinglePostComponent},
  { path: 'posts', component: AllPostsComponent},
  { path: 'about', component: AboutUsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
