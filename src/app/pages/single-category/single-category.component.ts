import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css']
})
export class SingleCategoryComponent implements OnInit{
  category!: {
    categoryId: string;
    categoryName: string;
  };
  categoryPostList!: Observable<any>;

  constructor(private router: Router, private postService: PostsService){
    this.category = this.router.getCurrentNavigation()?.extras.state?.['category'];
    console.log(this.category);
}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        const extras = (event as NavigationStart).navigationTrigger === 'popstate' ? null : this.router.getCurrentNavigation()?.extras;
        this.category = extras?.state?.['category'] || null;
        this.categoryPostList = this.postService.getAllPostsByCategory(this.category.categoryId);
        console.log(this.category);
      }
    })
      // this.route.params.subscribe(val => {
      //   this.categoryId = val['id'];
      // })
      

  }

}
